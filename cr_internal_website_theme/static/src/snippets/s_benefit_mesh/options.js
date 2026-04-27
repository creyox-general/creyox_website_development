odoo.define('cr_internal_website_theme.snippet_options_benefit_mesh', function (require) {
    'use strict';

    const options = require('web_editor.snippets.options');

    options.registry.BenefitMeshOptions = options.Class.extend({
        selector: '.s_benefit_mesh',

        // --- Header ---
        setHeadingP1: function (previewMode, widgetValue) {
            const titleEl = this.$target[0].querySelector('.section-header .section-title');
            if (titleEl) {
                const nodes = titleEl.childNodes;
                for (let i = 0; i < nodes.length; i++) {
                    if (nodes[i].nodeType === Node.TEXT_NODE) {
                        nodes[i].textContent = widgetValue + ' ';
                        break;
                    }
                }
            }
        },

        setHeadingP2: function (previewMode, widgetValue) {
            const el = this.$target[0].querySelector('.section-header .text-gradient');
            if (el) el.textContent = widgetValue;
        },

        setSubtitle: function (previewMode, widgetValue) {
            const el = this.$target[0].querySelector('.section-header .section-description');
            if (el) el.textContent = widgetValue;
        },

        // --- Card Content ---
        setCardTitle: function (previewMode, widgetValue, params) {
            const idx = parseInt(params.index) - 1;
            const el = this.$target[0].querySelectorAll('.benefit-card .card-title')[idx];
            if (el) el.textContent = widgetValue;
        },

        setCardText: function (previewMode, widgetValue, params) {
            const idx = parseInt(params.index) - 1;
            const el = this.$target[0].querySelectorAll('.benefit-card .card-text')[idx];
            if (el) el.textContent = widgetValue;
        },

        // --- Add / Remove ---
        addCard: function (previewMode) {
            if (previewMode) return;
            const row = this.$target[0].querySelector('.s_benefit_mesh_row');
            if (!row) return;

            const existingCols = row.querySelectorAll('.s_benefit_card_wrapper');
            if (existingCols.length === 0) return;

            // Clone first card for perfect structure/font/zone inheritance
            const newCol = existingCols[0].cloneNode(true);
            newCol.removeAttribute('data-aos');
            newCol.removeAttribute('data-aos-delay');

            const count = existingCols.length + 1;
            const pad = count < 10 ? '0' + count : '' + count;

            const badgeEl = newCol.querySelector('.benefit-badge');
            if (badgeEl) badgeEl.textContent = pad;

            const titleEl = newCol.querySelector('.card-title');
            if (titleEl) titleEl.textContent = 'Strategic Business Benefit';

            const textEl = newCol.querySelector('.card-text');
            if (textEl) textEl.textContent = 'Add a compelling description here to showcase how this specific ERP benefit can transform business operations.';

            row.appendChild(newCol);
        },

        removeLastCard: function (previewMode) {
            if (previewMode) return;
            const row = this.$target[0].querySelector('.s_benefit_mesh_row');
            const cols = row.querySelectorAll('.s_benefit_card_wrapper');
            if (cols.length > 1) {
                cols[cols.length - 1].remove();
            }
        },

        _computeWidgetState: function (methodName, params) {
            const idx = parseInt(params.index) - 1;
            const target = this.$target[0];
            switch (methodName) {
                case 'setHeadingP1': {
                    const titleEl = target.querySelector('.section-header .section-title');
                    if (titleEl) {
                        for (let i = 0; i < titleEl.childNodes.length; i++) {
                            if (titleEl.childNodes[i].nodeType === Node.TEXT_NODE) {
                                return titleEl.childNodes[i].textContent.trim();
                            }
                        }
                    }
                    return '';
                }
                case 'setHeadingP2': {
                    const el = target.querySelector('.section-header .text-gradient');
                    return el ? el.textContent.trim() : '';
                }
                case 'setSubtitle': {
                    const el = target.querySelector('.section-header .section-description');
                    return el ? el.textContent.trim() : '';
                }
                case 'setCardTitle': {
                    const el = target.querySelectorAll('.benefit-card .card-title')[idx];
                    return el ? el.textContent.trim() : '';
                }
                case 'setCardText': {
                    const el = target.querySelectorAll('.benefit-card .card-text')[idx];
                    return el ? el.textContent.trim() : '';
                }
            }
            return this._super(...arguments);
        },
    });

});
