
export const PROMPTS = {
  ANALYZE: `أنت خبير في تصميم مشاريع المنظمات غير الحكومية (NGOs).
المُدخلات:
- قطاع المشروع: {{Category}}
- المشكلة/الفكرة: {{Project_Idea}}
- الفئة المستهدفة: {{Beneficiaries}}
- الدولة / المنطقة: {{Country}}
- لغة المستخدم: {{Language}}

المطلوب: تحليل معمق للسياق، تقييم الاحتياج، وتحديد التحديات في {{Country}}. ابدأ مباشرة بدون مقدمات بلغة {{Language}}.`,

  GENERATE_IDEAS: `بناءً على التحليل: {{Analyzed_Idea}}
قم بتوليد 3 استراتيجيات مشاريع احترافية لقطاع {{Category}} في {{Country}}.
استخدم لغة {{Language}}.
IMPORTANT: Return the result ONLY as a JSON array with: name, description, goal, appeal.`,

  CREATE_PROPOSAL: `بصفتك كاتب مقترحات خبير، أنشئ مقترح مشروع شامل لـ: {{Selected_Title}}.
القطاع: {{Category}}، المستفيدون: {{Beneficiaries}}، الدولة: {{Country}}.
يجب أن يتضمن: الملخص، الخلفية، المشكلة، الأهداف، الأنشطة، المنهجية، النتائج، الاستدامة، المخاطر.
اللغة: {{Language}}. ابدأ بالعنوان مباشرة.`,

  CREATE_LOGFRAME: `أنشئ إطاراً منطقياً (Logical Framework Matrix) احترافياً لمشروع: {{Project_Name}}.
يجب أن يغطي المستويات: الأثر (Goal)، النتائج (Outcomes)، المخرجات (Outputs)، والأنشطة (Activities).
استخدم لغة {{Language}}.
IMPORTANT: Return the result ONLY as a JSON array of objects with keys: level, description, indicators, verification, assumptions.`,

  CREATE_TIMELINE: `أنشئ خطة زمنية تنفيذية لمشروع: {{Project_Name}} مدتها 12 شهراً.
حدد الأنشطة الرئيسية، الشهر المتوقع للتنفيذ، والجهة المسؤولة.
اللغة: {{Language}}.
IMPORTANT: Return ONLY a JSON array of objects with keys: activity, month (number 1-12), responsible.`,

  CREATE_BUDGET: `أنشئ ميزانية واقعية بالعملة المحلية لـ {{Country}} لمشروع: {{Project_Name}}.
اللغة: {{Language}}.
IMPORTANT: Return ONLY a JSON object with: currency, items (array with category, item, description, quantity, unitCost, total).`,

  REFINE_PROPOSAL: `عدل مقترح المشروع التالي بناءً على الطلب: {{User_Edit_Request}}.
المقترح الحالي: {{Current_Project}}
اللغة: {{Language}}.`,
};

export const LANGUAGES = [
  { code: 'ar', label: 'العربية' },
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
];

export const CATEGORIES = [
    { id: 'education', ar: 'التعليم', en: 'Education', fr: 'Éducation' },
    { id: 'health', ar: 'الصحة', en: 'Health', fr: 'Santé' },
    { id: 'empowerment', ar: 'التمكين الاقتصادي', en: 'Economic Empowerment', fr: 'Autonomisation économique' },
    { id: 'protection', ar: 'الحماية', en: 'Protection', fr: 'Protection' },
    { id: 'wash', ar: 'المياه والإصحاح (WASH)', en: 'WASH', fr: 'EAH' },
    { id: 'food', ar: 'الأمن الغذائي', en: 'Food Security', fr: 'Sécurité alimentaire' },
    { id: 'emergency', ar: 'الاستجابة للطوارئ', en: 'Emergency Response', fr: 'Réponse d\'urgence' },
    { id: 'environment', ar: 'البيئة والمناخ', en: 'Environment', fr: 'Environnement' },
    { id: 'other', ar: 'أخرى', en: 'Other', fr: 'Autre' },
];

