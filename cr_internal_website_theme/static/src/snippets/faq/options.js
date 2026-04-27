odoo.define('cr_internal_website_theme.s_dynamic_snippet_faq_options', function (require) {
'use strict';

const options = require('web_editor.snippets.options');

options.registry.FaqLayoutOptions = options.Class.extend({
    /**
     * Set the layout class on the snippet.
     */
    setFaqLayout(previewMode, widgetValue, params) {
        const classesToRemove = [
            'o_faq_template_1',
            'o_faq_template_2',
            'o_faq_template_3',
            'o_faq_template_4',
            'o_faq_template_5'
        ];
        this.$target.removeClass(classesToRemove.join(' '));
        if (widgetValue) {
            this.$target.addClass(widgetValue);
        }
    },

    /**
     * @override
     */
    _computeWidgetState(methodName, params) {
        if (methodName === 'setFaqLayout') {
            const classes = this.$target.attr('class').split(' ');
            return classes.find(c => c.startsWith('o_faq_template_')) || 'o_faq_template_1';
        }
        return this._super.apply(this, arguments);
    },
});

});
