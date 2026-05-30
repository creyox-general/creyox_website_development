odoo.define('cr_website_blog_customisation.blog_contact_us_options', function (require) {
    'use strict';

    const options = require('web_editor.snippets.options');

    options.registry.BlogContactLayoutOptions = options.Class.extend({
        /**
         * Toggles Contact Us Sidebar presence independently
         */
        setContactUs(previewMode, widgetValue, params) {
            if (widgetValue === 'with-contact') {
                var $sidebar = this.$target.find('.cr-blog-sidebar-col');
                if ($sidebar.length === 0) {
                    this.$target.append('<div class="cr-blog-sidebar-col o_not_editable"><div class="cr-blog-sidebar-sticky-wrap"></div></div>');
                    $sidebar = this.$target.find('.cr-blog-sidebar-col');
                }
                var $wrap = $sidebar.find('.cr-blog-sidebar-sticky-wrap');

                var $contact = $wrap.find('.s_blog_contact_us');
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
                        '<span>info@creyox.com</span>' +
                        '</div>' +
                        '<div class="cr-contact-info-item">' +
                        '<i class="fa fa-phone"></i>' +
                        '<span>+91 9265290098</span>' +
                        '</div>' +
                        '</div>' +
                        '<div class="partner-cta-group mt-3">' +
                        '<a href="/contactus" class="cta-button w-100 justify-content-center">' +
                        '<span>Get Free Consultation</span>' +
                        '<i class="fa fa-arrow-right ms-2" aria-hidden="true"></i>' +
                        '</a>' +
                        '</div>' +
                        '</div>' +
                        '</section>';
                    $wrap.append(html);
                    if (this.trigger_up) {
                        this.trigger_up('widgets_start');
                    }
                }
            } else {
                var $sidebar = this.$target.find('.cr-blog-sidebar-col');
                if ($sidebar.length > 0) {
                    var $wrap = $sidebar.find('.cr-blog-sidebar-sticky-wrap');
                    $wrap.find('.s_blog_contact_us').remove();
                    if ($wrap.children().length === 0) {
                        $sidebar.remove();
                    }
                }
            }
        },

        /**
         * Determine active layout states independently based on snippet presence
         * @override
         */
        _computeWidgetState(methodName, params) {
            if (methodName === 'setContactUs') {
                return this.$target.find('.cr-blog-sidebar-col .s_blog_contact_us').length > 0 ? 'with-contact' : '';
            }
            return this._super.apply(this, arguments);
        },
    });
});
