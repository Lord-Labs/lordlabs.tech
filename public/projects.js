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
  },
  {
    platform: "web", repository: "OpenDownload", slug: "opendownload", identity: "opendownload",
    title: {en:"OpenDownload", ar:"OpenDownload"},
    category: {en:"PUBLIC MEDIA · OPEN SOURCE", ar:"تنزيل الوسائط · مفتوح المصدر"},
    tagline: {en:"Your media. Your way.", ar:"وسائطك. بطريقتك."},
    description: {
      en:"Save public video, audio and images from a browser workspace. Inspect available formats, follow download progress, and use the app in Arabic or English without an account. Self-hostable with Next.js and Go.",
      ar:"نزّل الفيديو والصوت والصور العامة من مساحة عمل في المتصفح. راجع الصيغ المتاحة وتابع تقدّم التنزيل، بواجهة عربية وإنجليزية دون حساب، مع إمكانية الاستضافة الذاتية باستخدام Next.js وGo."
    },
    website: "https://opendownload-website.vercel.app/en",
    app: "https://opendownload.lord.blitz.cloud/",
    logo: "/assets/projects/opendownload.svg", cover: "/assets/projects/opendownload-workspace.jpg",
    coverWidth: 1065, coverHeight: 927,
    coverAlt: {en:"The actual OpenDownload workspace showing a public Threads video and its available format", ar:"واجهة OpenDownload الفعلية تعرض فيديو عامًا من Threads وصيغته المتاحة"},
    facts: [{en:"Next.js + Go",ar:"Next.js + Go"},{en:"Self-hostable",ar:"استضافة ذاتية"},{en:"English / العربية",ar:"العربية / English"}],
    features: [
      {icon:"external-link",title:{en:"Paste a public link.",ar:"ابدأ برابط عام."},description:{en:"Inspect the media and formats available from the source.",ar:"راجع الوسائط والصيغ المتاحة من المصدر."}},
      {icon:"layers",title:{en:"Video. Audio. Images.",ar:"فيديو. صوت. صور."},description:{en:"Save supported public media and follow download progress.",ar:"نزّل الوسائط العامة المدعومة وتابع تقدّم التنزيل."}},
      {icon:"message-square",title:{en:"Arabic and English.",ar:"بالعربية والإنجليزية."},description:{en:"A bilingual workspace with RTL support and no account required.",ar:"مساحة عمل بلغتين تدعم اتجاه العربية دون الحاجة إلى حساب."}}
    ],
    note: {en:"For public content you own or have permission to save. Source support varies by link; YouTube and private or protected content are excluded. Files on the public app expire after 15 minutes. See the project website for current capabilities.",ar:"للمحتوى العام الذي تملكه أو لديك إذن بتنزيله. يختلف الدعم حسب الرابط؛ لا يشمل YouTube أو المحتوى الخاص أو المحمي. تنتهي صلاحية الملفات على التطبيق العام بعد 15 دقيقة. راجع موقع المشروع لمعرفة الإمكانات الحالية."}
  }
];
export const projectCopy = (project, key, language) => project[key]?.[language] || project[key]?.en || "";