export const UI_TEXT: any = {
  ar: {
    heroTitle: "أثــر",
    heroSubtitle: "أداة ذكية لصناعة التغيير الإنساني",
    platformGoal: "منصة احترافية تساعد المنظمات على تخطيط مشاريعها، كتابة المقترحات، وتصميم الإطارات المنطقية والميزانيات بذكاء.",
    targetAudienceTitle: "لمن هذه المنصة؟",
    targetAudience: ["المنظمات غير الحكومية", "فرق الاستجابة", "كتاب المقترحات", "رواد العمل الخيري"],
    stepsTitle: "رحلة البناء",
    steps: ["تحديد المشكلة", "رسم الاستراتيجية", "بناء المقترح المتكامل"],
    
    labelIdea: "وصف المشكلة / الفكرة",
    placeholderIdea: "اشرح المشكلة الإنسانية التي تسعى لحلها...",
    labelCategory: "قطاع المشروع",
    labelBeneficiaries: "المستفيدون",
    placeholderBeneficiaries: "الأيتام، النساء، اللاجئين...",
    labelCountry: "الدولة / المنطقة",
    placeholderCountry: "اليمن، فلسطين، السودان...",
    labelLanguage: "لغة العمل",
    
    btnAnalyze: "بدء التحليل الاستراتيجي",
    analysisTitle: "تحليل الاحتياج والسياق",
    btnIdeas: "توليد استراتيجيات الحل",
    selectTitle: "مخطط المشروع",
    selectSubtitle: "اختر الاستراتيجية التي تحقق أكبر أثر ممكن.",
    btnSelect: "اعتماد الاستراتيجية",
    draftTitle: "مقترح المشروع الكامل",
    btnAssistant: "المساعد الذكي",
    btnLogFrame: "تصميم الإطار المنطقي",
    btnTimeline: "الخطة الزمنية",
    btnBudget: "الميزانية المالية",
    assistantPlaceholder: "كيف يمكنني تحسين هذا القسم؟",
    btnRefine: "تحديث",
    refining: "جاري التحسين...",
    budgetTitle: "الميزانية التفصيلية",
    totalCost: "الإجمالي التقديري",
    btnExportWord: "تصدير المقترح الكامل",
    btnExportExcel: "تصدير البيانات المالية",
    btnExportCSV: "تصدير ملف CSV",
    loading: "الذكاء الاصطناعي يبني مشروعك الآن...",
    startOver: "مشروع جديد",
    dismiss: "إغلاق",
    selectIdeaBtn: "هذه هي الاستراتيجية الأفضل",
    goalLabel: "الهدف الاستراتيجي",
    appealLabel: "نقاط القوة للمانحين",
    logFrameTitle: "الإطار المنطقي (LogFrame)",
    timelineTitle: "خطة التنفيذ (12 شهر)",
    historyTitle: "أرشيف الأثر",
    historySubtitle: "مشاريعك التي قمت بتصميمها سابقاً",
    noProjects: "لا توجد مشاريع محفوظة حالياً.",
    btnLoad: "استعراض المشروع",
    btnDelete: "حذف",
    costDist: "توزيع التكاليف",
    colCategory: "الفئة",
    colItem: "البند",
    colDesc: "الوصف",
    colQty: "الكمية",
    colUnit: "تكلفة الوحدة",
    colTotal: "الإجمالي"
  },
  en: {
    heroTitle: "Athar",
    heroSubtitle: "A smart tool for humanitarian change",
    platformGoal: "A professional platform helping NGOs plan projects, write proposals, and design logical frameworks and budgets intelligently.",
    targetAudienceTitle: "Who is this for?",
    targetAudience: ["NGOs", "Response Teams", "Proposal Writers", "Philanthropists"],
    stepsTitle: "The Journey",
    steps: ["Identify Problem", "Strategize", "Build Proposal"],

    labelIdea: "Problem / Idea Description",
    placeholderIdea: "Describe the humanitarian problem...",
    labelCategory: "Project Sector",
    labelBeneficiaries: "Beneficiaries",
    placeholderBeneficiaries: "Orphans, Women, Refugees...",
    labelCountry: "Country / Region",
    placeholderCountry: "Yemen, Palestine, Sudan...",
    labelLanguage: "Language",

    btnAnalyze: "Start Strategic Analysis",
    analysisTitle: "Needs & Context Analysis",
    btnIdeas: "Generate Strategies",
    selectTitle: "Project Planner",
    selectSubtitle: "Choose the strategy that maximizes impact.",
    btnSelect: "Adopt Strategy",
    draftTitle: "Full Project Proposal",
    btnAssistant: "AI Assistant",
    btnLogFrame: "Logical Framework",
    btnTimeline: "Implementation Plan",
    btnBudget: "Financial Budget",
    assistantPlaceholder: "How can I improve this section?",
    btnRefine: "Refine",
    refining: "Refining...",
    budgetTitle: "Detailed Budget",
    totalCost: "Estimated Total",
    btnExportWord: "Export Full Proposal",
    btnExportExcel: "Export Financials",
    btnExportCSV: "Export CSV",
    loading: "AI is constructing your project...",
    startOver: "New Project",
    dismiss: "Dismiss",
    selectIdeaBtn: "Select Strategy",
    goalLabel: "Strategic Goal",
    appealLabel: "Donor Appeal",
    logFrameTitle: "Logical Framework (LogFrame)",
    timelineTitle: "Execution Plan (12 Mo)",
    historyTitle: "Impact Archive",
    historySubtitle: "Your previously designed projects",
    noProjects: "No projects saved yet.",
    btnLoad: "View Project",
    btnDelete: "Delete",
    costDist: "Cost Distribution",
    colCategory: "Category",
    colItem: "Item",
    colDesc: "Description",
    colQty: "Quantity",
    colUnit: "Unit Cost",
    colTotal: "Total"
  }
};
