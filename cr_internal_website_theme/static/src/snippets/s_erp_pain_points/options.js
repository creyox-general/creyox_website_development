odoo.define('cr_internal_website_theme.snippet_options_erp_pain_points', function (require) {
    'use strict';

    const options = require('web_editor.snippets.options');

    options.registry.ERPPainPointsOptions = options.Class.extend({
        selector: '.s_erp_pain_points',

        setHeading: function (previewMode, widgetValue) {
            const el = this.$target[0].querySelector('.erp-title');
            if (el) el.textContent = widgetValue;
        },

        setSubtitle: function (previewMode, widgetValue) {
            const el = this.$target[0].querySelector('.erp-subtitle');
            if (el) el.textContent = widgetValue;
        },

        setCardIndex: function (previewMode, widgetValue, params) {
            const card = this._getCard(params.cardIndex);
            if (card) {
                const indexEl = card.querySelector('.bento-index');
                if (indexEl) indexEl.textContent = widgetValue;
            }
        },

        setCardTitle: function (previewMode, widgetValue, params) {
            const card = this._getCard(params.cardIndex);
            if (card) {
                const titleEl = card.querySelector('.bento-title');
                if (titleEl) titleEl.textContent = widgetValue;
            }
        },

        setCardText: function (previewMode, widgetValue, params) {
            const card = this._getCard(params.cardIndex);
            if (card) {
                const textEl = card.querySelector('.bento-text');
                if (textEl) textEl.textContent = widgetValue;
            }
        },

        setCardHighlight: function (previewMode, widgetValue, params) {
            const card = this._getCard(params.cardIndex);
            if (card) {
                card.classList.toggle('highlight', widgetValue === 'true');
            }
        },

        _computeWidgetState: function (methodName, params) {
            switch (methodName) {
                case 'setHeading': {
                    const el = this.$target[0].querySelector('.erp-title');
                    return el ? el.textContent.trim() : '';
                }
                case 'setSubtitle': {
                    const el = this.$target[0].querySelector('.erp-subtitle');
                    return el ? el.textContent.trim() : '';
                }
                case 'setCardIndex': {
                    const card = this._getCard(params.cardIndex);
                    if (card) {
                        const indexEl = card.querySelector('.bento-index');
                        return indexEl ? indexEl.textContent.trim() : '';
                    }
                    return '';
                }
                case 'setCardTitle': {
                    const card = this._getCard(params.cardIndex);
                    if (card) {
                        const titleEl = card.querySelector('.bento-title');
                        return titleEl ? titleEl.textContent.trim() : '';
                    }
                    return '';
                }
                case 'setCardText': {
                    const card = this._getCard(params.cardIndex);
                    if (card) {
                        const textEl = card.querySelector('.bento-text');
                        return textEl ? textEl.textContent.trim() : '';
                    }
                    return '';
                }
                case 'setCardHighlight': {
                    const card = this._getCard(params.cardIndex);
                    return card ? card.classList.contains('highlight').toString() : 'false';
                }
            }
            return this._super(...arguments);
        },

        // ── ADD BLOCK ─────────────────────────────────────────────────────
        addCard: function (previewMode, widgetValue, params) {
            if (previewMode) return;
            const matrix = this.$target[0].querySelector('.connected-matrix');
            if (!matrix) return;

            // Find or create last row with space
            let rows = matrix.querySelectorAll('.row.g-4');
            let lastRow = rows[rows.length - 1];
            if (!lastRow) {
                lastRow = document.createElement('div');
                lastRow.className = 'row g-4 mb-4';
                matrix.appendChild(lastRow);
            }

            const count = matrix.querySelectorAll('.matrix-block').length + 1;
            const pad = count < 10 ? '0' + count : '' + count;

            const col = document.createElement('div');
            col.className = 'col-lg-4 col-md-6';
            col.innerHTML =
                '<div class="matrix-block pure-bento-card" data-aos="fade-up">' +
                    '<span class="bento-index">' + pad + '</span>' +
                    '<div class="bento-content">' +
                        '<h3 class="bento-title">New Feature</h3>' +
                        '<p class="bento-text">Add a description for this feature here.</p>' +
                    '</div>' +
                '</div>';
            lastRow.appendChild(col);
        },

        // ── REMOVE LAST BLOCK ─────────────────────────────────────────────
        removeLastCard: function (previewMode, widgetValue, params) {
            if (previewMode) return;
            const matrix = this.$target[0].querySelector('.connected-matrix');
            if (!matrix) return;
            const cols = matrix.querySelectorAll('.col-lg-4, .col-md-6');
            if (cols.length > 1) {
                const last = cols[cols.length - 1];
                // remove empty parent row too if it becomes empty
                const row = last.parentElement;
                last.remove();
                if (row && row.children.length === 0) row.remove();
            }
        },

        _getCard: function (index) {
            return this.$target[0].querySelectorAll('.matrix-block')[index - 1];
        },
    });

});
