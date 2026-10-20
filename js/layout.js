/* =========================================================
   دكان زمان — الأجزاء المشتركة في كل صفحات الموقع
   ---------------------------------------------------------
   أي تعديل هنا يظهر في كل الصفحات مرة واحدة:
   • SITE      بيانات التواصل، روابط القائمة، نصوص الفوتر
   • ICONS     كل أيقونات الموقع
   • header()  الشريط الكحلي (تواصل + ملف الشركة + السوشيال) + الشريط العلوي + قائمة الموبايل
   • footer()  الفوتر + زر واتساب + زر الرجوع لأعلى
   الصفحات فيها أماكن فاضية فقط:
     <div data-site="header"></div>   <div data-site="footer"></div>
     <ul data-site="contact-list"></ul>   (صفحة تواصل معنا)
   بعد أي تعديل غيّر رقم النسخة ?v= لملف layout.js في الصفحات.
   ========================================================= */
window.SITE = {
  name: 'دكان زمان للتوريدات العمومية',
  tagline: 'دكان زمان .. اسم من الماضي برؤية للمستقبل',
  message: 'أنتم تركزون على النمو، ونحن نتولى المشتريات من أجلكم.',
  slogan: 'جودة … تنوع … التزام بالمواعيد … خدمة مميزة',

  // ---- بيانات التواصل
  phone: { display: '٠١٠٠٦١٠٣٦٩٦', tel: '+201006103696' },
  whatsapp: { display: '٠١٠٠٦١٠٣٦٩٦', number: '201006103696', text: 'مرحبًا دكان زمان، أريد الاستفسار عن طلب توريد.' },
  emails: ['info@dakan-zaman.com', 'sales@dokan-zaman.com'],
  address: 'القاهرة – النزهة الجديدة – مصر',

  // ---- صفحات الموقع (بالترتيب). navbar: false = لا تظهر في الشريط العلوي (تظهر كزر)
  //      match: صفحات أخرى تجعل هذا الرابط مُفعّلًا
  pages: [
    { href: 'index.html', label: 'الرئيسية' },
    { href: 'procurement.html', label: 'إدارة المشتريات', badge: 'جديد' },     // badge: شارة صغيرة بجانب الاسم (احذفها لإخفائها)
    { href: 'categories.html', label: 'مجالات التوريد', match: ['category.html', 'products.html', 'product-details.html'] },
    { href: 'about.html', label: 'من نحن' },
    { href: 'clients.html', label: 'عملاؤنا' },
    { href: 'contact.html', label: 'تواصل معنا', navbar: false, footer: false },
  ],
  navButton: { href: 'contact.html', label: 'تواصل معنا' },     // الزر البرتقالي في الشريط العلوي
  menuButton: { href: 'contact.html', label: 'اطلب عرض سعر' },  // الزر في قائمة الموبايل

  // ---- ملف التعريف بالشركة (لينك في الشريط العلوي بجانب «عملاؤنا» وفي قائمة الموبايل)
  //      لتغيير الملف: ضع الملف الجديد في assets/files باسم company-profile.pdf (بدل القديم)،
  //      أو ضعه بأي اسم وغيّر href هنا. downloadName = اسم الملف عند الزائر بعد التحميل.
  companyFile: { href: 'assets/files/company-profile.pdf', label: 'ملف تعريف الشركة', downloadName: 'دكان زمان - تعريف الشركة.pdf' },
  copyright: 'دكان زمان للتوريدات العمومية. جميع الحقوق محفوظة.',

  // ---- زر اللغة الإنجليزية (في الشريط الكحلي أعلى الصفحة وقائمة الموبايل) — يفتح صفحة «قريبًا»
  langSwitch: { href: 'en.html', label: 'English' },

  // ---- صفحات التواصل الاجتماعي (أيقونات بألوانها الأصلية في الشريط الكحلي أعلى الصفحة وفي الفوتر وقائمة الموبايل، تفتح في تبويب جديد)
  //      ضع رابط صفحة الشركة مكان الرابط العام (مثال: 'https://www.facebook.com/اسم-الصفحة')، واحذف السطر لإخفاء الأيقونة
  social: [
    { key: 'facebook', name: 'فيسبوك', icon: 'i-facebook', href: 'https://www.facebook.com/profile.php?id=61595169910489' },
    { key: 'instagram', name: 'إنستجرام', icon: 'i-instagram', href: 'https://www.instagram.com/' },
    { key: 'linkedin', name: 'لينكدإن', icon: 'i-linkedin', href: 'https://www.linkedin.com/' },
  ],
};

