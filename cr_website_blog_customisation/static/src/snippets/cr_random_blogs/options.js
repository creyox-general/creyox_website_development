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
});



