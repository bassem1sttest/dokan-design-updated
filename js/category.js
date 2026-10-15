/* Dokan Zaman — category.html: one page for every supply area, built from js/catalog.js.
   category.html?c=<id>  (unknown or missing id → the first area).
   Runs before main.js (both deferred), so the reveal / card effects in main.js see the rendered content. */
(() => {
  const C = window.DOKAN_CATALOG;
  const main = document.getElementById('cat-page');
  if (!C || !main) return;

  const esc = s => String(s ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const ar = n => String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
  const money = n => new Intl.NumberFormat('ar-EG').format(n);
  const ARROW = '<svg class="ico"><use href="#i-arrow"/></svg>';

  const cats = C.categories;
  const wanted = new URLSearchParams(location.search).get('c');
  const idx = Math.max(0, cats.findIndex(c => c.id === wanted));
  const cat = cats[idx];

  document.title = `${cat.title} | دكان زمان`;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.content = `${cat.title} من دكان زمان للتوريدات العمومية: ${cat.summary}`;

  // price: [from, to] → «من ٥٨ إلى ٩٢ ج.م»; one number → «٧٥ ج.م»; empty → «السعر عند الطلب»
  const price = p => {
    if (p.price === null || p.price === undefined || p.price === '') return 'السعر عند الطلب';
    const unit = p.unit ? ` <small>${esc(p.unit)}</small>` : '';
    if (Array.isArray(p.price)) return `من <span class="num">${money(p.price[0])}</span> إلى <span class="num">${money(p.price[1])}</span> ${esc(C.currency)}` + unit;
    return `<span class="num">${money(p.price)}</span> ${esc(C.currency)}` + unit;
  };

  // gallery arrows (shown on hover; hidden on phones, where a swipe or the dots move the photos) and dots
  const GAL_BTN = 'absolute z-[3] top-1/2 w-[38px] h-[38px] -mt-[19px] touch:w-8 touch:h-8 touch:-mt-4 xs:hidden p-0 grid place-items-center border-0 rounded-full cursor-pointer '
    + 'bg-white/[.94] text-heading shadow-[0_8px_20px_-10px_rgba(0,0,0,.45)] opacity-0 touch:opacity-90 group-hover:opacity-100 focus-visible:opacity-100 '
    + 'hover:bg-orange hover:text-white [transition:opacity_.25s,background-color_.25s,color_.25s,transform_.3s_cubic-bezier(.22,.8,.24,1)] '
    + '[&_.ico]:w-[18px] [&_.ico]:h-[18px] [&_.ico]:[stroke-width:2.2]';
  const GAL_DOTS = 'absolute z-[3] bottom-2.5 xs:bottom-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 xs:gap-[5px] py-[5px] px-[9px] xs:py-1 xs:px-[7px] rounded-full bg-[rgba(16,36,63,.5)] '
    + '[&>button]:w-[7px] [&>button]:h-[7px] [&>button]:p-0 [&>button]:border-0 [&>button]:rounded-full [&>button]:bg-white/55 [&>button]:cursor-pointer '
    + '[&>button]:[transition:width_.3s_cubic-bezier(.22,.8,.24,1),background-color_.3s] [&>button[aria-current]]:w-[18px] [&>button[aria-current]]:bg-white';

  // product photos: the first is the main one, the rest are reached with the arrows / dots / a swipe
  const photos = p => (p.images && p.images.length ? p.images : [p.image || cat.image]);
  const gallery = p => {
    const list = photos(p), many = list.length > 1;
    return `<div class="supply-card__media bg-white after:hidden" data-gal>
              <div class="flex h-full overflow-x-auto snap-x snap-mandatory scroll-smooth overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" data-gal-track>${list.map((src, i) => `<span class="flex-[0_0_100%] h-full overflow-hidden snap-start"><img src="${esc(src)}" alt="${esc(p.name)}${many ? ` — صورة ${ar(i + 1)}` : ''}" width="720" height="480" ${i ? 'loading="lazy" ' : ''}decoding="async" data-fallback="${esc(cat.image)}"></span>`).join('')}</div>${many ? `
              <button class="${GAL_BTN} right-2.5 [&_.ico]:rotate-180" type="button" aria-label="الصورة السابقة" data-gal-prev>${ARROW}</button>
              <button class="${GAL_BTN} left-2.5" type="button" aria-label="الصورة التالية" data-gal-next>${ARROW}</button>
              <div class="${GAL_DOTS}" data-gal-dots>${list.map((_, i) => `<button type="button" aria-label="صورة ${ar(i + 1)} من ${ar(list.length)}"${i ? '' : ' aria-current="true"'}></button>`).join('')}</div>` : ''}
            </div>`;
  };

  const products = cat.products.map((p, k) => `
          <article class="supply-card group" data-reveal style="--d:${((k % 3) * 0.06).toFixed(2)}s">
            ${gallery(p)}
            <span class="absolute z-[2] top-3.5 left-3.5 xs:top-2 xs:left-2 inline-flex items-baseline gap-1 py-[7px] px-3.5 xs:py-1 xs:px-2.5 rounded-full bg-orange text-white text-[1.05rem] xs:text-[.9rem] font-bold leading-[1.3] shadow-[0_10px_22px_-10px_rgba(243,114,33,.8)] [transition:transform_.4s_cubic-bezier(.22,.8,.24,1)] group-hover:-translate-y-1.5 [&_small]:text-[.78rem] [&_small]:font-medium [&_small]:text-white/90">${price(p)}</span>
            <h3>${esc(p.name)}</h3>
            <p>${esc(p.desc)}</p>
          </article>`).join('');

  const services = cat.services.map((s, k) => `
          <li class="tile card-fx" data-reveal style="--d:${(k * 0.05).toFixed(2)}s"><b>${ar(k + 1)}</b><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`).join('');

  main.innerHTML = `
    <section class="page-hero2">
      <div class="wrap grid grid-cols-[1.3fr_.7fr] sm:grid-cols-[1fr] gap-gap">
        <div class="tile tile--dark page-hero2__tile flex flex-col justify-center" data-reveal>
          <nav class="crumbs2" aria-label="مسار الصفحة"><a href="index.html">الرئيسية</a><span aria-hidden="true">/</span><a href="categories.html">مجالات التوريد</a><span aria-hidden="true">/</span><span aria-current="page">${esc(cat.title)}</span></nav>
          <h1>${esc(cat.title)}</h1>
          <p>${esc(cat.summary)}</p>
          <div class="row-btns mt-6 xs:[&>.pill]:flex-auto">
            <a href="contact.html" class="pill pill--orange pill--lg">اطلب عرض سعر ${ARROW}</a>
            <a href="#products" class="pill pill--lg border-white/35 text-white hover:bg-white hover:border-white hover:text-heading">المنتجات (${ar(cat.products.length)})</a>
          </div>
        </div>
        <figure class="tile tile--photo m-0 min-h-[300px] sm:min-h-[200px]" data-reveal style="--d:.06s">
          <img src="${esc(cat.image)}" alt="${esc(cat.title)}" width="720" height="480" decoding="async">
          <figcaption><b>${ar(idx + 1)}</b> من ${ar(cats.length)} مجالات توريد</figcaption>
        </figure>
      </div>
    </section>

    <section class="sec" id="products">
      <div class="wrap">
        <header class="sec__head sec__head--split" data-reveal>
          <div>
            <span class="tag"><i></i> المنتجات</span>
            <h2>منتجات .. <span class="hl">${esc(cat.title)}</span></h2>
          </div>
          <p class="sec__lead">${esc(C.priceNote)}</p>
        </header>
        <div class="grid grid-cols-3 lg:grid-cols-2 gap-8 xs:gap-y-7 xs:gap-x-3 xs:[&_.supply-card\\_\\_media]:mb-2.5 xs:[&_.supply-card\\_\\_media]:rounded-2xl xs:[&_h3]:text-[.98rem] xs:[&_h3]:leading-[1.5] xs:[&_h3]:px-[2px] xs:[&_article>p]:text-[.82rem] xs:[&_article>p]:leading-[1.6] xs:[&_article>p]:px-[2px]">${products}
        </div>
      </div>
    </section>

    <section class="sec sec--tint" id="services">
      <div class="wrap">
        <header class="sec__head" data-reveal>
          <span class="tag"><i></i> ماذا نقدم؟</span>
          <h2>ماذا نقدم في .. <span class="hl">${esc(cat.title)}</span></h2>
        </header>
        <ol class="grid grid-cols-[repeat(4,1fr)] lg:grid-cols-[1fr_1fr] xs:grid-cols-[1fr] gap-gap [&>li]:flex [&>li]:flex-col [&>li]:gap-1.5 [&_b]:w-9 [&_b]:h-9 [&_b]:grid [&_b]:place-items-center [&_b]:rounded-full [&_b]:bg-navy [&_b]:text-white [&_b]:font-bold [&_b]:mb-1.5 [&>li:hover_b]:bg-orange [&_h3]:text-[1.05rem] [&_p]:text-[.9rem] [&_p]:leading-[1.65] [&_p]:text-muted">${services}
        </ol>
      </div>
    </section>

    <section class="sec">
      <div class="wrap">
        <div class="tile tile--orange cta-tile" data-reveal>
          <div>
            <h2>محتاجين ${esc(cat.title)}؟</h2>
            <p>أرسلوا قائمة احتياجاتكم وسنعود إليكم بعرض سعر مناسب.</p>
          </div>
          <a href="contact.html" class="pill pill--line pill--lg">اطلب عرض سعر ${ARROW}</a>
        </div>
      </div>
    </section>`;

  // a missing product photo falls back to the area photo
  main.querySelectorAll('img[data-fallback]').forEach(img => img.addEventListener('error', () => {
    if (img.src.indexOf(img.dataset.fallback) === -1) img.src = img.dataset.fallback;
  }, { once: true }));

  // galleries: arrows, dots, swipe (native scroll-snap; RTL scrollLeft runs negative) and autoplay.
  // Autoplay: each gallery moves on its own, a little out of step with its neighbours; it pauses while the
  // card is hovered or touched, when it is off-screen or the tab is hidden, and never runs for reduced motion.
  const AUTOPLAY = 3200;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  main.querySelectorAll('[data-gal]').forEach((gal, gi) => {
    const track = gal.querySelector('[data-gal-track]'), slides = [...track.children];
    if (slides.length < 2) return;
    const dots = [...gal.querySelectorAll('[data-gal-dots] button')];
    const index = () => Math.round(Math.abs(track.scrollLeft) / track.clientWidth);
    let current = 0;
    const go = i => {
      const n = (i + slides.length) % slides.length;
      track.scrollTo({ left: slides[n].offsetLeft - slides[0].offsetLeft });
    };
    let raf = 0;
    track.addEventListener('scroll', () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => { current = index(); dots.forEach((d, k) => d.toggleAttribute('aria-current', k === current)); });
    }, { passive: true });
    // keep the same photo in place when the card is resized
    new ResizeObserver(() => { track.style.scrollBehavior = 'auto'; track.scrollLeft = slides[current].offsetLeft - slides[0].offsetLeft; track.style.scrollBehavior = ''; }).observe(track);
    gal.querySelector('[data-gal-prev]').addEventListener('click', () => go(index() - 1));
    gal.querySelector('[data-gal-next]').addEventListener('click', () => go(index() + 1));
    dots.forEach((d, k) => d.addEventListener('click', () => go(k)));

    if (reduceMotion) return;
    const card = gal.closest('article');
    let timer = 0, hovered = false, visible = false;
    const schedule = (wait = AUTOPLAY) => {
      clearTimeout(timer);
      if (hovered || !visible || document.hidden) return;
      timer = setTimeout(() => { go(index() + 1); schedule(); }, wait);
    };
    card.addEventListener('mouseenter', () => { hovered = true; schedule(); });
    card.addEventListener('mouseleave', () => { hovered = false; schedule(); });
    track.addEventListener('touchstart', () => { hovered = true; schedule(); }, { passive: true });
    track.addEventListener('touchend', () => { setTimeout(() => { hovered = false; schedule(); }, 2500); }, { passive: true });
    gal.addEventListener('click', () => schedule());          // a manual step restarts the countdown
    document.addEventListener('visibilitychange', () => schedule());
    new IntersectionObserver(([en]) => { visible = en.isIntersecting; schedule(AUTOPLAY + (gi % 3) * 700); }, { threshold: .5 }).observe(gal);
  });

})();
