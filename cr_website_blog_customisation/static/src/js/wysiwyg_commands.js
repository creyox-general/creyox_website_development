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
                    var html = '<div class="row align-items-start my-4">' +
                        '<div class="col-lg-12 pr-lg-5">' +
                        '<h3>Introduce Your Main Topic Here</h3>' +
                        '<p>Start your post with an engaging introduction. Explain what readers will learn in this post, set up the context, and hooks to capture their attention.</p>' +
                        '<h3>1. The First Major Topic</h3>' +
                        '<p>Deep dive into your first point. Add key findings, support with details, and use clear typography.</p>' +
                        '<h3>2. The Second Major Topic</h3>' +
                        '<p>Expand on the next topic. Keep paragraphs short and concise for clean web readability.</p>' +
                        '<h3>Conclusion</h3>' +
                        '<p>Summarize the main takeaways of your post and encourage reader interaction or calls to action.</p>' +
                        '</div>' +
                        '</div>';
                    self.odooEditor.execCommand('insert', $(html)[0]);
                },
            });

            // 4. Add Process Steps slash command
            options.commands.push({
                name: _t('Process Steps'),
                category: _t('Creyox Blog'),
                description: _t("Inserts a steps journey layout for workflows or tutorials"),
                fontawesome: 'fa-tasks',
                priority: 30,
                callback: function () {
                    var html = '<section class="s_process_steps cr_font py-5 oe_structure_not_nearest" data-snippet="s_process_steps" data-name="Process Steps">' +
                        '<div class="container">' +
                        '<div class="row mb-5 text-center">' +
                        '<div class="col-12">' +
                        '<h2 class="partner-title display-4 fw-bold">Our <span class="text-gradient">Implementation Journey</span></h2>' +
                        '<p class="lead text-muted">A structured approach to ensure your Odoo success from start to finish.</p>' +
                        '</div>' +
                        '</div>' +
                        '<div class="process-steps-wrapper">' +
                        '<!-- Step 1 -->' +
                        '<div class="process-step-row row align-items-center mb-5">' +
                        '<div class="col-lg-6 step-text-col">' +
                        '<div class="step-card text-card">' +
                        '<h3 class="step-title">Discovery &amp; Analysis</h3>' +
                        '<p class="step-desc">We dive deep into your business processes to identify pain points and opportunities for Odoo optimization.</p>' +
                        '<div class="partner-cta-group mt-4">' +
                        '<a href="/contactus" class="cta-button primary">' +
                        '<span>Learn More</span>' +
                        '<i class="fas fa-arrow-right ms-2" aria-hidden="true"></i>' +
                        '</a>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="col-lg-6 step-image-col">' +
                        '<div class="step-card image-card">' +
                        '<img src="/cr_internal_website_theme/static/src/img/odoo_partner_trust.png" alt="Discovery" class="img-fluid">' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<!-- Step 2 -->' +
                        '<div class="process-step-row row align-items-center mb-5 flex-row-reverse">' +
                        '<div class="col-lg-6 step-text-col">' +
                        '<div class="step-card text-card">' +
                        '<h3 class="step-title">System Configuration</h3>' +
                        '<p class="step-desc">Tailoring Odoo modules to align perfectly with your workflows, ensuring a seamless digital transformation.</p>' +
                        '<div class="partner-cta-group mt-4">' +
                        '<a href="/contactus" class="cta-button primary">' +
                        '<span>Learn More</span>' +
                        '<i class="fas fa-arrow-right ms-2" aria-hidden="true"></i>' +
                        '</a>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="col-lg-6 step-image-col">' +
                        '<div class="step-card image-card">' +
                        '<img src="/cr_internal_website_theme/static/src/img/odoo_partner_trust.png" alt="Configuration" class="img-fluid">' +
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
