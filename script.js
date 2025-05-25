// Constants and Configuration
import { loadFooter } from './components/footer.js';

const RTL_LANGUAGES = ['ar'];
const DEFAULT_THEME = 'dark';
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
    loader: document.querySelector('.loader')
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
                        elements.loader.classList.add('active');
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
                        elements.loader.classList.remove('active');
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

                    // About Us page translations
                    "about_mission_vision": "Our Mission & Vision",
                    "about_mission_vision_subtitle": "Driving innovation through technology and excellence",
                    "about_mission_title": "Our Mission",
                    "about_mission_text": "To empower businesses with cutting-edge technology solutions that drive growth, efficiency, and innovation. We strive to deliver exceptional value through our expertise, dedication, and commitment to excellence.",
                    "about_vision_title": "Our Vision",
                    "about_vision_text": "To be the global leader in digital transformation, recognized for our innovative solutions, technical excellence, and unwavering commitment to client success. We envision a future where technology seamlessly enhances human potential.",
                    "about_story_title": "Our Story",
                    "about_story_subtitle": "A journey of innovation and growth",
                    "about_story_image_alt": "Our company's journey",
                    "about_story_text_1": "Founded in 2020, DeveLoopIt emerged from a vision to revolutionize the digital landscape. What began as a small team of passionate developers has grown into a full-service technology company serving clients worldwide.",
                    "about_story_text_2": "Our journey has been marked by continuous learning, innovation, and a steadfast commitment to delivering exceptional results. We've evolved from a startup to a trusted technology partner, helping businesses navigate the digital transformation landscape.",
                    "about_story_text_3": "Today, we stand proud of our achievements while remaining focused on our core values: innovation, excellence, and client success. Our story continues to unfold as we embrace new challenges and opportunities in the ever-evolving world of technology.",
                    "about_milestones_title": "Our Milestones",
                    "about_milestones_subtitle": "Key moments in our journey",
                    "milestone_2020_title": "2020",
                    "milestone_2020_text": "Company founded with a vision to transform digital solutions",
                    "milestone_2021_title": "2021",
                    "milestone_2021_text": "Expanded team and launched innovative service offerings",
                    "milestone_2022_title": "2022",
                    "milestone_2022_text": "Achieved significant growth and international recognition",
                    "milestone_2023_title": "2023",
                    "milestone_2023_text": "Launched advanced AI solutions and expanded global presence",
                    "about_cta_title": "Ready to Start Your Project?",
                    "about_cta_text": "Let's work together to bring your vision to life",
                    "about_cta_button": "Get Started",

                    //landing section
                    "landing_title": "Innovative Software Solutions",
                    "landing_subtitle": "Reliable, Scalable Solutions That Drive Results",
                    "landing_services": "Our Services",
                    "about_preview_title": "Who We Are",
                    "about_preview_text": "We are a passionate team of developers, designers, and digital strategists dedicated to creating innovative solutions that help businesses thrive in the digital age. With years of experience and a commitment to excellence, we transform ideas into reality.",
                    "learn_more": "Learn More",

                    //technology section translations
                    "tech_title": "Technologies We Use",
                    "tech_subtitle": "Cutting-edge tools and frameworks that power our solutions",
                    "tech_frontend_title": "Frontend",
                    "tech_backend_title": "Backend",
                    "tech_database_title": "Database",
                    "tech_devops_title": "DevOps",
                    "tech_ai_title": "AI & Chatbots",

                    //process section translations
                    "process_title": "Our Process",
                    "process_subtitle": "A systematic approach to delivering excellence",
                    "process_discovery_title": "Discovery",
                    "process_discovery_text": "We begin by understanding your business needs, goals, and challenges to create a tailored solution.",
                    "process_design_title": "Design",
                    "process_design_text": "Our team creates intuitive and engaging user experiences that align with your brand identity.",
                    "process_development_title": "Development",
                    "process_development_text": "We build robust and scalable solutions using cutting-edge technologies and best practices.",
                    "process_testing_title": "Testing",
                    "process_testing_text": "Rigorous quality assurance ensures your solution is reliable, secure, and performs optimally.",
                    "process_deployment_title": "Deployment",
                    "process_deployment_text": "We ensure smooth deployment and provide comprehensive documentation and training.",
                    "process_support_title": "Support & Growth",
                    "process_support_text": "Continuous monitoring, maintenance, and optimization to ensure your solution evolves with your needs.",

                    //commitment section translations
                    "commitment_title": "Our Commitment",
                    "commitment_subtitle": "More than business—it's our promise to you as we grow",
                    "commitment_innovation_title": "Delivering Innovation with Integrity",
                    "commitment_innovation_text": "We push boundaries while maintaining the highest ethical standards in everything we do.",
                    "commitment_listening_title": "Listening Closely to Your Needs",
                    "commitment_listening_text": "Your feedback shapes our solutions. We're here to understand and exceed your expectations.",
                    "commitment_quality_title": "Moving Fast, Staying Quality-Focused",
                    "commitment_quality_text": "We balance speed with excellence, ensuring every solution meets our high standards.",
                    "commitment_impact_title": "Building Solutions That Make a Difference",
                    "commitment_impact_text": "We create technology that solves real problems and drives meaningful change.",

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
                    "footer_discuss": "Discuss Project",
                    "footer_discuss_text": "Ready to start your project? Let's discuss how we can help bring your ideas to life.",
                    "footer_discuss_cta": "Get Started",

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
                    "terms_governing_law_text": "These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.",

                    // About Hero Section
                    about_hero_title: "Crafting Digital Excellence",
                    about_hero_subtitle: "Where Innovation Meets Purpose",
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

                    // About Us page translations
                    "about_mission_vision": "مهمتنا ورؤيتنا",
                    "about_mission_vision_subtitle": "دفع الابتكار من خلال التكنولوجيا والتميز",
                    "about_mission_title": "مهمتنا",
                    "about_mission_text": "تمكين الشركات من خلال حلول تكنولوجية متطورة تدفع النمو والكفاءة والابتكار. نسعى جاهدين لتقديم قيمة استثنائية من خلال خبرتنا وتفانينا والتزامنا بالتميز.",
                    "about_vision_title": "رؤيتنا",
                    "about_vision_text": "أن نكون الرائد العالمي في التحول الرقمي، معروفين بحلولنا المبتكرة وتميزنا التقني والتزامنا الثابت بنجاح العملاء. نتطلع إلى مستقبل حيث تعزز التكنولوجيا الإمكانات البشرية بسلاسة.",
                    "about_story_title": "قصتنا",
                    "about_story_subtitle": "رحلة من الابتكار والنمو",
                    "about_story_image_alt": "رحلة شركتنا",
                    "about_story_text_1": "تأسست DeveLoopIt في عام 2020 من رؤية لإحداث ثورة في المشهد الرقمي. ما بدأ كفريق صغير من المطورين المتحمسين نما ليصبح شركة تكنولوجيا متكاملة تخدم العملاء في جميع أنحاء العالم.",
                    "about_story_text_2": "تميزت رحلتنا بالتعلم المستمر والابتكار والالتزام الثابت بتقديم نتائج استثنائية. لقد تطورنا من شركة ناشئة إلى شريك تكنولوجي موثوق، مما يساعد الشركات على التنقل في مشهد التحول الرقمي.",
                    "about_story_text_3": "اليوم، نحن نفخر بإنجازاتنا مع الحفاظ على تركيزنا على قيمنا الأساسية: الابتكار والتميز ونجاح العملاء. تستمر قصتنا في التطور مع مواجهة تحديات وفرص جديدة في عالم التكنولوجيا المتطور باستمرار.",
                    "about_milestones_title": "معالمنا",
                    "about_milestones_subtitle": "لحظات رئيسية في رحلتنا",
                    "milestone_2020_title": "2020",
                    "milestone_2020_text": "تأسيس الشركة برؤية لتحويل الحلول الرقمية",
                    "milestone_2021_title": "2021",
                    "milestone_2021_text": "توسيع الفريق وإطلاق عروض خدمات مبتكرة",
                    "milestone_2022_title": "2022",
                    "milestone_2022_text": "تحقيق نمو كبير واعتراف دولي",
                    "milestone_2023_title": "2023",
                    "milestone_2023_text": "إطلاق حلول الذكاء الاصطناعي المتقدمة وتوسيع النطاق العالمي",
                    "about_cta_title": "هل أنت مستعد لبدء مشروعك؟",
                    "about_cta_text": "دعنا نعمل معًا لتحقيق رؤيتك",
                    "about_cta_button": "ابدأ الآن",

                    //landing section
                    "landing_title": "حلول برمجية مبتكرة",
                    "landing_subtitle": "حلول موثوقة وقابلة للتطوير تحقق النتائج",
                    "landing_services": "خدماتنا",
                    "about_preview_title": "من نحن",
                    "about_preview_text": "نحن فريق متحمس من المطورين والمصممين واستراتيجيي الرقمنة مكرسون لإنشاء حلول مبتكرة تساعد الشركات على الازدهار في العصر الرقمي. مع سنوات من الخبرة والتزام بالتميز، نحول الأفكار إلى واقع.",
                    "learn_more": "اعرف المزيد",

                    //technology section translations
                    "tech_title": "التقنيات التي نستخدمها",
                    "tech_subtitle": "أدوات وأطر عمل متطورة تدعم حلولنا",
                    "tech_frontend_title": "واجهة المستخدم",
                    "tech_backend_title": "الخلفية",
                    "tech_database_title": "قواعد البيانات",
                    "tech_devops_title": "تطوير العمليات",
                    "tech_ai_title": "الذكاء الاصطناعي والروبوتات",

                    //process section translations
                    "process_title": "عملنا",
                    "process_subtitle": "نهج منهجي لتقديم التميز",
                    "process_discovery_title": "الاكتشاف",
                    "process_discovery_text": "نبدأ بفهم احتياجات عملك وأهدافه وتحدياته لإنشاء حل مخصص.",
                    "process_design_title": "التصميم",
                    "process_design_text": "يقوم فريقنا بإنشاء تجارب مستخدم بديهية وجذابة تتماشى مع هوية علامتك التجارية.",
                    "process_development_title": "التطوير",
                    "process_development_text": "نقوم ببناء حلول قوية وقابلة للتطوير باستخدام أحدث التقنيات وأفضل الممارسات.",
                    "process_testing_title": "الاختبار",
                    "process_testing_text": "يضمن ضمان الجودة الصارم أن حلولك موثوقة وآمنة وتعمل بشكل مثالي.",
                    "process_deployment_title": "النشر",
                    "process_deployment_text": "نضمن النشر السلس ونقدم توثيقًا شاملاً وتدريبًا.",
                    "process_support_title": "الدعم والنمو",
                    "process_support_text": "مراقبة مستمرة وصيانة وتحسين لضمان تطور حلولك مع احتياجاتك.",

                    //commitment section translations
                    "commitment_title": "التزامنا",
                    "commitment_subtitle": "أكثر من مجرد عمل — إنه وعدنا لك مع نمونا",
                    "commitment_innovation_title": "تقديم الابتكار بنزاهة",
                    "commitment_innovation_text": "نحن نتجاوز الحدود مع الحفاظ على أعلى المعايير الأخلاقية في كل ما نقوم به.",
                    "commitment_listening_title": "الاستماع بعناية لاحتياجاتك",
                    "commitment_listening_text": "ملاحظاتك تشكل حلولنا. نحن هنا لفهم وتجاوز توقعاتك.",
                    "commitment_quality_title": "التحرك بسرعة مع التركيز على الجودة",
                    "commitment_quality_text": "نحن نوازن بين السرعة والتميز، مما يضمن أن كل حل يلبي معاييرنا العالية.",
                    "commitment_impact_title": "بناء حلول تحدث فرقاً",
                    "commitment_impact_text": "نحن نبتكر تقنيات تحل مشاكل حقيقية وتقود تغييراً هادفاً.",

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
                    "footer_discuss": "مناقشة المشروع",
                    "footer_discuss_text": "هل أنت مستعد لبدء مشروعك؟ دعنا نناقش كيف يمكننا المساعدة في تحقيق أفكارك.",
                    "footer_discuss_cta": "ابدأ الآن",

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
                    "terms_governing_law_text": "تخضع هذه الشروط والأحكام وتحكم وفقًا للقوانين وتخضع بشكل لا رجعة فيه للاختصاص الحصري لمحاكم ذلك الموقع.",

                    // About Hero Section
                    about_hero_title: "صياغة التميز الرقمي",
                    about_hero_subtitle: "حيث يلتقي الابتكار بالهدف",
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

                    // About Us page translations
                    "about_mission_vision": "Notre Mission & Vision",
                    "about_mission_vision_subtitle": "Propulser l'innovation par la technologie et l'excellence",
                    "about_mission_title": "Notre Mission",
                    "about_mission_text": "Donner aux entreprises les moyens d'innover grâce à des solutions technologiques de pointe qui stimulent la croissance, l'efficacité et l'innovation. Nous nous efforçons de fournir une valeur exceptionnelle grâce à notre expertise, notre dévouement et notre engagement envers l'excellence.",
                    "about_vision_title": "Notre Vision",
                    "about_vision_text": "Être le leader mondial de la transformation numérique, reconnu pour nos solutions innovantes, notre excellence technique et notre engagement inébranlable envers le succès de nos clients. Nous envisageons un avenir où la technologie améliore harmonieusement le potentiel humain.",
                    "about_story_title": "Notre Histoire",
                    "about_story_subtitle": "Un parcours d'innovation et de croissance",
                    "about_story_image_alt": "Le parcours de notre entreprise",
                    "about_story_text_1": "Fondée en 2020, DeveLoopIt est née d'une vision de révolutionner le paysage numérique. Ce qui a commencé comme une petite équipe de développeurs passionnés s'est transformé en une entreprise technologique à service complet desservant des clients du monde entier.",
                    "about_story_text_2": "Notre parcours a été marqué par un apprentissage continu, l'innovation et un engagement constant à fournir des résultats exceptionnels. Nous avons évolué d'une startup à un partenaire technologique de confiance, aidant les entreprises à naviguer dans le paysage de la transformation numérique.",
                    "about_story_text_3": "Aujourd'hui, nous sommes fiers de nos réalisations tout en restant concentrés sur nos valeurs fondamentales : l'innovation, l'excellence et le succès des clients. Notre histoire continue de se dérouler alors que nous embrassons de nouveaux défis et opportunités dans le monde en constante évolution de la technologie.",
                    "about_milestones_title": "Nos Jalons",
                    "about_milestones_subtitle": "Moments clés de notre parcours",
                    "milestone_2020_title": "2020",
                    "milestone_2020_text": "Création de l'entreprise avec une vision de transformer les solutions numériques",
                    "milestone_2021_title": "2021",
                    "milestone_2021_text": "Expansion de l'équipe et lancement d'offres de services innovantes",
                    "milestone_2022_title": "2022",
                    "milestone_2022_text": "Croissance significative et reconnaissance internationale",
                    "milestone_2023_title": "2023",
                    "milestone_2023_text": "Lancement de solutions d'IA avancées et expansion de la présence mondiale",
                    "about_cta_title": "Prêt à Démarrer Votre Projet ?",
                    "about_cta_text": "Travaillons ensemble pour donner vie à votre vision",
                    "about_cta_button": "Commencer",

                    //landing section
                    "landing_title": "Solutions Logicielles Innovantes",
                    "landing_subtitle": "Des Solutions Fiables et Évolutives qui Donnent des Résultats",
                    "landing_services": "Nos Services",
                    "about_preview_title": "Qui Sommes-Nous",
                    "about_preview_text": "Nous sommes une équipe passionnée de développeurs, de designers et de stratèges numériques dédiés à la création de solutions innovantes qui aident les entreprises à prospérer à l'ère numérique. Avec des années d'expérience et un engagement envers l'excellence, nous transformons les idées en réalité.",
                    "learn_more": "En Savoir Plus",

                    //technology section translations
                    "tech_title": "Technologies que Nous Utilisons",
                    "tech_subtitle": "Outils et frameworks de pointe qui alimentent nos solutions",
                    "tech_frontend_title": "Frontend",
                    "tech_backend_title": "Backend",
                    "tech_database_title": "Base de Données",
                    "tech_devops_title": "DevOps",
                    "tech_ai_title": "IA & Chatbots",

                    //process section translations
                    "process_title": "Notre Processus",
                    "process_subtitle": "Une approche systématique pour livrer l'excellence",
                    "process_discovery_title": "Découverte",
                    "process_discovery_text": "Nous commençons par comprendre vos besoins, objectifs et défis commerciaux pour créer une solution sur mesure.",
                    "process_design_title": "Design",
                    "process_design_text": "Notre équipe crée des expériences utilisateur intuitives et engageantes qui s'alignent avec l'identité de votre marque.",
                    "process_development_title": "Développement",
                    "process_development_text": "Nous construisons des solutions robustes et évolutives en utilisant des technologies de pointe et les meilleures pratiques.",
                    "process_testing_title": "Test",
                    "process_testing_text": "Un contrôle qualité rigoureux garantit que votre solution est fiable, sécurisée et performante.",
                    "process_deployment_title": "Déploiement",
                    "process_deployment_text": "Nous assurons un déploiement fluide et fournissons une documentation complète et une formation.",
                    "process_support_title": "Support & Croissance",
                    "process_support_text": "Surveillance continue, maintenance et optimisation pour assurer l'évolution de votre solution avec vos besoins.",

                    //commitment section translations
                    "commitment_title": "Notre Engagement",
                    "commitment_subtitle": "Plus que du travail — c'est notre promesse pour vous à mesure que nous grandissons",
                    "commitment_innovation_title": "Fournir de l'innovation avec intégrité",
                    "commitment_innovation_text": "Nous dépassons les limites tout en respectant les normes éthiques les plus élevées dans tout ce que nous faisons.",
                    "commitment_listening_title": "Écouter attentivement vos besoins",
                    "commitment_listening_text": "Vos commentaires forment nos solutions. Nous sommes là pour comprendre et dépasser vos attentes.",
                    "commitment_quality_title": "Se déplacer rapidement, rester focalisé sur la qualité",
                    "commitment_quality_text": "Nous nous équilibrons entre vitesse et excellence, ce qui garantit que chaque solution répond à nos hautes normes.",
                    "commitment_impact_title": "Construire des solutions qui font la différence",
                    "commitment_impact_text": "Nous créons des technologies qui résolvent des problèmes réels et conduisent à des changements significatifs.",

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
                    "footer_discuss": "Discuter du Projet",
                    "footer_discuss_text": "Prêt à démarrer votre projet ? Discutons de la façon dont nous pouvons vous aider à concrétiser vos idées.",
                    "footer_discuss_cta": "Commencer",

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
                    "terms_governing_law_text": "Ces conditions générales sont régies et interprétées conformément aux lois et vous vous soumettez irrévocablement à la juridiction exclusive des tribunaux de cette localité.",

                    // About Hero Section
                    about_hero_title: "Créer l'Excellence Numérique",
                    about_hero_subtitle: "Où l'Innovation Rencontre le But",
                }
            }
        }
    }).then(() => {
        updateContent();
        updateChevronDirections();
    });
}

