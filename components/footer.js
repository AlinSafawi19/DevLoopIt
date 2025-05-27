// Footer Component
export function loadFooter() {
    const footerHTML = `
        <footer>
            <div class="footer-container">
                <div class="footer-logo">
                    <a href="/" class="logo" aria-label="DeveLoopIt Home">
                        <img src="/images/lightlogo.png" alt="DeveLoopIt Logo" width="200" height="53" class="theme-logo">
                    </a>
                </div>

                <nav class="footer-section footer-quick-links" aria-label="Quick Links">
                    <h2><i class="fas fa-link"></i> <span data-i18n="footer_quick_links">Quick Links</span></h2>
                    <ul>
                        <li><a href="/" class="footer-link"><i class="fas fa-home footer-icon"></i> <span data-i18n="nav_home">Home</span></a></li>
                        <li><a href="/about/" class="footer-link"><i class="fas fa-info-circle footer-icon"></i> <span data-i18n="nav_about">About Us</span></a></li>
                        <li><a href="/services/" class="footer-link"><i class="fas fa-cogs footer-icon"></i> <span data-i18n="nav_services">Services</span></a></li>
                        <li><a href="/portfolio/" class="footer-link"><i class="fas fa-briefcase footer-icon"></i> <span data-i18n="nav_portfolio">Portfolio</span></a></li>
                        <li><a href="/blog/" class="footer-link"><i class="fas fa-blog footer-icon"></i> <span data-i18n="nav_blog">Blog</span></a></li>
                    </ul>
                </nav>

                <section class="footer-section footer-contact" aria-label="Contact Us">
                    <h2><i class="fas fa-address-card"></i> <span data-i18n="footer_contact">Contact Us</span></h2>
                    <address>
                        <p><i class="fas fa-envelope"></i><a href="mailto:contact@develoopit.net" class="footer-link">contact@develoopit.net</a></p>
                        <p><i class="fas fa-phone"></i> <a href="tel:+1234567890" class="footer-link" data-i18n="footer_phone">+1 (234) 567-890</a></p>
                        <p><i class="fab fa-whatsapp"></i><a href="tel:+1234567890" class="footer-link" data-i18n="footer_phone">+1 (234) 567-890</a></p>
                    </address>
                </section>

                <section class="footer-section footer-follow" aria-label="Follow Us">
                    <h2><i class="fas fa-share-alt"></i> <span data-i18n="footer_follow">Follow Us</span></h2>
                    <ul class="footer-social">
                        <li><a href="https://facebook.com/develoopit" target="_blank" rel="noopener" class="footer-link" aria-label="Facebook"><i class="fab fa-facebook footer-icon"></i> <span data-i18n="brand_facebook">Facebook</span></a></li>
                        <li><a href="https://instagram.com/develoopit" target="_blank" rel="noopener" class="footer-link" aria-label="Instagram"><i class="fab fa-instagram footer-icon"></i> <span data-i18n="brand_instagram">Instagram</span></a></li>
                    </ul>
                </section>

                <section class="footer-section footer-subscribe" aria-label="Subscribe to newsletter">
                    <h2><i class="fas fa-paper-plane"></i> <span data-i18n="footer_stay_updated">Stay Updated</span></h2>
                    <p data-i18n="footer_newsletter_text">Sign up to receive the latest news, tips, and exclusive offers.</p>
                    <form action="/subscribe" method="post">
                        <div class="input-with-icon">
                            <input type="email" id="email-subscribe" name="email" data-i18n-placeholder="footer_email_placeholder" placeholder="Your email" required />
                            <i class="fas fa-envelope"></i>
                        </div>
                        <button type="submit" data-i18n="footer_subscribe">Subscribe</button>
                    </form>
                </section>
                
                <section class="footer-section footer-discuss" aria-label="Discuss Project">
                    <h2><i class="fas fa-comments"></i> <span data-i18n="footer_discuss">Discuss Project</span></h2>
                    <p><span data-i18n="footer_discuss_text">Ready to start your project? Let's discuss how we can help bring your ideas to life.</span></p>
                    <a href="/discuss-project/" class="discuss-project-btn">
                        <i class="fas fa-rocket"></i>
                        <span data-i18n="footer_discuss_cta">Get Started</span>
                    </a>
                </section>

                <section class="footer-section footer-about" aria-label="About Us">
                    <h2><i class="fas fa-info-circle"></i> <span data-i18n="footer_about">About Us</span></h2>
                    <p><span data-i18n="footer_about_text">DeveLoopIt is a leading software development company dedicated to creating innovative solutions that drive business growth and digital transformation.</span></p>
                    <ul class="footer-social">
                        <li><a href="https://linkedin.com/company/develoopit" target="_blank" rel="noopener" class="footer-link" aria-label="LinkedIn"><i class="fab fa-linkedin footer-icon"></i> <span data-i18n="brand_linkedin">LinkedIn</span></a></li>
                        <li><a href="https://twitter.com/develoopit" target="_blank" rel="noopener" class="footer-link" aria-label="Twitter"><i class="fab fa-twitter footer-icon"></i> <span data-i18n="brand_twitter">Twitter</span></a></li>
                        <li><a href="https://github.com/develoopit" target="_blank" rel="noopener" class="footer-link" aria-label="GitHub"><i class="fab fa-github footer-icon"></i> <span data-i18n="brand_github">GitHub</span></a></li>
                    </ul>
                </section>

                <section class="footer-section footer-services" aria-label="Our Services">
                    <h2><i class="fas fa-cogs"></i> <span data-i18n="footer_services">Our Services</span></h2>
                    <ul>
                        <li><a href="/services/web-development" class="footer-link"><i class="fas fa-code footer-icon"></i> <span data-i18n="footer_web_dev">Web Development</span></a></li>
                        <li><a href="/services/mobile-apps" class="footer-link"><i class="fas fa-mobile-alt footer-icon"></i> <span data-i18n="footer_mobile_apps">Mobile Apps</span></a></li>
                        <li><a href="/services/cloud-solutions" class="footer-link"><i class="fas fa-cloud footer-icon"></i> <span data-i18n="footer_cloud">Cloud Solutions</span></a></li>
                        <li><a href="/services/ai-ml" class="footer-link"><i class="fas fa-brain footer-icon"></i> <span data-i18n="footer_ai_ml">AI & Machine Learning</span></a></li>
                        <li><a href="/services/consulting" class="footer-link"><i class="fas fa-chart-line footer-icon"></i> <span data-i18n="footer_consulting">Tech Consulting</span></a></li>
                    </ul>
                </section>

                <section class="footer-section footer-legal" aria-label="Legal Information">
                    <h2><i class="fas fa-shield-alt"></i> <span data-i18n="footer_legal">Legal</span></h2>
                    <ul>
                        <li><a href="/privacy-policy" class="footer-link"><i class="fas fa-user-shield footer-icon"></i> <span data-i18n="footer_privacy">Privacy Policy</span></a></li>
                        <li><a href="/terms-of-service" class="footer-link"><i class="fas fa-file-contract footer-icon"></i> <span data-i18n="footer_terms">Terms of Service</span></a></li>
                    </ul>
                </section>
            </div>

            <div class="footer-bottom">
                <p><span data-i18n="footer_copyright">© 2025 DeveLoopIt. All rights reserved.</span></p>
            </div>
        </footer>
    `;

    // Insert the footer before the closing body tag
    document.body.insertAdjacentHTML('beforeend', footerHTML);
} 