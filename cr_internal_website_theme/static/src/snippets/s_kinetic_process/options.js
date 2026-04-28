odoo.define('cr_internal_website_theme.s_kinetic_process_options', function (require) {
'use strict';

const options = require('web_editor.snippets.options');

options.registry.KineticProcessOptions = options.Class.extend({
    selector: '.s_kinetic_process',

    // --- Header ---
    setHeaderPlain(previewMode, widgetValue, params) {
        const titleEl = this.$target[0].querySelector('.section-header .section-title');
        if (titleEl) {
            // Updated logic to find text node vs span
            if (titleEl.childNodes.length > 0 && titleEl.childNodes[0].nodeType === Node.TEXT_NODE) {
                titleEl.childNodes[0].textContent = widgetValue + ' ';
            } else {
                titleEl.insertBefore(document.createTextNode(widgetValue + ' '), titleEl.firstChild);
            }
        }
    },

    setHeaderGradient(previewMode, widgetValue, params) {
        const el = this.$target[0].querySelector('.section-header .text-gradient');
        if (el) el.textContent = widgetValue;
    },

    setSubtitle(previewMode, widgetValue, params) {
        const el = this.$target[0].querySelector('.section-header .section-subtitle');
        if (el) el.textContent = widgetValue;
    },

    // --- Phase Content (Centralized) ---
    // Standardized classes to match SCSS and Section 8: .kinetic-card, .card-bg-number, .card-title, .card-desc
    setPhaseNum(previewMode, widgetValue, params) {
        const idx = parseInt(params.index) - 1;
        const el = this.$target[0].querySelectorAll('.kinetic-card .card-bg-number')[idx];
        if (el) el.textContent = widgetValue;
    },

    setPhaseTitle(previewMode, widgetValue, params) {
        const idx = parseInt(params.index) - 1;
        const el = this.$target[0].querySelectorAll('.kinetic-card .card-title')[idx];
        if (el) el.textContent = widgetValue;
    },

    setPhaseText(previewMode, widgetValue, params) {
        const idx = parseInt(params.index) - 1;
        const el = this.$target[0].querySelectorAll('.kinetic-card .card-desc')[idx];
        if (el) el.textContent = widgetValue;
    },

    // --- Phase Width (Row 1) ---
    setPhaseWidth(previewMode, widgetValue, params) {
        const idx = parseInt(params.index) - 1;
        const $phase = this.$target.find('.phase-block').eq(idx);
        $phase.removeClass('col-lg-8 col-lg-4 col-lg-12').addClass(widgetValue);
    },

    _computeWidgetState(methodName, params) {
        const idx = parseInt(params.index) - 1;
        switch (methodName) {
            case 'setHeaderPlain': {
                const titleEl = this.$target[0].querySelector('.section-header .section-title');
                if (titleEl && titleEl.childNodes.length > 0 && titleEl.childNodes[0].nodeType === Node.TEXT_NODE) {
                    return titleEl.childNodes[0].textContent.trim();
                }
                return '';
            }
            case 'setHeaderGradient': {
                const el = this.$target[0].querySelector('.section-header .text-gradient');
                return el ? el.textContent.trim() : '';
            }
            case 'setSubtitle': {
                const el = this.$target[0].querySelector('.section-header .section-subtitle');
                return el ? el.textContent.trim() : '';
            }
            case 'setPhaseNum': {
                const el = this.$target[0].querySelectorAll('.kinetic-card .card-bg-number')[idx];
                return el ? el.textContent.trim() : '';
            }
            case 'setPhaseTitle': {
                const el = this.$target[0].querySelectorAll('.kinetic-card .card-title')[idx];
                return el ? el.textContent.trim() : '';
            }
            case 'setPhaseText': {
                const el = this.$target[0].querySelectorAll('.kinetic-card .card-desc')[idx];
                return el ? el.textContent.trim() : '';
            }
            case 'setPhaseWidth': {
                const $phase = this.$target.find('.phase-block').eq(idx);
                if ($phase.hasClass('col-lg-8')) return 'col-lg-8';
                if ($phase.hasClass('col-lg-4')) return 'col-lg-4';
                return 'col-lg-12';
            }
        }
        return this._super(...arguments);
    },
});

});
