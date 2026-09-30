/* Dokan Zaman — Design 2 interactions (shared by the homepage and the inner pages;
   every feature checks that its elements exist on the current page) */
(() => {
  const root = document.documentElement;
  root.classList.add('js');

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const fmt = new Intl.NumberFormat('en-US');
  const smooth = reduceMotion ? 'auto' : 'smooth';

  /* ---------- Theme (shared localStorage key with design 1) ---------- */
  const themeBtn = $('.theme-toggle');
  const metaTheme = $('meta[name="theme-color"]');
  function applyTheme(t) {
    root.setAttribute('data-theme', t);
    metaTheme.setAttribute('content', t === 'dark' ? '#080808' : '#F2F1EE');
    themeBtn.setAttribute('aria-pressed', t === 'dark');
  }
  applyTheme(root.getAttribute('data-theme') || 'light');
  themeBtn.addEventListener('click', e => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', next); } catch (_) {}
    if (!document.startViewTransition || reduceMotion) { applyTheme(next); return; }
    const x = e.clientX || 60, y = e.clientY || 36;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.startViewTransition(() => applyTheme(next)).ready.then(() => {
      root.animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 550, easing: 'cubic-bezier(.22,.8,.24,1)', pseudoElement: '::view-transition-new(root)' });
    });
  });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ev => {
    let saved = null;
    try { saved = localStorage.getItem('theme'); } catch (_) {}
    if (!saved) applyTheme(ev.matches ? 'dark' : 'light');
  });

  /* ---------- Full-screen mobile sheet ---------- */
  const sheet = $('#sheet');
  const menuBtn = $('.menu-btn');
  function openSheet() {
    sheet.hidden = false;
    requestAnimationFrame(() => requestAnimationFrame(() => sheet.classList.add('is-open')));
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    $('.sheet__close').focus();
  }
  function closeSheet() {
    if (sheet.hidden) return;
    sheet.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    setTimeout(() => { sheet.hidden = true; }, reduceMotion ? 0 : 400);
  }
  menuBtn.addEventListener('click', openSheet);
  $('.sheet__close').addEventListener('click', closeSheet);
  $$('a', sheet).forEach(a => a.addEventListener('click', closeSheet));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });

  /* ---------- Island: hide on scroll down, show on scroll up; scroll-spy ---------- */
  const island = $('#island');
  const islandLinks = $$('.island__links a');
  // scroll-spy only applies to in-page (#hash) links; page links are marked active in the HTML
  const hashLinks = islandLinks.filter(a => /^#.+/.test(a.getAttribute('href')));
  if (hashLinks.length) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        hashLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    hashLinks.map(a => $(a.getAttribute('href'))).filter(Boolean).forEach(s => spy.observe(s));
  }

  /* ---------- Scroll-linked (single rAF) ---------- */
  const toTop = $('.to-top2');
  const road = $('.road');
  const roadBar = $('#road-bar');
  let lastY = scrollY, ticking = false, hidden = false, showTop = false, vh = innerHeight;
  let roadTop = 0, roadH = 1;

  function measure() {
    vh = innerHeight;
    if (road) {
      const r = road.getBoundingClientRect();
      roadTop = r.top + scrollY; roadH = r.height;
    }
    update();
  }
  function update() {
    ticking = false;
    const y = scrollY;
    const hide = y > 200 && y > lastY + 4 && !sheet.classList.contains('is-open');
    const show = y < lastY - 4 || y < 200;
    if (hide && !hidden) { hidden = true; island.classList.add('is-hidden'); }
    else if (show && hidden) { hidden = false; island.classList.remove('is-hidden'); }
    if (Math.abs(y - lastY) > 4) lastY = y;

    const t = y > vh;
    if (t !== showTop) { showTop = t; toTop.classList.toggle('is-visible', t); }

    if (road && roadBar) {
      const p = Math.min(1, Math.max(0, (y + vh * 0.7 - roadTop) / roadH));
      roadBar.style.transform = `scaleX(${p.toFixed(3)})`;
    }
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener('resize', () => requestAnimationFrame(measure), { passive: true });
  new ResizeObserver(() => requestAnimationFrame(measure)).observe(document.body);
  measure();
  // keyboard / link focus inside the page should always reveal the island
  island.addEventListener('focusin', () => { hidden = false; island.classList.remove('is-hidden'); });

  /* ---------- Reveal ---------- */
  const revealer = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); revealer.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  $$('[data-reveal]').forEach(el => revealer.observe(el));

  /* ---------- Counters ---------- */
  const counter = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target, end = +el.dataset.count;
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

  /* ---------- Pause loops off-screen ---------- */
  const hero = $('.hero');
  let heroVisible = true;
  const pauser = new IntersectionObserver(entries => {
    entries.forEach(en => {
      en.target.classList.toggle('is-paused', !en.isIntersecting);
      if (en.target === hero) heroVisible = en.isIntersecting;
    });
  });
  $$('[data-anim]').forEach(el => pauser.observe(el));

  /* ---------- Hero order tracker ---------- */
  const trackItems = $$('#track li');
  const trackStatus = $('#track-status');
  const trackBar = $('#track-bar');
  const labels = ['طلب العميل', 'تجهيز الأصناف', 'مراجعة الجودة', 'جاري التوصيل', 'تم التسليم ✓'];
  let ti = 0;
  function renderTrack() {
    trackItems.forEach((li, i) => { li.classList.toggle('is-done', i < ti); li.classList.toggle('is-current', i === ti); });
    trackStatus.style.opacity = 0;
    setTimeout(() => { trackStatus.textContent = labels[ti]; trackStatus.style.opacity = 1; }, 160);
    trackBar.style.transform = `scaleX(${(ti + 1) / trackItems.length})`;
  }
  if (trackStatus && trackBar) {
    renderTrack();
    if (!reduceMotion) setInterval(() => {
      if (!heroVisible || document.hidden) return;
      ti = (ti + 1) % trackItems.length;
      renderTrack();
    }, 1800);
  }

  /* ---------- Categories carousel: buttons, progress, drag ---------- */
  const car = $('#carousel');
  const carBar = $('#car-bar');
  if (car && carBar) {
    const cardStep = () => {
      const c = car.querySelector('.card');
      return c ? c.getBoundingClientRect().width + 14 : 300;
    };
    // RTL: scrollLeft is 0 at the start and negative towards the end
    $$('[data-car]').forEach(btn => btn.addEventListener('click', () => {
      const dir = btn.dataset.car === 'next' ? -1 : 1;
      car.scrollBy({ left: dir * cardStep(), behavior: smooth });
    }));
    let carTick = false;
    function carProgress() {
      carTick = false;
      const max = car.scrollWidth - car.clientWidth;
      const p = max > 0 ? Math.abs(car.scrollLeft) / max : 1;
      carBar.style.transform = `scaleX(${Math.max(0.12, p).toFixed(3)})`;
    }
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

  /* ---------- Process: sticky stepper follows the active step ---------- */
  const steps = $$('.step2');
  const stepNum = $('#stepper-num');
  const stepIcon = $('#stepper-icon use');
  const dots = $$('#stepper-dots i');
  const stepImgs = $$('#stepper-media img');
  let activeStep = -1;
  if (steps.length && stepNum) {
    function setStep(i) {
      if (i === activeStep) return;
      activeStep = i;
      steps.forEach((s, k) => s.classList.toggle('is-active', k === i));
      dots.forEach((d, k) => d.classList.toggle('is-on', k <= i));
      stepImgs.forEach((im, k) => im.classList.toggle('is-on', k === i));
      stepNum.classList.add('is-swap');
      setTimeout(() => {
        stepNum.textContent = String(i + 1).padStart(2, '0');
        stepIcon.setAttribute('href', '#' + steps[i].dataset.icon);
        stepNum.classList.remove('is-swap');
      }, 180);
    }
    const stepObs = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) setStep(steps.indexOf(en.target)); });
    }, { rootMargin: '-45% 0px -45% 0px' });
    steps.forEach(s => stepObs.observe(s));
    setStep(0);
  }

  /* ---------- Accordion: only one open (fallback for browsers without details[name]) ---------- */
  const details = $$('.acc details');
  details.forEach(d => d.addEventListener('toggle', () => {
    if (d.open) details.forEach(o => { if (o !== d) o.open = false; });
  }));

  /* ---------- Calculator ---------- */
  const spend = $('#c-spend-in'), rate = $('#c-rate-in');
  const presets = $$('.presets button');
  const o = { spend: $('#c-spend'), rate: $('#c-rate'), total: $('#c-total'), client: $('#c-client'), ours: $('#c-ours') };
  let calcPending = false;
  if (spend && rate) {
    const paint = i => i.style.setProperty('--fill', ((i.value - i.min) / (i.max - i.min) * 100) + '%');
    function calc() {
      calcPending = false;
      const s = +spend.value, total = Math.round(s * +rate.value / 100);
      o.spend.textContent = fmt.format(s) + ' ج.م';
      o.rate.textContent = rate.value + '%';
      o.total.textContent = fmt.format(total);
      o.client.textContent = fmt.format(Math.round(total * .6)) + ' ج.م';
      o.ours.textContent = fmt.format(Math.round(total * .4)) + ' ج.م';
      presets.forEach(b => b.classList.toggle('is-on', +b.dataset.v === s));
      paint(spend); paint(rate);
    }
    const queue = () => { if (!calcPending) { calcPending = true; requestAnimationFrame(calc); } };
    [spend, rate].forEach(i => i.addEventListener('input', queue));
    presets.forEach(b => b.addEventListener('click', () => { spend.value = b.dataset.v; queue(); }));
    calc();
  }

  /* ---------- Form → mail app ---------- */
  const form = $('#form2'), msg = $('#form2-msg');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = new FormData(form);
      let ok = true;
      ['name', 'phone'].forEach(n => {
        const f = form.elements[n], valid = f.value.trim().length > 0;
        f.classList.toggle('is-invalid', !valid);
        if (!valid) ok = false;
      });
      if (!ok) {
        msg.className = 'form2__msg is-err';
        msg.textContent = 'من فضلك أدخل الاسم ورقم الهاتف.';
        form.querySelector('.is-invalid').focus();
        return;
      }
      const body = ['الاسم: ' + data.get('name'), 'الشركة: ' + (data.get('company') || '—'), 'الهاتف: ' + data.get('phone'),
        'نوع الخدمة: ' + data.get('service'), '', data.get('message') || ''].join('\n');
      location.href = 'mailto:info@dakan-zaman.com?subject=' + encodeURIComponent('طلب عرض سعر — ' + (data.get('company') || data.get('name'))) + '&body=' + encodeURIComponent(body);
      msg.className = 'form2__msg is-ok';
      msg.textContent = 'شكرًا لكم! تم تجهيز طلبكم في تطبيق البريد لإرساله.';
    });
    $$('input', form).forEach(i => i.addEventListener('input', () => i.classList.remove('is-invalid')));
  }

  $('#year').textContent = new Date().getFullYear();
})();
