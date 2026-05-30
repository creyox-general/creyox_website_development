odoo.define('cr_website_blog_customisation.wysiwyg_commands', function (require) {
    'use strict';

    const Wysiwyg = require('web_editor.wysiwyg');
    const { _t } = require('web.core');

    Wysiwyg.include({
        /**
         * @override
         */
        _getPowerboxOptions: function () {
            var self = this;
            var options = this._super.apply(this, arguments);

            // Ensure categories list exists
            options.categories = options.categories || [];
            options.commands = options.commands || [];

            // 1. Add Creyox Blog category for powerbox commands
            options.categories.push({
                name: _t('Creyox Blog'),
                priority: 300,
            });

            // 3. Add Blog Layout Structure slash command
            options.commands.push({
                name: _t('Blog Post Structure'),
                category: _t('Creyox Blog'),
                description: _t("Inserts a premium blog outline layout structure"),
                fontawesome: 'fa-columns',
                priority: 20,
                callback: function () {
                    var html = '<section class="s_blog_outline oe_structure_not_nearest" data-snippet="s_blog_outline" data-name="Blog Post Structure">' +
                        '<div class="container">' +
                        '<div class="cr-blog-outline">' +
                        '<div class="cr-blog-intro-block">' +
                        '<span class="cr-outline-badge">Introduction</span>' +
                        '<h2 class="cr-outline-heading">Set the Stage for Your Topic</h2>' +
                        '<p class="cr-outline-lead">Hook your reader here with a bold opening statement. Summarize the major challenges or core subjects that this article will address and solve.</p>' +
                        '</div>' +
                        '<div class="cr-blog-content-body">' +
                        '<h3 class="cr-outline-subheading">1. First Key Insight or Strategy</h3>' +
                        '<p>Deep dive into your primary finding or theme here. Support your arguments with data, real-world examples, and structure paragraphs to be easily scannable.</p>' +
                        '<h3 class="cr-outline-subheading">2. Second Key Insight or Strategy</h3>' +
                        '<p>Expand on your next major topic. Offer actionable tips or clear explanations to guide the reader through the solution or workflow step-by-step.</p>' +
                        '</div>' +
                        '<div class="cr-blog-summary-box">' +
                        '<div class="d-flex align-items-center mb-2">' +
                        '<span class="fa fa-lightbulb text-primary me-2"></span>' +
                        '<span class="cr-summary-badge-title">Quick Takeaways</span>' +
                        '</div>' +
                        '<ul class="cr-summary-list mb-0">' +
                        '<li>Summarize your primary learning points in a highly scannable list.</li>' +
                        '<li>Highlight key takeaways or next actionable steps for readers.</li>' +
                        '</ul>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</section>';
                    self.odooEditor.execCommand('insert', $(html)[0]);
                },
            });

            // 4. Add Process Steps slash command
            options.commands.push({
                name: _t('Process Step Row'),
                category: _t('Creyox Blog'),
                description: _t("Inserts a vertically stacked step card with title, description, and image"),
                fontawesome: 'fa-indent',
                priority: 30,
                callback: function () {
                    var html = '<section class="s_process_step_card oe_structure_not_nearest" data-snippet="s_process_step_card" data-name="Process Step Row">' +
                        '<div class="container">' +
                        '<div class="cr-step-row">' +
                        '<div class="cr-step-item">' +
                        '<div class="cr-step-header">' +
                        '<div class="cr-step-number">01</div>' +
                        '<h4 class="cr-step-title">Discovery &amp; Analysis</h4>' +
                        '</div>' +
                        '<div class="cr-step-body">' +
                        '<p class="cr-step-text">We dive deep into business processes to identify pain points and opportunities for Odoo optimization.</p>' +
                        '</div>' +
                        '<div class="cr-step-media">' +
                        '<img src="/cr_internal_website_theme/static/src/img/odoo_partner_trust.png" class="cr-step-img" alt="Step Image"/>' +
                        '</div>' +
                        '<section class="s_process_step_cta oe_structure_not_nearest" data-snippet="s_process_step_cta" data-name="Process Step CTA">' +
                        '<div class="cr-step-action mt-3">' +
                        '<a href="/contactus" class="cr-step-btn">' +
                        '<span>Learn More</span>' +
                        '<span class="fa fa-arrow-right"></span>' +
                        '</a>' +
                        '</div>' +
                        '</section>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</section>';
                    self.odooEditor.execCommand('insert', $(html)[0]);
                },
            });

            // 5. Add Author Profile Card slash command
            options.commands.push({
                name: _t('Author Profile Card'),
                category: _t('Creyox Blog'),
                description: _t("Inserts a premium branded author bio block matching the theme"),
                fontawesome: 'fa-user-circle',
                priority: 40,
                callback: function () {
                    var html = '<section class="s_author_card oe_structure_not_nearest" data-snippet="s_author_card" data-name="Author Profile Card">' +
                        '<div class="container">' +
                        '<div class="cr-author-card">' +
                        '<div class="row align-items-center">' +
                        '<div class="col-md-3 text-center mb-3 mb-md-0">' +
                        '<img src="/web/image/res.users/1/image_128" alt="Author Avatar" class="cr-author-img"/>' +
                        '</div>' +
                        '<div class="col-md-9 text-start">' +
                        '<div class="cr-author-badge">Author Profile</div>' +
                        '<h4 class="cr-author-title">About the Author</h4>' +
                        '<p class="cr-author-desc">This article was written by a senior ERP strategist and technology lead at Creyox Technologies. We specialize in digital transformation, custom development, and business optimization.</p>' +
                        '<div class="cr-author-actions">' +
                        '<a href="/contactus" class="cr-author-btn-primary">Get In Touch</a>' +
                        '<a href="/blog" class="cr-author-btn-link">' +
                        'More Articles <span class="fa fa-arrow-right"></span>' +
                        '</a>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</section>';
                    self.odooEditor.execCommand('insert', $(html)[0]);
                },
            });

            // 6. Add CTA Button slash command
            options.commands.push({
                name: _t('CTA Button'),
                category: _t('Creyox Blog'),
                description: _t("Inserts a premium Creyox call-to-action button"),
                fontawesome: 'fa-link',
                priority: 50,
                callback: function () {
                    var html = '<section class="s_process_step_cta oe_structure_not_nearest" data-snippet="s_process_step_cta" data-name="Process Step CTA">' +
                        '<div class="cr-step-action my-3">' +
                        '<a href="/contactus" class="cr-step-btn">' +
                        '<span>Learn More</span>' +
                        '<span class="fa fa-arrow-right"></span>' +
                        '</a>' +
                        '</div>' +
                        '</section>';
                    self.odooEditor.execCommand('insert', $(html)[0]);
                },
            });

            // 7. Add Buy Now Card slash command
            options.commands.push({
                name: _t('Buy Now Card'),
                category: _t('Creyox Blog'),
                description: _t("Inserts a premium product call-to-action block with pricing and purchase links"),
                fontawesome: 'fa-shopping-cart',
                priority: 60,
                callback: function () {
                    var html = '<section class="s_buy_now_card oe_structure_not_nearest" data-snippet="s_buy_now_card" data-name="Buy Now Card">' +
                        '<div class="container">' +
                        '<div class="cr-buy-now-card">' +
                        '<div class="row align-items-center">' +
                        '<div class="col-lg-3 text-center mb-3 mb-lg-0">' +
                        '<img src="/cr_internal_website_theme/static/src/img/odoo_partner_trust.png" class="img-fluid cr-buy-now-img" alt="Product Image"/>' +
                        '</div>' +
                        '<div class="col-lg-5 text-start">' +
                        '<span class="cr-buy-now-badge">Featured Solution</span>' +
                        '<h4 class="cr-buy-now-title">Odoo Custom Payment Suite</h4>' +
                        '<p class="cr-buy-now-desc">Deploy a seamless, secure, and fully automated payment gateway module tailored for Odoo ecommerce.</p>' +
                        '<div class="cr-buy-now-pricing">' +
                        '<span class="price-old">$299.00</span>' +
                        '<span class="price-current">$199.00</span>' +
                        '<span class="price-tag">One-time license</span>' +
                        '</div>' +
                        '</div>' +
                        '<div class="col-lg-4 text-center mt-3 mt-lg-0">' +
                        '<div class="partner-cta-group">' +
                        '<a href="/shop" class="cta-button w-100 justify-content-center">' +
                        '<span>Buy Now</span>' +
                        '<i class="fas fa-shopping-bag ms-2" aria-hidden="true"></i>' +
                        '</a>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</section>';
                    self.odooEditor.execCommand('insert', $(html)[0]);
                },
            });

            return options;
        },
    });
});
