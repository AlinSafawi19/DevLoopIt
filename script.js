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
                    "footer_about_text": "DevLoopIt is a leading software development company dedicated to creating innovative solutions that drive business growth and digital transformation.",
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
                    "footer_gdpr": "GDPR Compliance",
                    "footer_copyright": "© 2025 DevLoopIt. All rights reserved.",
                    "brand_facebook": "Facebook",
                    "brand_instagram": "Instagram",
                    "brand_linkedin": "LinkedIn",
                    "brand_twitter": "Twitter",
                    "brand_github": "GitHub",
                    "brand_devloopit": "DevLoopIt",
                    "term_gdpr": "GDPR"
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
                    "footer_about_text": "ديفلوبيت هي شركة رائدة في تطوير البرمجيات مكرسة لإنشاء حلول مبتكرة تدفع نمو الأعمال والتحول الرقمي.",
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
                    "footer_gdpr": "الامتثال لـ GDPR",
                    "footer_copyright": "© ٢٠٢٥ ديفلوبيت. جميع الحقوق محفوظة.",
                    "brand_facebook": "فيسبوك",
                    "brand_instagram": "انستغرام",
                    "brand_linkedin": "لينكد إن",
                    "brand_twitter": "تويتر",
                    "brand_github": "جيت هب",
                    "brand_devloopit": "ديفلوبيت",
                    "term_gdpr": "GDPR"
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
                    "footer_about_text": "DevLoopIt est une entreprise leader en développement de logiciels dédiée à la création de solutions innovantes qui stimulent la croissance des entreprises et la transformation numérique.",
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
                    "footer_gdpr": "Conformité RGPD",
                    "footer_copyright": "© 2025 DevLoopIt. Tous droits réservés.",
                    "brand_facebook": "Facebook",
                    "brand_instagram": "Instagram",
                    "brand_linkedin": "LinkedIn",
                    "brand_twitter": "Twitter",
                    "brand_github": "GitHub",
                    "brand_devloopit": "DevLoopIt",
                    "term_gdpr": "RGPD"
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