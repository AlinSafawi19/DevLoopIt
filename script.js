// Constants and Configuration
const RTL_LANGUAGES = ['ar'];
const DEFAULT_THEME = 'light';
const DEFAULT_LANGUAGE = 'en';

// DOM Elements
const elements = {
    banner: document.getElementById('cookie-banner'),
    acceptBtn: document.getElementById('accept-cookies'),
    rejectBtn: document.getElementById('reject-cookies'),
    themeToggle: document.getElementById('theme-toggle'),
    htmlElement: document.documentElement,
    logo: document.querySelector('.logo'),
    languageSwitcher: document.querySelector('.language-switcher'),
    languageLoader: document.querySelector('.language-loader')
};

// Local Storage Keys
const STORAGE_KEYS = {
    cookieConsent: 'cookieConsent',
    selectedLanguage: 'selectedLanguage',
    theme: 'theme'
};

// Theme Management
function initializeTheme() {
    const cookieConsent = localStorage.getItem(STORAGE_KEYS.cookieConsent);
    const savedTheme = cookieConsent === 'accepted' ? localStorage.getItem(STORAGE_KEYS.theme) : DEFAULT_THEME;
    elements.htmlElement.setAttribute('data-theme', savedTheme);
    elements.themeToggle.checked = savedTheme === 'dark';
}

function handleThemeChange() {
    elements.themeToggle.addEventListener('change', () => {
        const newTheme = elements.themeToggle.checked ? 'dark' : 'light';
        elements.htmlElement.setAttribute('data-theme', newTheme);
        if (localStorage.getItem(STORAGE_KEYS.cookieConsent) === 'accepted') {
            localStorage.setItem(STORAGE_KEYS.theme, newTheme);
        }
    });
}

// Language Management
function initializeLanguage() {
    const cookieConsent = localStorage.getItem(STORAGE_KEYS.cookieConsent);
    const storedLang = cookieConsent === 'accepted' ? localStorage.getItem(STORAGE_KEYS.selectedLanguage) : DEFAULT_LANGUAGE;

    // Initialize i18next first
    initializeI18next(storedLang).then(() => {
        // Set document language
        setDocumentLanguage(storedLang);

        // Update all content with translations
        updateContent();

        // Update active language button
        document.querySelector(`.lang-btn[data-lang="${storedLang}"]`)?.classList.add('active');

        // Add click handlers for language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                const newLang = btn.getAttribute('data-lang');
                if (newLang) {
                    try {
                        // Show loader
                        elements.languageLoader.classList.add('active');
                        elements.languageSwitcher.classList.add('loading');

                        // Add artificial delay to make the transition smoother
                        await new Promise(resolve => setTimeout(resolve, 800));

                        setDocumentLanguage(newLang);
                        await i18next.changeLanguage(newLang);
                        updateContent();
                        if (localStorage.getItem(STORAGE_KEYS.cookieConsent) === 'accepted') {
                            localStorage.setItem(STORAGE_KEYS.selectedLanguage, newLang);
                        }
                        // Update active button
                        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                    } catch (error) {
                        console.error('Error changing language:', error);
                    } finally {
                        // Hide loader
                        elements.languageLoader.classList.remove('active');
                        elements.languageSwitcher.classList.remove('loading');
                    }
                }
            });
        });
    });
}

function setDocumentLanguage(lang) {
    elements.htmlElement.setAttribute('dir', RTL_LANGUAGES.includes(lang) ? 'rtl' : 'ltr');
    elements.htmlElement.setAttribute('lang', lang);
}

function updateContent() {
    // Update text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = i18next.t(key);
    });

    // Update ARIA attributes
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
        const ariaAttr = el.getAttribute('data-i18n-aria');
        const key = el.getAttribute('data-i18n');
        if (ariaAttr && key) {
            el.setAttribute(ariaAttr, i18next.t(key));
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.setAttribute('placeholder', i18next.t(key));
    });

    // Update chevron directions based on language direction
    updateChevronDirections();
}

function updateChevronDirections() {
    const isRTL = elements.htmlElement.getAttribute('dir') === 'rtl';
    document.querySelectorAll('.fa-chevron-right').forEach(chevron => {
        chevron.className = isRTL ? 'fas fa-chevron-left' : 'fas fa-chevron-right';
    });
}

