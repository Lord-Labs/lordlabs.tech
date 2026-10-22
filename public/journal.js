export const posts = [
  {
    slug:"patchwork-by-design", art:"patchwork", cover:"/assets/editorial/field-of-ideas.jpg", minutes:3, date:"2026-10-21",
    en:{category:"DESIGN NOTES",title:"One canvas. Many possibilities.",summary:"How a shared visual language leaves room for every project to be itself.",
      intro:"A lab is a place for different ideas. Its website should give those ideas a clear home without making every project look the same.",
      sections:[
        {title:"Start with the frame",paragraphs:["A consistent frame helps people know where they are. Navigation, reading width, spacing, and the way links behave should feel familiar from one section to the next. This is the quiet infrastructure of a good experience.","Inside that frame, a project can have its own color, typography, and imagery. ZipZap keeps the emerald identity of its own website; the lab keeps the warm Canvas and orange of Patchwork. The relationship is visible without erasing either identity."]},
        {title:"Let the work carry the color",paragraphs:["Use strong color where it tells a story: a project cover, a short heading, a clear next action. Keep descriptions on calm surfaces so they remain easy to scan. A visual system becomes more distinctive when its decisions are repeated with care, rather than when everything competes for attention."]},
        {title:"Give motion a small job",paragraphs:["A pattern can make a page feel alive without becoming its subject. Keep its contrast low, leave the reading area quiet, and move it slowly. Opening a panel or pressing a button needs a quicker response.","Motion is optional. Pausing it should preserve every word, every link, and every useful state. The same applies to a device that asks for reduced motion: the composition still has to work as a still image."]}
      ], takeaway:"A shared frame creates familiarity. Individual projects bring the personality.", sources:[{label:"Arc UI — Motion",url:"https://uiarc.dev/docs/motion"}]},
    ar:{category:"ملاحظات التصميم",title:"لوحة واحدة. احتمالات كثيرة.",summary:"كيف تمنح اللغة البصرية المشتركة كل مشروع مساحة ليحتفظ بشخصيته؟",
      intro:"المعمل مساحة لأفكار مختلفة. وموقعه ينبغي أن يمنح هذه الأفكار بيتًا واضحًا، دون أن يجعل كل مشروع نسخة بصرية من الآخر.",
      sections:[
        {title:"ابدأ بالإطار",paragraphs:["الإطار المتسق يساعد الزائر على معرفة مكانه. التنقل، وعرض النص، والمسافات، وطريقة عمل الروابط، ينبغي أن تظل مألوفة من قسم إلى آخر. هذه البنية الهادئة هي ما يجعل التجربة مريحة.","داخل هذا الإطار، يستطيع كل مشروع أن يمتلك لونه وصوره ولغته الخاصة. يحتفظ ZipZap بهويته الزمردية الموجودة في موقعه، ويحتفظ المعمل بدرجات Canvas الدافئة وبرتقالي Patchwork. العلاقة واضحة، دون أن تلغي هويةٌ الأخرى."]},
        {title:"دع العمل يحمل اللون",paragraphs:["استخدم اللون القوي عندما يروي شيئًا: غلاف مشروع، أو عنوان قصير، أو خطوة تالية واضحة. واترك الوصف على مساحة هادئة يسهل مسحها بالعين. تصبح اللغة البصرية أكثر تميّزًا عندما تتكرر قراراتها بعناية، لا عندما يتنافس كل عنصر على الانتباه."]},
        {title:"أعطِ الحركة مهمة صغيرة",paragraphs:["يمكن للباترن أن يمنح الصفحة حياة دون أن يصبح موضوعها. قلّل تباينه، واترك منطقة القراءة هادئة، واجعل حركته بطيئة. أما فتح لوحة أو ضغط زر فيحتاج إلى استجابة أسرع.","الحركة اختيارية. إيقافها ينبغي أن يحتفظ بكل كلمة ورابط وحالة مفيدة. وينطبق الأمر نفسه عندما يطلب الجهاز تقليل الحركة: يجب أن يظل التكوين ناجحًا كصورة ثابتة."]}
      ],takeaway:"الإطار المشترك يصنع الألفة. والمشاريع المختلفة تمنح المكان شخصيته.",sources:[{label:"Arc UI — الحركة",url:"https://uiarc.dev/docs/motion"}]}
  },
  {
    slug:"a-curated-window", art:"selection", cover:"/assets/editorial/a-small-universe.jpg", minutes:2,date:"2026-10-21",
    en:{category:"BUILDING IN THE OPEN",title:"A window into the work, not a mirror of GitHub.",summary:"Why selected projects make a better starting point than an automatic repository list.",
      intro:"A repository list answers what exists. A project showcase should also explain why a piece of work is worth exploring and where to begin.",
      sections:[
        {title:"Choose deliberately",paragraphs:["A public experiment, an internal convention, and a product intended for daily use do not need the same treatment. Select the projects that tell the clearest story about the lab. Keep their order intentional, and update that selection as the work changes.","Selection is editorial. GitHub provides useful facts such as the license, language, and last push; it should not decide which projects are featured."]},
        {title:"Answer three questions",paragraphs:["What is it? Who is it for? What can I do next? A short description, a faithful image, and separate links to the product and source often answer these questions better than a wall of repository statistics.","An actual application screenshot can show what exists today. A concept illustration can explain an idea. Make that distinction clear, and avoid presenting mock data as a performance claim."]},
        {title:"Keep discovery honest",paragraphs:["Search should only return projects in the selected collection. A new public repository should wait for an explicit editorial decision. If live metadata is unavailable, keep the saved selection visible and say that its metadata is a saved copy."]}
      ],takeaway:"Give each selected project context, its own identity, and one obvious next step.",sources:[]},
    ar:{category:"البناء على المكشوف",title:"نافذة على العمل، لا مرآة لـGitHub.",summary:"لماذا تكون المشاريع المختارة بداية أفضل من قائمة تلقائية بكل المستودعات؟",
      intro:"قائمة المستودعات تجيب عمّا هو موجود. أما معرض المشاريع فينبغي أن يوضح أيضًا لماذا يستحق العمل الاستكشاف، ومن أين يبدأ الزائر.",
      sections:[
        {title:"اختر عن قصد",paragraphs:["التجربة الأولية، والملف التنظيمي، والمنتج الموجّه للاستخدام اليومي، لا تحتاج جميعها إلى المعاملة نفسها. اختر المشاريع التي تحكي أوضح قصة عن المعمل، واجعل ترتيبها مقصودًا، وراجع الاختيار مع تطوّر العمل.","الاختيار قرار تحريري. يوفّر GitHub حقائق مفيدة مثل الترخيص واللغة وآخر تحديث، لكنه لا ينبغي أن يقرر أي المشاريع تظهر في الواجهة."]},
        {title:"أجب عن ثلاثة أسئلة",paragraphs:["ما المشروع؟ ولمن صُنع؟ وما الخطوة التالية؟ وصف قصير، وصورة أمينة، وروابط منفصلة للمنتج والكود، غالبًا ما تجيب أفضل من مساحة مزدحمة بإحصاءات المستودع.","صورة التطبيق الفعلية تعرض ما هو موجود اليوم. والرسم التوضيحي يشرح فكرة. اجعل الفرق واضحًا، ولا تقدّم بيانات توضيحية على أنها قياس للأداء."]},
        {title:"اجعل الاستكشاف صادقًا",paragraphs:["البحث ينبغي أن يعرض المشاريع الموجودة في المجموعة المختارة فقط. وأي مستودع عام جديد ينتظر قرارًا صريحًا بإضافته. وإذا تعذر تحديث البيانات، أبقِ الاختيار المحفوظ ظاهرًا ووضّح أن بياناته نسخة محفوظة."]}
      ],takeaway:"امنح كل مشروع مختار سياقًا وهويته الخاصة وخطوة تالية واضحة.",sources:[]}
  },
  {
    slug:"your-first-small-contribution",art:"contribution", cover:"/assets/editorial/open-possibilities.jpg",minutes:3,date:"2026-10-21",
    en:{category:"CONTRIBUTOR NOTES",title:"Your first contribution can be small.",summary:"A practical route from understanding a project to proposing one useful change.",
      intro:"You do not have to understand an entire codebase to help. Start with a problem you can describe clearly and a change you can review confidently.",
      sections:[
        {title:"Read before changing",paragraphs:["Read the README and contribution guide. Check which version and platform the project supports, how it is run locally, and what checks a contributor should complete. Look through existing issues before opening another one.","An unclear instruction, a missing example, or a reproducible bug can be a useful starting point. For a substantial change, discuss the scope with the maintainers first."]},
        {title:"Make the change easy to review",paragraphs:["Follow the repository's contribution workflow. Work on a focused branch, keep the change small, and run the checks relevant to what you changed. Include the steps needed to reproduce a bug and verify a fix.","For a documentation change, test the instructions themselves. For an interface change, check keyboard use and the layouts and languages it affects. Explain the result with a short before-and-after example."]},
        {title:"Explain the purpose",paragraphs:["A pull request should say what problem it solves, how behavior changes, and how it was checked. Mention limitations plainly. Review is a conversation: be ready to adjust the proposal as more context becomes available."]}
      ],takeaway:"One clear problem, one focused change, and enough evidence for someone else to review it.",sources:[{label:"GitHub — Contributing to a project",url:"https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project"}]},
    ar:{category:"ملاحظات المساهمين",title:"مساهمتك الأولى يمكن أن تكون صغيرة.",summary:"طريق عملي من فهم المشروع إلى اقتراح تحسين مفيد ومحدد.",
      intro:"لا تحتاج إلى فهم قاعدة الكود بالكامل كي تساعد. ابدأ بمشكلة تستطيع وصفها بوضوح، وتغيير تستطيع مراجعته بثقة.",
      sections:[
        {title:"اقرأ قبل أن تغيّر",paragraphs:["اقرأ README ودليل المساهمة. راجع الإصدار والمنصات المدعومة، وطريقة التشغيل محليًا، والفحوص المطلوبة من المساهم. وابحث في القضايا المفتوحة قبل إنشاء قضية جديدة.","تعليمات غير واضحة، أو مثال ناقص، أو خطأ يمكن تكراره، كلها بدايات مفيدة. أما التغيير الكبير فمن الأفضل مناقشة نطاقه مع القائمين على المشروع أولًا."]},
        {title:"اجعل التغيير سهل المراجعة",paragraphs:["اتبع مسار المساهمة المعتمد في المستودع. اعمل على فرع محدد، وحافظ على حجم صغير للتغيير، وشغّل الفحوص المناسبة لما عدّلته. أرفق خطوات تكرار الخطأ والتحقق من الإصلاح.","عند تعديل التوثيق، جرّب التعليمات نفسها. وعند تعديل الواجهة، راجع لوحة المفاتيح والمقاسات واللغات المتأثرة. اشرح النتيجة بمثال قصير يوضح ما قبل التغيير وما بعده."]},
        {title:"اشرح الغرض",paragraphs:["ينبغي أن يوضح Pull Request المشكلة التي يعالجها، وكيف تغيّر السلوك، وكيف تحققت منه. اذكر الحدود بصراحة. المراجعة حوار؛ كن مستعدًا لتعديل الاقتراح عندما تظهر معلومات إضافية."]}
      ],takeaway:"مشكلة واضحة، وتغيير محدد، وأدلة كافية ليتمكن شخص آخر من مراجعته.",sources:[{label:"GitHub — المساهمة في مشروع",url:"https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project"}]}
  }
];
