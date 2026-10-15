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
     images قائمة صور المنتج — الأولى هي الصورة الرئيسية، والباقي يظهر بالتقليب (أسهم / نقاط / سحب)
   صور كل منتج في مجلده: assets/img/products/<المجال>/<المنتج>/1.webp, 2.webp …
   لتغيير صورة: استبدل الملف داخل مجلد المنتج بنفس الاسم.
   لإضافة صورة: ضعها في مجلد المنتج (مثل 4.webp) وأضف مسارها داخل images.
   لإضافة منتج: انسخ سطر منتج والصقه تحته وعدّل بياناته.
   ========================================================= */
window.DOKAN_CATALOG = {
  currency: 'ج.م',
  priceNote: 'الأسعار المعروضة أسعار استرشادية، وتختلف حسب الكمية والمواصفات.',

  categories: [
    {
      id: 'cleaning',
      title: 'مستهلكات وأدوات النظافة',
      image: 'assets/img/categories/cleaning.webp',
      summary: 'كل ما يحتاجه مقركم ليبقى نظيفًا كل يوم: منظفات، ملمعات، أدوات تنظيف، أكياس قمامة، مناديل، ومستلزمات الحمامات والمطابخ.',
      products: [
        { name: 'المنظفات', desc: 'منظفات أرضيات وأسطح وأطباق بأحجام مختلفة.', price: [69, 95], unit: '', images: ['assets/img/products/cleaning/detergents/1.webp', 'assets/img/products/cleaning/detergents/2.webp'] },
        { name: 'الملمعات', desc: 'ملمعات زجاج وأخشاب ومعادن.', price: [83, 94], unit: '', images: ['assets/img/products/cleaning/polish/1.webp'] },
        { name: 'أدوات النظافة', desc: 'مماسح، مقشات، جرادل، وفوط تنظيف.', price: [61, 92], unit: '', images: ['assets/img/products/cleaning/tools/1.webp', 'assets/img/products/cleaning/tools/2.webp', 'assets/img/products/cleaning/tools/3.webp'] },
        { name: 'أكياس القمامة', desc: 'أكياس بمقاسات وسُمك مختلف للمكاتب والمطابخ.', price: [57, 73], unit: '', images: ['assets/img/products/cleaning/bags/1.webp', 'assets/img/products/cleaning/bags/2.webp', 'assets/img/products/cleaning/bags/3.webp'] },
        { name: 'المناديل', desc: 'مناديل وجه ومطبخ ورول حمامات.', price: [65, 89], unit: '', images: ['assets/img/products/cleaning/tissues/1.webp', 'assets/img/products/cleaning/tissues/2.webp', 'assets/img/products/cleaning/tissues/3.webp', 'assets/img/products/cleaning/tissues/4.webp', 'assets/img/products/cleaning/tissues/5.webp', 'assets/img/products/cleaning/tissues/6.webp', 'assets/img/products/cleaning/tissues/7.webp'] },
        { name: 'مستلزمات الحمامات والمطابخ', desc: 'صابون سائل، معطرات، وموزعات.', price: [52, 77], unit: '', images: ['assets/img/products/cleaning/bathroom/1.webp', 'assets/img/products/cleaning/bathroom/2.webp'] },
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
      summary: 'أقلام، ملفات، دفاتر، أدوات تنظيم، وكل مستلزمات المكاتب اليومية.',
      products: [
        { name: 'الأقلام', desc: 'أقلام جاف وحبر وماركر وهايلايتر.', price: [84, 92], unit: '', images: ['assets/img/products/office/pens/1.webp', 'assets/img/products/office/pens/2.webp', 'assets/img/products/office/pens/3.webp'] },
        { name: 'الملفات', desc: 'ملفات بلاستيك وكرتون وحافظات أوراق.', price: [61, 77], unit: '', images: ['assets/img/products/office/files/1.webp', 'assets/img/products/office/files/2.webp', 'assets/img/products/office/files/3.webp'] },
        { name: 'الدفاتر والكشاكيل', desc: 'دفاتر وكشاكيل وبلوكات بمقاسات مختلفة.', price: [56, 87], unit: '', images: ['assets/img/products/office/notebooks/1.webp', 'assets/img/products/office/notebooks/2.webp', 'assets/img/products/office/notebooks/3.webp'] },
        { name: 'أدوات التنظيم', desc: 'منظمات مكتب، حوامل أوراق، وصناديق أرشيف.', price: [56, 99], unit: '', images: ['assets/img/products/office/organizers/1.webp', 'assets/img/products/office/organizers/2.webp'] },
        { name: 'مستلزمات المكاتب', desc: 'دباسات، خرامات، مشابك، ولاصق.', price: [79, 90], unit: '', images: ['assets/img/products/office/stapler/1.webp', 'assets/img/products/office/stapler/2.webp', 'assets/img/products/office/stapler/3.webp'] },
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
      summary: 'ورق طباعة وتصوير A4 وA3، رول ورق، أظرف، ومستلزمات ورقية متنوعة.',
      products: [
        { name: 'ورق A4', desc: 'ورق طباعة وتصوير بأوزان مختلفة.', price: [57, 91], unit: '', images: ['assets/img/products/paper/a4/1.webp', 'assets/img/products/paper/a4/2.webp'] },
        { name: 'ورق A3', desc: 'للطباعة والرسومات والمستندات الكبيرة.', price: [79, 100], unit: '', images: ['assets/img/products/paper/a3/1.webp', 'assets/img/products/paper/a3/2.webp'] },
        { name: 'رول الورق', desc: 'رول كاشير، رول فاكس، ورول ماكينات.', price: [68, 86], unit: '', images: ['assets/img/products/paper/rolls/1.webp', 'assets/img/products/paper/rolls/2.webp', 'assets/img/products/paper/rolls/3.webp'] },
        { name: 'الأظرف', desc: 'أظرف بمقاسات مختلفة للمراسلات.', price: [52, 95], unit: '', images: ['assets/img/products/paper/envelopes/1.webp', 'assets/img/products/paper/envelopes/2.webp'] },
        { name: 'ورق الملاحظات', desc: 'ورق ملاحظات لاصق وبلوكات.', price: [80, 94], unit: '', images: ['assets/img/products/paper/notes/1.webp', 'assets/img/products/paper/notes/2.webp', 'assets/img/products/paper/notes/3.webp'] },
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
      summary: 'شاي، قهوة، حليب، ينسون، سكر، ماكينات تحضير القهوة، وأدوات التقديم.',
      products: [
        { name: 'الشاي', desc: 'شاي فتلة وناعم بأنواعه.', price: [67, 92], unit: '', images: ['assets/img/products/buffet/tea/1.webp', 'assets/img/products/buffet/tea/2.webp', 'assets/img/products/buffet/tea/3.webp'] },
        { name: 'القهوة', desc: 'قهوة تركي وإسبريسو وسريعة التحضير.', price: [85, 95], unit: '', images: ['assets/img/products/buffet/coffee/1.webp', 'assets/img/products/buffet/coffee/2.webp', 'assets/img/products/buffet/coffee/3.webp'] },
        { name: 'الحليب', desc: 'حليب سائل وبودرة للبوفيه.', price: [83, 100], unit: '', images: ['assets/img/products/buffet/milk/1.webp', 'assets/img/products/buffet/milk/2.webp'] },
        { name: 'الينسون والأعشاب', desc: 'ينسون، نعناع، كركديه، ومشروبات أعشاب.', price: [65, 82], unit: '', images: ['assets/img/products/buffet/anise/1.webp', 'assets/img/products/buffet/anise/2.webp', 'assets/img/products/buffet/anise/3.webp'] },
        { name: 'السكر', desc: 'سكر أكياس ومكعبات وأظرف فردية.', price: [76, 89], unit: '', images: ['assets/img/products/buffet/sugar/1.webp', 'assets/img/products/buffet/sugar/2.webp'] },
        { name: 'ماكينات القهوة', desc: 'ماكينات تحضير القهوة للمكاتب.', price: [58, 100], unit: '', images: ['assets/img/products/buffet/machine/1.webp', 'assets/img/products/buffet/machine/2.webp', 'assets/img/products/buffet/machine/3.webp'] },
        { name: 'الأكواب وأدوات التقديم', desc: 'أكواب، أطباق، وأدوات تقديم ورقية وزجاجية.', price: [68, 93], unit: '', images: ['assets/img/products/buffet/cups/1.webp', 'assets/img/products/buffet/cups/2.webp', 'assets/img/products/buffet/cups/3.webp'] },
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
      summary: 'كراتين، بكر لصق، إستريتش، بابل، عبوات، وجراكن .. وحلول تغليف حسب الطلب.',
      products: [
        { name: 'الكراتين', desc: 'كراتين بمقاسات وطبقات مختلفة.', price: [76, 95], unit: '', images: ['assets/img/products/packaging/cartons/1.webp', 'assets/img/products/packaging/cartons/2.webp', 'assets/img/products/packaging/cartons/3.webp'] },
        { name: 'بكر اللصق', desc: 'بكر لصق شفاف وبني ومطبوع.', price: [52, 75], unit: '', images: ['assets/img/products/packaging/tape/1.webp', 'assets/img/products/packaging/tape/2.webp'] },
        { name: 'الإستريتش', desc: 'رول إستريتش لتغليف البالتات والشحنات.', price: [52, 78], unit: '', images: ['assets/img/products/packaging/stretch/1.webp'] },
        { name: 'البابل', desc: 'رول بابل لحماية المنتجات القابلة للكسر.', price: [60, 84], unit: '', images: ['assets/img/products/packaging/bubble/1.webp', 'assets/img/products/packaging/bubble/2.webp', 'assets/img/products/packaging/bubble/3.webp'] },
        { name: 'العبوات', desc: 'عبوات بلاستيك وورقية بأحجام مختلفة.', price: [67, 78], unit: '', images: ['assets/img/products/packaging/containers/1.webp', 'assets/img/products/packaging/containers/2.webp'] },
        { name: 'الجراكن', desc: 'جراكن بسعات مختلفة للسوائل.', price: [74, 96], unit: '', images: ['assets/img/products/packaging/jerrycans/1.webp'] },
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
      summary: 'الفيست، الخوذة، الجوانتي، أحذية السلامة، والعلامات الإرشادية.',
      products: [
        { name: 'الفيست العاكس', desc: 'فيست عاكس للمواقع والمخازن.', price: [61, 90], unit: '', images: ['assets/img/products/safety/vest/1.webp', 'assets/img/products/safety/vest/2.webp', 'assets/img/products/safety/vest/3.webp', 'assets/img/products/safety/vest/4.webp'] },
        { name: 'الخوذة', desc: 'خوذ حماية بألوان مختلفة.', price: [54, 77], unit: '', images: ['assets/img/products/safety/helmet/1.webp', 'assets/img/products/safety/helmet/2.webp'] },
        { name: 'الجوانتي', desc: 'جوانتي عمل وحماية بأنواعه.', price: [67, 99], unit: '', images: ['assets/img/products/safety/gloves/1.webp', 'assets/img/products/safety/gloves/2.webp'] },
        { name: 'العلامات الإرشادية', desc: 'لافتات تحذير وإرشاد وطوارئ.', price: [81, 99], unit: '', images: ['assets/img/products/safety/signs/1.webp', 'assets/img/products/safety/signs/2.webp'] },
        { name: 'أحذية السلامة', desc: 'أحذية سلامة بمقاسات مختلفة.', price: [79, 94], unit: '', images: ['assets/img/products/safety/boots/1.webp', 'assets/img/products/safety/boots/2.webp', 'assets/img/products/safety/boots/3.webp'] },
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
      summary: 'أدوات العمل والمستلزمات الفنية التي يحتاجها التشغيل والصيانة اليومية.',
      products: [
        { name: 'أدوات القياس', desc: 'شرائط قياس ومساطر وأدوات قياس.', price: [63, 72], unit: '', images: ['assets/img/products/operations/tape-measure/1.webp', 'assets/img/products/operations/tape-measure/2.webp', 'assets/img/products/operations/tape-measure/3.webp'] },
        { name: 'الكشافات', desc: 'كشافات يدوية وقابلة للشحن.', price: [72, 98], unit: '', images: ['assets/img/products/operations/flashlight/1.webp', 'assets/img/products/operations/flashlight/2.webp', 'assets/img/products/operations/flashlight/3.webp'] },
        { name: 'الوصلات الكهربائية', desc: 'مشتركات ووصلات كهربائية.', price: [78, 100], unit: '', images: ['assets/img/products/operations/extension/1.webp', 'assets/img/products/operations/extension/2.webp', 'assets/img/products/operations/extension/3.webp'] },
        { name: 'البطاريات', desc: 'بطاريات بمقاسات مختلفة للأجهزة.', price: [77, 93], unit: '', images: ['assets/img/products/operations/batteries/1.webp', 'assets/img/products/operations/batteries/2.webp', 'assets/img/products/operations/batteries/3.webp'] },
        { name: 'شريط العزل', desc: 'شريط عزل كهربائي ولاصق فني.', price: [58, 80], unit: '', images: ['assets/img/products/operations/insulation/1.webp', 'assets/img/products/operations/insulation/2.webp', 'assets/img/products/operations/insulation/3.webp'] },
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
      summary: 'الجوانتي، الكمامة، الشاش، اللصق الطبي، وشنط الإسعافات الأولية.',
      products: [
        { name: 'الجوانتي الطبي', desc: 'جوانتي لاتكس ونيتريل بمقاسات مختلفة.', price: [63, 80], unit: '', images: ['assets/img/products/medical/gloves/1.webp', 'assets/img/products/medical/gloves/2.webp', 'assets/img/products/medical/gloves/3.webp', 'assets/img/products/medical/gloves/4.webp'] },
        { name: 'الكمامات', desc: 'كمامات طبية بعبوات مختلفة.', price: [81, 93], unit: '', images: ['assets/img/products/medical/masks/1.webp', 'assets/img/products/medical/masks/2.webp'] },
        { name: 'الشاش', desc: 'شاش طبي ورباط ضاغط.', price: [52, 64], unit: '', images: ['assets/img/products/medical/gauze/1.webp', 'assets/img/products/medical/gauze/2.webp', 'assets/img/products/medical/gauze/3.webp'] },
        { name: 'اللصق الطبي', desc: 'بلاستر ولاصق طبي بأنواعه.', price: [77, 89], unit: '', images: ['assets/img/products/medical/plaster/1.webp', 'assets/img/products/medical/plaster/2.webp', 'assets/img/products/medical/plaster/3.webp'] },
        { name: 'شنط الإسعافات الأولية', desc: 'شنط إسعافات مجهزة للمكاتب والمواقع.', price: [83, 99], unit: '', images: ['assets/img/products/medical/first-aid/1.webp', 'assets/img/products/medical/first-aid/2.webp', 'assets/img/products/medical/first-aid/3.webp'] },
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
      summary: 'المفكات، المفاتيح، العدد الكهربائية، السلالم، وشنط العدة من ١٢ إلى ٥٠ قطعة.',
      products: [
        { name: 'المفكات', desc: 'أطقم مفكات بأحجام ورؤوس مختلفة.', price: [54, 97], unit: '', images: ['assets/img/products/tools/screwdrivers/1.webp', 'assets/img/products/tools/screwdrivers/2.webp', 'assets/img/products/tools/screwdrivers/3.webp'] },
        { name: 'المفاتيح', desc: 'مفاتيح بلدي وإنجليزي وأطقم لقم.', price: [72, 85], unit: '', images: ['assets/img/products/tools/wrenches/1.webp', 'assets/img/products/tools/wrenches/2.webp', 'assets/img/products/tools/wrenches/3.webp'] },
        { name: 'العدد الكهربائية', desc: 'شنيور، صاروخ، ومفكات كهربائية.', price: [79, 88], unit: '', images: ['assets/img/products/tools/power-tools/1.webp', 'assets/img/products/tools/power-tools/2.webp', 'assets/img/products/tools/power-tools/3.webp'] },
        { name: 'السلالم', desc: 'سلالم ألومنيوم بارتفاعات مختلفة.', price: [80, 98], unit: '', images: ['assets/img/products/tools/ladders/1.webp'] },
        { name: 'شنط العدة', desc: 'شنط عدة من ١٢ إلى ٥٠ قطعة.', price: [73, 92], unit: '', images: ['assets/img/products/tools/toolbox/1.webp', 'assets/img/products/tools/toolbox/2.webp', 'assets/img/products/tools/toolbox/3.webp', 'assets/img/products/tools/toolbox/4.webp'] },
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
