odoo.define('cr_internal_website_theme.s_erp_comparison_options', function (require) {
'use strict';

const options = require('web_editor.snippets.options');

options.registry.ErpComparisonOptions = options.Class.extend({
    selector: '.s_erp_comparison',

    // --- Header ---
    setPretitle(previewMode, widgetValue, params) {
        const el = this.$target[0].querySelector('.erp-comparison-header-v3 .erp-comparison-pretitle-v3');
        if (el) el.textContent = widgetValue;
    },

    setTitleLegacy(previewMode, widgetValue, params) {
        const titleEl = this.$target[0].querySelector('.erp-comparison-header-v3 .erp-comparison-title-v3');
        if (titleEl) {
            if (titleEl.childNodes.length > 0 && titleEl.childNodes[0].nodeType === Node.TEXT_NODE) {
                titleEl.childNodes[0].textContent = widgetValue + ' ';
            } else {
                titleEl.insertBefore(document.createTextNode(widgetValue + ' '), titleEl.firstChild);
            }
        }
    },

    setTitleModern(previewMode, widgetValue, params) {
        const el = this.$target[0].querySelector('.erp-comparison-header-v3 .text-gradient');
        if (el) el.textContent = widgetValue;
    },

    setHeaderText(previewMode, widgetValue, params) {
        const el = this.$target[0].querySelector('.erp-comparison-header-v3 .erp-comparison-description-v3');
        if (el) el.textContent = widgetValue;
    },

    // --- Columns ---
    setC1Badge(previewMode, widgetValue, params) {
        const el = this.$target[0].querySelector('.legacy-col .erp-comparison-column-badge-v3');
        if (el) el.textContent = widgetValue;
    },

    setC1Title(previewMode, widgetValue, params) {
        const el = this.$target[0].querySelector('.legacy-col .erp-comparison-column-title-v3');
        if (el) el.textContent = widgetValue;
    },

    setC1Subtitle(previewMode, widgetValue, params) {
        const el = this.$target[0].querySelector('.legacy-col .erp-comparison-column-subtitle-v3');
        if (el) el.textContent = widgetValue;
    },

    setC2Badge(previewMode, widgetValue, params) {
        const el = this.$target[0].querySelector('.modern-col .erp-comparison-column-badge-v3');
        if (el) el.textContent = widgetValue;
    },

    setC2Title(previewMode, widgetValue, params) {
        const el = this.$target[0].querySelector('.modern-col .erp-comparison-column-title-v3');
        if (el) el.textContent = widgetValue;
    },

    setC2Subtitle(previewMode, widgetValue, params) {
        const el = this.$target[0].querySelector('.modern-col .erp-comparison-column-subtitle-v3');
        if (el) el.textContent = widgetValue;
    },

    // --- Features ---
    setFeatureTitle(previewMode, widgetValue, params) {
        const colIdx = parseInt(params.col) - 1;
        const featIdx = parseInt(params.idx) - 1;
        const column = this.$target[0].querySelectorAll('.erp-comparison-column-v3')[colIdx];
        if (column) {
            const el = column.querySelectorAll('.erp-comparison-feature-v3 .erp-comparison-feature-title-v3')[featIdx];
            if (el) el.textContent = widgetValue;
        }
    },

    setFeatureText(previewMode, widgetValue, params) {
        const colIdx = parseInt(params.col) - 1;
        const featIdx = parseInt(params.idx) - 1;
        const column = this.$target[0].querySelectorAll('.erp-comparison-column-v3')[colIdx];
        if (column) {
            const el = column.querySelectorAll('.erp-comparison-feature-v3 .erp-comparison-feature-text-v3')[featIdx];
            if (el) el.textContent = widgetValue;
        }
    },

    _computeWidgetState(methodName, params) {
        const colIdx = parseInt(params.col) - 1;
        const featIdx = parseInt(params.idx) - 1;
        switch (methodName) {
            case 'setPretitle': {
                const el = this.$target[0].querySelector('.erp-comparison-header-v3 .erp-comparison-pretitle-v3');
                return el ? el.textContent.trim() : '';
            }
            case 'setTitleModern': {
                const el = this.$target[0].querySelector('.erp-comparison-header-v3 .text-gradient');
                return el ? el.textContent.trim() : '';
            }
        }
        return this._super(...arguments);
    },
});

});