function initializeI18next(initialLang) {
    return i18next.init({
        lng: initialLang,
        resources: {
            en: {
                translation: {
                    //header
                    "nav_home": "Home",
                    "nav_about": "About Us",
                    "nav_services": "Services",
                    "nav_portfolio": "Portfolio",
                    "nav_blog": "Blog",
                    "nav_discuss": "Discuss Project",

                    //cookie consent translations
                    "cookie_message": "We use cookies to personalize content, analyze traffic, and enhance your browsing experience. You can choose to accept or reject their use.",
                    "accept": "Accept",
                    "reject": "Reject",

                    //language switcher
                    "lang_en": "English",
                    "lang_ar": "Arabic",
                    "lang_fr": "French",

                    //footer translations
                    "footer_quick_links": "Quick Links",
                    "footer_contact": "Contact Us",
                    "footer_follow": "Follow Us",
                    "footer_phone": "+1 (234) 567-890",
                    "footer_stay_updated": "Stay Updated",
                    "footer_newsletter_text": "Sign up to receive the latest news, tips, and exclusive offers.",
                    "footer_subscribe": "Subscribe",
                    "footer_email_placeholder": "Your email",
                    "footer_about": "About Us",
                    "footer_about_text": "DeveLoopIt is a leading software development company dedicated to creating innovative solutions that drive business growth and digital transformation.",
                    "footer_services": "Our Services",
                    "footer_legal": "Legal",
                    "footer_web_dev": "Web Development",
                    "footer_mobile_apps": "Mobile Apps",
                    "footer_cloud": "Cloud Solutions",
                    "footer_ai_ml": "AI & Machine Learning",
                    "footer_consulting": "Tech Consulting",
                    "footer_privacy": "Privacy Policy",
                    "footer_terms": "Terms of Service",
                    "footer_cookie": "Cookie Policy",
                    "footer_copyright": "© 2025 DeveLoopIt. All rights reserved.",
                    "brand_facebook": "Facebook",
                    "brand_instagram": "Instagram",
                    "brand_linkedin": "LinkedIn",
                    "brand_twitter": "Twitter",
                    "brand_github": "GitHub",

                    //privacy policy translations
                    "privacy_who_we_are": "Who We Are",
                    "privacy_who_we_are_text": "DeveLoopIt is a software development company dedicated to creating innovative solutions. Our website address is:",
                    "privacy_notice": "Notice",
                    "privacy_notice_text": "This privacy policy explains how we collect, use, and protect your personal information when you use our website and services. By using our website, you agree to the collection and use of information in accordance with this policy.",
                    "privacy_cookies": "Cookies",
                    "privacy_cookies_text": "We use cookies to enhance your browsing experience and provide essential functionality. When you visit our website, you have the option to accept or reject non-essential cookies through our cookie banner.",
                    "privacy_cookies_use": "We use cookies to:",
                    "privacy_cookies_list_1": "Remember your preferences and settings",
                    "privacy_cookies_list_2": "Analyze how you use our website",
                    "privacy_cookies_list_3": "Improve our website's performance and user experience",
                    "privacy_cookies_list_4": "Provide personalized content and advertisements",
                    "privacy_data_collection": "How We Collect Your Data",
                    "privacy_data_collection_text": "We collect information through:",
                    "privacy_data_collection_newsletter": "Newsletter Subscription: When you subscribe to our newsletter, we collect your email address to send you updates, news, and exclusive offers.",
                    "privacy_data_collection_project": "Project Discussion Form: When you use our \"Discuss Project\" form, we collect information such as your name, email address, and project details to better understand your requirements and provide appropriate services.",
                    "privacy_data_collection_usage": "Website Usage: We collect anonymous data about how you interact with our website to improve our services.",
                    "privacy_data_retention": "How Long We Retain Your Data",
                    "privacy_data_retention_newsletter": "For newsletter subscribers, we retain your email address until you choose to unsubscribe. You can unsubscribe at any time by clicking the unsubscribe link in our emails.",
                    "privacy_data_retention_project": "For project discussion submissions, we retain your information for as long as necessary to process your request and provide our services. You can request the deletion of your data at any time.",
                    "privacy_data_retention_admin": "Website administrators can see and manage this information to provide better service and support.",
                    "privacy_your_rights": "What Rights You Have Over Your Data",
                    "privacy_your_rights_text": "If you have subscribed to our newsletter or submitted a project discussion form, you can:",
                    "privacy_your_rights_list_1": "Request to receive an exported file of the personal data we hold about you",
                    "privacy_your_rights_list_2": "Request that we erase any personal data we hold about you",
                    "privacy_your_rights_list_3": "Unsubscribe from our newsletter at any time",
                    "privacy_your_rights_list_4": "Update your preferences regarding cookie usage",
                    "privacy_your_rights_note": "This does not include any data we are obliged to keep for administrative, legal, or security purposes.",
                    "privacy_data_transfer": "Where We Send Your Data",
                    "privacy_data_transfer_text": "Visitor comments may be checked through an automated spam detection service. We may also share your information with:",
                    "privacy_data_transfer_list_1": "Service providers who assist in operating our website",
                    "privacy_data_transfer_list_2": "Analytics providers to help us understand how our website is used",
                    "privacy_data_transfer_list_3": "Law enforcement when required by law",

                    //terms of service translations
                    "terms_agreement": "Agreement to Terms",
                    "terms_agreement_text": "By accessing and using DeveLoopIt's website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.",
                    "terms_use_license": "Use License",
                    "terms_use_license_text": "Permission is granted to temporarily access the materials (information or software) on DeveLoopIt's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:",
                    "terms_use_license_list_1": "Modify or copy the materials",
                    "terms_use_license_list_2": "Use the materials for any commercial purpose",
                    "terms_use_license_list_3": "Attempt to decompile or reverse engineer any software contained on DeveLoopIt's website",
                    "terms_use_license_list_4": "Remove any copyright or other proprietary notations from the materials",
                    "terms_use_license_list_5": "Transfer the materials to another person or \"mirror\" the materials on any other server",
                    "terms_disclaimer": "Disclaimer",
                    "terms_disclaimer_text": "The materials on DeveLoopIt's website are provided on an 'as is' basis. DeveLoopIt makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.",
                    "terms_limitations": "Limitations",
                    "terms_limitations_text": "In no event shall DeveLoopIt or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on DeveLoopIt's website, even if DeveLoopIt or a DeveLoopIt authorized representative has been notified orally or in writing of the possibility of such damage.",
                    "terms_accuracy": "Accuracy of Materials",
                    "terms_accuracy_text": "The materials appearing on DeveLoopIt's website could include technical, typographical, or photographic errors. DeveLoopIt does not warrant that any of the materials on its website are accurate, complete, or current. DeveLoopIt may make changes to the materials contained on its website at any time without notice.",
                    "terms_links": "Links",
                    "terms_links_text": "DeveLoopIt has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by DeveLoopIt of the site. Use of any such linked website is at the user's own risk.",
                    "terms_modifications": "Modifications",
                    "terms_modifications_text": "DeveLoopIt may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.",
                    "terms_governing_law": "Governing Law",
                    "terms_governing_law_text": "These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location."
                }
            },
            ar: {
                translation: {
                    //header
                    "nav_home": "الرئيسية",
                    "nav_about": "من نحن",
                    "nav_services": "الخدمات",
                    "nav_portfolio": "الأعمال",
                    "nav_blog": "المدونة",
                    "nav_discuss": "مناقشة المشروع",

                    //cookie consent translations
                    "cookie_message": "نحن نستخدم الكوكيز لتخصيص المحتوى، وتحليل حركة المرور، وتحسين تجربتك في التصفح. يمكنك اختيار قبول استخدامها أو رفضها.",
                    "accept": "قبول",
                    "reject": "رفض",

                    //language switcher
                    "lang_en": "الإنجليزية",
                    "lang_ar": "العربية",
                    "lang_fr": "الفرنسية",

                    //footer translations
                    "footer_quick_links": "روابط سريعة",
                    "footer_contact": "اتصل بنا",
                    "footer_follow": "تابعنا",
                    "footer_phone": "٨٩٠-٥٦٧-٢٣٤ (١+)",
                    "footer_stay_updated": "ابق على اطلاع",
                    "footer_newsletter_text": "سجل للحصول على آخر الأخبار والنصائح والعروض الحصرية.",
                    "footer_subscribe": "اشترك",
                    "footer_email_placeholder": "بريدك الإلكتروني",
                    "footer_about": "من نحن",
                    "footer_about_text": "ديفيلوبيت هي شركة رائدة في تطوير البرمجيات مكرسة لإنشاء حلول مبتكرة تدفع نمو الأعمال والتحول الرقمي.",
                    "footer_services": "خدماتنا",
                    "footer_legal": "قانوني",
                    "footer_web_dev": "تطوير الويب",
                    "footer_mobile_apps": "تطبيقات الجوال",
                    "footer_cloud": "حلول سحابية",
                    "footer_ai_ml": "الذكاء الاصطناعي والتعلم الآلي",
                    "footer_consulting": "استشارات تقنية",
                    "footer_privacy": "سياسة الخصوصية",
                    "footer_terms": "شروط الخدمة",
                    "footer_cookie": "سياسة ملفات تعريف الارتباط",
                    "footer_copyright": "© ٢٠٢٥ ديفيلوبيت. جميع الحقوق محفوظة.",
                    "brand_facebook": "فيسبوك",
                    "brand_instagram": "انستغرام",
                    "brand_linkedin": "لينكد إن",
                    "brand_twitter": "تويتر",
                    "brand_github": "جيت هب",

                    //privacy policy translations
                    "privacy_who_we_are": "من نحن",
                    "privacy_who_we_are_text": "ديفيلوبيت هي شركة لتطوير البرمجيات مكرسة لإنشاء حلول مبتكرة. عنوان موقعنا هو:",
                    "privacy_notice": "إشعار",
                    "privacy_notice_text": "تشرح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية معلوماتك الشخصية عند استخدام موقعنا وخدماتنا. باستخدام موقعنا، فإنك توافق على جمع واستخدام المعلومات وفقًا لهذه السياسة.",
                    "privacy_cookies": "ملفات تعريف الارتباط",
                    "privacy_cookies_text": "نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح وتوفير الوظائف الأساسية. عند زيارة موقعنا، يمكنك اختيار قبول أو رفض ملفات تعريف الارتباط غير الضرورية من خلال شريط ملفات تعريف الارتباط.",
                    "privacy_cookies_use": "نستخدم ملفات تعريف الارتباط لـ:",
                    "privacy_cookies_list_1": "تذكر تفضيلاتك وإعداداتك",
                    "privacy_cookies_list_2": "تحليل كيفية استخدامك لموقعنا",
                    "privacy_cookies_list_3": "تحسين أداء موقعنا وتجربة المستخدم",
                    "privacy_cookies_list_4": "توفير محتوى وإعلانات مخصصة",
                    "privacy_data_collection": "كيف نجمع بياناتك",
                    "privacy_data_collection_text": "نحن نجمع المعلومات من خلال:",
                    "privacy_data_collection_newsletter": "الاشتراك في النشرة الإخبارية: عند الاشتراك في نشرتنا الإخبارية، نقوم بجمع عنوان بريدك الإلكتروني لإرسال التحديثات والأخبار والعروض الحصرية.",
                    "privacy_data_collection_project": "نموذج مناقشة المشروع: عند استخدام نموذج \"مناقشة المشروع\"، نقوم بجمع معلومات مثل اسمك وعنوان بريدك الإلكتروني وتفاصيل المشروع لفهم متطلباتك بشكل أفضل وتقديم الخدمات المناسبة.",
                    "privacy_data_collection_usage": "استخدام الموقع: نقوم بجمع بيانات مجهولة المصدر حول كيفية تفاعلك مع موقعنا لتحسين خدماتنا.",
                    "privacy_data_retention": "المدة التي نحتفظ فيها ببياناتك",
                    "privacy_data_retention_newsletter": "بالنسبة لمشتركي النشرة الإخبارية، نحتفظ بعنوان بريدك الإلكتروني حتى تختار إلغاء الاشتراك. يمكنك إلغاء الاشتراك في أي وقت بالنقر على رابط إلغاء الاشتراك في رسائلنا الإلكترونية.",
                    "privacy_data_retention_project": "بالنسبة لتقديمات مناقشة المشروع، نحتفظ بمعلوماتك طالما كان ذلك ضروريًا لمعالجة طلبك وتقديم خدماتنا. يمكنك طلب حذف بياناتك في أي وقت.",
                    "privacy_data_retention_admin": "يمكن لمشرفي الموقع رؤية وإدارة هذه المعلومات لتقديم خدمة ودعم أفضل.",
                    "privacy_your_rights": "ما هي حقوقك على بياناتك",
                    "privacy_your_rights_text": "إذا كنت قد اشتركت في نشرتنا الإخبارية أو قدمت نموذج مناقشة المشروع، يمكنك:",
                    "privacy_your_rights_list_1": "طلب استلام ملف مصدر من البيانات الشخصية التي نحتفظ بها عنك",
                    "privacy_your_rights_list_2": "طلب حذف أي بيانات شخصية نحتفظ بها عنك",
                    "privacy_your_rights_list_3": "إلغاء الاشتراك من نشرتنا الإخبارية في أي وقت",
                    "privacy_your_rights_list_4": "تحديث تفضيلاتك فيما يتعلق باستخدام ملفات تعريف الارتباط",
                    "privacy_your_rights_note": "هذا لا يشمل أي بيانات ملزمة بالاحتفاظ بها لأغراض إدارية أو قانونية أو أمنية.",
                    "privacy_data_transfer": "أين نرسل بياناتك",
                    "privacy_data_transfer_text": "قد يتم فحص تعليقات الزوار من خلال خدمة كشف البريد العشوائي الآلية. قد نشارك أيضًا معلوماتك مع:",
                    "privacy_data_transfer_list_1": "مقدمي الخدمات الذين يساعدون في تشغيل موقعنا",
                    "privacy_data_transfer_list_2": "مقدمي التحليلات لمساعدتنا في فهم كيفية استخدام موقعنا",
                    "privacy_data_transfer_list_3": "السلطات المختصة عند الحاجة بموجب القانون",

                    //terms of service translations
                    "terms_agreement": "الموافقة على الشروط",
                    "terms_agreement_text": "باستخدام موقع ديفيلوبيت وخدماته، فإنك توافق على الالتزام بشروط الخدمة هذه وجميع القوانين واللوائح المعمول بها. إذا كنت لا توافق على أي من هذه الشروط، فأنت ممنوع من استخدام أو الوصول إلى هذا الموقع.",
                    "terms_use_license": "ترخيص الاستخدام",
                    "terms_use_license_text": "يتم منح الإذن للوصول مؤقتًا إلى المواد (المعلومات أو البرامج) على موقع ديفيلوبيت للعرض الشخصي غير التجاري المؤقت فقط. هذا هو منح الترخيص، وليس نقل الملكية، وبموجب هذا الترخيص لا يجوز لك:",
                    "terms_use_license_list_1": "تعديل أو نسخ المواد",
                    "terms_use_license_list_2": "استخدام المواد لأي غرض تجاري",
                    "terms_use_license_list_3": "محاولة فك التجميع أو الهندسة العكسية لأي برنامج موجود على موقع ديفيلوبيت",
                    "terms_use_license_list_4": "إزالة أي إشعارات حقوق النشر أو الملكية الأخرى من المواد",
                    "terms_use_license_list_5": "نقل المواد إلى شخص آخر أو \"نسخ\" المواد على أي خادم آخر",
                    "terms_disclaimer": "إخلاء المسؤولية",
                    "terms_disclaimer_text": "يتم تقديم المواد على موقع ديفيلوبيت على أساس 'كما هي'. لا تقدم ديفيلوبيت أي ضمانات، صريحة أو ضمنية، وتتنصل وتنفي جميع الضمانات الأخرى بما في ذلك، دون قيود، الضمانات الضمنية أو شروط قابلية التسويق، أو اللياقة لغرض معين، أو عدم انتهاك الملكية الفكرية أو أي انتهاك آخر للحقوق.",
                    "terms_limitations": "القيود",
                    "terms_limitations_text": "في أي حال من الأحوال، لن تكون ديفيلوبيت أو مورديها مسؤولة عن أي أضرار (بما في ذلك، دون قيود، الأضرار الناجمة عن فقدان البيانات أو الأرباح، أو بسبب انقطاع الأعمال) الناشئة عن استخدام أو عدم القدرة على استخدام المواد على موقع ديفيلوبيت، حتى لو تم إخطار ديفيلوبيت أو ممثلها المعتمد شفهيًا أو كتابيًا بإمكانية حدوث مثل هذا الضرر.",
                    "terms_accuracy": "دقة المواد",
                    "terms_accuracy_text": "قد تتضمن المواد الظاهرة على موقع ديفيلوبيت أخطاء تقنية أو مطبعية أو فوتوغرافية. لا تضمن ديفيلوبيت أن أيًا من المواد على موقعها دقيقة أو كاملة أو حالية. قد تقوم ديفيلوبيت بإجراء تغييرات على المواد الموجودة على موقعها في أي وقت دون إشعار.",
                    "terms_links": "الروابط",
                    "terms_links_text": "لم تقم ديفيلوبيت بمراجعة جميع المواقع المرتبطة بموقعها وليست مسؤولة عن محتويات أي موقع مرتبط. لا يعني تضمين أي رابط تأييد ديفيلوبيت للموقع. استخدام أي موقع مرتبط هو على مسؤولية المستخدم الخاصة.",
                    "terms_modifications": "التعديلات",
                    "terms_modifications_text": "يجوز لديفيلوبيت مراجعة شروط الخدمة هذه لموقعها في أي وقت دون إشعار. باستخدام هذا الموقع، فإنك توافق على الالتزام بالإصدار الحالي من شروط الخدمة هذه.",
                    "terms_governing_law": "القانون الحاكم",
                    "terms_governing_law_text": "تخضع هذه الشروط والأحكام وتحكم وفقًا للقوانين وتخضع بشكل لا رجعة فيه للاختصاص الحصري لمحاكم ذلك الموقع."
                }
            },
            fr: {
                translation: {
                    //header
                    "nav_home": "Accueil",
                    "nav_about": "À propos",
                    "nav_services": "Services",
                    "nav_portfolio": "Portfolio",
                    "nav_blog": "Blog",
                    "nav_discuss": "Discuter du projet",

                    //cookie consent translations
                    "cookie_message": "Nous utilisons des cookies pour personnaliser le contenu, analyser le trafic et améliorer votre expérience de navigation. Vous pouvez choisir de les accepter ou de les refuser.",
                    "accept": "Accepter",
                    "reject": "Refuser",

                    //language switcher
                    "lang_en": "Anglais",
                    "lang_ar": "Arabe",
                    "lang_fr": "Français",

                    //footer translations
                    "footer_quick_links": "Liens Rapides",
                    "footer_contact": "Contactez-nous",
                    "footer_follow": "Suivez-nous",
                    "footer_phone": "+1 (234) 567-890",
                    "footer_stay_updated": "Restez Informé",
                    "footer_newsletter_text": "Inscrivez-vous pour recevoir les dernières nouvelles, conseils et offres exclusives.",
                    "footer_subscribe": "S'abonner",
                    "footer_email_placeholder": "Votre email",
                    "footer_about": "À Propos",
                    "footer_about_text": "DeveLoopIt est une entreprise leader en développement de logiciels dédiée à la création de solutions innovantes qui stimulent la croissance des entreprises et la transformation numérique.",
                    "footer_services": "Nos Services",
                    "footer_legal": "Légal",
                    "footer_web_dev": "Développement Web",
                    "footer_mobile_apps": "Applications Mobiles",
                    "footer_cloud": "Solutions Cloud",
                    "footer_ai_ml": "IA & Machine Learning",
                    "footer_consulting": "Conseil Technique",
                    "footer_privacy": "Politique de Confidentialité",
                    "footer_terms": "Conditions d'Utilisation",
                    "footer_cookie": "Politique des Cookies",
                    "footer_copyright": "© 2025 DeveLoopIt. Tous droits réservés.",
                    "brand_facebook": "Facebook",
                    "brand_instagram": "Instagram",
                    "brand_linkedin": "LinkedIn",
                    "brand_twitter": "Twitter",
                    "brand_github": "GitHub",

                    //privacy policy translations
                    "privacy_who_we_are": "Qui Sommes-Nous",
                    "privacy_who_we_are_text": "DeveLoopIt est une entreprise de développement de logiciels dédiée à la création de solutions innovantes. L'adresse de notre site web est :",
                    "privacy_notice": "Avis",
                    "privacy_notice_text": "Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations personnelles lorsque vous utilisez notre site web et nos services. En utilisant notre site web, vous acceptez la collecte et l'utilisation des informations conformément à cette politique.",
                    "privacy_cookies": "Cookies",
                    "privacy_cookies_text": "Nous utilisons des cookies pour améliorer votre expérience de navigation et fournir des fonctionnalités essentielles. Lorsque vous visitez notre site web, vous avez la possibilité d'accepter ou de refuser les cookies non essentiels via notre bannière de cookies.",
                    "privacy_cookies_use": "Nous utilisons des cookies pour :",
                    "privacy_cookies_list_1": "Mémoriser vos préférences et paramètres",
                    "privacy_cookies_list_2": "Analyser comment vous utilisez notre site web",
                    "privacy_cookies_list_3": "Améliorer les performances et l'expérience utilisateur de notre site web",
                    "privacy_cookies_list_4": "Fournir du contenu et des publicités personnalisés",
                    "privacy_data_collection": "Comment Nous Collectons Vos Données",
                    "privacy_data_collection_text": "Nous collectons des informations via :",
                    "privacy_data_collection_newsletter": "Abonnement à la Newsletter : Lorsque vous vous abonnez à notre newsletter, nous collectons votre adresse e-mail pour vous envoyer des mises à jour, des nouvelles et des offres exclusives.",
                    "privacy_data_collection_project": "Formulaire de Discussion de Projet : Lorsque vous utilisez notre formulaire \"Discuter du Projet\", nous collectons des informations telles que votre nom, votre adresse e-mail et les détails du projet pour mieux comprendre vos besoins et fournir des services appropriés.",
                    "privacy_data_collection_usage": "Utilisation du Site Web : Nous collectons des données anonymes sur la façon dont vous interagissez avec notre site web pour améliorer nos services.",
                    "privacy_data_retention": "Combien de Temps Nous Conservons Vos Données",
                    "privacy_data_retention_newsletter": "Pour les abonnés à la newsletter, nous conservons votre adresse e-mail jusqu'à ce que vous choisissiez de vous désabonner. Vous pouvez vous désabonner à tout moment en cliquant sur le lien de désabonnement dans nos e-mails.",
                    "privacy_data_retention_project": "Pour les soumissions de discussion de projet, nous conservons vos informations aussi longtemps que nécessaire pour traiter votre demande et fournir nos services. Vous pouvez demander la suppression de vos données à tout moment.",
                    "privacy_data_retention_admin": "Les administrateurs du site web peuvent voir et gérer ces informations pour fournir un meilleur service et support.",
                    "privacy_your_rights": "Quels Droits Vous Avez Sur Vos Données",
                    "privacy_your_rights_text": "Si vous vous êtes abonné à notre newsletter ou soumis un formulaire de discussion de projet, vous pouvez :",
                    "privacy_your_rights_list_1": "Demander à recevoir un fichier exporté des données personnelles que nous détenons sur vous",
                    "privacy_your_rights_list_2": "Demander que nous effacions toutes les données personnelles que nous détenons sur vous",
                    "privacy_your_rights_list_3": "Vous désabonner de notre newsletter à tout moment",
                    "privacy_your_rights_list_4": "Mettre à jour vos préférences concernant l'utilisation des cookies",
                    "privacy_your_rights_note": "Cela n'inclut pas les données que nous sommes obligés de conserver à des fins administratives, légales ou de sécurité.",
                    "privacy_data_transfer": "Où Nous Envoyons Vos Données",
                    "privacy_data_transfer_text": "Les commentaires des visiteurs peuvent être vérifiés par un service automatisé de détection de spam. Nous pouvons également partager vos informations avec :",
                    "privacy_data_transfer_list_1": "Les fournisseurs de services qui aident à exploiter notre site web",
                    "privacy_data_transfer_list_2": "Les fournisseurs d'analyses pour nous aider à comprendre comment notre site web est utilisé",
                    "privacy_data_transfer_list_3": "Les forces de l'ordre lorsque la loi l'exige",

                    //terms of service translations
                    "terms_agreement": "Accord aux Conditions",
                    "terms_agreement_text": "En accédant et en utilisant le site web et les services de DeveLoopIt, vous acceptez d'être lié par ces Conditions d'Utilisation et toutes les lois et réglementations applicables. Si vous n'acceptez pas l'une de ces conditions, vous n'êtes pas autorisé à utiliser ou à accéder à ce site.",
                    "terms_use_license": "Licence d'Utilisation",
                    "terms_use_license_text": "L'autorisation est accordée d'accéder temporairement aux matériaux (informations ou logiciels) sur le site web de DeveLoopIt pour un affichage personnel et non commercial temporaire uniquement. Il s'agit d'une licence, et non d'un transfert de titre, et sous cette licence, vous ne pouvez pas :",
                    "terms_use_license_list_1": "Modifier ou copier les matériaux",
                    "terms_use_license_list_2": "Utiliser les matériaux à des fins commerciales",
                    "terms_use_license_list_3": "Tenter de décompiler ou de faire de l'ingénierie inverse de tout logiciel contenu sur le site web de DeveLoopIt",
                    "terms_use_license_list_4": "Supprimer toute mention de copyright ou autres mentions de propriété des matériaux",
                    "terms_use_license_list_5": "Transférer les matériaux à une autre personne ou \"mirror\" les matériaux sur tout autre serveur",
                    "terms_disclaimer": "Avis de Non-Responsabilité",
                    "terms_disclaimer_text": "Les matériaux sur le site web de DeveLoopIt sont fournis 'tels quels'. DeveLoopIt ne fait aucune garantie, expresse ou implicite, et décline par la présente toute autre garantie, y compris, sans limitation, les garanties implicites ou conditions de qualité marchande, d'adéquation à un usage particulier, ou de non-violation de la propriété intellectuelle ou autre violation des droits.",
                    "terms_limitations": "Limitations",
                    "terms_limitations_text": "En aucun cas, DeveLoopIt ou ses fournisseurs ne seront responsables des dommages (y compris, sans limitation, les dommages pour perte de données ou de profit, ou en raison d'une interruption d'activité) découlant de l'utilisation ou de l'impossibilité d'utiliser les matériaux sur le site web de DeveLoopIt, même si DeveLoopIt ou un représentant autorisé de DeveLoopIt a été informé oralement ou par écrit de la possibilité de tels dommages.",
                    "terms_accuracy": "Précision des Matériaux",
                    "terms_accuracy_text": "Les matériaux apparaissant sur le site web de DeveLoopIt peuvent inclure des erreurs techniques, typographiques ou photographiques. DeveLoopIt ne garantit pas que les matériaux sur son site web sont exacts, complets ou à jour. DeveLoopIt peut apporter des modifications aux matériaux contenus sur son site web à tout moment sans préavis.",
                    "terms_links": "Liens",
                    "terms_links_text": "DeveLoopIt n'a pas examiné tous les sites liés à son site web et n'est pas responsable du contenu de ces sites liés. L'inclusion d'un lien n'implique pas l'approbation du site par DeveLoopIt. L'utilisation de tout site web lié est aux risques de l'utilisateur.",
                    "terms_modifications": "Modifications",
                    "terms_modifications_text": "DeveLoopIt peut réviser ces conditions d'utilisation pour son site web à tout moment sans préavis. En utilisant ce site web, vous acceptez d'être lié par la version alors en vigueur de ces conditions d'utilisation.",
                    "terms_governing_law": "Loi Applicable",
                    "terms_governing_law_text": "Ces conditions générales sont régies et interprétées conformément aux lois et vous vous soumettez irrévocablement à la juridiction exclusive des tribunaux de cette localité."
                }
            }
        }
    });
}

