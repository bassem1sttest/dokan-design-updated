/* Dokan Zaman — product pages, built from the `items` of each section in js/catalog.js.
   • products.html?c=<area>&s=<section no.>              the products of one section   (e.g. ?c=cleaning&s=1 → «المنظفات»)
   • product-details.html?c=<area>&s=<section no.>&p=<item no.>   one product: its photos, details and similar products
   Unknown numbers fall back to the first area / section / product. Runs before main.js (both deferred). */
(() => {
  const C = window.DOKAN_CATALOG;
  const listPage = document.getElementById('prod-page'), itemPage = document.getElementById('item-page');
  const main = listPage || itemPage;
  if (!C || !main) return;

  const esc = s => String(s ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const money = n => new Intl.NumberFormat('ar-EG').format(n);
  const ARROW = '<svg class="ico"><use href="#i-arrow"/></svg>';

  // ---- which area / section / product
  const q = new URLSearchParams(location.search);
  const num = k => (parseInt(q.get(k), 10) || 1) - 1;
  const cat = C.categories[Math.max(0, C.categories.findIndex(c => c.id === q.get('c')))];
  const has = s => s && (s.items || []).length;
  let k = num('s');
  if (!has(cat.products[k])) k = cat.products.findIndex(has);
  if (k < 0) return;
  const sec = cat.products[k];

  // ---- shared pieces
  const secPics = s => (s.images && s.images.length ? s.images : [cat.image]);
  // a product's photos: its own, or else the section's photos (starting at a different one for each product)
  const photosOf = (s, it, i) => {
    if (it.images && it.images.length) return it.images;
    if (it.image) return [it.image];
    const pics = secPics(s);
    return pics.map((_, j) => pics[(i + j) % pics.length]);
  };
  const price = it => (it.price === null || it.price === undefined || it.price === '')
    ? 'السعر عند الطلب'
    : `<span class="num">${money(it.price)}</span> ${esc(C.currency)}`;
  const itemUrl = (sk, i) => `product-details.html?c=${esc(cat.id)}&s=${sk + 1}&p=${i + 1}`;
  const sectionUrl = sk => `products.html?c=${esc(cat.id)}&s=${sk + 1}`;

  // product card: photo, then name, description and price under it; the whole card opens the product
  const card = (sk, i, n) => {
    const s = cat.products[sk], it = s.items[i];
    return `
          <article class="supply-card group" data-reveal style="--d:${((n % 4) * 0.05).toFixed(2)}s">
            <div class="supply-card__media aspect-square bg-white after:hidden"><img src="${esc(photosOf(s, it, i)[0])}" alt="${esc(it.name)}" width="480" height="480" loading="lazy" decoding="async" data-fallback="${esc(cat.image)}"></div>
            <h3><a href="${itemUrl(sk, i)}" class="supply-card__link">${esc(it.name)}</a></h3>
            <p class="line-clamp-2">${esc(it.desc)}</p>
            <p class="!mt-2 !text-[1.05rem] font-bold !text-hl">${price(it)}${it.unit ? ` <small class="text-[.8rem] font-medium text-muted">${esc(it.unit)}</small>` : ''}</p>
          </article>`;
  };
  const GRID = 'grid grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-x-6 gap-y-9 xs:gap-x-3 xs:gap-y-7 [&_h3]:text-[1.02rem] [&_h3]:leading-[1.55] xs:[&_h3]:text-[.92rem] '
    + 'xs:[&_p]:text-[.82rem] xs:[&_.supply-card\\_\\_media]:rounded-2xl xs:[&_.supply-card\\_\\_media]:mb-2.5';
  const crumbsTo = last => `<a href="index.html">الرئيسية</a><span aria-hidden="true">/</span><a href="categories.html">مجالات التوريد</a><span aria-hidden="true">/</span><a href="category.html?c=${esc(cat.id)}">${esc(cat.title)}</a><span aria-hidden="true">/</span>${last}`;
  const CTA = `
    <section class="sec pt-0">
      <div class="wrap">
        <div class="tile tile--orange cta-tile" data-reveal>
          <div>
            <h2>لم تجدوا ما تبحثون عنه؟</h2>
            <p>أرسلوا قائمة احتياجاتكم .. ونوفرها لكم بعرض سعر مناسب.</p>
          </div>
          <a href="contact.html" class="pill pill--line pill--lg">اطلب عرض سعر ${ARROW}</a>
        </div>
      </div>
    </section>`;
  const meta = document.querySelector('meta[name="description"]');

  if (listPage) {
    /* ================= one section ================= */
    document.title = `${sec.name} — ${cat.title} | دكان زمان`;
    if (meta) meta.content = `${sec.name} من دكان زمان للتوريدات العمومية (${cat.title}): ${sec.desc}`;
    main.innerHTML = `
    <section class="page-hero2">
      <div class="wrap">
        <div class="tile tile--dark page-hero2__tile" data-reveal>
          <nav class="crumbs2" aria-label="مسار الصفحة">${crumbsTo(`<span aria-current="page">${esc(sec.name)}</span>`)}</nav>
          <h1>${esc(sec.name)}</h1>
          <p>${esc(sec.desc)}</p>
          <div class="row-btns">
            <a href="contact.html" class="pill pill--orange pill--lg">اطلب عرض سعر ${ARROW}</a>
            <a href="category.html?c=${esc(cat.id)}" class="pill pill--lg border-white/35 text-white hover:bg-white hover:border-white hover:text-heading">أقسام ${esc(cat.title)}</a>
          </div>
        </div>
      </div>
    </section>

    <section class="sec">
      <div class="wrap">
        <div class="${GRID}">${sec.items.map((_, i) => card(k, i, i)).join('')}
        </div>
        <p class="mt-[clamp(32px,4vw,48px)] text-center text-[.92rem] text-muted">${esc(C.priceNote)}</p>
      </div>
    </section>
${CTA}`;
  } else {
    /* ================= one product ================= */
    let i = num('p');
    if (!sec.items[i]) i = 0;
    const it = sec.items[i], pics = photosOf(sec, it, i);
    document.title = `${it.name} | دكان زمان`;
    if (meta) meta.content = `${it.name} — ${it.desc} من دكان زمان للتوريدات العمومية.`;
    const S = window.SITE;
    const wa = S && S.whatsapp ? `https://wa.me/${S.whatsapp.number}?text=${encodeURIComponent(`مرحبًا دكان زمان، أريد طلب: ${it.name} (${cat.title})`)}` : '';

    // similar products: the rest of this section first, then other sections of the same area — up to 4
    const similar = [];
    sec.items.forEach((_, j) => { if (j !== i) similar.push([k, j]); });
    cat.products.forEach((s, sk) => { if (sk !== k && has(s)) s.items.forEach((_, j) => similar.push([sk, j])); });

    const THUMB = 'w-20 h-20 xs:w-16 xs:h-16 flex-none p-1.5 rounded-2xl bg-white border-2 border-solid border-line cursor-pointer transition-colors hover:border-orange/60 [&.is-on]:border-orange';
    main.innerHTML = `
    <section class="page-hero2 pb-sec">
      <div class="wrap">
        <nav class="flex flex-wrap items-center gap-2 mb-7 text-[.9rem] text-muted [&_a]:text-hl [&_a]:font-semibold [&_a:hover]:underline" aria-label="مسار الصفحة">${crumbsTo(`<a href="${sectionUrl(k)}">${esc(sec.name)}</a><span aria-hidden="true">/</span><span aria-current="page">${esc(it.name)}</span>`)}</nav>
        <div class="grid grid-cols-[1.05fr_.95fr] md:grid-cols-1 gap-[clamp(24px,4vw,56px)] items-start">
          <div data-reveal>
            <div class="tile !p-0 aspect-square bg-white">
              <img class="w-full h-full object-contain p-[clamp(16px,3vw,36px)]" src="${esc(pics[0])}" alt="${esc(it.name)}" width="720" height="720" decoding="async" data-main data-fallback="${esc(cat.image)}">
            </div>
            ${pics.length > 1 ? `<div class="flex gap-3 mt-3 overflow-x-auto pb-1" aria-label="صور المنتج">${pics.map((src, j) => `<button type="button" class="${THUMB}${j ? '' : ' is-on'}" data-thumb="${esc(src)}" aria-label="صورة ${j + 1}"${j ? '' : ' aria-current="true"'}><img class="w-full h-full object-contain" src="${esc(src)}" alt="" loading="lazy"></button>`).join('')}</div>` : ''}
          </div>
          <div class="flex flex-col" data-reveal style="--d:.06s">
            <a href="${sectionUrl(k)}" class="tag hover:bg-navy hover:text-white transition-colors"><i></i> ${esc(sec.name)}</a>
            <h1 class="text-[length:clamp(1.8rem,1.2rem+2vw,2.6rem)] font-bold leading-[1.3] tracking-[-.02em]">${esc(it.name)}</h1>
            <p class="mt-4 text-muted text-[1.05rem] leading-[1.85]">${esc(it.desc)}</p>
            <div class="flex items-baseline gap-2 mt-6">
              <strong class="text-[length:clamp(1.8rem,1.3rem+1.4vw,2.4rem)] font-bold text-hl leading-none">${price(it)}</strong>
              ${it.unit ? `<span class="text-muted font-medium">${esc(it.unit)}</span>` : ''}
            </div>
            <p class="mt-2 text-[.85rem] text-muted">${esc(C.priceNote)}</p>
            <dl class="tile !p-0 mt-6 [&>div]:flex [&>div]:items-center [&>div]:justify-between [&>div]:gap-4 [&>div]:py-3.5 [&>div]:px-5 [&>div+div]:[border-top:1px_solid_#E0DED9]
                       [&_dt]:text-muted [&_dt]:text-[.92rem] [&_dd]:m-0 [&_dd]:font-semibold [&_dd]:text-heading [&_dd]:text-end [&_dd_a]:text-hl [&_dd_a:hover]:underline">
              <div><dt>المجال</dt><dd><a href="category.html?c=${esc(cat.id)}">${esc(cat.title)}</a></dd></div>
              <div><dt>القسم</dt><dd><a href="${sectionUrl(k)}">${esc(sec.name)}</a></dd></div>
              ${it.unit ? `<div><dt>الوحدة</dt><dd>${esc(it.unit.replace(/^لل/, '').replace(/^ل/, ''))}</dd></div>` : ''}
              <div><dt>التوريد</dt><dd>حسب الكمية المطلوبة</dd></div>
            </dl>
            <div class="row-btns mt-7">
              <a href="contact.html?item=${encodeURIComponent(`${it.name} — ${cat.title}`)}" class="pill pill--orange pill--lg">اطلب هذا المنتج ${ARROW}</a>
              ${wa ? `<a href="${wa}" target="_blank" rel="noopener" class="pill pill--lg bg-wa text-white hover:bg-[#1EBE5A] [&_.ico]:w-5 [&_.ico]:h-5 [&_.ico]:[stroke:none]">اطلب عبر واتساب <svg class="ico"><use href="#i-whatsapp"/></svg></a>` : ''}
            </div>
          </div>
        </div>
      </div>
    </section>

    ${similar.length ? `<section class="sec sec--tint">
      <div class="wrap">
        <header class="sec__head sec__head--split" data-reveal>
          <div>
            <span class="tag"><i></i> منتجات مشابهة</span>
            <h2>قد يناسبكم <span class="hl">أيضًا</span></h2>
          </div>
          <a href="${sectionUrl(k)}" class="pill pill--dark pill--lg">كل منتجات ${esc(sec.name)} ${ARROW}</a>
        </header>
        <div class="${GRID}">${similar.slice(0, 4).map(([sk, j], n) => card(sk, j, n)).join('')}
        </div>
      </div>
    </section>` : ''}
${CTA}`;

    // photo thumbnails switch the large photo
    const big = main.querySelector('[data-main]'), thumbs = [...main.querySelectorAll('[data-thumb]')];
    thumbs.forEach(b => b.addEventListener('click', () => {
      big.src = b.dataset.thumb;
      thumbs.forEach(t => { const on = t === b; t.classList.toggle('is-on', on); t.toggleAttribute('aria-current', on); });
    }));
  }

  // a missing photo falls back to the area photo
  main.querySelectorAll('img[data-fallback]').forEach(img => img.addEventListener('error', () => {
    if (img.src.indexOf(img.dataset.fallback) === -1) img.src = img.dataset.fallback;
  }, { once: true }));
})();
