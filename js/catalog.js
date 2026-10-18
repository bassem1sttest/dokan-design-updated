/* =========================================================
   دكان زمان — بيانات مجالات التوريد والمنتجات
   ---------------------------------------------------------
   صفحة category.html تُبنى بالكامل من هذا الملف:
   category.html?c=cleaning  ←  يعرض مجال «مستهلكات وأدوات النظافة»

   لتعديل منتج: غيّر بياناته في السطر الخاص به فقط:
     name   اسم المنتج
     desc   وصف قصير
     price  سعر العرض: [من, إلى] مثل [58, 92] ← «من ٥٨ إلى ٩٢ ج.م»، أو رقم واحد مثل 75، أو null لإظهار «السعر عند الطلب»
     unit   الوحدة (اختياري، مثال: 'للعبوة' أو 'للكرتونة')
     images صور القسم — الأولى تظهر على كارت القسم في صفحة المجال، وكلها تُستخدم لمنتجات القسم التي ليس لها صورة خاصة
   صور كل منتج في مجلده: assets/img/products/<المجال>/<المنتج>/1.webp, 2.webp …
   لتغيير صورة: استبدل الملف داخل مجلد المنتج بنفس الاسم.
   لإضافة صورة: ضعها في مجلد المنتج (مثل 4.webp) وأضف مسارها داخل images.
   لإضافة منتج: انسخ سطر منتج والصقه تحته وعدّل بياناته.

   items  منتجات القسم (تظهر في صفحة القسم products.html?c=<المجال>&s=<رقم القسم>، وكل منتج له صفحته product-details.html?…&p=<رقم المنتج>)، لكل منتج:
            name اسمه · desc وصفه · unit الوحدة (للعبوة / للقطعة …) · price سعره
            images صوره (اختياري: ['مسار١', 'مسار٢'] — بدونها تظهر صور القسم)
          لإضافة منتج داخل قسم: انسخ سطرًا من items والصقه تحته وعدّل بياناته.

   ملف تعريف المجال (زر «ملف تعريف المجال» أعلى صفحة المجال): profile = مسار ملف PDF الخاص بالمجال.
   لتغيير الملف: ضع ملفك في assets/files/categories بنفس الاسم (مثل cleaning.pdf) بدل الموجود.
   احذف سطر profile لإخفاء الزر في هذا المجال.
   ========================================================= */
