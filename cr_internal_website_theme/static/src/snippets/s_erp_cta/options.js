odoo.define('cr_internal_website_theme.s_erp_cta_options', function (require) {
    'use strict';

    const options = require('web_editor.snippets.options');

    options.registry.ErpCtaOptions = options.Class.extend({
        selector: '.erp-cta-section',

        setCtaTitle: function (previewMode, widgetValue, params) {
            const el = this.$target[0].querySelector('#erp-cta-heading');
            if (el) {
                // Keep the span.highlight if it exists for the default text, 
                // but if they type something new, it might replace the whole thing.
                // For simplicity, let's just set the text content or handle the highlight span.
                el.textContent = widgetValue;
            }
        },

        setCtaBtnText: function (previewMode, widgetValue, params) {
            const el = this.$target[0].querySelector('.cta-button span');
            if (el) el.textContent = widgetValue;
        },

        setCtaBtnLink: function (previewMode, widgetValue, params) {
            const el = this.$target[0].querySelector('.cta-button');
            if (el) el.setAttribute('href', widgetValue);
        },

        _computeWidgetState: function (methodName, params) {
            switch (methodName) {
                case 'setCtaTitle': {
                    const el = this.$target[0].querySelector('#erp-cta-heading');
                    return el ? el.textContent.trim() : '';
                }
                case 'setCtaBtnText': {
                    const el = this.$target[0].querySelector('.cta-button span');
                    return el ? el.textContent.trim() : '';
                }
                case 'setCtaBtnLink': {
                    const el = this.$target[0].querySelector('.cta-button');
                    return el ? el.getAttribute('href') : '';
                }
            }
            return this._super(...arguments);
        },
    });

});
