odoo.define('cr_internal_website_theme.s_specialist_grid_options', function (require) {
    'use strict';

    const options = require('web_editor.snippets.options');

    options.registry.SpecialistGridOptions = options.Class.extend({
        selector: '.s_specialist_grid',

        // --- Header ---
        setHeaderPlain: function (previewMode, widgetValue, params) {
            const titleEl = this.$target[0].querySelector('.section-header .section-title');
            if (titleEl) {
                let textNode = null;
                for (let i = 0; i < titleEl.childNodes.length; i++) {
                    if (titleEl.childNodes[i].nodeType === Node.TEXT_NODE) {
                        textNode = titleEl.childNodes[i];
                        break;
                    }
                }
                if (textNode) {
                    textNode.textContent = widgetValue + ' ';
                } else {
                    titleEl.insertBefore(document.createTextNode(widgetValue + ' '), titleEl.firstChild);
                }
            }
        },

        setHeaderGradient: function (previewMode, widgetValue, params) {
            const el = this.$target[0].querySelector('.section-header .text-gradient');
            if (el) el.textContent = widgetValue;
        },

        setSubtitle: function (previewMode, widgetValue, params) {
            const el = this.$target[0].querySelector('.section-header .section-subtitle');
            if (el) el.textContent = widgetValue;
        },

        // --- Card Content (Centralized) ---
        setCardDigit: function (previewMode, widgetValue, params) {
            const idx = parseInt(params.index) - 1;
            const el = this.$target[0].querySelectorAll('.specialist-card .card-digit')[idx];
            if (el) el.textContent = widgetValue;
        },

        setCardTitle: function (previewMode, widgetValue, params) {
            const idx = parseInt(params.index) - 1;
            const el = this.$target[0].querySelectorAll('.specialist-card .card-title')[idx];
            if (el) el.textContent = widgetValue;
        },

        setCardText: function (previewMode, widgetValue, params) {
            const idx = parseInt(params.index) - 1;
            const el = this.$target[0].querySelectorAll('.specialist-card .card-text')[idx];
            if (el) el.textContent = widgetValue;
        },

        // ── ADD BLOCK ─────────────────────────────────────────────────────
        addCard: function (previewMode, widgetValue, params) {
            if (previewMode) return;
            const row = this.$target[0].querySelector('.s_specialist_grid_row');
            if (!row) return;

            const count = row.querySelectorAll('.s_specialist_card_col').length + 1;
            const pad = count < 10 ? '0' + count : '' + count;

            // Detect current col class from existing cards
            const existing = row.querySelector('.s_specialist_card_col');
            const colClass = existing ? existing.className.replace('s_specialist_card_col', '').trim() : 'col-lg-3 col-md-6';

            const col = document.createElement('div');
            col.className = 's_specialist_card_col ' + colClass;
            col.setAttribute('data-aos', 'fade-up');
            col.innerHTML =
                '<div class="specialist-card h-100">' +
                    '<div class="card-digit">' + pad + '</div>' +
                    '<h3 class="card-title">New Service</h3>' +
                    '<p class="card-text">Add a description for this service here.</p>' +
                '</div>';
            row.appendChild(col);
        },

        // ── REMOVE LAST BLOCK ─────────────────────────────────────────────
        removeLastCard: function (previewMode, widgetValue, params) {
            if (previewMode) return;
            const row = this.$target[0].querySelector('.s_specialist_grid_row');
            if (!row) return;
            const cols = row.querySelectorAll('.s_specialist_card_col');
            if (cols.length > 1) {
                cols[cols.length - 1].remove();
            }
        },

        _computeWidgetState: function (methodName, params) {
            const idx = parseInt(params.index) - 1;
            switch (methodName) {
                case 'setHeaderPlain': {
                    const titleEl = this.$target[0].querySelector('.section-header .section-title');
                    if (titleEl) {
                        for (let i = 0; i < titleEl.childNodes.length; i++) {
                            if (titleEl.childNodes[i].nodeType === Node.TEXT_NODE) {
                                return titleEl.childNodes[i].textContent.trim();
                            }
                        }
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
                case 'setCardDigit': {
                    const el = this.$target[0].querySelectorAll('.specialist-card .card-digit')[idx];
                    return el ? el.textContent.trim() : '';
                }
                case 'setCardTitle': {
                    const el = this.$target[0].querySelectorAll('.specialist-card .card-title')[idx];
                    return el ? el.textContent.trim() : '';
                }
                case 'setCardText': {
                    const el = this.$target[0].querySelectorAll('.specialist-card .card-text')[idx];
                    return el ? el.textContent.trim() : '';
                }
            }
            return this._super(...arguments);
        },
    });

});