window.DOKAN_CATALOG = {
  currency: 'ج.م',
  priceNote: 'الأسعار المعروضة أسعار استرشادية، وتختلف حسب الكمية والمواصفات.',

  categories: [
    {
      id: 'cleaning',
      title: 'مستهلكات وأدوات النظافة',
      image: 'assets/img/categories/cleaning.webp',
      profile: 'assets/files/categories/cleaning.pdf',
      summary: 'كل ما يحتاجه مقركم ليبقى نظيفًا كل يوم: منظفات، ملمعات، أدوات تنظيف، أكياس قمامة، مناديل، ومستلزمات الحمامات والمطابخ.',
      products: [
        { name: 'المنظفات', desc: 'منظفات أرضيات وأسطح وأطباق بأحجام مختلفة.', price: [69, 95], unit: '', images: ['assets/img/products/cleaning/detergents/1.webp', 'assets/img/products/cleaning/detergents/2.webp'],
          items: [
            { name: 'منظف أرضيات معطر ٤ لتر', desc: 'منظف مركز للأرضيات بروائح منعشة، مناسب للمكاتب والممرات والمناطق الواسعة.', unit: 'للجركن', price: 69 },
            { name: 'سائل غسيل أطباق ١ لتر', desc: 'سائل مركز يزيل الدهون بسهولة، لطيف على اليدين، لمطابخ وبوفيهات المكاتب.', unit: 'للعبوة', price: 76 },
            { name: 'منظف أسطح متعدد الاستخدام ٧٥٠ مل', desc: 'بخاخ لتنظيف المكاتب والطاولات والأسطح الصلبة دون أن يترك أثرًا.', unit: 'للعبوة', price: 82 },
            { name: 'مسحوق غسيل يدوي ٢٫٥ كجم', desc: 'مسحوق فعال لغسيل الفوط والمفارش وأدوات النظافة القماشية.', unit: 'للكيس', price: 88 },
            { name: 'مطهر كلور ٣ لتر', desc: 'مطهر قوي للحمامات والأرضيات ومناطق الخدمة، يقضي على الجراثيم والروائح.', unit: 'للجركن', price: 95 },
          ] },
        { name: 'الملمعات', desc: 'ملمعات زجاج وأخشاب ومعادن.', price: [83, 94], unit: '', images: ['assets/img/products/cleaning/polish/1.webp'],
          items: [
            { name: 'ملمع زجاج بخاخ ٥٠٠ مل', desc: 'لتلميع الزجاج والمرايا والواجهات بلمعة صافية بدون خطوط.', unit: 'للعبوة', price: 83 },
            { name: 'ملمع أخشاب وأثاث ٤٠٠ مل', desc: 'يحافظ على الأثاث الخشبي ويمنحه لمعة طبيعية ويقلل تراكم الأتربة.', unit: 'للعبوة', price: 87 },
            { name: 'ملمع ستانلس ومعادن ٥٠٠ مل', desc: 'لتلميع المصاعد والمقابض والأسطح المعدنية وإزالة البصمات.', unit: 'للعبوة', price: 90 },
            { name: 'ملمع أرضيات رخام ١ لتر', desc: 'يعيد اللمعة للأرضيات الرخامية والبورسلين ويحميها من البقع.', unit: 'للعبوة', price: 94 },
          ] },
        { name: 'أدوات النظافة', desc: 'مماسح، مقشات، جرادل، وفوط تنظيف.', price: [61, 92], unit: '', images: ['assets/img/products/cleaning/tools/1.webp', 'assets/img/products/cleaning/tools/2.webp', 'assets/img/products/cleaning/tools/3.webp'],
          items: [
            { name: 'مقشة بعصا معدن', desc: 'مقشة متينة بشعر كثيف وعصا معدن طويلة للاستخدام اليومي.', unit: 'للقطعة', price: 61 },
            { name: 'مساحة أرضيات مع جردل وعصارة', desc: 'طقم متكامل للمسح السريع: مساحة قطن وجردل بعصارة يدوية.', unit: 'للطقم', price: 69 },
            { name: 'جاروف بيد طويلة', desc: 'جاروف بيد طويلة يوفر الانحناء، مناسب للمكاتب والمخازن.', unit: 'للقطعة', price: 76 },
            { name: 'فوط تنظيف ميكروفايبر (٥ قطع)', desc: 'فوط عالية الامتصاص للتنظيف والتلميع دون خدش الأسطح.', unit: 'للعبوة', price: 84 },
            { name: 'سفنج تنظيف مزدوج (١٠ قطع)', desc: 'سفنج بوجهين ناعم وخشن لغسيل الأطباق وتنظيف الأسطح.', unit: 'للعبوة', price: 92 },
          ] },
        { name: 'أكياس القمامة', desc: 'أكياس بمقاسات وسُمك مختلف للمكاتب والمطابخ.', price: [57, 73], unit: '', images: ['assets/img/products/cleaning/bags/1.webp', 'assets/img/products/cleaning/bags/2.webp', 'assets/img/products/cleaning/bags/3.webp'],
          items: [
            { name: 'أكياس قمامة صغيرة ٥٠×٦٠ (٥٠ كيس)', desc: 'مقاس سلال المكاتب، خامة متينة ورول سهل السحب.', unit: 'للرول', price: 57 },
            { name: 'أكياس قمامة وسط ٦٥×٩٠ (٢٥ كيس)', desc: 'مقاس متوسط لسلال الممرات والحمامات وأماكن الخدمة.', unit: 'للرول', price: 62 },
            { name: 'أكياس قمامة كبيرة ٩٠×١٢٠ (١٠ أكياس)', desc: 'أكياس كبيرة للحاويات والمخلفات بكميات أكبر.', unit: 'للرول', price: 68 },
            { name: 'أكياس قمامة سوداء ثقيلة للمطابخ', desc: 'سُمك عالٍ يتحمل المخلفات الثقيلة والرطبة دون تمزق.', unit: 'للرول', price: 73 },
          ] },
        { name: 'المناديل', desc: 'مناديل وجه ومطبخ ورول حمامات.', price: [65, 89], unit: '', images: ['assets/img/products/cleaning/tissues/1.webp', 'assets/img/products/cleaning/tissues/2.webp', 'assets/img/products/cleaning/tissues/3.webp', 'assets/img/products/cleaning/tissues/4.webp', 'assets/img/products/cleaning/tissues/5.webp', 'assets/img/products/cleaning/tissues/6.webp', 'assets/img/products/cleaning/tissues/7.webp'],
          items: [
            { name: 'مناديل وجه ١٥٠ منديل', desc: 'مناديل ناعمة بطبقتين في علبة أنيقة للمكاتب والاستقبال.', unit: 'للعلبة', price: 65 },
            { name: 'رول مطبخ (٢ رول)', desc: 'رول عالي الامتصاص لمطابخ وبوفيهات المكاتب.', unit: 'للعبوة', price: 71 },
            { name: 'رول حمامات (١٢ رول)', desc: 'عبوة اقتصادية من رول الحمامات الناعم للاستهلاك اليومي.', unit: 'للعبوة', price: 77 },
            { name: 'مناديل جيب (١٠ عبوات)', desc: 'عبوات صغيرة سهلة الحمل للضيافة والسيارات والاجتماعات.', unit: 'للعبوة', price: 83 },
            { name: 'رول جامبو للموزعات', desc: 'رول كبير مخصص لموزعات الحمامات في المقرات والمولات.', unit: 'للرول', price: 89 },
          ] },
        { name: 'مستلزمات الحمامات والمطابخ', desc: 'صابون سائل، معطرات، وموزعات.', price: [52, 77], unit: '', images: ['assets/img/products/cleaning/bathroom/1.webp', 'assets/img/products/cleaning/bathroom/2.webp'],
          items: [
            { name: 'صابون سائل لليدين ٥٠٠ مل', desc: 'صابون معطر لطيف على البشرة بعبوة بمضخة.', unit: 'للعبوة', price: 52 },
            { name: 'معطر جو بخاخ ٣٠٠ مل', desc: 'روائح منعشة تدوم طويلًا للمكاتب والحمامات وقاعات الاجتماعات.', unit: 'للعبوة', price: 58 },
            { name: 'موزع صابون حائط', desc: 'موزع يُثبت على الحائط، سهل التعبئة والاستخدام.', unit: 'للقطعة', price: 64 },
            { name: 'أقراص معطر تواليت (٣ قطع)', desc: 'أقراص تعطر وتنظف مع كل استخدام وتحد من الترسبات.', unit: 'للعبوة', price: 71 },
            { name: 'صابون سائل عبوة اقتصادية ٤ لتر', desc: 'عبوة كبيرة لإعادة تعبئة الموزعات بتكلفة أقل.', unit: 'للجركن', price: 77 },
          ] },
      ],
      services: [
        { title: 'توريد شهري حسب الاستهلاك', text: 'نحدد معكم كميات كل موقع ونورّدها بانتظام قبل أن تنفد.' },
        { title: 'بدائل بأسعار مختلفة', text: 'خيارات متعددة من العلامات والمواصفات حسب ميزانيتكم.' },
        { title: 'توريد لشركات النظافة', text: 'كميات كبيرة لشركات النظافة والصيانة ومواقعها.' },
        { title: 'تسليم في الموعد', text: 'نجهز الطلب ونراجعه ونوصله إلى مقركم في الموعد المتفق عليه.' },
      ],
    },
    {
      id: 'office',
      title: 'الأدوات المكتبية',
      image: 'assets/img/categories/office.webp',
      profile: 'assets/files/categories/office.pdf',
      summary: 'أقلام، ملفات، دفاتر، أدوات تنظيم، وكل مستلزمات المكاتب اليومية.',
      products: [
        { name: 'الأقلام', desc: 'أقلام جاف وحبر وماركر وهايلايتر.', price: [84, 92], unit: '', images: ['assets/img/products/office/pens/1.webp', 'assets/img/products/office/pens/2.webp', 'assets/img/products/office/pens/3.webp'],
          items: [
            { name: 'أقلام جاف أزرق (٥٠ قلم)', desc: 'أقلام جاف بكتابة سلسة وحبر يدوم، علبة اقتصادية للمكاتب.', unit: 'للعلبة', price: 84 },
            { name: 'أقلام حبر جل (١٢ قلم)', desc: 'كتابة ناعمة وواضحة بحبر سريع الجفاف.', unit: 'للعلبة', price: 86 },
            { name: 'أقلام ماركر سبورة (٤ ألوان)', desc: 'ماركر سبورة بيضاء سهل المسح بألوان واضحة.', unit: 'للطقم', price: 88 },
            { name: 'أقلام هايلايتر (٦ ألوان)', desc: 'ألوان فسفورية لتمييز النصوص والمستندات.', unit: 'للطقم', price: 90 },
            { name: 'أقلام رصاص HB (١٢ قلم)', desc: 'أقلام رصاص بجودة ثابتة للكتابة والرسم.', unit: 'للعلبة', price: 92 },
          ] },
        { name: 'الملفات', desc: 'ملفات بلاستيك وكرتون وحافظات أوراق.', price: [61, 77], unit: '', images: ['assets/img/products/office/files/1.webp', 'assets/img/products/office/files/2.webp', 'assets/img/products/office/files/3.webp'],
          items: [
            { name: 'ملف بلاستيك بكبس A4 (١٠ ملفات)', desc: 'لحفظ ونقل الأوراق والمستندات بأمان.', unit: 'للرزمة', price: 61 },
            { name: 'ملف كرتون بحافظة A4', desc: 'ملف كرتون متين بحافظة داخلية لتنظيم الأوراق.', unit: 'للقطعة', price: 66 },
            { name: 'ملف أرشيف بذراع ٨ سم', desc: 'ملف بذراع معدني لأرشفة كميات كبيرة من المستندات.', unit: 'للقطعة', price: 72 },
            { name: 'جيوب بلاستيك شفافة (١٠٠ جيب)', desc: 'جيوب مثقبة لحماية الأوراق داخل الملفات.', unit: 'للعلبة', price: 77 },
          ] },
        { name: 'الدفاتر والكشاكيل', desc: 'دفاتر وكشاكيل وبلوكات بمقاسات مختلفة.', price: [56, 87], unit: '', images: ['assets/img/products/office/notebooks/1.webp', 'assets/img/products/office/notebooks/2.webp', 'assets/img/products/office/notebooks/3.webp'],
          items: [
            { name: 'كشكول سلك A4 ‏١٠٠ ورقة', desc: 'كشكول بسلك وورق مسطر للملاحظات والاجتماعات.', unit: 'للقطعة', price: 56 },
            { name: 'دفتر محاضر مجلد ٢٠٠ ورقة', desc: 'دفتر مجلد لتسجيل المحاضر والسجلات الرسمية.', unit: 'للقطعة', price: 66 },
            { name: 'بلوك نوت A5 مسطر', desc: 'بلوك عملي للكتابة السريعة على المكتب.', unit: 'للقطعة', price: 77 },
            { name: 'أجندة سنوية بغلاف جلد', desc: 'أجندة بتواريخ السنة وغلاف جلد، مناسبة للهدايا والإدارات.', unit: 'للقطعة', price: 87 },
          ] },
        { name: 'أدوات التنظيم', desc: 'منظمات مكتب، حوامل أوراق، وصناديق أرشيف.', price: [56, 99], unit: '', images: ['assets/img/products/office/organizers/1.webp', 'assets/img/products/office/organizers/2.webp'],
          items: [
            { name: 'منظم مكتب شبك ٥ أقسام', desc: 'ينظم الأقلام والأدوات والأوراق الصغيرة على المكتب.', unit: 'للقطعة', price: 56 },
            { name: 'حامل أوراق ٣ أدوار', desc: 'حامل بثلاثة أدوار لفرز الأوراق والمعاملات.', unit: 'للقطعة', price: 70 },
            { name: 'صندوق أرشيف كرتون', desc: 'صندوق متين لحفظ الملفات والمستندات القديمة.', unit: 'للقطعة', price: 85 },
            { name: 'حامل أقلام وأدوات', desc: 'حامل عملي يحفظ الأقلام والمقصات وأدوات المكتب.', unit: 'للقطعة', price: 99 },
          ] },
        { name: 'مستلزمات المكاتب', desc: 'دباسات، خرامات، مشابك، ولاصق.', price: [79, 90], unit: '', images: ['assets/img/products/office/stapler/1.webp', 'assets/img/products/office/stapler/2.webp', 'assets/img/products/office/stapler/3.webp'],
          items: [
            { name: 'دباسة مكتب متوسطة', desc: 'دباسة متينة تدبس حتى ٢٠ ورقة بسهولة.', unit: 'للقطعة', price: 79 },
            { name: 'دبابيس دباسة ٢٤/٦ (١٠٠٠ دبوس)', desc: 'دبابيس قياسية تناسب معظم الدباسات المكتبية.', unit: 'للعلبة', price: 82 },
            { name: 'خرامة ورق مزدوجة', desc: 'خرامة بفتحتين للأرشفة داخل الملفات.', unit: 'للقطعة', price: 84 },
            { name: 'مشابك ورق معدن (١٠٠ مشبك)', desc: 'مشابك لتجميع الأوراق مؤقتًا دون ثقبها.', unit: 'للعلبة', price: 87 },
            { name: 'شريط لاصق شفاف مع حامل', desc: 'شريط لاصق شفاف بحامل مكتبي ثابت.', unit: 'للقطعة', price: 90 },
          ] },
      ],
      services: [
        { title: 'قائمة أصناف لكل إدارة', text: 'نجهز قائمة مستلزمات معتمدة لكل إدارة أو فرع.' },
        { title: 'توريد شهري منتظم', text: 'مستلزمات المكاتب تصلكم كل شهر وفق جدول ثابت.' },
        { title: 'علامات تجارية متعددة', text: 'اختيارات اقتصادية ومميزة حسب الاستخدام.' },
        { title: 'تجهيز المكاتب الجديدة', text: 'توريد كامل لمستلزمات المكاتب عند الافتتاح أو التوسع.' },
      ],
    },
    {
      id: 'paper',
      title: 'الورق ومستلزماته',
      image: 'assets/img/categories/paper.webp',
      profile: 'assets/files/categories/paper.pdf',
      summary: 'ورق طباعة وتصوير A4 وA3، رول ورق، أظرف، ومستلزمات ورقية متنوعة.',
      products: [
        { name: 'ورق A4', desc: 'ورق طباعة وتصوير بأوزان مختلفة.', price: [57, 91], unit: '', images: ['assets/img/products/paper/a4/1.webp', 'assets/img/products/paper/a4/2.webp'],
          items: [
            { name: 'ورق تصوير A4 ‏٧٠ جم', desc: 'ورق تصوير اقتصادي للطباعة اليومية والمستندات الداخلية.', unit: 'للرزمة', price: 57 },
            { name: 'ورق تصوير A4 ‏٨٠ جم', desc: 'ورق عالي البياض للطباعة والتصوير بجودة أفضل.', unit: 'للرزمة', price: 68 },
            { name: 'ورق ألوان A4 ‏٨٠ جم', desc: 'ورق ملون للإعلانات والتمييز والتنسيق.', unit: 'للرزمة', price: 80 },
            { name: 'كرتونة ورق A4 (٥ رزم)', desc: 'كرتونة اقتصادية للاستهلاك الشهري في المكاتب.', unit: 'للكرتونة', price: 91 },
          ] },
        { name: 'ورق A3', desc: 'للطباعة والرسومات والمستندات الكبيرة.', price: [79, 100], unit: '', images: ['assets/img/products/paper/a3/1.webp', 'assets/img/products/paper/a3/2.webp'],
          items: [
            { name: 'ورق تصوير A3 ‏٨٠ جم', desc: 'ورق مقاس كبير للمستندات والجداول والمخططات.', unit: 'للرزمة', price: 79 },
            { name: 'ورق A3 ‏١٠٠ جم للرسومات', desc: 'ورق أثقل للرسومات الهندسية والعروض.', unit: 'للرزمة', price: 86 },
            { name: 'ورق A3 ‏١٢٠ جم للطباعة الملونة', desc: 'ورق كثيف يبرز الألوان في الطباعة الاحترافية.', unit: 'للرزمة', price: 93 },
            { name: 'كرتونة ورق A3 (٥ رزم)', desc: 'كرتونة ورق A3 للاستهلاك الدوري.', unit: 'للكرتونة', price: 100 },
          ] },
        { name: 'رول الورق', desc: 'رول كاشير، رول فاكس، ورول ماكينات.', price: [68, 86], unit: '', images: ['assets/img/products/paper/rolls/1.webp', 'assets/img/products/paper/rolls/2.webp', 'assets/img/products/paper/rolls/3.webp'],
          items: [
            { name: 'رول كاشير حراري ٨٠ مم', desc: 'رول حراري لماكينات الكاشير والفواتير.', unit: 'للرول', price: 68 },
            { name: 'رول فاكس ٢١٠ مم', desc: 'رول ورق حراري لأجهزة الفاكس.', unit: 'للرول', price: 74 },
            { name: 'رول ماكينة حسابات ٥٧ مم', desc: 'رول لماكينات الحسابات وأجهزة الدفع.', unit: 'للرول', price: 80 },
            { name: 'رول بلوتر ٩١٤ مم', desc: 'رول عريض لطباعة اللوحات الهندسية والمخططات.', unit: 'للرول', price: 86 },
          ] },
        { name: 'الأظرف', desc: 'أظرف بمقاسات مختلفة للمراسلات.', price: [52, 95], unit: '', images: ['assets/img/products/paper/envelopes/1.webp', 'assets/img/products/paper/envelopes/2.webp'],
          items: [
            { name: 'أظرف بيضاء DL ‏(٥٠ ظرف)', desc: 'أظرف بيضاء للمراسلات والخطابات الرسمية.', unit: 'للعلبة', price: 52 },
            { name: 'أظرف بنية A4 ‏(٢٥ ظرف)', desc: 'أظرف متينة لإرسال المستندات بمقاس A4.', unit: 'للعلبة', price: 63 },
            { name: 'أظرف بنية A3 ‏(٢٥ ظرف)', desc: 'أظرف كبيرة للمستندات والكتالوجات.', unit: 'للعلبة', price: 74 },
            { name: 'أظرف مبطنة فقاعات', desc: 'أظرف مبطنة لحماية المحتويات الحساسة أثناء الشحن.', unit: 'للعبوة', price: 84 },
            { name: 'أظرف بنافذة شفافة (٥٠ ظرف)', desc: 'تُظهر العنوان دون الحاجة لكتابته على الظرف.', unit: 'للعلبة', price: 95 },
          ] },
        { name: 'ورق الملاحظات', desc: 'ورق ملاحظات لاصق وبلوكات.', price: [80, 94], unit: '', images: ['assets/img/products/paper/notes/1.webp', 'assets/img/products/paper/notes/2.webp', 'assets/img/products/paper/notes/3.webp'],
          items: [
            { name: 'ورق ملاحظات لاصق ٧٦×٧٦', desc: 'ورق لاصق للملاحظات والتذكير على المكتب.', unit: 'للعبوة', price: 80 },
            { name: 'ورق ملاحظات ملون ٥ ألوان', desc: 'ألوان متعددة لتنظيم المهام والأولويات.', unit: 'للعبوة', price: 85 },
            { name: 'مؤشرات صفحات لاصقة', desc: 'مؤشرات لتمييز الصفحات في الكتب والملفات.', unit: 'للعبوة', price: 89 },
            { name: 'بلوك ملاحظات مكعب ٥٠٠ ورقة', desc: 'بلوك مكعب كبير للملاحظات السريعة.', unit: 'للقطعة', price: 94 },
          ] },
      ],
      services: [
        { title: 'توريد بالكرتونة', text: 'كميات كبيرة بأسعار مناسبة للاستهلاك العالي.' },
        { title: 'أصناف جاهزة دائمًا', text: 'أنواع الورق الأساسية متوفرة لسرعة التوريد.' },
        { title: 'أوزان ومقاسات حسب الطلب', text: 'نوفر النوع المناسب لطابعاتكم واستخداماتكم.' },
        { title: 'توصيل منتظم', text: 'جدول توريد ثابت حتى لا يتوقف العمل.' },
      ],
    },
    {
      id: 'buffet',
      title: 'متطلبات البوفيه والضيافة',
      image: 'assets/img/categories/buffet.webp',
      profile: 'assets/files/categories/buffet.pdf',
      summary: 'شاي، قهوة، حليب، ينسون، سكر، ماكينات تحضير القهوة، وأدوات التقديم.',
      products: [
        { name: 'الشاي', desc: 'شاي فتلة وناعم بأنواعه.', price: [67, 92], unit: '', images: ['assets/img/products/buffet/tea/1.webp', 'assets/img/products/buffet/tea/2.webp', 'assets/img/products/buffet/tea/3.webp'],
          items: [
            { name: 'شاي فتلة (١٠٠ فتلة)', desc: 'شاي أسود فتلة لضيافة المكاتب اليومية.', unit: 'للعلبة', price: 67 },
            { name: 'شاي ناعم ٢٥٠ جم', desc: 'شاي ناعم بطعم قوي لعشاق الشاي التقليدي.', unit: 'للعبوة', price: 75 },
            { name: 'شاي أخضر فتلة (٢٥ فتلة)', desc: 'شاي أخضر خفيف ومنعش.', unit: 'للعلبة', price: 84 },
            { name: 'شاي ناعم عبوة اقتصادية ١ كجم', desc: 'عبوة كبيرة للبوفيهات ذات الاستهلاك العالي.', unit: 'للعبوة', price: 92 },
          ] },
        { name: 'القهوة', desc: 'قهوة تركي وإسبريسو وسريعة التحضير.', price: [85, 95], unit: '', images: ['assets/img/products/buffet/coffee/1.webp', 'assets/img/products/buffet/coffee/2.webp', 'assets/img/products/buffet/coffee/3.webp'],
          items: [
            { name: 'بن تركي محوج ٢٥٠ جم', desc: 'بن محمص ومطحون بالحبهان لقهوة تركي أصيلة.', unit: 'للعبوة', price: 85 },
            { name: 'قهوة إسبريسو حبوب ٢٥٠ جم', desc: 'حبوب محمصة لماكينات الإسبريسو.', unit: 'للعبوة', price: 88 },
            { name: 'قهوة سريعة التحضير ١٠٠ جم', desc: 'قهوة سريعة التحضير في ثوانٍ.', unit: 'للعبوة', price: 92 },
            { name: 'أظرف قهوة ٣ في ١ (٢٤ ظرف)', desc: 'قهوة بالحليب والسكر في أظرف فردية.', unit: 'للعلبة', price: 95 },
          ] },
        { name: 'الحليب', desc: 'حليب سائل وبودرة للبوفيه.', price: [83, 100], unit: '', images: ['assets/img/products/buffet/milk/1.webp', 'assets/img/products/buffet/milk/2.webp'],
          items: [
            { name: 'حليب سائل كامل الدسم ١ لتر', desc: 'حليب طويل الأجل للشاي والقهوة.', unit: 'للعلبة', price: 83 },
            { name: 'حليب بودرة ٩٠٠ جم', desc: 'حليب بودرة سهل التخزين للبوفيه.', unit: 'للعبوة', price: 89 },
            { name: 'مبيض قهوة ٤٥٠ جم', desc: 'مبيض قهوة يذوب بسرعة.', unit: 'للعبوة', price: 94 },
            { name: 'حليب مكثف محلى', desc: 'لتحضير المشروبات والحلويات.', unit: 'للعلبة', price: 100 },
          ] },
        { name: 'الينسون والأعشاب', desc: 'ينسون، نعناع، كركديه، ومشروبات أعشاب.', price: [65, 82], unit: '', images: ['assets/img/products/buffet/anise/1.webp', 'assets/img/products/buffet/anise/2.webp', 'assets/img/products/buffet/anise/3.webp'],
          items: [
            { name: 'ينسون فتلة (٢٠ فتلة)', desc: 'ينسون طبيعي مهدئ في فتلة.', unit: 'للعلبة', price: 65 },
            { name: 'نعناع فتلة (٢٠ فتلة)', desc: 'نعناع منعش في فتلة.', unit: 'للعلبة', price: 71 },
            { name: 'كركديه ناعم ٢٥٠ جم', desc: 'كركديه للمشروبات الساخنة والباردة.', unit: 'للعبوة', price: 76 },
            { name: 'مشروبات أعشاب مشكلة', desc: 'تشكيلة أعشاب متنوعة للضيافة.', unit: 'للعلبة', price: 82 },
          ] },
        { name: 'السكر', desc: 'سكر أكياس ومكعبات وأظرف فردية.', price: [76, 89], unit: '', images: ['assets/img/products/buffet/sugar/1.webp', 'assets/img/products/buffet/sugar/2.webp'],
          items: [
            { name: 'سكر أبيض ١ كجم', desc: 'سكر ناعم للاستخدام اليومي.', unit: 'للكيس', price: 76 },
            { name: 'سكر مكعبات ٥٠٠ جم', desc: 'مكعبات سكر أنيقة للضيافة والاجتماعات.', unit: 'للعلبة', price: 80 },
            { name: 'أظرف سكر فردية (١٠٠ ظرف)', desc: 'أظرف فردية صحية لقاعات الاجتماعات.', unit: 'للعلبة', price: 85 },
            { name: 'سكر دايت (١٠٠ ظرف)', desc: 'محلي بدون سعرات في أظرف فردية.', unit: 'للعلبة', price: 89 },
          ] },
        { name: 'ماكينات القهوة', desc: 'ماكينات تحضير القهوة للمكاتب.', price: [58, 100], unit: '', images: ['assets/img/products/buffet/machine/1.webp', 'assets/img/products/buffet/machine/2.webp', 'assets/img/products/buffet/machine/3.webp'],
          items: [
            { name: 'ماكينة قهوة كبسولات', desc: 'تحضير سريع للقهوة بضغطة واحدة.', unit: 'للقطعة', price: 58 },
            { name: 'ماكينة إسبريسو منزلية', desc: 'إسبريسو وكابتشينو للمكاتب الصغيرة.', unit: 'للقطعة', price: 72 },
            { name: 'ماكينة قهوة تركي كهربائية', desc: 'تحضير القهوة التركي بشكل آلي.', unit: 'للقطعة', price: 86 },
            { name: 'غلاية مياه كهربائية ١٫٧ لتر', desc: 'غلاية سريعة بفصل تلقائي.', unit: 'للقطعة', price: 100 },
          ] },
        { name: 'الأكواب وأدوات التقديم', desc: 'أكواب، أطباق، وأدوات تقديم ورقية وزجاجية.', price: [68, 93], unit: '', images: ['assets/img/products/buffet/cups/1.webp', 'assets/img/products/buffet/cups/2.webp', 'assets/img/products/buffet/cups/3.webp'],
          items: [
            { name: 'أكواب ورق ٧ أونصة (٥٠ كوب)', desc: 'أكواب ورق للمشروبات الساخنة.', unit: 'للعبوة', price: 68 },
            { name: 'أكواب زجاج شاي (٦ أكواب)', desc: 'أكواب زجاج كلاسيكية للشاي.', unit: 'للطقم', price: 74 },
            { name: 'أطباق ورق (٥٠ طبق)', desc: 'أطباق ورق للضيافة والمناسبات.', unit: 'للعبوة', price: 80 },
            { name: 'ملاعق تقليب خشب (١٠٠ قطعة)', desc: 'ملاعق خشب صديقة للبيئة.', unit: 'للعبوة', price: 87 },
            { name: 'صواني تقديم ستانلس', desc: 'صوانٍ متينة لتقديم الضيافة.', unit: 'للقطعة', price: 93 },
          ] },
      ],
      services: [
        { title: 'تجهيز بوفيه المكتب', text: 'كل احتياجات البوفيه من مصدر واحد بدل عدة موردين.' },
        { title: 'توريد أسبوعي أو شهري', text: 'حسب عدد الموظفين ومعدل الاستهلاك.' },
        { title: 'الاجتماعات والمناسبات', text: 'مستلزمات ضيافة للاجتماعات والفعاليات.' },
        { title: 'ماكينات وخامات', text: 'توريد ماكينات القهوة مع خاماتها.' },
      ],
    },
    {
      id: 'packaging',
      title: 'التغليف والعبوات والكراتين',
      image: 'assets/img/categories/packaging.webp',
      profile: 'assets/files/categories/packaging.pdf',
      summary: 'كراتين، بكر لصق، إستريتش، بابل، عبوات، وجراكن .. وحلول تغليف حسب الطلب.',
      products: [
        { name: 'الكراتين', desc: 'كراتين بمقاسات وطبقات مختلفة.', price: [76, 95], unit: '', images: ['assets/img/products/packaging/cartons/1.webp', 'assets/img/products/packaging/cartons/2.webp', 'assets/img/products/packaging/cartons/3.webp'],
          items: [
            { name: 'كرتونة ٣ طبقات ٣٠×٢٠×٢٠', desc: 'كرتونة خفيفة للتغليف والشحن اليومي.', unit: 'للقطعة', price: 76 },
            { name: 'كرتونة ٥ طبقات ٤٠×٣٠×٣٠', desc: 'كرتونة قوية للأوزان المتوسطة.', unit: 'للقطعة', price: 82 },
            { name: 'كرتونة نقل كبيرة ٦٠×٤٠×٤٠', desc: 'للنقل والتخزين والأحمال الكبيرة.', unit: 'للقطعة', price: 89 },
            { name: 'كرتونة أرشيف بغطاء', desc: 'لحفظ الملفات بشكل منظم.', unit: 'للقطعة', price: 95 },
          ] },
        { name: 'بكر اللصق', desc: 'بكر لصق شفاف وبني ومطبوع.', price: [52, 75], unit: '', images: ['assets/img/products/packaging/tape/1.webp', 'assets/img/products/packaging/tape/2.webp'],
          items: [
            { name: 'بكرة لصق شفاف ٤٨ مم', desc: 'لاصق قوي لغلق الكراتين.', unit: 'للبكرة', price: 52 },
            { name: 'بكرة لصق بني ٤٨ مم', desc: 'لاصق بني للتغليف والشحن.', unit: 'للبكرة', price: 60 },
            { name: 'بكرة لصق مطبوع «قابل للكسر»', desc: 'تنبيه واضح للشحنات الحساسة.', unit: 'للبكرة', price: 67 },
            { name: 'موزع بكر لصق يدوي', desc: 'يسرّع غلق الكراتين ويقطع اللاصق بسهولة.', unit: 'للقطعة', price: 75 },
          ] },
        { name: 'الإستريتش', desc: 'رول إستريتش لتغليف البالتات والشحنات.', price: [52, 78], unit: '', images: ['assets/img/products/packaging/stretch/1.webp'],
          items: [
            { name: 'رول إستريتش ٥٠ سم × ٢٠ ميكرون', desc: 'لتغليف البالتات وتثبيت الشحنات.', unit: 'للرول', price: 52 },
            { name: 'رول إستريتش ٥٠ سم × ٢٣ ميكرون', desc: 'سُمك أعلى للأحمال الثقيلة.', unit: 'للرول', price: 61 },
            { name: 'رول إستريتش صغير ١٠ سم', desc: 'لتغليف القطع الصغيرة والحزم.', unit: 'للرول', price: 69 },
            { name: 'رول إستريتش أسود', desc: 'يخفي محتوى الشحنات ويحميها.', unit: 'للرول', price: 78 },
          ] },
        { name: 'البابل', desc: 'رول بابل لحماية المنتجات القابلة للكسر.', price: [60, 84], unit: '', images: ['assets/img/products/packaging/bubble/1.webp', 'assets/img/products/packaging/bubble/2.webp', 'assets/img/products/packaging/bubble/3.webp'],
          items: [
            { name: 'رول بابل ٥٠ سم × ١٠ م', desc: 'لحماية المنتجات القابلة للكسر.', unit: 'للرول', price: 60 },
            { name: 'رول بابل ١ م × ١٠ م', desc: 'عرض أكبر للأجهزة والقطع الكبيرة.', unit: 'للرول', price: 68 },
            { name: 'أكياس بابل جاهزة (٢٥ كيس)', desc: 'أكياس جاهزة لتغليف سريع.', unit: 'للعبوة', price: 76 },
            { name: 'رول بابل مزدوج للأجهزة', desc: 'حماية مضاعفة للإلكترونيات.', unit: 'للرول', price: 84 },
          ] },
        { name: 'العبوات', desc: 'عبوات بلاستيك وورقية بأحجام مختلفة.', price: [67, 78], unit: '', images: ['assets/img/products/packaging/containers/1.webp', 'assets/img/products/packaging/containers/2.webp'],
          items: [
            { name: 'عبوات بلاستيك ٥٠٠ مل (١٠ قطع)', desc: 'عبوات للسوائل بأغطية محكمة.', unit: 'للعبوة', price: 67 },
            { name: 'علب ورق للتغليف (١٠ قطع)', desc: 'علب أنيقة للتغليف والهدايا.', unit: 'للعبوة', price: 71 },
            { name: 'برطمانات بلاستيك بغطاء', desc: 'لحفظ وتخزين المواد والمنتجات.', unit: 'للعبوة', price: 74 },
            { name: 'أكياس ورق بيد (٢٥ كيس)', desc: 'أكياس ورق قوية بيد للمحلات.', unit: 'للعبوة', price: 78 },
          ] },
        { name: 'الجراكن', desc: 'جراكن بسعات مختلفة للسوائل.', price: [74, 96], unit: '', images: ['assets/img/products/packaging/jerrycans/1.webp'],
          items: [
            { name: 'جركن ٥ لتر', desc: 'جركن بغطاء محكم للسوائل.', unit: 'للقطعة', price: 74 },
            { name: 'جركن ١٠ لتر', desc: 'سعة متوسطة لنقل وتخزين السوائل.', unit: 'للقطعة', price: 81 },
            { name: 'جركن ٢٠ لتر', desc: 'سعة كبيرة للمياه والمنظفات.', unit: 'للقطعة', price: 89 },
            { name: 'جركن ٢٥ لتر بحنفية', desc: 'جركن بحنفية لسهولة التفريغ.', unit: 'للقطعة', price: 96 },
          ] },
      ],
      services: [
        { title: 'مقاسات حسب الطلب', text: 'كراتين وعبوات بالمقاسات التي تناسب منتجاتكم.' },
        { title: 'توريد للمخازن والشحن', text: 'مستلزمات تغليف منتظمة لمخازنكم وعمليات الشحن.' },
        { title: 'كميات كبيرة', text: 'أسعار مناسبة للطلبات الكبيرة والدورية.' },
        { title: 'حماية المنتجات', text: 'نرشح لكم مواد التغليف المناسبة لكل منتج.' },
      ],
    },
    {
      id: 'safety',
      title: 'مهمات الصحة والسلامة',
      image: 'assets/img/categories/safety.webp',
      profile: 'assets/files/categories/safety.pdf',
      summary: 'الفيست، الخوذة، الجوانتي، أحذية السلامة، والعلامات الإرشادية.',
      products: [
        { name: 'الفيست العاكس', desc: 'فيست عاكس للمواقع والمخازن.', price: [61, 90], unit: '', images: ['assets/img/products/safety/vest/1.webp', 'assets/img/products/safety/vest/2.webp', 'assets/img/products/safety/vest/3.webp', 'assets/img/products/safety/vest/4.webp'],
          items: [
            { name: 'فيست عاكس أصفر', desc: 'رؤية واضحة في المواقع والطرق.', unit: 'للقطعة', price: 61 },
            { name: 'فيست عاكس برتقالي', desc: 'لعمال المواقع والمخازن.', unit: 'للقطعة', price: 71 },
            { name: 'فيست عاكس بجيوب وسوستة', desc: 'جيوب عملية وغلق بسوستة.', unit: 'للقطعة', price: 80 },
            { name: 'فيست عاكس مطبوع باللوجو', desc: 'يُطبع بشعار شركتكم.', unit: 'للقطعة', price: 90 },
          ] },
        { name: 'الخوذة', desc: 'خوذ حماية بألوان مختلفة.', price: [54, 77], unit: '', images: ['assets/img/products/safety/helmet/1.webp', 'assets/img/products/safety/helmet/2.webp'],
          items: [
            { name: 'خوذة حماية بيضاء', desc: 'للمهندسين والمشرفين في المواقع.', unit: 'للقطعة', price: 54 },
            { name: 'خوذة حماية صفراء', desc: 'للعمال في مواقع البناء والصيانة.', unit: 'للقطعة', price: 62 },
            { name: 'خوذة بحزام ذقن', desc: 'تثبيت أفضل أثناء العمل.', unit: 'للقطعة', price: 69 },
            { name: 'خوذة بواقي أذن', desc: 'حماية للرأس والسمع معًا.', unit: 'للقطعة', price: 77 },
          ] },
        { name: 'الجوانتي', desc: 'جوانتي عمل وحماية بأنواعه.', price: [67, 99], unit: '', images: ['assets/img/products/safety/gloves/1.webp', 'assets/img/products/safety/gloves/2.webp'],
          items: [
            { name: 'جوانتي قطن منقط', desc: 'ثبات أفضل في المسك للأعمال الخفيفة.', unit: 'للزوج', price: 67 },
            { name: 'جوانتي جلد للأعمال الثقيلة', desc: 'حماية لليدين في الأعمال الشاقة.', unit: 'للزوج', price: 78 },
            { name: 'جوانتي مقاوم للقطع', desc: 'للتعامل الآمن مع الأدوات الحادة.', unit: 'للزوج', price: 88 },
            { name: 'جوانتي مطاط للكيماويات', desc: 'حماية من المنظفات والكيماويات.', unit: 'للزوج', price: 99 },
          ] },
        { name: 'العلامات الإرشادية', desc: 'لافتات تحذير وإرشاد وطوارئ.', price: [81, 99], unit: '', images: ['assets/img/products/safety/signs/1.webp', 'assets/img/products/safety/signs/2.webp'],
          items: [
            { name: 'لافتة «مخرج طوارئ» مضيئة', desc: 'تظهر بوضوح عند انقطاع الكهرباء.', unit: 'للقطعة', price: 81 },
            { name: 'لافتة «ممنوع التدخين»', desc: 'لافتة إرشادية للمقرات والمخازن.', unit: 'للقطعة', price: 87 },
            { name: 'لافتة «خطر كهرباء»', desc: 'تحذير عند غرف ولوحات الكهرباء.', unit: 'للقطعة', price: 93 },
            { name: 'علامة «أرضية مبتلة» قائمة', desc: 'تنبيه أثناء التنظيف لتجنب الانزلاق.', unit: 'للقطعة', price: 99 },
          ] },
        { name: 'أحذية السلامة', desc: 'أحذية سلامة بمقاسات مختلفة.', price: [79, 94], unit: '', images: ['assets/img/products/safety/boots/1.webp', 'assets/img/products/safety/boots/2.webp', 'assets/img/products/safety/boots/3.webp'],
          items: [
            { name: 'حذاء سلامة برقبة قصيرة', desc: 'مقدمة حديد ونعل مانع للانزلاق.', unit: 'للزوج', price: 79 },
            { name: 'حذاء سلامة برقبة طويلة', desc: 'حماية إضافية للكاحل.', unit: 'للزوج', price: 84 },
            { name: 'حذاء سلامة خفيف للمخازن', desc: 'خفيف ومريح لساعات العمل الطويلة.', unit: 'للزوج', price: 89 },
            { name: 'بوت مطاط مقاوم للمياه', desc: 'للأماكن الرطبة والمغسلة.', unit: 'للزوج', price: 94 },
          ] },
      ],
      services: [
        { title: 'تجهيز المواقع والمخازن', text: 'مهمات السلامة لكل العاملين في الموقع.' },
        { title: 'حسب عدد فريقكم ومقاساته', text: 'نجهز الطلب حسب عدد العمال ومقاساتهم.' },
        { title: 'توريد دوري للمستهلكات', text: 'استبدال منتظم للجوانتي والمستهلكات.' },
        { title: 'مطابقة المواصفات', text: 'نراجع المهمات قبل التسليم للتأكد من مطابقتها.' },
      ],
    },
    {
      id: 'operations',
      title: 'مستلزمات التشغيل',
      image: 'assets/img/categories/operations.webp',
      profile: 'assets/files/categories/operations.pdf',
      summary: 'أدوات العمل والمستلزمات الفنية التي يحتاجها التشغيل والصيانة اليومية.',
      products: [
        { name: 'أدوات القياس', desc: 'شرائط قياس ومساطر وأدوات قياس.', price: [63, 72], unit: '', images: ['assets/img/products/operations/tape-measure/1.webp', 'assets/img/products/operations/tape-measure/2.webp', 'assets/img/products/operations/tape-measure/3.webp'],
          items: [
            { name: 'شريط قياس ٥ م', desc: 'شريط معدني بقفل للقياسات اليومية.', unit: 'للقطعة', price: 63 },
            { name: 'شريط قياس ١٠ م', desc: 'للمسافات الأطول في المواقع.', unit: 'للقطعة', price: 66 },
            { name: 'مسطرة ألومنيوم ١ م', desc: 'مسطرة متينة للقياس والقطع المستقيم.', unit: 'للقطعة', price: 69 },
            { name: 'ميزان مياه ٦٠ سم', desc: 'لضبط استواء الأسطح والتركيبات.', unit: 'للقطعة', price: 72 },
          ] },
        { name: 'الكشافات', desc: 'كشافات يدوية وقابلة للشحن.', price: [72, 98], unit: '', images: ['assets/img/products/operations/flashlight/1.webp', 'assets/img/products/operations/flashlight/2.webp', 'assets/img/products/operations/flashlight/3.webp'],
          items: [
            { name: 'كشاف يدوي LED', desc: 'إضاءة قوية بحجم صغير.', unit: 'للقطعة', price: 72 },
            { name: 'كشاف قابل للشحن', desc: 'يعمل لساعات بشحنة واحدة.', unit: 'للقطعة', price: 81 },
            { name: 'كشاف رأس LED', desc: 'يترك اليدين حرتين أثناء العمل.', unit: 'للقطعة', price: 89 },
            { name: 'كشاف طوارئ حائط', desc: 'يضيء تلقائيًا عند انقطاع الكهرباء.', unit: 'للقطعة', price: 98 },
          ] },
        { name: 'الوصلات الكهربائية', desc: 'مشتركات ووصلات كهربائية.', price: [78, 100], unit: '', images: ['assets/img/products/operations/extension/1.webp', 'assets/img/products/operations/extension/2.webp', 'assets/img/products/operations/extension/3.webp'],
          items: [
            { name: 'مشترك ٣ مخارج ٣ م', desc: 'مشترك آمن بسلك طويل.', unit: 'للقطعة', price: 78 },
            { name: 'مشترك ٦ مخارج بمفتاح', desc: 'مفتاح تشغيل وحماية من الأحمال الزائدة.', unit: 'للقطعة', price: 85 },
            { name: 'وصلة كهرباء بكرة ١٥ م', desc: 'بكرة لتوصيل الكهرباء لمسافات طويلة.', unit: 'للقطعة', price: 93 },
            { name: 'مشترك بمنافذ USB', desc: 'لشحن الهواتف والأجهزة مباشرة.', unit: 'للقطعة', price: 100 },
          ] },
        { name: 'البطاريات', desc: 'بطاريات بمقاسات مختلفة للأجهزة.', price: [77, 93], unit: '', images: ['assets/img/products/operations/batteries/1.webp', 'assets/img/products/operations/batteries/2.webp', 'assets/img/products/operations/batteries/3.webp'],
          items: [
            { name: 'بطاريات AA (٤ قطع)', desc: 'بطاريات قلوية طويلة العمر.', unit: 'للعبوة', price: 77 },
            { name: 'بطاريات AAA (٤ قطع)', desc: 'للريموتات والأجهزة الصغيرة.', unit: 'للعبوة', price: 82 },
            { name: 'بطارية ٩ فولت', desc: 'لأجهزة الإنذار والقياس.', unit: 'للقطعة', price: 88 },
            { name: 'بطاريات قابلة للشحن AA', desc: 'توفير على المدى الطويل.', unit: 'للعبوة', price: 93 },
          ] },
        { name: 'شريط العزل', desc: 'شريط عزل كهربائي ولاصق فني.', price: [58, 80], unit: '', images: ['assets/img/products/operations/insulation/1.webp', 'assets/img/products/operations/insulation/2.webp', 'assets/img/products/operations/insulation/3.webp'],
          items: [
            { name: 'شريط عزل كهرباء أسود', desc: 'عزل آمن للتوصيلات الكهربائية.', unit: 'للبكرة', price: 58 },
            { name: 'شريط عزل ألوان (١٠ بكر)', desc: 'ألوان لتمييز الأسلاك والدوائر.', unit: 'للعبوة', price: 65 },
            { name: 'شريط لاصق فني قماش', desc: 'لاصق قوي للإصلاحات السريعة.', unit: 'للبكرة', price: 73 },
            { name: 'شريط تحذير أصفر وأسود', desc: 'لتحديد مناطق الخطر في المواقع.', unit: 'للبكرة', price: 80 },
          ] },
      ],
      services: [
        { title: 'مستلزمات الصيانة اليومية', text: 'أدوات ومستلزمات فنية لفرق الصيانة والتشغيل.' },
        { title: 'توريد حسب الطلب', text: 'نوفر الأصناف الفنية المحددة وفق المواصفات.' },
        { title: 'المستهلكات متوفرة دائمًا', text: 'بطاريات ولمبات ومستهلكات متوفرة باستمرار.' },
        { title: 'قائمة لكل موقع', text: 'قائمة مستلزمات تشغيل خاصة بكل موقع أو فرع.' },
      ],
    },
    {
      id: 'medical',
      title: 'المستلزمات الطبية',
      image: 'assets/img/categories/medical.webp',
      profile: 'assets/files/categories/medical.pdf',
      summary: 'الجوانتي، الكمامة، الشاش، اللصق الطبي، وشنط الإسعافات الأولية.',
      products: [
        { name: 'الجوانتي الطبي', desc: 'جوانتي لاتكس ونيتريل بمقاسات مختلفة.', price: [63, 80], unit: '', images: ['assets/img/products/medical/gloves/1.webp', 'assets/img/products/medical/gloves/2.webp', 'assets/img/products/medical/gloves/3.webp', 'assets/img/products/medical/gloves/4.webp'],
          items: [
            { name: 'جوانتي لاتكس (١٠٠ قطعة)', desc: 'جوانتي مرن للفحص والاستخدام الطبي.', unit: 'للعلبة', price: 63 },
            { name: 'جوانتي نيتريل أزرق (١٠٠ قطعة)', desc: 'بديل مناسب لمن لديهم حساسية من اللاتكس.', unit: 'للعلبة', price: 69 },
            { name: 'جوانتي فينيل شفاف (١٠٠ قطعة)', desc: 'اقتصادي للاستخدامات الخفيفة.', unit: 'للعلبة', price: 74 },
            { name: 'جوانتي جراحي معقم', desc: 'معقم ومغلف للاستخدامات الطبية الدقيقة.', unit: 'للعلبة', price: 80 },
          ] },
        { name: 'الكمامات', desc: 'كمامات طبية بعبوات مختلفة.', price: [81, 93], unit: '', images: ['assets/img/products/medical/masks/1.webp', 'assets/img/products/medical/masks/2.webp'],
          items: [
            { name: 'كمامات طبية ٣ طبقات (٥٠ قطعة)', desc: 'حماية يومية مريحة في التنفس.', unit: 'للعلبة', price: 81 },
            { name: 'كمامات KN95 ‏(١٠ قطع)', desc: 'ترشيح عالي للحماية الأفضل.', unit: 'للعلبة', price: 85 },
            { name: 'كمامات أطفال (٥٠ قطعة)', desc: 'مقاس مناسب للأطفال.', unit: 'للعلبة', price: 89 },
            { name: 'كمامات بصمام', desc: 'تنفس أسهل أثناء العمل.', unit: 'للعبوة', price: 93 },
          ] },
        { name: 'الشاش', desc: 'شاش طبي ورباط ضاغط.', price: [52, 64], unit: '', images: ['assets/img/products/medical/gauze/1.webp', 'assets/img/products/medical/gauze/2.webp', 'assets/img/products/medical/gauze/3.webp'],
          items: [
            { name: 'شاش طبي معقم (١٠ قطع)', desc: 'شاش معقم لتغطية الجروح.', unit: 'للعبوة', price: 52 },
            { name: 'رول شاش طبي', desc: 'رول اقتصادي للإسعافات.', unit: 'للرول', price: 56 },
            { name: 'رباط ضاغط ١٠ سم', desc: 'لتثبيت الضمادات ودعم المفاصل.', unit: 'للقطعة', price: 60 },
            { name: 'رباط مطاطي ١٥ سم', desc: 'رباط مرن لحالات الالتواء.', unit: 'للقطعة', price: 64 },
          ] },
        { name: 'اللصق الطبي', desc: 'بلاستر ولاصق طبي بأنواعه.', price: [77, 89], unit: '', images: ['assets/img/products/medical/plaster/1.webp', 'assets/img/products/medical/plaster/2.webp', 'assets/img/products/medical/plaster/3.webp'],
          items: [
            { name: 'بلاستر جروح (١٠٠ قطعة)', desc: 'بلاستر للجروح الصغيرة اليومية.', unit: 'للعلبة', price: 77 },
            { name: 'بلاستر مقاوم للمياه', desc: 'يثبت حتى مع الماء.', unit: 'للعلبة', price: 81 },
            { name: 'لاصق طبي ورقي', desc: 'لاصق لطيف على الجلد لتثبيت الشاش.', unit: 'للبكرة', price: 85 },
            { name: 'لاصق طبي قماش', desc: 'لاصق قوي لتثبيت الضمادات.', unit: 'للبكرة', price: 89 },
          ] },
        { name: 'شنط الإسعافات الأولية', desc: 'شنط إسعافات مجهزة للمكاتب والمواقع.', price: [83, 99], unit: '', images: ['assets/img/products/medical/first-aid/1.webp', 'assets/img/products/medical/first-aid/2.webp', 'assets/img/products/medical/first-aid/3.webp'],
          items: [
            { name: 'شنطة إسعافات صغيرة للمكاتب', desc: 'مجهزة بالأساسيات للمكاتب.', unit: 'للقطعة', price: 83 },
            { name: 'شنطة إسعافات للمواقع والمصانع', desc: 'محتويات أكثر لبيئات العمل.', unit: 'للقطعة', price: 88 },
            { name: 'صندوق إسعافات حائط', desc: 'يُثبت على الحائط ليكون في متناول الجميع.', unit: 'للقطعة', price: 94 },
            { name: 'شنطة إسعافات للسيارات', desc: 'مدمجة لسيارات الشركة.', unit: 'للقطعة', price: 99 },
          ] },
      ],
      services: [
        { title: 'إسعافات أولية للمكاتب', text: 'شنط إسعافات مجهزة لكل دور أو موقع.' },
        { title: 'توريد للمستشفيات والمجمعات', text: 'مستهلكات طبية بكميات منتظمة.' },
        { title: 'إعادة تعبئة دورية', text: 'نستكمل محتويات شنط الإسعافات بانتظام.' },
        { title: 'جودة وصلاحية', text: 'نحرص على جودة المستلزمات وتواريخ صلاحيتها.' },
      ],
    },
    {
      id: 'tools',
      title: 'العدد والآلات الخفيفة',
      image: 'assets/img/categories/tools.webp',
      profile: 'assets/files/categories/tools.pdf',
      summary: 'المفكات، المفاتيح، العدد الكهربائية، السلالم، وشنط العدة من ١٢ إلى ٥٠ قطعة.',
      products: [
        { name: 'المفكات', desc: 'أطقم مفكات بأحجام ورؤوس مختلفة.', price: [54, 97], unit: '', images: ['assets/img/products/tools/screwdrivers/1.webp', 'assets/img/products/tools/screwdrivers/2.webp', 'assets/img/products/tools/screwdrivers/3.webp'],
          items: [
            { name: 'مفك عادة وصليبة', desc: 'مفكان أساسيان لأعمال الصيانة اليومية.', unit: 'للطقم', price: 54 },
            { name: 'طقم مفكات ٦ قطع', desc: 'مقاسات متعددة بمقابض مريحة.', unit: 'للطقم', price: 68 },
            { name: 'طقم مفكات دقيقة', desc: 'للأجهزة والإلكترونيات الصغيرة.', unit: 'للطقم', price: 83 },
            { name: 'طقم مفكات بلقم ٣٢ قطعة', desc: 'لقم متعددة لكل الاستخدامات.', unit: 'للطقم', price: 97 },
          ] },
        { name: 'المفاتيح', desc: 'مفاتيح بلدي وإنجليزي وأطقم لقم.', price: [72, 85], unit: '', images: ['assets/img/products/tools/wrenches/1.webp', 'assets/img/products/tools/wrenches/2.webp', 'assets/img/products/tools/wrenches/3.webp'],
          items: [
            { name: 'طقم مفاتيح بلدي ٨ قطع', desc: 'مقاسات شائعة للصيانة.', unit: 'للطقم', price: 72 },
            { name: 'مفتاح إنجليزي ١٠ بوصة', desc: 'فك قابل للضبط لمقاسات مختلفة.', unit: 'للقطعة', price: 76 },
            { name: 'طقم لقم ٢٤ قطعة', desc: 'لقم وسقاطة لأعمال الفك والربط.', unit: 'للطقم', price: 81 },
            { name: 'طقم مفاتيح ألن', desc: 'للمسامير السداسية والأثاث.', unit: 'للطقم', price: 85 },
          ] },
        { name: 'العدد الكهربائية', desc: 'شنيور، صاروخ، ومفكات كهربائية.', price: [79, 88], unit: '', images: ['assets/img/products/tools/power-tools/1.webp', 'assets/img/products/tools/power-tools/2.webp', 'assets/img/products/tools/power-tools/3.webp'],
          items: [
            { name: 'شنيور كهربائي ٦٥٠ وات', desc: 'للثقب في الخشب والمعادن والحوائط.', unit: 'للقطعة', price: 79 },
            { name: 'صاروخ قطعية ٤٫٥ بوصة', desc: 'للقطع والتجليخ.', unit: 'للقطعة', price: 82 },
            { name: 'مفك كهربائي بالشحن', desc: 'فك وربط سريع بدون أسلاك.', unit: 'للقطعة', price: 85 },
            { name: 'دريل بطارية مع لقم', desc: 'دريل لاسلكي مع مجموعة لقم.', unit: 'للقطعة', price: 88 },
          ] },
        { name: 'السلالم', desc: 'سلالم ألومنيوم بارتفاعات مختلفة.', price: [80, 98], unit: '', images: ['assets/img/products/tools/ladders/1.webp'],
          items: [
            { name: 'سلم ألومنيوم ٤ درجات', desc: 'خفيف وثابت للأعمال المنزلية والمكتبية.', unit: 'للقطعة', price: 80 },
            { name: 'سلم ألومنيوم ٦ درجات', desc: 'ارتفاع أكبر للصيانة والتركيبات.', unit: 'للقطعة', price: 86 },
            { name: 'سلم ألومنيوم ٨ درجات', desc: 'للأسقف العالية والمخازن.', unit: 'للقطعة', price: 92 },
            { name: 'سلم ألومنيوم قابل للطي متعدد الأوضاع', desc: 'يتحول لأكثر من شكل حسب الاستخدام.', unit: 'للقطعة', price: 98 },
          ] },
        { name: 'شنط العدة', desc: 'شنط عدة من ١٢ إلى ٥٠ قطعة.', price: [73, 92], unit: '', images: ['assets/img/products/tools/toolbox/1.webp', 'assets/img/products/tools/toolbox/2.webp', 'assets/img/products/tools/toolbox/3.webp', 'assets/img/products/tools/toolbox/4.webp'],
          items: [
            { name: 'شنطة عدة ١٢ قطعة', desc: 'الأساسيات في شنطة واحدة.', unit: 'للطقم', price: 73 },
            { name: 'شنطة عدة ٢٥ قطعة', desc: 'تشكيلة أوسع لأعمال الصيانة.', unit: 'للطقم', price: 79 },
            { name: 'شنطة عدة ٥٠ قطعة', desc: 'طقم شامل لفرق الصيانة.', unit: 'للطقم', price: 86 },
            { name: 'صندوق عدة بلاستيك فارغ', desc: 'لتنظيم العدة وحملها.', unit: 'للقطعة', price: 92 },
          ] },
      ],
      services: [
        { title: 'تجهيز فرق الصيانة', text: 'عدد يدوية وكهربائية لفرق الصيانة والتشغيل.' },
        { title: 'أطقم كاملة', text: 'شنط عدة متكاملة حسب طبيعة العمل.' },
        { title: 'جودة للاستخدام المكثف', text: 'عدد مناسبة للاستخدام اليومي والمكثف.' },
        { title: 'حسب المواصفات', text: 'نوفر المقاسات والأنواع المطلوبة لكل موقع.' },
      ],
    },
  ],
};
