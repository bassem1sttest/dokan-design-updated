/* =========================================================
   دكان زمان — إعدادات Tailwind CSS (ملف واحد لكل الصفحات)
   ---------------------------------------------------------
   ألوان الموقع، الخط، المسافات، مقاسات الشاشات، والمكوّنات المشتركة.
   الصفحات تحمّل ملف CSS جاهز: css/tailwind.css — يُبنى من هذا الملف ومن الكلاسات المكتوبة في الصفحات والسكريبتات.
   بعد تعديل هذا الملف أو إضافة كلاسات Tailwind جديدة: شغّل  npm run build:css  (مرة واحدة: npm install).

   مقاسات الشاشات «من الأكبر للأصغر» (نفس نقاط التصميم القديمة):
     tab:  ≤1240px     lg: ≤1080px     md: ≤960px     sm: ≤760px     xs: ≤600px     xxs: ≤560px
   مثال: class="grid-cols-3 lg:grid-cols-2 xs:grid-cols-1"

   المكوّنات المشتركة (آخر الملف) تُكتب مرة واحدة هنا وتُستخدم في كل الصفحات:
     wrap · tile (+ tile--dark / tile--orange / tile--photo) · pill (+ pill--orange / pill--dark / pill--line / pill--lg / pill--block)
     tag · sec · sec__head · sec__lead · big · ticks · row-btns · page-hero2 · crumbs2 · cta-tile
     supply-card (كارت الصورة) · card-fx (حركة الكروت) · f (حقل النموذج) · icon-btn · ico · num · hl
   وأي كلاس Tailwind على العنصر نفسه يغلب المكوّن (مثال: class="tile bg-orange").
   ========================================================= */
