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
         * Toggles Table of Contents presence independently
         */
        setToc(previewMode, widgetValue, params) {
            if (widgetValue === 'with-toc') {
                var $sidebar = this.$target.find('.cr-blog-sidebar-col');
                if ($sidebar.length === 0) {
                    this.$target.append('<div class="cr-blog-sidebar-col o_not_editable"><div class="cr-blog-sidebar-sticky-wrap"></div></div>');
                    $sidebar = this.$target.find('.cr-blog-sidebar-col');
                }
                var $wrap = $sidebar.find('.cr-blog-sidebar-sticky-wrap');

                var $toc = $wrap.find('.s_blog_toc');
                if ($toc.length === 0) {
                    var html = '<section class="s_blog_toc oe_structure_not_nearest" data-snippet="s_blog_toc" data-name="Blog Table of Contents">' +
                        '<div class="cr-blog-toc-sidebar">' +
                        '<div class="cr-toc-title">On This Page</div>' +
                        '<ul class="cr-toc-list o_not_editable">' +
                        '</ul>' +
                        '</div>' +
                        '</section>';
                    $wrap.prepend(html);
                    if (this.trigger_up) {
                        this.trigger_up('widgets_start');
                    }
                }
            } else {
                var $sidebar = this.$target.find('.cr-blog-sidebar-col');
                if ($sidebar.length > 0) {
                    var $wrap = $sidebar.find('.cr-blog-sidebar-sticky-wrap');
                    $wrap.find('.s_blog_toc').remove();
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
            if (methodName === 'setToc') {
                return this.$target.find('.cr-blog-sidebar-col .s_blog_toc').length > 0 ? 'with-toc' : '';
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



