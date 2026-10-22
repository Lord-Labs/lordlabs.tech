// Editorial selection. A public repository appears only when it is listed here.
export const projects = [
  {
    platform: "desktop", repository: "ZipZap", slug: "zipzap", identity: "zipzap",
    title: {en:"ZipZap", ar:"ZipZap"},
    category: {en:"WINDOWS APP · OPEN SOURCE", ar:"تطبيق ويندوز · مفتوح المصدر"},
    tagline: {en:"Your downloads. Your rhythm.", ar:"تنزيلاتك. على إيقاعك."},
    description: {
      en:"A free Windows download manager built with Rust and Tauri. Pause, resume, and organize your downloads in an English or Arabic desktop experience.",
      ar:"مدير تنزيلات مجاني لويندوز، مبني بـRust وTauri. أوقف تنزيلاتك واستأنفها ورتّبها، في تجربة سطح مكتب بالعربية والإنجليزية."
    },
    website: "https://zipzap-website.vercel.app/",
    logo: "/assets/projects/zipzap.svg", cover: "/assets/projects/zipzap-desktop.jpg",
    coverAlt: {en:"The actual ZipZap Windows desktop interface in Arabic", ar:"واجهة تطبيق ZipZap الفعلية على ويندوز باللغة العربية"},
    facts: [{en:"Rust + Tauri",ar:"Rust + Tauri"},{en:"Windows",ar:"ويندوز"},{en:"English / العربية",ar:"العربية / English"}],
    note: {en:"Explore the project website for current beta details and installation guidance.",ar:"راجع موقع المشروع لمعرفة تفاصيل النسخة التجريبية الحالية وإرشادات التثبيت."}
  },
  {
    platform: "web", repository: "lor", slug: "lor", identity: "lor",
    title: {en:"LOR.", ar:"LOR."},
    category: {en:"VIDEO MEETINGS · OPEN SOURCE", ar:"اجتماعات فيديو · مفتوح المصدر"},
    tagline: {en:"Meet here. Keep the thread.", ar:"نلتقي هنا. ونكمل من حيث بدأنا."},
    description: {
      en:"Open-source video meetings in your browser, with no account or download. Collaborate with shared notes and a board, use Arabic and English captions, and return to decisions linked to their source.",
      ar:"اجتماعات فيديو مفتوحة المصدر من المتصفح، دون حساب أو تنزيل. تعاون بالملاحظات واللوحة المشتركة، واستخدم التفريغ بالعربية والإنجليزية، وعُد إلى قرارات مرتبطة بكلام أصحابها."
    },
    website: "https://lor-bay.vercel.app/about",
    logo: "/assets/projects/lor.svg", cover: "/assets/projects/lor-meeting.webp",
    coverAlt: {en:"LOR. meeting workspace and confirmed decisions, captured by the project with demonstration data", ar:"واجهة اجتماع LOR. والقرارات المؤكدة، من لقطة المشروع الرسمية ببيانات توضيحية"},
    facts: [{en:"Browser-based",ar:"من المتصفح"},{en:"No account",ar:"دون حساب"},{en:"English / العربية",ar:"العربية / English"}],
    note: {en:"The product capture uses demonstration data. Video and shared work do not require an AI key; optional transcription and text features have their own provider and quota settings. See the project page for current availability.",ar:"لقطة المنتج تستخدم بيانات توضيحية. مكالمات الفيديو والعمل المشترك لا يحتاجان مفتاح ذكاء اصطناعي؛ التفريغ ومعالجة النص اختياريان ولهما إعدادات مزوّد وحدود استخدام. راجع صفحة المشروع للتفاصيل الحالية."}
  }
];
export const projectCopy = (project, key, language) => project[key]?.[language] || project[key]?.en || "";