// Mobile Navigation Toggle
function initializeMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.querySelector('.overlay');

    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnToggle = navToggle.contains(event.target);

        if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            overlay.classList.remove('active');
        }
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            overlay.classList.remove('active');
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
    loadFooter(); // Load the footer component
    initializeTimeline(); // Add this line

    // Check initial scroll position and handle header background
    const header = document.querySelector('header');
    function checkScrollPosition() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Check scroll position on load
    checkScrollPosition();

    // Handle header background on scroll
    window.addEventListener('scroll', checkScrollPosition);

    // Initialize parallax effect for technologies section
    initializeParallaxEffect();
    initializeProcessParallax();
    initializeCommitmentParallax();

    // Commitment section scroll animation
    const commitmentItems = document.querySelectorAll('.commitment-item');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const commitmentObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    commitmentItems.forEach(item => {
        commitmentObserver.observe(item);
    });

    // Parallax effect for commitment items
    document.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        commitmentItems.forEach(item => {
            const speed = item.getAttribute('data-commitment') * 0.1;
            item.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    initializeAboutHero();
});

// Parallax effect for technologies section
function initializeParallaxEffect() {
    const techSection = document.querySelector('.technologies');
    const techCards = document.querySelectorAll('.tech-card');
    const techItems = document.querySelectorAll('.tech-item');

    if (!techSection) return;

    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        const sectionTop = techSection.offsetTop;
        const sectionHeight = techSection.offsetHeight;
        const windowHeight = window.innerHeight;

        // Only apply parallax when section is in view
        if (scrollPosition + windowHeight > sectionTop &&
            scrollPosition < sectionTop + sectionHeight) {

            // Calculate how far we've scrolled through the section
            const scrolled = scrollPosition - sectionTop;
            const progress = scrolled / (sectionHeight + windowHeight);

            // Apply parallax effect to cards
            techCards.forEach((card, index) => {
                const depth = (index + 1) * 10;
                const translateZ = -depth + (progress * depth * 2);
                card.style.transform = `translateZ(${translateZ}px)`;
            });

            // Apply subtle parallax to tech items
            techItems.forEach((item, index) => {
                const depth = (index + 1) * 5;
                const translateZ = -depth + (progress * depth * 2);
                item.style.transform = `translateZ(${translateZ}px)`;
            });
        }
    });
}

