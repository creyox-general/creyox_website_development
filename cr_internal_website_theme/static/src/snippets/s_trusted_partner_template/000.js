odoo.define('cr_internal_website_theme.s_trusted_odoo_partner', function (require) {
'use strict';

const publicWidget = require('web.public.widget');

// Widget for exploring clients
const s_trusted_odoo_partner = publicWidget.Widget.extend({
    selector: '.s_trusted_odoo_partner', // Ensure this selector matches the template


    start: function () {

        return this._super(...arguments);
    },



// Register the widget with Odoo
publicWidget.registry.clients = s_trusted_odoo_partner;

return s_trusted_odoo_partner;
});






//odoo.define('cr_internal_website_theme.trusted_partner', function (require) {
//    'use strict';
//
//    const snippetOptions = require('web_editor.snippets.options');
//
//    snippetOptions.registry.TrustedPartnerOptions = snippetOptions.Class.extend({
//
//        /**
//         * Change title HTML
//         */
//        setTitle(previewMode, widgetValue, params) {
//            const el = this.$target[0].querySelector('.partner-title');
//            if (el) {
//                el.innerHTML = widgetValue;
//            }
//        },
//
//        /**
//         * Change paragraph 1
//         */
//        setDesc1(previewMode, widgetValue, params) {
//            // Use querySelectorAll index 0 — most reliable
//            const els = this.$target[0].querySelectorAll('.partner-description');
//            if (els[0]) {
//                els[0].textContent = widgetValue;
//            }
//        },
//
//        /**
//         * Change paragraph 2
//         */
//        setDesc2(previewMode, widgetValue, params) {
//            const els = this.$target[0].querySelectorAll('.partner-description');
//            if (els[1]) {
//                els[1].textContent = widgetValue;
//            }
//        },
//
//        /**
//         * Change button label
//         */
//        setBtnText(previewMode, widgetValue, params) {
//            const el = this.$target[0].querySelector('.cta-button span');
//            if (el) {
//                el.textContent = widgetValue;
//            }
//        },
//
//        /**
//         * Change button URL
//         */
//        setBtnUrl(previewMode, widgetValue, params) {
//            const el = this.$target[0].querySelector('.cta-button');
//            if (el) {
//                el.setAttribute('href', widgetValue);
//            }
//        },
//
//        /**
//         * Change image src
//         */
//        setImageSrc(previewMode, widgetValue, params) {
//            const el = this.$target[0].querySelector('.partner-image');
//            if (el) {
//                el.setAttribute('src', widgetValue);
//            }
//        },
//
//        /**
//         * Sync input values with current DOM when options panel opens
//         */
//        _computeWidgetState(methodName, params) {
//            switch (methodName) {
//                case 'setTitle': {
//                    const el = this.$target[0].querySelector('.partner-title');
//                    return el ? el.innerHTML : '';
//                }
//                case 'setDesc1': {
//                    const els = this.$target[0].querySelectorAll('.partner-description');
//                    return els[0] ? els[0].textContent.trim() : '';
//                }
//                case 'setDesc2': {
//                    const els = this.$target[0].querySelectorAll('.partner-description');
//                    return els[1] ? els[1].textContent.trim() : '';
//                }
//                case 'setBtnText': {
//                    const el = this.$target[0].querySelector('.cta-button span');
//                    return el ? el.textContent.trim() : '';
//                }
//                case 'setBtnUrl': {
//                    const el = this.$target[0].querySelector('.cta-button');
//                    return el ? (el.getAttribute('href') || '') : '';
//                }
//                case 'setImageSrc': {
//                    const el = this.$target[0].querySelector('.partner-image');
//                    return el ? (el.getAttribute('src') || '') : '';
//                }
//            }
//            return this._super(...arguments);
//        },
//    });
//
//    return snippetOptions.registry.TrustedPartnerOptions;
//});