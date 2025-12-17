
export const PROMPTS = {
  ANALYZE: `أنت خبير في تصميم مشاريع المنظمات غير الحكومية (NGOs).

المُدخلات:
- قطاع المشروع: {{Category}}
- المشكلة/الفكرة: {{Project_Idea}}
- الفئة المستهدفة: {{Beneficiaries}}
- الدولة / المنطقة: {{Country}}
- لغة المستخدم: {{Language}}

المطلوب:
1. تحليل الفكرة من حيث:
   - مدى ملاءمة الفكرة للسياق الجغرافي ({{Country}})
   - تقييم الاحتياج للفئة المستهدفة ({{Beneficiaries}})
2. تحديد التحديات الرئيسية في {{Country}} المرتبطة بهذا القطاع.
3. تقديم ملخص تحليلي احترافي لا يتجاوز 150 كلمة.

تعليمات هامة:
- لا تبدأ بعبارة "أنا خبير" أو أي مقدمات.
- ابدأ التحليل مباشرة.
- استخدم لغة {{Language}} فقط.`,

  GENERATE_IDEAS: `بناءً على تحليل فكرة المشروع التالية:
{{Analyzed_Idea}}

سياق المشروع:
- القطاع: {{Category}}
- الدولة: {{Country}}

قم بما يلي:
1. توليد 3 أفكار مشاريع بديلة أو مطورة.
2. كل فكرة يجب أن تحتوي على:
   - اسم المشروع
   - وصف مختصر
   - الهدف الرئيسي
   - سبب جاذبيتها للجهات الداعمة
3. تأكد أن الأفكار:
   - واقعية
   - مناسبة لسياق {{Country}}
   - قابلة للتنفيذ من قبل منظمة غير حكومية

استخدم لغة {{Language}}.

IMPORTANT: Return the result ONLY as a JSON array with the following structure, no markdown formatting:
[
  {
    "name": "Project Name",
    "description": "Short description",
    "goal": "Main goal",
    "appeal": "Why it is attractive"
  }
]`,

  CREATE_PROPOSAL: `أنت كاتب مقترحات مشاريع محترف للمنظمات غير الحكومية.

الفكرة المختارة:
اسم المشروع: {{Selected_Title}}
الوصف: {{Selected_Description}}
الهدف: {{Selected_Goal}}

معلومات إضافية:
- القطاع: {{Category}}
- المستفيدون: {{Beneficiaries}}
- الدولة: {{Country}}

أنشئ مقترح مشروع احترافي وشامل يحتوي على الأقسام التالية بالترتيب:

1. الملخص التنفيذي
2. خلفية واحتياج المشروع (مبني على السياق الجغرافي)
3. مشكلة المشروع
4. أهداف المشروع (عامة وخاصة)
5. الفئة المستهدفة (تحليل دقيق)
6. الأنشطة الرئيسية
7. منهجية التنفيذ
8. النتائج المتوقعة
9. مؤشرات الأداء
10. خطة المراقبة والتقييم
11. الاستدامة
12. المخاطر وخطط التخفيف
13. الخاتمة

تعليمات صارمة:
- لا تقم بكتابة أي مقدمات مثل "بصفتي خبير..." أو "إليك المقترح".
- ابدأ فوراً بالعنوان الأول "1. الملخص التنفيذي".
- استخدم لغة رسمية ومقنعة جداً.
- اللغة المطلوبة: {{Language}}`,

  CREATE_BUDGET: `أنشئ ميزانية تفصيلية وشاملة جداً لمقترح المشروع هذا في دولة {{Country}}.

المشروع: {{Project_Name}}

المطلوب:
جدول ميزانية منظم وتفصيلي يشمل جميع التكاليف المتوقعة (إدارية، تشغيلية، أنشطة، موارد بشرية، تسويق، تقييم ومتابعة).
يجب أن تكون الأرقام واقعية للسوق في {{Country}}.

استخدم لغة {{Language}}.

IMPORTANT: Return the result ONLY as a JSON object with this structure:
{
  "currency": "Currency Code (e.g. USD, EGP)",
  "items": [
    {
      "category": "Admin/Operational/Activity/HR",
      "item": "Item Name",
      "description": "Short desc",
      "quantity": 1,
      "unitCost": 100,
      "total": 100
    }
  ]
}`,

  REFINE_PROPOSAL: `أنت مساعد ذكي لتحسين مقترحات المشاريع.

المشروع الحالي:
{{Current_Project}}

طلب المستخدم:
{{User_Edit_Request}}

قم بما يلي:
1. فهم التعديل المطلوب بدقة.
2. تعديل الجزء المعني فقط دون التأثير على بقية المشروع.
3. تحسين الصياغة وجعلها أكثر احترافية.
4. عرض النسخة المعدلة بوضوح (المقترح بالكامل) بدون مقدمات.

استخدم لغة {{Language}}.`,
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
    heroSubtitle: "أثر ليست مجرد منصة ....بل أداة لصناعة التغيير",
    platformGoal: "منصة ويب إنسانية تساعد المنظمات غير الحكومية على تخطيط مشاريعها، كتابة مقترحات احترافية، وقياس الأثر بطريقة بسيطة وذكية.",
    targetAudienceTitle: "لمن هذه المنصة؟",
    targetAudience: ["المنظمات غير الحكومية", "المبادرات المجتمعية", "فرق كتابة المقترحات", "المانحون"],
    stepsTitle: "كيف تعمل؟",
    steps: ["أدخل فكرة المشروع", "خطّط بذكاء", "اترك أثراً"],
    
    labelIdea: "وصف المشكلة الإنسانية / الفكرة",
    placeholderIdea: "اشرح المشكلة التي تريد حلها والفكرة المقترحة...",
    labelCategory: "فئة المشروع",
    labelBeneficiaries: "الفئة المستفيدة",
    placeholderBeneficiaries: "مثال: الأيتام، النساء المعيلات، اللاجئين...",
    labelCountry: "الدولة / المنطقة",
    placeholderCountry: "مثال: اليمن، غزة، السودان...",
    labelLanguage: "لغة المشروع والواجهة",
    
    btnAnalyze: "بدء تخطيط المشروع",
    analysisTitle: "تحليل السياق والاحتياج",
    btnIdeas: "توليد حلول وبدائل",
    selectTitle: "مخطط المشروع",
    selectSubtitle: "اختر الهيكل الأنسب لتحقيق الأثر.",
    btnSelect: "اعتماد هذا المخطط",
    draftTitle: "مسودة المقترح الكامل",
    btnAssistant: "المساعد الذكي",
    btnBudget: "حساب الميزانية التقديرية",
    assistantPlaceholder: "كيف يمكنني تحسين هذا المقترح؟",
    btnRefine: "تحديث",
    budgetTitle: "الميزانية التفصيلية",
    totalCost: "إجمالي التكلفة التقديرية",
    btnExportWord: "تصدير المقترح (Word)",
    btnExportExcel: "تصدير الميزانية (Excel)",
    colCategory: "بند الصرف",
    colItem: "التفاصيل",
    colDesc: "الوصف",
    colQty: "العدد",
    colUnit: "ت. الوحدة",
    colTotal: "الإجمالي",
    costDist: "توزيع التكاليف",
    loading: "جاري معالجة البيانات...",
    startOver: "مشروع جديد",
    dismiss: "إغلاق",
    selectIdeaBtn: "اختيار هذه الاستراتيجية",
    goalLabel: "الهدف العام",
    appealLabel: "نقاط القوة",
    editPrompt: "اكتب طلب التعديل هنا...",
    thinking: "جاري التحليل...",
    refining: "جاري التحسين...",
    historyTitle: "أرشيف المشاريع",
    historySubtitle: "مشاريعك السابقة ومسوداتها",
    noProjects: "لا توجد مشاريع محفوظة.",
    dateLabel: "تاريخ الإنشاء",
    btnLoad: "فتح المشروع",
    btnDelete: "حذف"
  },
  en: {
    heroTitle: "Athar",
    heroSubtitle: "Athar is not just a platform... but a tool for creating change.",
    platformGoal: "A humanitarian web platform helping NGOs plan projects, write professional proposals, and measure impact simply and smartly.",
    targetAudienceTitle: "Who is this for?",
    targetAudience: ["NGOs", "Community Initiatives", "Proposal Teams", "Donors"],
    stepsTitle: "How it works?",
    steps: ["Enter Project Idea", "Plan Smartly", "Make an Impact"],

    labelIdea: "Humanitarian Problem / Idea",
    placeholderIdea: "Describe the problem and your proposed solution...",
    labelCategory: "Project Category",
    labelBeneficiaries: "Beneficiaries",
    placeholderBeneficiaries: "e.g., Orphans, Head-of-household women...",
    labelCountry: "Country / Region",
    placeholderCountry: "e.g., Yemen, Gaza, Sudan...",
    labelLanguage: "Language",

    btnAnalyze: "Start Planning",
    analysisTitle: "Context & Needs Analysis",
    btnIdeas: "Generate Solutions",
    selectTitle: "Project Planner",
    selectSubtitle: "Choose the best structure to achieve impact.",
    btnSelect: "Select Strategy",
    draftTitle: "Full Proposal Draft",
    btnAssistant: "AI Assistant",
    btnBudget: "Calculate Budget",
    assistantPlaceholder: "How can I improve this?",
    btnRefine: "Update",
    budgetTitle: "Detailed Budget",
    totalCost: "Total Estimated Cost",
    btnExportWord: "Export Proposal (Word)",
    btnExportExcel: "Export Budget (Excel)",
    colCategory: "Category",
    colItem: "Item",
    colDesc: "Description",
    colQty: "Qty",
    colUnit: "Unit Cost",
    colTotal: "Total",
    costDist: "Cost Distribution",
    loading: "Processing data...",
    startOver: "New Project",
    dismiss: "Dismiss",
    selectIdeaBtn: "Select Strategy",
    goalLabel: "Goal",
    appealLabel: "Strengths",
    editPrompt: "Enter edit request...",
    thinking: "Analyzing...",
    refining: "Refining...",
    historyTitle: "Project Archive",
    historySubtitle: "Your previous projects and drafts",
    noProjects: "No saved projects.",
    dateLabel: "Created",
    btnLoad: "Open Project",
    btnDelete: "Delete"
  },
  fr: {
    heroTitle: "Athar",
    heroSubtitle: "Athar n'est pas seulement une plateforme... mais un outil pour créer le changement.",
    platformGoal: "Une plateforme humanitaire aidant les ONG à planifier des projets, rédiger des propositions et mesurer l'impact.",
    targetAudienceTitle: "Pour qui ?",
    targetAudience: ["ONG", "Initiatives locales", "Équipes de rédaction", "Bailleurs"],
    stepsTitle: "Comment ça marche ?",
    steps: ["Idée du projet", "Planifier intelligemment", "Créer de l'impact"],

    labelIdea: "Problème Humanitaire / Idée",
    placeholderIdea: "Décrivez le problème et la solution proposée...",
    labelCategory: "Catégorie du Projet",
    labelBeneficiaries: "Bénéficiaires",
    placeholderBeneficiaries: "ex: Orphelins, Femmes chefs de famille...",
    labelCountry: "Pays / Région",
    placeholderCountry: "ex: Yémen, Gaza, Soudan...",
    labelLanguage: "Langue",

    btnAnalyze: "Commencer la Planification",
    analysisTitle: "Analyse du Contexte",
    btnIdeas: "Générer des Solutions",
    selectTitle: "Planificateur de Projet",
    selectSubtitle: "Choisissez la meilleure structure pour l'impact.",
    btnSelect: "Choisir la Stratégie",
    draftTitle: "Projet de Proposition",
    btnAssistant: "Assistant IA",
    btnBudget: "Calculer le Budget",
    assistantPlaceholder: "Comment améliorer ceci ?",
    btnRefine: "Mettre à jour",
    budgetTitle: "Budget Détaillé",
    totalCost: "Coût Total",
    btnExportWord: "Exporter (Word)",
    btnExportExcel: "Exporter (Excel)",
    colCategory: "Catégorie",
    colItem: "Article",
    colDesc: "Description",
    colQty: "Qté",
    colUnit: "Coût Unitaire",
    colTotal: "Total",
    costDist: "Répartition",
    loading: "Traitement des données...",
    startOver: "Nouveau Projet",
    dismiss: "Fermer",
    selectIdeaBtn: "Choisir la Stratégie",
    goalLabel: "Objectif",
    appealLabel: "Forces",
    editPrompt: "Demande de modification...",
    thinking: "Analyse...",
    refining: "Amélioration...",
    historyTitle: "Archives",
    historySubtitle: "Vos projets précédents",
    noProjects: "Aucun projet sauvegardé.",
    dateLabel: "Créé le",
    btnLoad: "Ouvrir",
    btnDelete: "Supprimer"
  }
};
