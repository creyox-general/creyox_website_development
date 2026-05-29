odoo.define('cr_website_blog_customisation.blog_contact_us_options', function (require) {
    'use strict';

    const options = require('web_editor.snippets.options');

    options.registry.BlogContactLayoutOptions = options.Class.extend({
        /**
         * Toggles Contact Us Sidebar presence independently
         */
        setContactUs(previewMode, widgetValue, params) {
            if (widgetValue === 'with-contact') {
                var $contact = this.$target.find('.s_blog_contact_us');
                if ($contact.length === 0) {
                    var html = '<section class="s_blog_contact_us oe_structure_not_nearest" data-snippet="s_blog_contact_us" data-name="Blog Contact Us Sidebar">' +
                        '<div class="cr-blog-contact-sidebar">' +
                        '<div class="cr-contact-icon-wrap">' +
                        '<i class="fa fa-paper-plane cr-contact-icon"></i>' +
                        '</div>' +
                        '<div class="cr-contact-title">Need Expert Help?</div>' +
                        '<p class="cr-contact-text">' +
                        'Speak with our payment integration and custom software development specialists today!' +
                        '</p>' +
                        '<div class="cr-contact-info-list">' +
                        '<div class="cr-contact-info-item">' +
                        '<i class="fa fa-envelope"></i>' +
                        '<span>sales@creyox.com</span>' +
                        '</div>' +
                        '<div class="cr-contact-info-item">' +
                        '<i class="fa fa-phone"></i>' +
                        '<span>+1 (888) 998-0720</span>' +
                        '</div>' +
                        '</div>' +
                        '<a href="/contactus" class="btn cr-contact-btn w-100">' +
                        'Get Free Consultation' +
                        '</a>' +
                        '</div>' +
                        '</section>';
                    this.$target.append(html);
                    if (this.trigger_up) {
                        this.trigger_up('widgets_start');
                    }
                }
            } else {
                this.$target.find('.s_blog_contact_us').remove();
            }
        },

        /**
         * Determine active layout states independently based on snippet presence
         * @override
         */
        _computeWidgetState(methodName, params) {
            if (methodName === 'setContactUs') {
                return this.$target.find('.s_blog_contact_us').length > 0 ? 'with-contact' : '';
            }
            return this._super.apply(this, arguments);
        },
    });
});
