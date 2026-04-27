odoo.define('cr_internal_website_theme.s_service_showcase_options', function (require) {
    'use strict';

    const options = require('web_editor.snippets.options');

    options.registry.ServiceShowcaseOptions = options.Class.extend({
        selector: '.s_service_showcase',

        // --- Header ---
        setHeadingP1: function (previewMode, widgetValue, params) {
            const titleEl = this.$target[0].querySelector('.section-header .section-title');
            if (titleEl) {
                const nodes = titleEl.childNodes;
                let textNode = null;
                for (let i = 0; i < nodes.length; i++) {
                    if (nodes[i].nodeType === Node.TEXT_NODE) {
                        textNode = nodes[i];
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

        setHeadingP2: function (previewMode, widgetValue, params) {
            const el = this.$target[0].querySelector('.section-header .text-gradient');
            if (el) el.textContent = widgetValue;
        },

        setSubtitle: function (previewMode, widgetValue, params) {
            const el = this.$target[0].querySelector('.section-header .section-description');
            if (el) el.textContent = widgetValue;
        },

        // --- Card Content (Centralized) ---
        setCardTheme: function (previewMode, widgetValue, params) {
            const idx = parseInt(params.index) - 1;
            const el = this.$target[0].querySelectorAll('.service-card')[idx];
            if (el) {
                el.classList.remove('card-blue', 'card-dark');
                if (widgetValue) el.classList.add(widgetValue);
            }
        },

        setCardIcon: function (previewMode, widgetValue, params) {
            const idx = parseInt(params.index) - 1;
            const el = this.$target[0].querySelectorAll('.service-card .card-icon i')[idx];
            if (el) el.className = widgetValue;
        },

        setCardTitle: function (previewMode, widgetValue, params) {
            const idx = parseInt(params.index) - 1;
            const el = this.$target[0].querySelectorAll('.service-card .card-title')[idx];
            if (el) el.textContent = widgetValue;
        },

        setCardText: function (previewMode, widgetValue, params) {
            const idx = parseInt(params.index) - 1;
            const el = this.$target[0].querySelectorAll('.service-card .card-text')[idx];
            if (el) el.textContent = widgetValue;
        },

        // ── ADD BLOCK ─────────────────────────────────────────────────────
        addCard: function (previewMode, widgetValue, params) {
            if (previewMode) return;
            const row = this.$target[0].querySelector('.s_service_showcase_row');
            if (!row) return;

            const existingCols = row.querySelectorAll('.s_service_card_wrapper');
            if (existingCols.length === 0) return;

            // CLONE THE FIRST CARD to ensure perfect font-family and structure inheritance
            const newCol = existingCols[0].cloneNode(true);
            
            // Remove AOS to prevent double animation or weirdness
            newCol.removeAttribute('data-aos');
            newCol.removeAttribute('data-aos-delay');
            
            // Increment count and update text
            const count = existingCols.length + 1;
            const titleEl = newCol.querySelector('.card-title');
            if (titleEl) titleEl.textContent = count + '. New Service';

            const textEl = newCol.querySelector('.card-text');
            if (textEl) textEl.textContent = 'Add a description for this service here.';

            // Reset icon to a default
            const iconEl = newCol.querySelector('.card-icon i');
            if (iconEl) iconEl.className = 'fas fa-cog';

            // Theme alternation
            const cardEl = newCol.querySelector('.service-card');
            if (cardEl) {
                cardEl.classList.remove('card-blue', 'card-dark');
                cardEl.classList.add((count % 2 === 0) ? 'card-dark' : 'card-blue');
            }

            row.appendChild(newCol);
        },

        // ── REMOVE LAST BLOCK ─────────────────────────────────────────────
        removeLastCard: function (previewMode, widgetValue, params) {
            if (previewMode) return;
            const row = this.$target[0].querySelector('.s_service_showcase_row');
            if (!row) return;
            const cols = row.querySelectorAll('.s_service_card_wrapper');
            if (cols.length > 1) {
                cols[cols.length - 1].remove();
            }
        },

        _computeWidgetState: function (methodName, params) {
            const idx = parseInt(params.index) - 1;
            switch (methodName) {
                case 'setHeadingP1': {
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
                case 'setHeadingP2': {
                    const el = this.$target[0].querySelector('.section-header .text-gradient');
                    return el ? el.textContent.trim() : '';
                }
                case 'setSubtitle': {
                    const el = this.$target[0].querySelector('.section-header .section-description');
                    return el ? el.textContent.trim() : '';
                }
                case 'setCardTheme': {
                    const el = this.$target[0].querySelectorAll('.service-card')[idx];
                    if (el) {
                        if (el.classList.contains('card-blue')) return 'card-blue';
                        if (el.classList.contains('card-dark')) return 'card-dark';
                    }
                    return '';
                }
                case 'setCardIcon': {
                    const el = this.$target[0].querySelectorAll('.service-card .card-icon i')[idx];
                    return el ? el.className : '';
                }
                case 'setCardTitle': {
                    const el = this.$target[0].querySelectorAll('.service-card .card-title')[idx];
                    return el ? el.textContent.trim() : '';
                }
                case 'setCardText': {
                    const el = this.$target[0].querySelectorAll('.service-card .card-text')[idx];
                    return el ? el.textContent.trim() : '';
                }
            }
            return this._super(...arguments);
        },
    });

});
