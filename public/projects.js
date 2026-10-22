// Editorial selection. A public repository appears only when it is listed here.
export const projects = [
  {
    platform: "desktop", repository: "ZipZap", slug: "zipzap", identity: "zipzap",
    title: {en:"ZipZap", ar:"ZipZap"},
    category: {en:"WINDOWS APP · OPEN SOURCE", ar:"تطبيق ويندوز · مفتوح المصدر"},
    tagline: {en:"Keep your downloads in order.", ar:"تنزيلاتك، بترتيبك."},
    description: {
      en:"A free download manager for Windows. Pause, resume, and organize your files in a desktop app that speaks Arabic and English. Built with Rust and Tauri.",
      ar:"مدير تنزيلات مجاني لويندوز. أوقف التنزيل واستأنفه ورتّب ملفاتك من واجهة تدعم العربية والإنجليزية، مبنية باستخدام Rust وTauri."
    },
    website: "https://zipzap-website.vercel.app/",
    logo: "/assets/projects/zipzap.svg", cover: "/assets/projects/zipzap-desktop.jpg",
    coverAlt: {en:"The actual ZipZap Windows desktop interface in Arabic", ar:"واجهة تطبيق ZipZap الفعلية على ويندوز باللغة العربية"},
    facts: [{en:"Rust + Tauri",ar:"Rust + Tauri"},{en:"Windows",ar:"ويندوز"},{en:"English / العربية",ar:"العربية / English"}],
    features: [
      {icon:"pause",title:{en:"Pause. Pick up later.",ar:"توقّف، ثم أكمل."},description:{en:"Manage downloads around your day.",ar:"أوقف التنزيل واستأنفه في الوقت المناسب."}},
      {icon:"layers",title:{en:"A place for every file.",ar:"ملفاتك، بترتيب واضح."},description:{en:"Keep your downloads organized.",ar:"نظّم تنزيلاتك وتابعها من مكان واحد."}},
      {icon:"message-square",title:{en:"Two languages. One app.",ar:"لغتان. وتجربة واحدة."},description:{en:"An interface in Arabic and English.",ar:"واجهة تدعم العربية والإنجليزية."}}
    ],
    note: {en:"Explore the project website for current beta details and installation guidance.",ar:"راجع موقع المشروع لمعرفة تفاصيل النسخة التجريبية الحالية وإرشادات التثبيت."}
  },
  {
    platform: "web", repository: "lor", slug: "lor", identity: "lor",
    title: {en:"LOR.", ar:"LOR."},
    category: {en:"VIDEO MEETINGS · OPEN SOURCE", ar:"اجتماعات فيديو · مفتوح المصدر"},
    tagline: {en:"Meet. Collaborate. Keep the context.", ar:"اجتمعوا. تعاونوا. واحتفظوا بالسياق."},
    posterLine: {en:"Meet. Think together.", ar:"نلتقي. ونفكّر معًا."},
    description: {
      en:"Open-source video meetings in your browser, with no account or download. Collaborate with shared notes and a board, use Arabic and English captions, and return to decisions linked to their source.",
      ar:"اجتماعات فيديو مفتوحة المصدر من المتصفح، دون حساب أو تنزيل. تعاون بالملاحظات واللوحة المشتركة، واستخدم التفريغ بالعربية والإنجليزية، وارجع إلى القرارات مع الكلام الذي يوضّح سياقها."
    },
    website: "https://lor-bay.vercel.app/about",
    logo: "/assets/projects/lor.svg", cover: "/assets/projects/lor-meeting.webp",
    coverAlt: {en:"LOR. meeting workspace and confirmed decisions, captured by the project with demonstration data", ar:"واجهة اجتماع LOR. والقرارات المؤكدة، من لقطة المشروع الرسمية ببيانات توضيحية"},
    facts: [{en:"Browser-based",ar:"من المتصفح"},{en:"No account",ar:"دون حساب"},{en:"English / العربية",ar:"العربية / English"}],
    features: [
      {icon:"external-link",title:{en:"Open a link. Meet.",ar:"افتح الرابط. وابدأ."},description:{en:"Video meetings without an account or install.",ar:"اجتماعات فيديو دون حساب أو تثبيت."}},
      {icon:"layers",title:{en:"A shared place to think.",ar:"مساحة للتفكير معًا."},description:{en:"Work together with notes and a board.",ar:"تعاون عبر الملاحظات واللوحة المشتركة."}},
      {icon:"book-open",title:{en:"Keep the conversation.",ar:"ارجع إلى ما قيل."},description:{en:"Optional captions in Arabic and English.",ar:"تفريغ اختياري بالعربية والإنجليزية."}}
    ],
    note: {en:"The product capture uses demonstration data. Video and shared work do not require an AI key; optional transcription and text features have their own provider and quota settings. See the project page for current availability.",ar:"لقطة المنتج تستخدم بيانات توضيحية. مكالمات الفيديو والعمل المشترك لا يحتاجان مفتاح ذكاء اصطناعي؛ التفريغ ومعالجة النص اختياريان ولهما إعدادات مزوّد وحدود استخدام. راجع صفحة المشروع للتفاصيل الحالية."}
  }
];
export const projectCopy = (project, key, language) => project[key]?.[language] || project[key]?.en || "";
