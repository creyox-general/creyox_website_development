odoo.define('cr_faq_snippet.s_dynamic_snippet_faq_options', function (require) {
'use strict';

const options = require('web_editor.snippets.options');

options.registry.FaqLayoutOptions = options.Class.extend({

    setFaqLayout(previewMode, widgetValue, params) {
        const classesToRemove = [
            'o_faq_template_1',
            'o_faq_template_2',
            'o_faq_template_4',
            'o_faq_template_5',
        ];

        this.$target.removeClass(classesToRemove.join(' '));

        if (widgetValue) {
            this.$target.addClass(widgetValue).then(()=> {
                const widget = this.$target.data('widget');
                if (widget) {
                    widget.updateLayout();
                }
            });
        }

    },
    _computeWidgetState(methodName, params) {
        if (methodName === 'setFaqLayout') {
            const classes = this.$target.attr('class').split(' ');
            return classes.find(c => c.startsWith('o_faq_template_')) || 'o_faq_template_1';
        }
        return this._super.apply(this, arguments);
    },
});
});
