odoo.define('cr_website_blog_customisation.cr_random_blogs_options', function (require) {
    'use strict';

    const options = require('web_editor.snippets.options');
    var wUtils = require('website.utils');


    options.registry.DisplayRandomBLogs = options.Class.extend({
        selector: '.cr_random_blogs',

        init: function () {
            this._super.apply(this, arguments);
        },
    });

    options.registry.BlogLayoutOptions = options.Class.extend({
        /**
         * Toggles column layouts by injecting/removing the Table of Contents section snippet
         */
        setColumns(previewMode, widgetValue, params) {
            if (widgetValue === 'cr-blog-two-columns') {
                // Find existing TOC snippet inside content container
                var $toc = this.$target.find('.s_blog_toc');
                if ($toc.length === 0) {
                    // Auto-generate clean, premium Table of Contents section snippet payload
                    var html = '<section class="s_blog_toc oe_structure_not_nearest" data-snippet="s_blog_toc" data-name="Blog Table of Contents">' +
                        '<div class="cr-blog-toc-sidebar">' +
                        '<div class="cr-toc-title">On This Page</div>' +
                        '<ul class="cr-toc-list o_not_editable">' +
                        '</ul>' +
                        '</div>' +
                        '</section>';

                    // Append it to the content container, CSS Grid pulls it side-by-side!
                    this.$target.append(html);

                    // Refresh WYSIWYG system to register the new widget
                    if (this.trigger_up) {
                        this.trigger_up('widgets_start');
                    }
                }
            } else {
                // Remove the TOC snippet on returning to single column layout
                this.$target.find('.s_blog_toc').remove();
            }
        },

        /**
         * Determine active layout option based on the presence of .s_blog_toc inside saved markup
         * @override
         */
        _computeWidgetState(methodName, params) {
            if (methodName === 'setColumns') {
                return this.$target.find('.s_blog_toc').length > 0 ? 'cr-blog-two-columns' : '';
            }
            return this._super.apply(this, arguments);
        },
    });

    options.registry.BlogBannerLayoutOptions = options.Class.extend({
        /**
         * Toggles banner styles and saves them permanently to the blog post record via RPC
         */
        setBannerLayout: function (previewMode, widgetValue, params) {
            var self = this;
            // Apply class changes in real-time to the target DOM element
            this.$target.removeClass('cr-banner-layout-1 cr-banner-layout-2 cr-banner-layout-3');
            if (widgetValue) {
                this.$target.addClass(widgetValue);
            }

            // Retrieve the active blog post ID from data attribute or mainObject context
            var blogPostId = this.$target.data('blog-post-id');
            if (!blogPostId && this.options.mainObject && this.options.mainObject.model === 'blog.post') {
                blogPostId = this.options.mainObject.id;
            }

            if (blogPostId) {
                this._rpc({
                    model: 'blog.post',
                    method: 'write',
                    args: [[blogPostId], {
                        'banner_layout_class': widgetValue
                    }],
                });
            }
        },

        /**
         * Set active selection checkmark in editor dropdown based on current class
         * @override
         */
        _computeWidgetState: function (methodName, params) {
            if (methodName === 'setBannerLayout') {
                if (this.$target.hasClass('cr-banner-layout-1')) {
                    return 'cr-banner-layout-1';
                } else if (this.$target.hasClass('cr-banner-layout-2')) {
                    return 'cr-banner-layout-2';
                } else if (this.$target.hasClass('cr-banner-layout-3')) {
                    return 'cr-banner-layout-3';
                }
                return 'cr-banner-layout-2'; // Default layout fallback
            }
            return this._super.apply(this, arguments);
        },
    });
});