(() => {
  const S = window.SITE;
  const ICONS = {
    'i-facebook': 'viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></symbol>',
    'i-instagram': 'viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/></symbol>',
    'i-linkedin': 'viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></symbol>',
    'i-briefcase': 'viewBox="0 0 24 24"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></symbol>',
    'i-shopping-bag': 'viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></symbol>',
    'i-globe': 'viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></symbol>',
    'i-download': 'viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/></symbol>',
    'i-arrow': 'viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"></path></symbol>',
    'i-arrow-right': 'viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"></path></symbol>',
    'i-check': 'viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"></path></symbol>',
    'i-award':'viewBox="0 0 24 24"><circle cx="12" cy="8" r="6"></circle><path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11"></path></symbol>',
    'i-building': 'viewBox="0 0 24 24"><rect width="16" height="20" x="4" y="2" rx="2"></rect><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"></path></symbol>',
    'i-calendar': 'viewBox="0 0 24 24"><path d="M8 2v4M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></symbol>',
    'i-cart': 'viewBox="0 0 24 24"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></symbol>',
    'i-clipboard': 'viewBox="0 0 24 24"><rect width="8" height="4" x="8" y="2" rx="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M12 11h4M12 16h4M8 11h.01M8 16h.01"></path></symbol>',
    'i-clock': 'viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></symbol>',
    'i-growth': 'viewBox="0 0 24 24"><path d="M22 7 13.5 15.5 8.5 10.5 2 17"/><path d="M16 7h6v6"/></symbol>',
    'i-eye': 'viewBox="0 0 24 24"><path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0"></path><circle cx="12" cy="12" r="3"></circle></symbol>',
    'i-handshake': 'viewBox="0 0 24 24"><path d="m11 17 2 2a1 1 0 1 0 3-3"></path><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"></path><path d="m21 3 1 11h-2M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3M3 4h8"></path></symbol>',
    'i-headset': 'viewBox="0 0 24 24"><path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z"></path><path d="M21 16v2a4 4 0 0 1-4 4h-5"></path></symbol>',
    'i-landmark': 'viewBox="0 0 24 24"><path d="M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7"></path><path d="M12 2 20 7H4Z"></path></symbol>',
    'i-list': 'viewBox="0 0 24 24"><path d="M3 12h.01M3 18h.01M3 6h.01M8 12h13M8 18h13M8 6h13"></path></symbol>',
    'i-mail': 'viewBox="0 0 24 24"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></symbol>',
    'i-menu': 'viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"></path></symbol>',
    'i-package': 'viewBox="0 0 24 24"><path d="m7.5 4.27 9 5.15"></path><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><path d="m3.3 7 8.7 5 8.7-5M12 22V12"></path></symbol>',
    'i-phone': 'viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></symbol>',
    'i-pin': 'viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></symbol>',
    'i-repeat': 'viewBox="0 0 24 24"><path d="m17 2 4 4-4 4"></path><path d="M3 11v-1a4 4 0 0 1 4-4h14"></path><path d="m7 22-4-4 4-4"></path><path d="M21 13v1a4 4 0 0 1-4 4H3"></path></symbol>',
    'i-shield': 'viewBox="0 0 24 24"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="m9 12 2 2 4-4"></path></symbol>',
    'i-shuffle': 'viewBox="0 0 24 24"><path d="m18 14 4 4-4 4M18 2l4 4-4 4"></path><path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22M2 6h1.9c1.5 0 2.9.9 3.6 2.2M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8"></path></symbol>',
    'i-target': 'viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></symbol>',
    'i-truck': 'viewBox="0 0 24 24"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2M15 18H9"></path><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path><circle cx="17" cy="18" r="2"></circle><circle cx="7" cy="18" r="2"></circle></symbol>',
    'i-up': 'viewBox="0 0 24 24"><path d="m18 15-6-6-6 6"></path></symbol>',
    'i-whatsapp': 'viewBox="0 0 24 24"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"></path></symbol>',
    'i-x': 'viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"></path></symbol>',
    'i-zap': 'viewBox="0 0 24 24"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></symbol>'
  };
  const ar = n => String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
  const ico = (id, cls = 'ico') => `<svg class="${cls}"><use href="#${id}"/></svg>`;
  const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const isOn = p => p.href === here || (p.match || []).includes(here);
  const waLink = `https://wa.me/${S.whatsapp.number}?text=${encodeURIComponent(S.whatsapp.text)}`;

  // ---- icons (one sprite for the whole page)
  const sprite = `<svg class="sprite" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><defs>${Object.entries(ICONS).map(([k, v]) => `<symbol id="${k}" ${v}`).join('')}</defs></svg>`;
  document.body.insertAdjacentHTML('afterbegin', sprite);

  // download link for the company profile file (SITE.companyFile) — the icon comes after the label
  const fileLink = cls => S.companyFile
    ? `<a href="${S.companyFile.href}" class="${cls}" download="${S.companyFile.downloadName || ''}"><span>${S.companyFile.label}</span>${ico('i-download')}</a>`
    : '';

  // social links keep each network's own colour (top bar, footer, mobile menu)
  const SOCIAL_BG = {
    facebook: 'bg-[#1877F2]',
    instagram: 'bg-[radial-gradient(circle_at_30%_107%,#FDF497_0%,#FDF497_5%,#FD5949_45%,#D6249F_60%,#285AEB_90%)]',
    linkedin: 'bg-[#0A66C2]',
  };
  const socialLinks = size => (S.social || []).map(s => `<a href="${s.href}" class="${SOCIAL_BG[s.key] || 'bg-navy'} ${size} grid place-items-center rounded-full text-white `
    + 'transition-[transform,filter] duration-300 ease-brand hover:-translate-y-0.5 hover:brightness-110 active:scale-[.92]" '
    + `target="_blank" rel="noopener" aria-label="${s.name}" title="${s.name}">${ico(s.icon)}</a>`).join('');

  // ---- Tailwind class sets (shared pieces)
  // navbar link: grey pill on hover; the current page is a navy pill
  const NAV_LINK = 'inline-flex items-center gap-2 h-11 px-4 tab:px-3 rounded-full font-medium text-[1rem] tab:text-[.92rem] text-heading whitespace-nowrap '
    + 'transition-[background-color,color,transform] duration-200 hover:bg-chip active:scale-[.97] [&.is-active]:!bg-navy [&.is-active]:!text-white';
  // the company-file link in the navbar: download icon after the label, nudges down on hover
  const NAV_FILE_ICON = '[&_.ico]:w-[17px] [&_.ico]:h-[17px] [&_.ico]:[stroke-width:2.1] [&_.ico]:transition-transform [&_.ico]:duration-300 hover:[&_.ico]:translate-y-[2px]';
  // «English» button: opens the coming-soon page
  const langLink = cls => S.langSwitch ? `<a href="${S.langSwitch.href}" lang="en" class="${cls}">${ico('i-globe')}<span>${S.langSwitch.label}</span></a>` : '';
  // the «جديد» badge next to a page name (SITE.pages[].badge)
  const badge = (p, cls) => p.badge ? `<span class="${cls} rounded-full bg-orange text-white font-bold leading-none">${p.badge}</span>` : '';
  const TOP_LINK = 'inline-flex items-center gap-2 hover:text-orange-300 transition-colors duration-200 [&_.ico]:w-[15px] [&_.ico]:h-[15px] [&_.ico]:text-orange-300';

  // header = a slim navy bar (contact, social, language) + the floating navbar.
  // On scroll the whole block slides up by the bar's height (main.js adds .is-scrolled), so only the navbar stays.
  const header = () => `
  <div class="group/head fixed top-0 inset-x-0 z-[60] pointer-events-none [--bar:40px] xs:[--bar:36px] transition-transform duration-300 ease-brand [&.is-scrolled]:-translate-y-[var(--bar)]" id="site-head">
    <div class="h-[var(--bar)] bg-band text-white/90 text-[.9rem] xs:text-[.875rem] pointer-events-auto transition-opacity duration-300 group-[.is-scrolled]/head:opacity-0">
      <div class="wrap h-full flex items-center justify-between gap-4">
        <div class="flex items-center gap-5">
          <a href="tel:${S.phone.tel}" class="${TOP_LINK}">${ico('i-phone')}<span dir="ltr">${S.phone.display}</span></a>
          <a href="mailto:${S.emails[0]}" class="${TOP_LINK} sm:hidden">${ico('i-mail')}<span>${S.emails[0]}</span></a>
        </div>
        <div class="flex items-center gap-4 xs:gap-3">
          <span class="sm:hidden">تابعونا</span>
          <div class="flex items-center gap-2">${socialLinks('w-7 h-7 [&_.ico]:w-[14px] [&_.ico]:h-[14px]')}</div>
          <span class="w-px h-4 bg-white/20" aria-hidden="true"></span>
          ${langLink('inline-flex items-center gap-1.5 h-7 px-3 rounded-full [border:1px_solid_rgba(255,255,255,.3)] text-white text-[.875rem] font-semibold transition-colors duration-200 hover:text-orange hover:[border-color:#F37221] [&_.ico]:w-[14px] [&_.ico]:h-[14px]')}
        </div>
      </div>
    </div>

    <header class="island pointer-events-auto mx-auto mt-2.5 w-[min(1200px,100%-32px)] grid grid-cols-[auto_1fr_auto] lg:grid-cols-[1fr_auto] items-center gap-4 tab:gap-3 py-2 ps-[10px] pe-2 min-h-[62px] bg-tile border border-solid border-line rounded-full shadow-card transition-shadow duration-300 group-[.is-scrolled]/head:shadow-[0_16px_36px_-18px_rgba(16,36,63,.45)]" id="island">
      <a href="${here === 'index.html' ? '#top' : 'index.html'}" class="justify-self-start flex items-center ps-3" aria-label="دكان زمان — الصفحة الرئيسية">
        <img class="h-[38px] xs:h-[34px] w-auto" src="assets/logos/logo.svg" alt="Dokan Zaman" width="120" height="48">
      </a>
      <nav class="justify-self-center flex items-center gap-1 tab:gap-0.5 lg:hidden" aria-label="القائمة الرئيسية">
        ${S.pages.filter(p => p.navbar !== false).map(p => `<a class="${NAV_LINK}${isOn(p) ? ' is-active' : ''}" href="${p.href}"${isOn(p) ? ' aria-current="page"' : ''}>${p.label}${badge(p, 'py-[4px] px-[7px] text-[.8rem]')}</a>`).join('\n        ')}
        ${fileLink(`${NAV_LINK} ${NAV_FILE_ICON}`)}
      </nav>
      <div class="justify-self-end flex items-center gap-2">
        <a href="${S.navButton.href}" class="pill pill--orange h-11 px-5 text-[.95rem] whitespace-nowrap xs:hidden [&[aria-current=page]]:bg-orange-600"${S.navButton.href === here ? ' aria-current="page"' : ''}>${S.navButton.label} ${ico('i-arrow')}</a>
        <button class="icon-btn menu-btn hidden lg:inline-grid" type="button" aria-label="فتح القائمة" aria-expanded="false" aria-controls="sheet">${ico('i-menu')}</button>
      </div>
    </header>
  </div>

  <div class="sheet fixed inset-0 z-[70] bg-band text-white flex flex-col [justify-content:safe_center] gap-7 pt-[84px] px-7 pb-10 overflow-y-auto opacity-0 -translate-y-4 pointer-events-none transition-[opacity,transform] duration-300 ease-brand [&[hidden]]:hidden [&.is-open]:opacity-100 [&.is-open]:translate-y-0 [&.is-open]:pointer-events-auto" id="sheet" hidden>
    <button class="icon-btn sheet__close absolute top-5 left-5 !bg-white/10 !text-white hover:!bg-navy" type="button" aria-label="إغلاق القائمة">${ico('i-x')}</button>
    <nav class="grid gap-1" aria-label="القائمة">
      ${S.pages.map((p, i) => `<a class="flex items-baseline gap-4 text-[clamp(1.6rem,6.5vw,2.4rem)] font-bold leading-[1.5] hover:text-orange-300 [&[aria-current]]:text-orange-300" href="${p.href}"${isOn(p) ? ' aria-current="page"' : ''}><span class="text-[.9rem] text-orange font-semibold">${ar(i + 1)}</span>${p.label}${badge(p, 'self-center py-1.5 px-2.5 text-[.85rem]')}</a>`).join('\n      ')}
    </nav>
    ${fileLink('self-start inline-flex items-center gap-2.5 py-3 px-5 rounded-full border-2 border-solid border-orange/50 text-orange-300 font-bold text-[1.05rem] [&_.ico]:w-5 [&_.ico]:h-5 [&_.ico]:[stroke-width:2.1]')}
    <a href="${S.menuButton.href}" class="pill pill--orange pill--lg self-start">${S.menuButton.label} ${ico('i-arrow')}</a>
    ${(S.social || []).length ? `<div class="flex items-center gap-3"><span class="text-white/60 text-[.95rem] me-1">تابعونا</span>${socialLinks('w-11 h-11 [&_.ico]:w-5 [&_.ico]:h-5')}</div>` : ''}
    ${langLink('self-start inline-flex items-center gap-2 py-2.5 px-5 rounded-full [border:1px_solid_rgba(255,255,255,.3)] text-white font-semibold hover:text-orange hover:[border-color:#F37221] transition-colors [&_.ico]:w-[18px] [&_.ico]:h-[18px]')}
  </div>`;

  // contact details: phone → dialer, WhatsApp → chat (new tab), e-mail → mail app.
  // footer = with labels and the WhatsApp line; card = the contact page's orange card (no WhatsApp line)
  const contactItems = (card) => [
    `<li>${ico('i-phone')}<a href="tel:${S.phone.tel}">${card ? '' : '<small>مكالمات</small>'}<span dir="ltr">${S.phone.display}</span></a></li>`,
    card ? '' : `<li>${ico('i-whatsapp', 'ico ico--wa')}<a href="${waLink}" target="_blank" rel="noopener"><small>واتساب</small><span dir="ltr">${S.whatsapp.display}</span></a></li>`,
    ...S.emails.map(e => `<li>${ico('i-mail')}<a href="mailto:${e}">${e}</a></li>`),
    `<li>${ico('i-pin')}<span>${S.address}</span></li>`,
  ].filter(Boolean).join('\n          ');

  const footer = () => `
  <footer class="bg-[#CED3D9] bg-[radial-gradient(55%_85%_at_18%_100%,rgba(243,114,33,.30),transparent_70%)] text-[#33414F] pt-sec overflow-hidden [&_a]:transition-colors [&_a]:duration-200 [&_a:hover]:text-hl">
    <div class="wrap grid grid-cols-[1.5fr_1fr_1.3fr] lg:grid-cols-2 xs:grid-cols-1 gap-x-pad gap-y-8 xs:gap-7 items-start">
      <div class="lg:col-span-full">
        <img class="h-[52px] w-auto" src="assets/logos/logo.svg" alt="Dokan Zaman" width="160" height="64" loading="lazy">
        <p class="mt-4 text-heading font-semibold">${S.tagline}</p>
        <p class="mt-1.5 text-[.95rem]">${S.message}</p>
        ${(S.social || []).length ? `<div class="flex gap-2.5 mt-5" aria-label="تابعونا">${socialLinks('w-[42px] h-[42px] !text-white shadow-[0_8px_18px_-10px_rgba(16,36,63,.45)] [&_.ico]:w-5 [&_.ico]:h-5')}</div>` : ''}
      </div>
      <nav aria-label="صفحات الموقع">
        <h2 class="text-[1rem] font-bold text-navy mb-3.5">الصفحات</h2>
        <ul class="grid gap-2.5 [&>li]:text-[.95rem] [&>li]:leading-[1.6]">
          ${S.pages.filter(p => p.footer !== false).map(p => `<li><a href="${p.href}">${p.label}</a></li>`).join('\n          ')}
        </ul>
      </nav>
      <div>
        <h2 class="text-[1rem] font-bold text-navy mb-3.5">تواصل معنا</h2>
        <ul class="grid gap-2.5 [&>li]:text-[.95rem] [&>li]:leading-[1.6] [&>li]:flex [&>li]:items-center [&>li]:gap-2.5 [&>li>*]:[overflow-wrap:anywhere] [&_small]:text-[#3F4C59] [&_small]:text-[.875rem] [&_small]:me-2 [&_a:hover_small]:text-hl [&_.ico]:w-[18px] [&_.ico]:h-[18px] [&_.ico]:text-hl [&_.ico]:flex-none [&_.ico--wa]:!fill-current [&_.ico--wa]:![stroke:none] [&_.ico--wa]:!text-wa">
          ${contactItems(false)}
        </ul>
      </div>
    </div>
    <p class="text-[clamp(4.5rem,19vw,17rem)] font-bold leading-[1.1] text-center whitespace-nowrap mt-[30px] mb-[-0.25em] xs:mb-[-0.2em] tracking-[-.04em] bg-[linear-gradient(to_left,rgba(243,114,33,.75),rgba(26,54,89,.6))] bg-clip-text text-transparent [-webkit-mask-image:linear-gradient(180deg,#000_25%,transparent_92%)] [mask-image:linear-gradient(180deg,#000_25%,transparent_92%)] select-none" aria-hidden="true">دكان زمان</p>
    <div class="wrap relative flex flex-wrap justify-between gap-2.5 pt-[22px] pb-7 xs:pb-[88px] [border-top:1px_solid_rgba(26,54,89,.18)] text-[.9rem]">
      <span>© <span id="year">${ar(new Date().getFullYear())}</span> ${S.copyright}</span>
      <span>${S.slogan}</span>
    </div>
  </footer>

  <a href="${waLink}" class="wa-float group fixed left-[18px] bottom-[18px] xs:left-[14px] xs:bottom-[14px] z-[55] flex flex-row-reverse items-center gap-2.5 h-[58px] xs:h-[54px] px-4 xs:px-[15px] rounded-full bg-wa text-white shadow-[0_14px_30px_-12px_rgba(18,140,70,.75)] transition-[transform,background-color] duration-300 ease-brand hover:bg-[#1EBE5A] hover:-translate-y-[3px] touch:hover:translate-y-0 active:scale-[.95]" target="_blank" rel="noopener" aria-label="تواصل معنا على واتساب">
    ${ico('i-whatsapp', 'w-[26px] h-[26px] xs:w-6 xs:h-6 flex-none')}
    <span class="max-w-0 overflow-hidden whitespace-nowrap font-bold text-[.95rem] ms-[-10px] transition-[max-width,margin] duration-500 ease-brand group-hover:max-w-[220px] group-hover:ms-0 group-focus-visible:max-w-[220px] group-focus-visible:ms-0 touch:group-hover:max-w-0 touch:group-hover:ms-[-10px]">تواصل معنا على واتساب</span>
  </a>
  <a href="#top" class="to-top2 fixed right-[18px] bottom-[18px] xs:right-[14px] xs:bottom-[14px] z-50 w-[52px] h-[52px] rounded-full grid place-items-center bg-orange text-white opacity-0 translate-y-4 scale-[.85] pointer-events-none transition-[opacity,transform,background-color] duration-300 ease-brand hover:bg-navy [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0 [&.is-visible]:scale-100 [&.is-visible]:pointer-events-auto [&_.ico]:w-[22px] [&_.ico]:h-[22px] [&_.ico]:[stroke-width:2.4]" aria-label="العودة للأعلى">${ico('i-up')}</a>`;

  const put = (sel, html) => document.querySelectorAll(sel).forEach(el => { el.outerHTML = html; });
  put('[data-site="header"]', header());
  put('[data-site="footer"]', footer());
  document.querySelectorAll('[data-site="contact-list"]').forEach(ul => { ul.innerHTML = contactItems(true); ul.removeAttribute('data-site'); });
})();