function initializeProcessParallax() {
    const processSection = document.querySelector('.process-section');
    const processCards = document.querySelectorAll('.process-card');

    if (!processSection || !processCards.length) return;

    let ticking = false;
    let lastScrollY = window.scrollY;

    function updateParallax() {
        const rect = processSection.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;

        if (isInView) {
            const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);

            processCards.forEach((card, index) => {
                const step = parseInt(card.dataset.step);
                const baseOffset = -step * 10;
                const parallaxOffset = baseOffset + (scrollProgress * 20);

                card.style.transform = `translateY(${parallaxOffset}px) translateZ(${baseOffset}px)`;
            });
        }

        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Initial update
    updateParallax();
}

function initializeCommitmentParallax() {
    const commitmentSection = document.querySelector('.commitment-section');
    const commitmentItems = document.querySelectorAll('.commitment-item');
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const commitmentObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                commitmentObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    commitmentItems.forEach(item => {
        commitmentObserver.observe(item);
    });

    let ticking = false;
    let lastScrollY = window.scrollY;

    function updateParallax() {
        const scrollY = window.scrollY;
        const sectionTop = commitmentSection.offsetTop;
        const sectionHeight = commitmentSection.offsetHeight;
        const viewportHeight = window.innerHeight;

        // Only apply parallax when section is in view
        if (scrollY + viewportHeight > sectionTop && scrollY < sectionTop + sectionHeight) {
            const scrollProgress = (scrollY - sectionTop + viewportHeight) / (sectionHeight + viewportHeight);

            commitmentItems.forEach((item, index) => {
                const depth = item.getAttribute('data-commitment');
                const translateZ = -30 * depth;
                const translateY = 20 * Math.sin(scrollProgress * Math.PI * 2 + index * 0.5);
                const rotateX = 5 * Math.sin(scrollProgress * Math.PI + index * 0.3);

                item.style.transform = `
                    translateY(${translateY}px)
                    translateZ(${translateZ}px)
                    rotateX(${rotateX}deg)
                `;

                // Add subtle rotation to icons
                const icon = item.querySelector('.commitment-icon');
                if (icon) {
                    const iconRotate = 5 * Math.sin(scrollProgress * Math.PI * 2 + index * 0.7);
                    icon.style.transform = `rotate(${iconRotate}deg) scale(1)`;
                }
            });
        }

        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Initial call to set initial positions
    updateParallax();
}

function initializeAboutHero() {
    const heroSection = document.querySelector('.about-hero');
    if (!heroSection) return;

    // Parallax effect for floating elements
    const floatingElements = document.querySelectorAll('.floating-element');
    const heroImage = document.querySelector('.hero-image img');

    function updateParallax() {
        const scrollY = window.scrollY;
        const heroHeight = heroSection.offsetHeight;
        const scrollProgress = Math.min(scrollY / heroHeight, 1);

        // Update floating elements
        floatingElements.forEach(element => {
            const speed = element.dataset.speed || 1;
            const yPos = scrollY * speed * 0.1;
            const xPos = Math.sin(scrollY * 0.001 * speed) * 20;
            element.style.transform = `translate(${xPos}px, ${yPos}px)`;
        });

        // Update hero image
        if (heroImage) {
            const scale = 1 + scrollProgress * 0.1;
            const yPos = scrollY * 0.2;
            heroImage.style.transform = `translateY(${yPos}px) scale(${scale})`;
        }

        // Fade out hero section as we scroll
        heroSection.style.opacity = 1 - scrollProgress;
    }

    // Smooth scroll to mission section
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const missionSection = document.querySelector('.mission-vision-section');
            if (missionSection) {
                missionSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Initialize parallax
    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateParallax);
    });

    // Initial call
    updateParallax();
}

// Scroll indicator functionality
document.addEventListener('DOMContentLoaded', () => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const missionSection = document.querySelector('.mission-vision-section');
            if (missionSection) {
                // Calculate the position to scroll to
                const headerHeight = document.querySelector('header').offsetHeight;
                const missionSectionTop = missionSection.getBoundingClientRect().top + window.pageYOffset;
                const scrollPosition = missionSectionTop - headerHeight - 20; // 20px additional padding

                // Smooth scroll to the calculated position
                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth'
                });

                // Add a subtle animation to the scroll indicator
                scrollIndicator.style.transform = 'translateX(-50%) translateY(8px)';
                setTimeout(() => {
                    scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
                }, 200);
            }
        });
    }
});

function initializeTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observerOptions = {
        root: null,
        rootMargin: '-10% 0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5]
    };

    const timelineObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                requestAnimationFrame(() => {
                    entry.target.classList.add('visible');
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}