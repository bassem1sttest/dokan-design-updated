/* Dokan Zaman — site interactions (shared by the homepage and the inner pages;
   every feature checks that its elements exist on the current page) */
(() => {
  const root = document.documentElement;
  root.classList.add('js');

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const ar = n => String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);

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
  if (sheet && menuBtn) {
    menuBtn.addEventListener('click', openSheet);
    $('.sheet__close').addEventListener('click', closeSheet);
    $$('a', sheet).forEach(a => a.addEventListener('click', closeSheet));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });
  }

  /* ---------- Scroll-linked (single rAF) ---------- */
  const toTop = $('.to-top2');
  let ticking = false, showTop = false, vh = innerHeight;
  function update() {
    ticking = false;
    const t = scrollY > vh;
    if (t !== showTop && toTop) { showTop = t; toTop.classList.toggle('is-visible', t); }
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener('resize', () => { vh = innerHeight; requestAnimationFrame(update); }, { passive: true });
  update();

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
      if (reduceMotion) { el.textContent = ar(end); return; }
      const start = performance.now();
      const tick = now => {
        const t = Math.min(1, (now - start) / 1200);
        el.textContent = ar(Math.round(end * (1 - Math.pow(1 - t, 3))));
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

  /* ---------- Cards: cursor spotlight (keep this list in sync with the card list in the CSS) ---------- */
  if (finePointer) {
    $$('.supply-card, .card-fx').forEach(card => {
      let pending = false, mx = 0, my = 0, rect = null;
      card.addEventListener('pointerenter', () => { rect = card.getBoundingClientRect(); });
      card.addEventListener('pointermove', e => {
        rect = rect || card.getBoundingClientRect();
        mx = e.clientX - rect.left; my = e.clientY - rect.top;
        if (!pending) {
          pending = true;
          requestAnimationFrame(() => {
            pending = false;
            card.style.setProperty('--mx', mx + 'px');
            card.style.setProperty('--my', my + 'px');
          });
        }
      }, { passive: true });
      card.addEventListener('pointerleave', () => { rect = null; });
    });
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
        msg.dataset.state = 'err';
        msg.textContent = 'من فضلك أدخل الاسم ورقم الهاتف.';
        form.querySelector('.is-invalid').focus();
        return;
      }
      const body = ['الاسم: ' + data.get('name'), 'الشركة: ' + (data.get('company') || '—'), 'الهاتف: ' + data.get('phone'),
        'نوع الخدمة: ' + data.get('service'), '', data.get('message') || ''].join('\n');
      location.href = 'mailto:' + ((window.SITE && SITE.emails[0]) || 'info@dakan-zaman.com') + '?subject=' + encodeURIComponent('طلب عرض سعر — ' + (data.get('company') || data.get('name'))) + '&body=' + encodeURIComponent(body);
      msg.dataset.state = 'ok';
      msg.textContent = 'شكرًا لكم! تم تجهيز طلبكم في تطبيق البريد لإرساله.';
    });
    $$('input', form).forEach(i => i.addEventListener('input', () => i.classList.remove('is-invalid')));
  }

  const year = $('#year'); if (year) year.textContent = ar(new Date().getFullYear());
})();
