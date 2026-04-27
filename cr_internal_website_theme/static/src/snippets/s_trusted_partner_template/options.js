odoo.define('cr_internal_website_theme.snippet_options_trusted_partner', function (require) {
'use strict';

const options = require('web_editor.snippets.options');

options.registry.TrustedPartnerOptions = options.Class.extend({
    selector: '.s_trusted_odoo_partner',

    start() {
        console.log('in options....')
        return this._super(...arguments);
    },

    setTitle(previewMode, widgetValue, params) {
        const el = this.$target[0].querySelector('.partner-title');
        if (el) el.innerHTML = widgetValue;
    },

    setDesc1(previewMode, widgetValue, params) {
        const el = this.$target[0].querySelectorAll('.partner-description')[0];
        if (el) el.textContent = widgetValue;
    },

    setDesc2(previewMode, widgetValue, params) {
        const el = this.$target[0].querySelectorAll('.partner-description')[1];
        if (el) el.textContent = widgetValue;
    },

    setBtnText(previewMode, widgetValue, params) {
        const el = this.$target[0].querySelector('.cta-button span');
        if (el) el.textContent = widgetValue;
    },

    setBtnUrl(previewMode, widgetValue, params) {
        const el = this.$target[0].querySelector('.cta-button');
        if (el) el.setAttribute('href', widgetValue);
    },

    setImageSrc(previewMode, widgetValue, params) {
        const el = this.$target[0].querySelector('.partner-image');
        if (el) el.setAttribute('src', widgetValue);
    },

    _computeWidgetState(methodName, params) {
        switch (methodName) {
            case 'setTitle': {
                const el = this.$target[0].querySelector('.partner-title');
                return el ? el.innerHTML : '';
            }
            case 'setDesc1': {
                // FIX: use index 0, not nth-of-type
                const el = this.$target[0].querySelectorAll('.partner-description')[0];
                return el ? el.textContent.trim() : '';
            }
            case 'setDesc2': {
                const el = this.$target[0].querySelectorAll('.partner-description')[1];
                return el ? el.textContent.trim() : '';
            }
            case 'setBtnText': {
                const el = this.$target[0].querySelector('.cta-button span');
                return el ? el.textContent.trim() : '';
            }
            case 'setBtnUrl': {
                const el = this.$target[0].querySelector('.cta-button');
                return el ? (el.getAttribute('href') || '') : '';
            }
            case 'setImageSrc': {
                const el = this.$target[0].querySelector('.partner-image');
                return el ? (el.getAttribute('src') || '') : '';
            }
        }
        return this._super(...arguments);
    },


});
});












///** @odoo-module **/
//
//import { registry } from "@web/core/registry";
//import { SnippetOptionWidget } from "@web_editor/js/editor/snippets.options";
//
//// For Odoo 16/17 — ES Module style
//const snippetOptionsRegistry = registry.category("snippets_options") ??
//    require("web_editor.snippets.options");
//
//import options from "@web_editor/js/editor/snippets.options";
//
//options.registry.TrustedPartnerOptions = options.Class.extend({
//
//    start() {
//    console.log('in options....')
//        return this._super(...arguments);
//    },
//
//    setTitle(previewMode, widgetValue, params) {
//        const el = this.$target[0].querySelector('.partner-title');
//        if (el) el.innerHTML = widgetValue;
//    },
//
//    setDesc1(previewMode, widgetValue, params) {
//        const el = this.$target[0].querySelectorAll('.partner-description')[0];
//        if (el) el.textContent = widgetValue;
//    },
//
//    setDesc2(previewMode, widgetValue, params) {
//        const el = this.$target[0].querySelectorAll('.partner-description')[1];
//        if (el) el.textContent = widgetValue;
//    },
//
//    setBtnText(previewMode, widgetValue, params) {
//        const el = this.$target[0].querySelector('.cta-button span');
//        if (el) el.textContent = widgetValue;
//    },
//
//    setBtnUrl(previewMode, widgetValue, params) {
//        const el = this.$target[0].querySelector('.cta-button');
//        if (el) el.setAttribute('href', widgetValue);
//    },
//
//    setImageSrc(previewMode, widgetValue, params) {
//        const el = this.$target[0].querySelector('.partner-image');
//        if (el) el.setAttribute('src', widgetValue);
//    },
//
//    _computeWidgetState(methodName, params) {
//        switch (methodName) {
//            case 'setTitle': {
//                const el = this.$target[0].querySelector('.partner-title');
//                return el ? el.innerHTML : '';
//            }
//            case 'setDesc1': {
//                // FIX: use index 0, not nth-of-type
//                const el = this.$target[0].querySelectorAll('.partner-description')[0];
//                return el ? el.textContent.trim() : '';
//            }
//            case 'setDesc2': {
//                const el = this.$target[0].querySelectorAll('.partner-description')[1];
//                return el ? el.textContent.trim() : '';
//            }
//            case 'setBtnText': {
//                const el = this.$target[0].querySelector('.cta-button span');
//                return el ? el.textContent.trim() : '';
//            }
//            case 'setBtnUrl': {
//                const el = this.$target[0].querySelector('.cta-button');
//                return el ? (el.getAttribute('href') || '') : '';
//            }
//            case 'setImageSrc': {
//                const el = this.$target[0].querySelector('.partner-image');
//                return el ? (el.getAttribute('src') || '') : '';
//            }
//        }
//        return this._super(...arguments);
//    },
//});