// Mobile Navigation Toggle
function initializeMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.querySelector('.overlay');
    const languageSwitcher = document.querySelector('.language-switcher');

    if (!navToggle || !navMenu || !overlay) {
        console.warn('Mobile navigation elements not found');
        return;
    }

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
    });

    overlay.addEventListener('click', () => {
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        if (languageSwitcher) {
            languageSwitcher.classList.remove('mobile-visible');
        }
    });
}

// Set active navigation link based on current page
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links li a');

    navLinks.forEach(link => {
        // Remove active class from all links
        link.classList.remove('active');

        // Add active class to current page link
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }

        // Handle home page special case
        if (currentPath === '/' && link.getAttribute('href') === '/') {
            link.classList.add('active');
        }
    });
}

// Cookie Banner Management
function initializeCookieBanner() {
    const cookieConsent = localStorage.getItem(STORAGE_KEYS.cookieConsent);

    // Show banner by default if no consent is stored
    if (!cookieConsent) {
        // Add a small delay to ensure the banner is visible after page load
        setTimeout(() => {
            elements.banner.classList.add('visible');
        }, 500);
    }

    elements.acceptBtn.addEventListener('click', () => {
        localStorage.setItem(STORAGE_KEYS.cookieConsent, 'accepted');
        elements.banner.classList.remove('visible');
    });

    elements.rejectBtn.addEventListener('click', () => {
        localStorage.setItem(STORAGE_KEYS.cookieConsent, 'rejected');
        elements.banner.classList.remove('visible');
    });
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    handleThemeChange();
    initializeLanguage();
    initializeMobileNav();
    setActiveNavLink();
    initializeCookieBanner();
});