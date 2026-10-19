/* Dokan Zaman — everything that lists the supply areas is built from js/catalog.js, so a new area shows up everywhere:
   • data-areas="grid"     the area photo cards (homepage «ماذا نورّد؟» and categories.html)
   • data-areas="ticker"   the homepage ticker (fills every <ul> inside it with the area names)
   • data-areas="count"    «٩ مجالات» — the number of areas with the right word
   • data-areas="number"   only the number («٩»), data-areas="word" only the word («مجالات»)
   Runs before main.js (both deferred), so the grid layout and reveal effects see the cards. */
(() => {
  const C = window.DOKAN_CATALOG;
  if (!C) return;
  const areas = C.categories, n = areas.length;
  const esc = s => String(s ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const ar = v => String(v).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
  // Arabic counting: ٣–١٠ مجالات · ١١ وأكثر مجالًا
  const word = n >= 3 && n <= 10 ? 'مجالات' : 'مجالًا';

  // area card: photo, number, name (the whole card opens the area), short description
  const card = (c, i, home) => `
          <article id="cat-${i + 1}" class="supply-card" data-reveal style="--d:${((i % 3) * 0.06).toFixed(2)}s">
            <div class="supply-card__media"><img src="${esc(c.image)}" alt="${esc(c.title)}" width="720" height="480" loading="lazy" decoding="async"></div>
            <span class="supply-card__num">${ar(i + 1)}</span>
            <h3><a href="category.html?c=${esc(c.id)}" class="supply-card__link">${esc(c.title)}</a></h3>
            <p${home ? ' style="font-weight: 20;"' : ''}>${esc(c.short || c.summary)}</p>
          </article>`;

  document.querySelectorAll('[data-areas="grid"]').forEach(g => {
    g.innerHTML = areas.map((c, i) => card(c, i, g.dataset.home !== undefined)).join('');
  });
  document.querySelectorAll('[data-areas="ticker"] ul').forEach(ul => {
    ul.innerHTML = areas.map(c => `<li>${esc(c.title)}</li>`).join('');
  });
  document.querySelectorAll('[data-areas="count"]').forEach(el => { el.textContent = `${ar(n)} ${word}`; });
  document.querySelectorAll('[data-areas="number"]').forEach(el => { el.textContent = ar(n); });
  document.querySelectorAll('[data-areas="word"]').forEach(el => { el.textContent = word; });
})();
