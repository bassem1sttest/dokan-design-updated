/* Dokan Zaman — category.html: one page for every supply area, built from js/catalog.js.
   category.html?c=<id>  (unknown or missing id → the first area).
   Runs before main.js (both deferred), so the reveal / card effects in main.js see the rendered content. */
(() => {
  const C = window.DOKAN_CATALOG;
  const main = document.getElementById('cat-page');
  if (!C || !main) return;

  const esc = s => String(s ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const ar = n => String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
  const ARROW = '<svg class="ico"><use href="#i-arrow"/></svg>';
  const DOWNLOAD = '<svg class="ico"><use href="#i-download"/></svg>';

  const cats = C.categories;
  const wanted = new URLSearchParams(location.search).get('c');
  const idx = Math.max(0, cats.findIndex(c => c.id === wanted));
  const cat = cats[idx];

  document.title = `${cat.title} | دكان زمان`;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.content = `${cat.title} من دكان زمان للتوريدات العمومية: ${cat.summary}`;

  // one photo per section card (the first of its images)
  const photo = p => (p.images && p.images.length ? p.images[0] : p.image || cat.image);

  // each section card opens that section's products on products.html (the whole card is the link)
  const products = cat.products.map((p, k) => {
    const href = (p.items || []).length ? `products.html?c=${esc(cat.id)}&s=${k + 1}` : '';
    return `
          <article class="supply-card group" data-reveal style="--d:${((k % 3) * 0.06).toFixed(2)}s">
            <div class="supply-card__media bg-white after:hidden"><img src="${esc(photo(p))}" alt="${esc(p.name)}" width="720" height="480" loading="lazy" decoding="async" data-fallback="${esc(cat.image)}"></div>
            <h3>${href ? `<a href="${href}" class="supply-card__link">${esc(p.name)}</a>` : esc(p.name)}</h3>
            <p>${esc(p.desc)}</p>
          </article>`;
  }).join('');

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
            <a href="contact.html?c=${esc(cat.id)}" class="pill pill--orange pill--lg">اطلب عرض سعر ${ARROW}</a>
            ${cat.profile ? `<a href="${esc(cat.profile)}" download="${esc(`دكان زمان - ${cat.title}.pdf`)}" class="pill pill--lg border-orange/50 text-orange-300 hover:bg-orange hover:border-orange hover:text-white [&_.ico]:[stroke-width:2.1] hover:[&_.ico]:translate-y-[2px]"><span>ملف تعريف المجال</span>${DOWNLOAD}</a>` : ''}
          </div>
        </div>
        <figure class="tile tile--photo m-0 min-h-[300px] sm:min-h-[200px]" data-reveal style="--d:.06s">
          <img src="${esc(cat.image)}" alt="${esc(cat.title)}" width="720" height="480" decoding="async">
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
          <p class="sec__lead">اختاروا القسم لعرض منتجاته وسعر كل منتج.</p>
        </header>
        <div class="even-grid xs:[&_h3]:text-[.95rem] xs:[&_h3]:leading-[1.5] xs:[&_h3]:px-[2px] xs:[&_article>p]:text-[.9rem] xs:[&_article>p]:leading-[1.6] xs:[&_article>p]:px-[2px] xs:[&_.supply-card\\_\\_media]:mb-2.5 xs:[&_.supply-card\\_\\_media]:rounded-2xl">${products}
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

})();
