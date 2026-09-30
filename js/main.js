/* Dokan Zaman — site interactions (shared by the homepage and the inner pages;
   every feature checks that its elements exist on the current page)
   Perf notes: one rAF-batched scroll handler (reads before writes),
   pointer handlers throttled to one update per frame, looping
   animations/timers paused when off-screen or the tab is hidden. */
(() => {
  const root = document.documentElement;
  root.classList.add('js');

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const fmt = new Intl.NumberFormat('en-US');

  /* ---------- Theme (light / dark) ---------- */
  const themeBtn = $('.theme-toggle');
  const metaTheme = $('meta[name="theme-color"]');
  const systemDark = matchMedia('(prefers-color-scheme: dark)');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    metaTheme.setAttribute('content', theme === 'dark' ? '#0B0B0C' : '#FAF7F2');
    themeBtn.setAttribute('aria-pressed', theme === 'dark');
  }
  applyTheme(root.getAttribute('data-theme') || 'light');

  themeBtn.addEventListener('click', e => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', next); } catch (_) {}

    if (!document.startViewTransition || reduceMotion) { applyTheme(next); return; }

    // circular reveal expanding from the button
    const x = e.clientX || innerWidth - 40;
    const y = e.clientY || 36;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const vt = document.startViewTransition(() => applyTheme(next));
    vt.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 550, easing: 'cubic-bezier(.22,.8,.24,1)', pseudoElement: '::view-transition-new(root)' }
      );
    });
  });

  // follow OS changes only while the visitor hasn't picked a theme
  systemDark.addEventListener('change', ev => {
    let saved = null;
    try { saved = localStorage.getItem('theme'); } catch (_) {}
    if (!saved) applyTheme(ev.matches ? 'dark' : 'light');
  });

  /* ---------- Nav: mobile menu + scroll-spy ---------- */
  const nav = $('.nav');
  const toggle = $('.nav__toggle');
  const links = $$('.nav__links a');

  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'إغلاق القائمة' : 'فتح القائمة');
  }
  toggle.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  links.forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  // scroll-spy only applies to in-page (#hash) links; page links are marked active in the HTML
  const hashLinks = links.filter(a => !a.classList.contains('btn') && /^#.+/.test(a.getAttribute('href')));
  if (hashLinks.length) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = '#' + entry.target.id;
        hashLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    hashLinks.map(a => $(a.getAttribute('href'))).filter(Boolean).forEach(t => spy.observe(t));
  }

  /* ---------- Scroll-linked effects (single rAF loop) ---------- */
  const progress = $('.scroll-progress span');
  const toTop = $('.to-top');
  const steps = $('#steps');
  const stepLine = $('.steps__line span');
  const stepItems = steps ? $$('.step', steps) : [];
  const mobileSteps = matchMedia('(max-width: 960px)');

  let docMax = 1, stepsTop = 0, stepsH = 1, vh = innerHeight;
  let scrolled = null, showTop = null, litCount = -1;
  let ticking = false;

  function measure() {
    vh = innerHeight;
    docMax = Math.max(1, root.scrollHeight - vh);
    if (steps) {
      const r = steps.getBoundingClientRect();
      stepsTop = r.top + scrollY;
      stepsH = r.height;
    }
    update();
  }

  function update() {
    ticking = false;
    const y = scrollY;                           // read

    progress.style.transform = `scaleX(${(y / docMax).toFixed(4)})`;

    const isScrolled = y > 20;
    if (isScrolled !== scrolled) { scrolled = isScrolled; nav.classList.toggle('is-scrolled', isScrolled); }

    const top = y > vh * 1.2;
    if (top !== showTop) { showTop = top; toTop.classList.toggle('is-visible', top); }

    if (!steps) return;
    const p = Math.min(1, Math.max(0, (y + vh * 0.75 - stepsTop) / (stepsH + vh * 0.1)));
    stepLine.style.transform = mobileSteps.matches ? `scaleY(${p.toFixed(3)})` : `scaleX(${p.toFixed(3)})`;
    const lit = Math.min(stepItems.length, Math.floor(p * stepItems.length + 0.9));
    if (lit !== litCount) {
      litCount = lit;
      stepItems.forEach((s, i) => s.classList.toggle('is-lit', i < lit));
    }
  }

  addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  addEventListener('resize', () => requestAnimationFrame(measure), { passive: true });
  new ResizeObserver(() => requestAnimationFrame(measure)).observe(document.body);
  measure();

  /* ---------- Reveal on scroll ---------- */
  const revealer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        revealer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  $$('[data-reveal]').forEach(el => revealer.observe(el));

  /* ---------- Count-up numbers ---------- */
  const counter = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const end = +el.dataset.count;
      counter.unobserve(el);
      if (reduceMotion) { el.textContent = end; return; }
      const start = performance.now();
      const tick = now => {
        const t = Math.min(1, (now - start) / 1200);
        el.textContent = Math.round(end * (1 - Math.pow(1 - t, 3)));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  $$('[data-count]').forEach(el => counter.observe(el));

  /* ---------- Pause looping work when not visible ---------- */
  const heroEl = $('.hero');
  let heroVisible = true;
  const pauser = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle('is-paused', !entry.isIntersecting);
      if (entry.target === heroEl) heroVisible = entry.isIntersecting;
    });
  });
  $$('[data-anim]').forEach(el => pauser.observe(el));
  const heroActive = () => heroVisible && !document.hidden;

  /* ---------- Hero word rotator ---------- */
  const words = $$('.rotator__word');
  let wordIndex = 0;
  if (words.length > 1 && !reduceMotion) {
    setInterval(() => {
      if (!heroActive()) return;
      const current = words[wordIndex];
      current.classList.replace('is-active', 'is-out');
      wordIndex = (wordIndex + 1) % words.length;
      words[wordIndex].classList.remove('is-out');
      words[wordIndex].classList.add('is-active');
      setTimeout(() => current.classList.remove('is-out'), 600);
    }, 2400);
  }

  /* ---------- Hero order tracker ---------- */
  const trackerSteps = $$('#tracker-steps li');
  const trackerStatus = $('#tracker-status');
  const trackerBar = $('#tracker-bar');
  const statusLabels = ['طلب العميل', 'تجهيز الأصناف', 'مراجعة الجودة', 'جاري التوصيل', 'تم التسليم ✓'];
  let stepIndex = 0;

  function renderTracker() {
    trackerSteps.forEach((li, i) => {
      li.classList.toggle('is-done', i < stepIndex);
      li.classList.toggle('is-current', i === stepIndex);
    });
    trackerStatus.style.opacity = 0;
    setTimeout(() => {
      trackerStatus.textContent = statusLabels[stepIndex];
      trackerStatus.style.opacity = 1;
    }, 160);
    trackerBar.style.transform = `scaleX(${(stepIndex + 1) / trackerSteps.length})`;
  }
  if (trackerStatus && trackerBar) {
    renderTracker();
    if (!reduceMotion) {
      setInterval(() => {
        if (!heroActive()) return;
        stepIndex = (stepIndex + 1) % trackerSteps.length;
        renderTracker();
      }, 1800);
    }
  }

  /* ---------- Hero stage parallax (desktop pointer only) ---------- */
  const stage = $('#stage');
  if (stage && finePointer && !reduceMotion) {
    const layers = $$('[data-depth]', stage).map(el => ({ el, d: +el.dataset.depth }));
    let px = 0, py = 0, pending = false, rect = null;

    const paint = () => {
      pending = false;
      layers.forEach(({ el, d }) => {
        el.style.setProperty('--tx', (px * d).toFixed(1) + 'px');
        el.style.setProperty('--ty', (py * d).toFixed(1) + 'px');
      });
    };
    heroEl.addEventListener('pointerenter', () => { rect = stage.getBoundingClientRect(); });
    heroEl.addEventListener('pointermove', e => {
      rect = rect || stage.getBoundingClientRect();
      px = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
      py = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
      if (!pending) { pending = true; requestAnimationFrame(paint); }
    }, { passive: true });
    heroEl.addEventListener('pointerleave', () => { px = py = 0; rect = null; requestAnimationFrame(paint); });
    addEventListener('scroll', () => { rect = null; }, { passive: true });
  }

  /* ---------- Tabs (WAI-ARIA pattern, one handler per [data-tabs] tablist) ---------- */
  function selectTab(tabs, tab, focus) {
    tabs.forEach(t => {
      const selected = t === tab;
      t.setAttribute('aria-selected', selected);
      t.tabIndex = selected ? 0 : -1;
      const panel = $('#' + t.getAttribute('aria-controls'));
      panel.hidden = !selected;
      panel.classList.toggle('is-active', selected);
    });
    if (focus) tab.focus();
    tab.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' });
  }
  // RTL: ArrowLeft moves forward, ArrowRight moves back
  const tabKeys = { ArrowLeft: 1, ArrowDown: 1, ArrowRight: -1, ArrowUp: -1 };
  function keyNav(e, items, i, activate) {
    if (e.key in tabKeys) { e.preventDefault(); activate(items[(i + tabKeys[e.key] + items.length) % items.length]); }
    else if (e.key === 'Home') { e.preventDefault(); activate(items[0]); }
    else if (e.key === 'End') { e.preventDefault(); activate(items[items.length - 1]); }
  }
  $$('[data-tabs]').forEach(list => {
    const tabs = $$('[role="tab"]', list);
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => selectTab(tabs, tab, false));
      tab.addEventListener('keydown', e => keyNav(e, tabs, i, t => selectTab(tabs, t, true)));
    });
  });
  // deep link to a tab from another page, e.g. procurement.html#pt-model
  function openTabFromHash() {
    const tab = /^#[\w-]+$/.test(location.hash) && $(location.hash + '[role="tab"]');
    if (tab && tab.closest('[data-tabs]')) selectTab($$('[role="tab"]', tab.closest('[data-tabs]')), tab, false);
  }
  openTabFromHash();
  addEventListener('hashchange', openTabFromHash);

  /* ---------- Categories explorer: one panel, nine categories ---------- */
  const explorer = $('#explorer');
  if (explorer) {
    const catTabs = $$('[role="tab"]', explorer);
    const catImgs = $$('.explorer__imgs img', explorer);
    const panel = $('#cat-panel');
    const caption = $('.explorer__caption', explorer);
    const num = $('#cat-num'), title = $('#cat-title'), desc = $('#cat-desc');
    let current = 0, swapTimer = 0, userTouched = false, explorerVisible = false;

    function showCategory(i, { focus = false, scroll = true } = {}) {
      if (i !== current) {
        current = i;
        catTabs.forEach((t, k) => { t.setAttribute('aria-selected', k === i); t.tabIndex = k === i ? 0 : -1; });
        catImgs.forEach((im, k) => im.classList.toggle('is-on', k === i));
        panel.setAttribute('aria-labelledby', catTabs[i].id);
        caption.classList.add('is-swap');
        clearTimeout(swapTimer);
        swapTimer = setTimeout(() => {
          num.textContent = String(i + 1).padStart(2, '0');
          title.textContent = catTabs[i].dataset.title;
          desc.textContent = catTabs[i].dataset.desc;
          caption.classList.remove('is-swap');
        }, reduceMotion ? 0 : 200);
      }
      if (focus) catTabs[i].focus();
      // keep the active chip in view inside the horizontal list (mobile) without moving the page
      if (scroll) {
        const list = catTabs[i].parentElement;
        if (list.scrollWidth > list.clientWidth) {
          const r = catTabs[i].getBoundingClientRect(), lr = list.getBoundingClientRect();
          list.scrollBy({ left: (r.left + r.width / 2) - (lr.left + lr.width / 2), behavior: reduceMotion ? 'auto' : 'smooth' });
        }
      }
    }
    catTabs.forEach((tab, i) => {
      tab.addEventListener('click', () => { userTouched = true; showCategory(i); });
      tab.addEventListener('keydown', e => keyNav(e, catTabs, i, t => { userTouched = true; showCategory(catTabs.indexOf(t), { focus: true }); }));
      if (finePointer) tab.addEventListener('pointerenter', () => { userTouched = true; showCategory(i, { scroll: false }); });
    });
    // deep link from the homepage tiles, e.g. categories.html#cat-4
    function openCategoryFromHash() {
      const m = /^#cat-(\d+)$/.exec(location.hash);
      if (!m || !catTabs[m[1] - 1]) return;
      userTouched = true;
      showCategory(m[1] - 1);
      explorer.scrollIntoView({ block: 'center', behavior: 'auto' });
    }
    openCategoryFromHash();
    addEventListener('hashchange', openCategoryFromHash);
    // gentle auto-advance until the visitor interacts; only while on screen
    new IntersectionObserver(es => { explorerVisible = es[0].isIntersecting; }, { threshold: 0.4 }).observe(explorer);
    if (!reduceMotion) setInterval(() => {
      if (userTouched || !explorerVisible || document.hidden) return;
      showCategory((current + 1) % catTabs.length);
    }, 3600);
  }

  /* ---------- Categories carousel: buttons, progress bar, keyboard, mouse drag ---------- */
  const car = $('#carousel');
  const carBar = $('#car-bar');
  if (car && carBar) {
    const smooth = reduceMotion ? 'auto' : 'smooth';
    const cardStep = () => {
      const c = car.querySelector('.card');
      return c ? c.getBoundingClientRect().width + (parseFloat(getComputedStyle(car).columnGap) || 0) : 300;
    };
    // RTL: scrollLeft is 0 at the start and negative towards the end
    $$('[data-car]').forEach(btn => btn.addEventListener('click', () => {
      car.scrollBy({ left: (btn.dataset.car === 'next' ? -1 : 1) * cardStep(), behavior: smooth });
    }));
    let carTick = false;
    const carProgress = () => {
      carTick = false;
      const max = car.scrollWidth - car.clientWidth;
      const p = max > 0 ? Math.abs(car.scrollLeft) / max : 1;
      carBar.style.transform = `scaleX(${Math.max(0.12, p).toFixed(3)})`;
    };
    car.addEventListener('scroll', () => { if (!carTick) { carTick = true; requestAnimationFrame(carProgress); } }, { passive: true });
    carProgress();
    car.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); car.scrollBy({ left: -cardStep(), behavior: smooth }); }
      if (e.key === 'ArrowRight') { e.preventDefault(); car.scrollBy({ left: cardStep(), behavior: smooth }); }
    });
    if (finePointer) {
      let down = false, startX = 0, startLeft = 0, moved = false;
      car.addEventListener('pointerdown', e => {
        if (e.pointerType !== 'mouse') return;
        down = true; moved = false; startX = e.clientX; startLeft = car.scrollLeft;
      });
      addEventListener('pointermove', e => {
        if (!down) return;
        const dx = e.clientX - startX;
        if (!moved && Math.abs(dx) > 5) { moved = true; car.classList.add('is-dragging'); }
        if (moved) car.scrollLeft = startLeft - dx;
      }, { passive: true });
      addEventListener('pointerup', () => {
        if (!down) return;
        down = false;
        // re-enabling scroll-snap lets the browser settle on the nearest card
        if (moved) car.classList.remove('is-dragging');
      });
    }
  }

  /* ---------- Savings calculator (60% client / 40% Dokan) ---------- */
  const spend = $('#spend');
  const rate = $('#rate');
  if (spend && rate) {
    const out = {
      spend: $('#spend-out'), rate: $('#rate-out'), total: $('#total-out'),
      client: $('#client-out'), ours: $('#ours-out')
    };
    let calcPending = false;

    function paintRange(input) {
      const pct = (input.value - input.min) / (input.max - input.min) * 100;
      input.style.setProperty('--fill', pct + '%');
    }
    function updateCalc() {
      calcPending = false;
      const s = +spend.value;
      const total = Math.round(s * (+rate.value / 100));
      out.spend.textContent = fmt.format(s) + ' ج.م';
      out.rate.textContent = rate.value + '%';
      out.total.innerHTML = fmt.format(total) + ' <small>ج.م</small>';
      out.client.textContent = fmt.format(Math.round(total * 0.6)) + ' ج.م';
      out.ours.textContent = fmt.format(Math.round(total * 0.4)) + ' ج.م';
      paintRange(spend);
      paintRange(rate);
    }
    [spend, rate].forEach(i => i.addEventListener('input', () => {
      if (!calcPending) { calcPending = true; requestAnimationFrame(updateCalc); }
    }));
    updateCalc();
  }

  /* ---------- Quote form → opens the visitor's mail app with a pre-filled request ---------- */
  const form = $('#quote-form');
  const msg = $('#form-msg');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = new FormData(form);
      let ok = true;
      ['name', 'phone'].forEach(n => {
        const field = form.elements[n];
        const valid = field.value.trim().length > 0;
        field.classList.toggle('is-invalid', !valid);
        if (!valid) ok = false;
      });
      if (!ok) {
        msg.className = 'form__msg is-err';
        msg.textContent = 'من فضلك أدخل الاسم ورقم الهاتف.';
        form.querySelector('.is-invalid').focus();
        return;
      }
      const body = [
        'الاسم: ' + data.get('name'),
        'الشركة: ' + (data.get('company') || '—'),
        'الهاتف: ' + data.get('phone'),
        'نوع الخدمة: ' + data.get('service'),
        'المجالات: ' + (data.getAll('cat').join('، ') || '—'),
        '',
        data.get('message') || ''
      ].join('\n');
      const subject = 'طلب عرض سعر — ' + (data.get('company') || data.get('name'));
      location.href = 'mailto:info@dakan-zaman.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      msg.className = 'form__msg is-ok';
      msg.textContent = 'شكرًا لكم! تم تجهيز طلبكم في تطبيق البريد لإرساله.';
    });
    $$('input', form).forEach(i => i.addEventListener('input', () => i.classList.remove('is-invalid')));
  }

  /* ---------- Footer year ---------- */
  $('#year').textContent = new Date().getFullYear();
})();