(() => {
const EASE = 'cubic-bezier(.22, .8, .24, 1)';
const SHADOW = '0 18px 40px -24px rgba(0, 0, 0, .3)';
const XS = '@media (max-width: 600px)';
const TOUCH = '@media (hover: none)';

const sharedComponents = ({ addComponents }) => {
  /* ---------- helpers ---------- */
  addComponents({
    '.sprite': { '@apply absolute w-0 h-0 overflow-hidden': {} },
    '.ico': { width: '1.25em', height: '1.25em', flex: 'none', fill: 'none', stroke: 'currentColor', strokeWidth: '1.9', strokeLinecap: 'round', strokeLinejoin: 'round' },
    '.num': { '@apply inline-block': {}, unicodeBidi: 'isolate' },
    '.wrap': { '@apply mx-auto': {}, width: 'min(1200px, 100% - 32px)' },
    '.hl': { '@apply text-hl': {} },
    // card grid whose rows split evenly — main.js sets --cols from the number of cards and the screen
    // (at most 4 / 3 on ≤1080px / 2 on ≤760px, or data-max="5,3,2"); a shorter last row is centred,
    // or with even-grid--fill it stretches to the full width. Same gaps for every grid (--gx / --gy).
    '.even-grid': { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', columnGap: 'var(--gx)', rowGap: 'var(--gy)', '--gx': '28px', '--gy': '36px', '--cols': '3' },
    '.even-grid > *': { flex: '0 0 calc((100% - (var(--cols) - 1) * var(--gx)) / var(--cols) - .1px)', minWidth: '0' },
    '.even-grid--fill > *': { flexGrow: '1' },
  });

  /* ---------- tags / pills / buttons ---------- */
  addComponents({
    '.tag': { '@apply inline-flex items-center gap-2.5 text-[.9rem] font-semibold tracking-[.01em] text-heading bg-chip py-1.5 px-3.5 rounded-full mb-[18px] w-fit': {} },
    '.tag i': { '@apply w-2 h-2 rounded-[2px] bg-orange': {}, transform: 'rotate(45deg)' },
    '.tag--light': { '@apply text-white bg-white/[.08]': {} },
    '.tag--dark': { '@apply text-white bg-black/10': {} },
    '.tag--dark i': { '@apply bg-white': {} },

    '.pill': {
      '@apply inline-flex items-center justify-center gap-2.5 py-[11px] px-5 rounded-full font-semibold text-[.98rem] leading-[1.2] cursor-pointer': {},
      border: '2px solid transparent',
      transition: `transform .3s ${EASE}, background-color .25s, color .25s, border-color .25s`,
    },
    '.pill .ico': { transition: `transform .3s ${EASE}` },
    '.pill:hover': { transform: 'translateY(-2px)' },
    '.pill:hover .ico': { transform: 'translateX(-4px)' },
    '.pill:active': { transform: 'scale(.97)' },
    '.pill--orange': { '@apply bg-orange text-white': {} },
    '.pill--orange:hover': { '@apply bg-orange-600 text-white': {} },
    '.pill--dark': { '@apply bg-navy text-white': {} },
    '.pill--dark:hover': { '@apply bg-orange text-white': {} },
    '.pill--line': { '@apply border-navy text-navy': {} },
    '.pill--line:hover': { '@apply bg-navy border-navy text-white': {} },
    '.pill--lg': { '@apply py-[15px] px-7 text-[1.05rem]': {} },
    '.pill--block': { '@apply w-full': {} },

    '.icon-btn': {
      '@apply w-11 h-11 rounded-full inline-grid place-items-center border-0 bg-chip text-heading cursor-pointer': {},
      transition: `background-color .25s, color .25s, transform .3s ${EASE}`,
    },
    '.icon-btn:hover': { '@apply bg-navy text-white': {} },
    '.icon-btn:active': { transform: 'scale(.92)' },
    '.icon-btn .ico': { '@apply w-5 h-5': {}, gridArea: '1 / 1' },
  });
  addComponents({ [TOUCH]: { '.pill:hover': { transform: 'none' } } });
  addComponents({ [XS]: { '.even-grid': { '--gx': '12px', '--gy': '26px' } } });

  /* ---------- tiles (cards) ---------- */
  addComponents({
    '.tile': { '@apply relative overflow-hidden bg-tile rounded-tile p-pad': {}, border: '1px solid #E0DED9' },
    '.tile--dark': { '@apply bg-navy border-transparent text-white/85': {}, '--spot': 'rgba(243,114,33,.26)' },
    '.tile--dark h2, .tile--dark h3': { '@apply text-white': {} },
    '.tile--orange': { '@apply bg-orange border-transparent text-white': {}, '--spot': 'rgba(255,255,255,.34)' },
    '.tile--orange h2, .tile--orange h3, .tile--orange .ico': { '@apply text-white': {} },
    // photo tiles stay edge-to-edge
    '.tile.tile--photo': { '@apply p-0': {} },
    '.tile--photo img': { '@apply absolute inset-0 w-full h-full object-cover': {}, transition: `transform 1.2s ${EASE}` },
    '.tile--photo:hover img': { transform: 'scale(1.04)' },
    '.tile--photo figcaption': { '@apply absolute right-4 bottom-4 left-4 flex items-center gap-3 py-3 px-4 rounded-[18px] bg-[rgba(16,36,63,.85)] text-white font-semibold': {} },
    '.tile--photo figcaption b': { '@apply text-[2rem] leading-none text-orange': {} },

    '.big': { '@apply block text-[length:clamp(2.6rem,1.6rem+3vw,4.2rem)] font-bold leading-[1.05] tracking-[-.03em] text-heading': {} },
    '.tile--orange .big': { '@apply text-white': {} },
    '.big--sm': { '@apply text-[length:clamp(2rem,1.4rem+2vw,2.8rem)]': {} },

    // outline button on an orange card: white text, border and arrow; navy on hover
    '.tile--orange .pill--line': { '@apply border-white text-white': {} },
    '.tile--orange .pill--line:hover': { '@apply bg-navy border-navy text-white': {} },
    '.tile--orange .pill--line .ico': { color: 'inherit' },
  });
  addComponents({ [XS]: { '.tile': { borderRadius: '24px' } } });

  /* ---------- card motion: lift + shadow + orange border + a spotlight that follows the cursor (main.js sets --mx / --my) ---------- */
  addComponents({
    '.card-fx.card-fx': {
      '@apply relative isolate p-pad': {},
      transition: `transform .4s ${EASE}, box-shadow .4s, border-color .3s, background-color .3s, color .3s, opacity .4s`,
    },
    '.card-fx.card-fx::before': {
      content: '""', '@apply absolute inset-0 pointer-events-none opacity-0': {}, borderRadius: 'inherit', zIndex: '-1',
      background: 'radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), var(--spot, rgba(243,114,33,.16)), transparent 45%)',
      transition: 'opacity .3s',
    },
    '.card-fx.card-fx:hover': { transform: 'translateY(-6px)', borderColor: 'rgba(243,114,33,.45)', boxShadow: SHADOW },
    '.card-fx.card-fx:hover::before': { opacity: '1' },
  });
  addComponents({ [TOUCH]: { '.card-fx.card-fx:hover': { transform: 'none', boxShadow: 'none' } } });

  /* ---------- sections ---------- */
  addComponents({
    '.sec': { paddingBlock: 'var(--sec-y)' },
    '.sec--tint': { '@apply bg-tint': {} },
    '.sec__head': { '@apply max-w-[760px]': {}, marginBottom: 'clamp(28px, 4vw, 44px)' },
    '.sec__head h2': { '@apply text-[length:clamp(1.7rem,1.1rem+2.1vw,2.6rem)] font-bold leading-[1.32] tracking-[-.03em]': {} },
    '.sec__head--split': { '@apply max-w-none flex justify-between items-end gap-y-6 gap-x-12 flex-wrap': {} },
    '.sec__lead': { '@apply text-muted text-[1.08rem] max-w-[52ch] mt-3.5': {} },
    '.sec__head--split .sec__lead': { '@apply mt-0': {} },

    '.ticks li': { '@apply relative ps-8 mb-2.5': {} },
    '.ticks li::before': {
      content: '""', '@apply absolute right-0 top-[.4em] w-5 h-5 rounded-md': {},
      background: `#F37221 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230B0B0C' stroke-width='3.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E") center / 12px no-repeat`,
    },

    '.row-btns': { '@apply flex flex-wrap gap-2.5 mt-[30px]': {} },

    // inner pages: the dark title tile under the navbar
    '.page-hero2': { padding: '136px 0 0' },          // clears the fixed top bar + navbar
    '.page-hero2__tile': { '@apply text-white/[.78]': {} },
    '.page-hero2__tile::before': {
      content: '""', '@apply absolute w-[60%] aspect-square rounded-full pointer-events-none': {}, inset: 'auto auto -60% -10%',
      background: 'radial-gradient(closest-side, rgba(243,114,33,.4), transparent)',
    },
    '.page-hero2__tile > *': { '@apply relative': {} },
    '.page-hero2__tile h1': { '@apply text-white text-[length:clamp(1.9rem,1.2rem+2.6vw,3.1rem)] font-bold leading-[1.25] tracking-[-.03em]': {} },
    '.page-hero2__tile p': { '@apply max-w-[60ch] mt-2 text-[1.08rem]': {} },
    '.page-hero2__tile .row-btns': { '@apply mt-6': {} },
    '.crumbs2': { '@apply flex items-center gap-2 text-[.9rem] mb-3.5 text-white/60': {} },
    '.crumbs2 a': { '@apply text-orange-300 font-semibold': {} },
    '.crumbs2 a:hover': { '@apply underline': {} },

    // the orange call-to-action card at the end of the pages
    '.cta-tile': { '@apply flex items-center justify-between gap-y-[18px] gap-x-8 flex-wrap': {} },
    '.cta-tile h2': { '@apply text-[length:clamp(1.3rem,1rem+1.3vw,1.9rem)] font-bold': {} },
    '.cta-tile p': { '@apply text-white': {} },
  });
  addComponents({
    [XS]: {
      '.row-btns .pill': { flex: '1 1 100%' },        // buttons fill the row on phones
      '.page-hero2': { paddingTop: '120px' },
      '.cta-tile .pill': { '@apply w-full': {} },
    },
  });

  /* ---------- photo card: homepage "what we supply", categories page, products ---------- */
  addComponents({
    '.supply-card': { '@apply relative': {}, scrollMarginTop: '110px' },
    '.supply-card__media': {
      '@apply relative isolate overflow-hidden aspect-[3/2] mb-4 rounded-3xl bg-chip': {}, border: '1px solid #E0DED9',
      transition: `transform .4s ${EASE}, box-shadow .4s, border-color .3s`,
    },
    '.supply-card__media img': { '@apply w-full h-full object-cover': {}, transition: `transform .8s ${EASE}` },
    // top shade keeps the number readable; the orange glow follows the cursor (main.js sets --mx / --my)
    '.supply-card__media::after': { content: '""', '@apply absolute inset-0 pointer-events-none': {}, background: 'linear-gradient(180deg, rgba(0,0,0,.28), transparent 40%)' },
    '.supply-card__media::before': {
      content: '""', '@apply absolute inset-0 z-[1] pointer-events-none opacity-0': {},
      background: 'radial-gradient(300px circle at var(--mx, 50%) var(--my, 50%), rgba(243,114,33,.28), transparent 50%)', transition: 'opacity .3s',
    },
    '.supply-card:hover .supply-card__media': { transform: 'translateY(-6px)', boxShadow: SHADOW, borderColor: 'rgba(243,114,33,.45)' },
    '.supply-card:hover .supply-card__media::before': { opacity: '1' },
    '.supply-card:hover .supply-card__media img': { transform: 'scale(1.07)' },
    '.supply-card:target .supply-card__media': { border: '3px solid #F37221' },
    '.supply-card__num': {
      '@apply absolute z-[2] top-3.5 right-3.5 py-0.5 px-2.5 rounded-full bg-black/60 text-white text-[.875rem] font-bold leading-[1.6]': {},
      transition: `transform .4s ${EASE}`,
    },
    '.supply-card:hover .supply-card__num': { transform: 'translateY(-6px)' },
    '.supply-card h3': { '@apply text-[1.2rem] px-1': {}, transition: 'color .25s' },
    '.supply-card:hover h3': { '@apply text-hl': {} },
    '.supply-card p': { '@apply text-[.97rem] leading-[1.75] text-muted px-1 mt-1.5': {} },
    // the whole card is one link
    '.supply-card__link': { color: 'inherit' },
    '.supply-card__link::after': { content: '""', '@apply absolute inset-0 z-[3] rounded-3xl': {} },
    '.supply-card__link:focus-visible': { outline: 'none' },
    '.supply-card:has(.supply-card__link:focus-visible) .supply-card__media': { outline: '3px solid #F37221', outlineOffset: '3px' },
  });
  addComponents({ [TOUCH]: { '.supply-card:hover .supply-card__media, .supply-card:hover .supply-card__num': { transform: 'none', boxShadow: 'none' } } });

  /* ---------- service row (procurement page): text beside a soft panel with white cards floating over it ----------
     <article class="svc">                      add svc--flip to put the panel on the right
       <div class="svc__text"> tag · h2 · p · button </div>
       <div class="svc__panel bg-…"><span class="svc__deco"></span> …float-card… </div>
     svc__list / svc__card is the zig-zag stack of cards. */
  addComponents({
    '.svc': { '@apply grid grid-cols-2 items-center': {}, gap: 'clamp(32px, 6vw, 96px)' },
    '.svc--flip .svc__panel': { order: '-1' },
    '.svc__tag': { '@apply inline-flex items-center gap-2 py-1.5 px-3.5 rounded-xl text-[.9rem] font-bold mb-5 text-hl bg-orange/[.12]': {} },
    '.svc__tag .ico': { '@apply w-4 h-4': {}, strokeWidth: '2.2' },
    '.svc__text h2': { '@apply text-[length:clamp(1.9rem,1.2rem+2.4vw,2.9rem)] font-bold leading-[1.3] tracking-[-.03em]': {} },
    '.svc__text p': { '@apply mt-4 text-muted text-[1.02rem] leading-[1.85] max-w-[44ch]': {} },
    '.svc__text .pill': { '@apply mt-7': {} },
    // default tone light orange; another site tone goes on the element (bg-navy/[.09], bg-chip)
    '.svc__panel': { '@apply relative flex flex-col justify-center min-h-[420px] rounded-[32px] bg-orange/[.12]': {}, padding: 'clamp(24px, 4vw, 52px)' },
    // two soft rings drawn on the panel (they stay inside its rounded corners; the cards may stick out)
    '.svc__deco': { '@apply absolute inset-0 overflow-hidden pointer-events-none': {}, borderRadius: 'inherit' },
    '.svc__deco::before, .svc__deco::after': { content: '""', '@apply absolute aspect-square rounded-full': {}, border: '1.5px solid rgba(255,255,255,.95)' },
    '.svc__deco::before': { width: '120%', right: '-55%', bottom: '-75%' },
    '.svc__deco::after': { width: '70%', left: '-28%', top: '-32%' },
    // a white card floating over the panel
    '.float-card': {
      '@apply relative z-[1] bg-white rounded-2xl': {},
      boxShadow: '0 18px 40px -22px rgba(16,36,63,.35)', transition: `transform .4s ${EASE}, box-shadow .4s`,
    },
    '.float-card:hover': { boxShadow: '0 22px 46px -20px rgba(16,36,63,.42)' },
    // zig-zag stack: cards stick out toward the gap between the columns, and on wide screens toward the outer edge too
    '.svc__list': { '@apply relative z-[1] flex flex-col gap-4': {} },
    '.svc__card': { '@apply flex items-center gap-3 w-fit max-w-[92%] py-3.5 ps-3.5 pe-5': {} },
    '.svc__card:hover': { transform: 'translateY(-4px)' },
    '.svc__card:nth-child(odd)': { alignSelf: 'flex-start', marginInlineStart: '-48px' },
    '.svc__card:nth-child(even)': { alignSelf: 'flex-end' },
    '.svc__card:nth-child(2)': { borderBottom: '4px solid #1A3659' },
    '.svc__card b': { '@apply grid place-items-center w-10 h-10 flex-none rounded-full text-[.95rem] text-hl bg-orange/[.12]': {} },
    '.svc__card span': { '@apply text-[.95rem] font-medium leading-[1.6] text-heading': {} },
  });
  addComponents({
    '@media (min-width: 1280px)': { '.svc__card:nth-child(even)': { marginInlineEnd: '-48px' } },
    '@media (max-width: 960px)': {
      '.svc': { gridTemplateColumns: '1fr' },
      '.svc--flip .svc__panel': { order: '0' },
      '.svc__panel': { minHeight: '0' },
      '.svc__list .svc__card:nth-child(n)': { margin: '0' },
    },
    [XS]: { '.svc__card': { maxWidth: '100%' } },
  });
  addComponents({ [TOUCH]: { '.svc__card:hover': { transform: 'none' } } });

  /* ---------- form field with a floating label (contact page) ---------- */
  addComponents({
    '.f': { '@apply relative block': {} },
    '.f input, .f select, .f textarea': {
      '@apply w-full pt-6 px-4 pb-2 rounded-2xl bg-tint text-heading appearance-none resize-y': {}, border: '2px solid #E0DED9', transition: 'border-color .25s',
    },
    '.f textarea': { '@apply pt-[30px] flex-1 min-h-[120px]': {} },
    '.f > span': {
      '@apply absolute right-[18px] top-1/2 text-muted pointer-events-none text-[1rem] origin-top-right': {}, transform: 'translateY(-50%)',
      transition: `transform .25s ${EASE}, top .25s ${EASE}, color .25s`,
    },
    '.f textarea + span': { '@apply top-[26px]': {} },
    '.f input:focus, .f select:focus, .f textarea:focus': { '@apply border-orange': {}, outline: 'none' },
    '.f input:focus + span, .f input:not(:placeholder-shown) + span, .f textarea:focus + span, .f textarea:not(:placeholder-shown) + span, .f--select > span': {
      '@apply top-2 text-hl': {}, transform: 'scale(.78)',
    },
    '.f--select::after': {
      content: '""', '@apply absolute left-[18px] top-1/2 w-2 h-2 -mt-0.5 pointer-events-none': {},
      borderLeft: '2px solid #55555A', borderBottom: '2px solid #55555A', transform: 'translateY(-50%) rotate(-45deg)',
    },
    '.f .is-invalid': { borderColor: '#E04848' },
    '.f select:disabled, .f input:disabled': { '@apply opacity-60 cursor-not-allowed': {} },
  });
};

tailwind.config = {
  corePlugins: { preflight: false },          // the site keeps its own small base reset (css/style.css)
  theme: {
    screens: {
      tab: { max: '1240px' },
      lg: { max: '1080px' },
      md: { max: '960px' },
      sm: { max: '760px' },
      xs: { max: '600px' },
      xxs: { max: '560px' },
      touch: { raw: '(hover: none)' },
      motionless: { raw: '(prefers-reduced-motion: reduce)' },
    },
    extend: {
      colors: {
        orange: { DEFAULT: '#F37221', 600: '#DC6015', 300: '#FFA066' },
        navy: '#1A3659',            // logo navy: dark tiles, buttons, badges
        band: '#10243F',            // deep navy for large dark areas
        page: '#F2F1EE',            // page background
        tile: '#FFFFFF',
        tint: '#F8F7F4',            // tinted sections
        heading: '#0F0F10',
        ink: '#1C1C1E',             // body text
        muted: '#55555A',
        line: '#E0DED9',
        hl: '#E86516',              // orange for highlighted words
        chip: '#E6E4DF',
        wa: '#25D366',
      },
      fontFamily: {
        sans: ['"IBM Plex Sans Arabic"', 'system-ui', '"Segoe UI"', 'Tahoma', 'sans-serif'],
      },
      spacing: {
        pad: 'var(--pad)',          // inner padding of every card (32px, 20px on phones)
        gap: 'var(--gap)',          // space between cards (16px)
        sec: 'var(--sec-y)',        // top and bottom of every section
      },
      maxWidth: { wrap: '1200px' },
      borderRadius: { tile: '28px' },
      boxShadow: { card: SHADOW },
      transitionTimingFunction: { brand: EASE },
    },
  },
  plugins: [sharedComponents],
};
})();
