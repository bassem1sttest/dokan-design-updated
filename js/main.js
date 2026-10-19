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
  const toTop = $('.to-top2'), head = $('#site-head');
  let ticking = false, showTop = false, scrolled = false, vh = innerHeight;
  function update() {
    ticking = false;
    const t = scrollY > vh;
    if (t !== showTop && toTop) { showTop = t; toTop.classList.toggle('is-visible', t); }
    // the navy top bar slides away once the page moves; the navbar stays
    const s = scrollY > 8;
    if (s !== scrolled && head) { scrolled = s; head.classList.toggle('is-scrolled', s); }
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

  /* ---------- Card grids (.even-grid): columns from the number of cards — one rule for every grid ----------
     at most 4 columns on computers, 3 up to 1080px, 2 up to 760px (a grid may set its own: data-max="5,3,2");
     the rows split as evenly as they can and a shorter last row is centred — so adding cards never breaks a grid */
  const grids = $$('.even-grid');
  if (grids.length) {
    const lg = matchMedia('(max-width: 1080px)'), sm = matchMedia('(max-width: 760px)');
    const layout = () => grids.forEach(g => {
      const max = (g.dataset.max || '4,3,2').split(',').map(Number)[sm.matches ? 2 : lg.matches ? 1 : 0];
      const n = g.children.length;
      g.style.setProperty('--cols', Math.max(1, Math.ceil(n / Math.ceil(n / max))));
    });
    layout();
    lg.addEventListener('change', layout); sm.addEventListener('change', layout);
  }

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

  /* ---------- Searchable dropdown: type to filter the options of a <select data-search> ----------
     The <select> stays (hidden) as the form field; a text box + list replace it on screen.
     Arabic search ignores أ/إ/آ, ة/ه, ى/ي and diacritics. Keys: ↑ ↓ Enter Esc. */
  const norm = s => s.replace(/[\u064B-\u0652\u0640]/g, '').replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').toLowerCase().trim();
  let comboId = 0;
  function searchable(sel) {
    const box = sel.closest('.f'), id = `combo-${++comboId}`;
    const input = document.createElement('input');
    Object.assign(input, { type: 'text', autocomplete: 'off', spellcheck: false, placeholder: 'اكتب للبحث…' });
    input.setAttribute('role', 'combobox');
    input.setAttribute('aria-autocomplete', 'list');
    input.setAttribute('aria-expanded', 'false');
    input.setAttribute('aria-controls', id);
    const list = document.createElement('ul');
    list.id = id;
    list.setAttribute('role', 'listbox');
    list.className = 'absolute z-30 inset-x-0 top-[calc(100%+6px)] max-h-64 overflow-y-auto p-1.5 bg-tile border border-solid border-line rounded-2xl shadow-card hidden [&.is-open]:block '
      + '[&>li]:py-2.5 [&>li]:px-3.5 [&>li]:rounded-xl [&>li]:cursor-pointer [&>li]:text-[1rem] [&>li]:text-heading [&>li:hover]:bg-chip [&>li.is-active]:bg-chip '
      + '[&>li[aria-selected=true]]:font-bold [&>li[aria-selected=true]]:text-hl [&>li.is-empty]:cursor-default [&>li.is-empty]:text-muted';
    sel.classList.add('hidden');
    sel.tabIndex = -1;
    box.insertBefore(input, sel);
    box.appendChild(list);
    let shown = [], active = -1;
    const sync = () => { input.value = sel.selectedIndex >= 0 ? sel.options[sel.selectedIndex].text : ''; input.disabled = sel.disabled; };
    const close = () => { list.classList.remove('is-open'); input.setAttribute('aria-expanded', 'false'); active = -1; };
    const mark = i => {
      active = i;
      [...list.children].forEach((li, k) => li.classList.toggle('is-active', k === i));
      if (list.children[i]) { list.children[i].scrollIntoView({ block: 'nearest' }); input.setAttribute('aria-activedescendant', list.children[i].id); }
    };
    const open = (q = '') => {
      const nq = norm(q);
      shown = [...sel.options].map((o, i) => ({ text: o.text, i })).filter(o => !nq || norm(o.text).includes(nq));
      list.innerHTML = shown.length
        ? shown.map((o, k) => `<li role="option" id="${id}-${k}" aria-selected="${o.i === sel.selectedIndex}">${o.text.replace(/[&<>]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[ch]))}</li>`).join('')
        : '<li class="is-empty" role="option" aria-disabled="true">لا توجد نتائج</li>';
      list.classList.add('is-open'); input.setAttribute('aria-expanded', 'true');
      mark(shown.length ? 0 : -1);
    };
    const pick = k => {
      const o = shown[k]; if (!o) return;
      sel.selectedIndex = o.i;
      sel.dispatchEvent(new Event('change', { bubbles: true }));
      sync(); close();
    };
    input.addEventListener('focus', () => { input.select(); open(); });
    input.addEventListener('click', () => { if (!list.classList.contains('is-open')) { input.select(); open(); } });   // typing then replaces the old choice
    input.addEventListener('input', () => open(input.value));
    input.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!list.classList.contains('is-open')) return open();
        if (shown.length) mark((active + (e.key === 'ArrowDown' ? 1 : -1) + shown.length) % shown.length);
      } else if (e.key === 'Enter') {
        if (list.classList.contains('is-open')) { e.preventDefault(); pick(active); }
      } else if (e.key === 'Escape') { sync(); close(); }
    });
    input.addEventListener('blur', () => setTimeout(() => { sync(); close(); }, 150));     // typed text that was not picked goes back to the choice
    list.addEventListener('mousedown', e => e.preventDefault());                             // keep the focus in the box while clicking a choice
    list.addEventListener('click', e => {
      e.preventDefault();                                                                    // the list sits in the <label>: do not let the click re-open it
      const li = e.target.closest('li[role=option]:not(.is-empty)'); if (li) pick([...list.children].indexOf(li));
    });
    sel.addEventListener('change', sync);
    sel.addEventListener('refresh', sync);
    sync();
  }

  /* ---------- Form → mail app ---------- */
  const form = $('#form2'), msg = $('#form2-msg');
  if (form) {
    // arriving from a procurement-page button (contact.html?topic=…): pick the service and start the message
    const topic = new URLSearchParams(location.search).get('topic');
    if (topic) {
      const service = [...form.elements.service.options].find(o => o.text.includes('إدارة المشتريات'));
      if (service) form.elements.service.value = service.value;
      if (!form.elements.message.value) form.elements.message.value = `أرغب في الاستفسار عن خدمة: ${topic}`;
    }
    // supply area → its sections (both from js/catalog.js); ?c=<area>&s=<section> pre-selects them
    const area = form.elements.area, section = form.elements.section, CAT = window.DOKAN_CATALOG;
    if (area && section && CAT) {
      CAT.categories.forEach(c => area.add(new Option(c.title, c.id)));
      const fillSections = () => {
        const c = CAT.categories.find(x => x.id === area.value);
        section.length = 0;
        section.add(new Option(c ? 'كل الأقسام' : 'اختر المجال أولًا', ''));
        if (c) c.products.forEach((p, i) => section.add(new Option(p.name, String(i + 1))));
        section.disabled = !c;
      };
      area.addEventListener('change', fillSections);
      const q = new URLSearchParams(location.search);
      if (CAT.categories.some(c => c.id === q.get('c'))) area.value = q.get('c');
      fillSections();
      if (q.get('s') && [...section.options].some(o => o.value === q.get('s'))) section.value = q.get('s');
      area.addEventListener('change', () => section.dispatchEvent(new Event('refresh')));   // new sections → the search box shows them
      $$('select[data-search]', form).forEach(searchable);
    }
    // arriving from a product card (contact.html?item=…): start the message with the product
    const item = new URLSearchParams(location.search).get('item');
    if (item && !form.elements.message.value) form.elements.message.value = `أرغب في طلب عرض سعر لـ: ${item}`;
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
        'نوع الخدمة: ' + data.get('service'),
        'مجال التوريد: ' + (area && area.value ? area.selectedOptions[0].text : '—'),
        'القسم: ' + (section && section.value ? section.selectedOptions[0].text : '—'), '', data.get('message') || ''].join('\n');
      location.href = 'mailto:' + ((window.SITE && SITE.emails[0]) || 'info@dakan-zaman.com') + '?subject=' + encodeURIComponent('طلب عرض سعر — ' + (data.get('company') || data.get('name'))) + '&body=' + encodeURIComponent(body);
      msg.dataset.state = 'ok';
      msg.textContent = 'شكرًا لكم! تم تجهيز طلبكم في تطبيق البريد لإرساله.';
    });
    $$('input', form).forEach(i => i.addEventListener('input', () => i.classList.remove('is-invalid')));
  }

  const year = $('#year'); if (year) year.textContent = ar(new Date().getFullYear());
})();
