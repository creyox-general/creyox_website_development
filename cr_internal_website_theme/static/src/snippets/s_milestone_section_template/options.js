odoo.define('cr_internal_website_theme.snippet_options_milestone_section', function (require) {
    'use strict';

    const options = require('web_editor.snippets.options');

    options.registry.MilestoneSectionOptions = options.Class.extend({
        selector: '.s_milestone_section',

        // ── Lifecycle ───────────────────────────────────────────────────────
        start() {
            return this._super(...arguments);
        },

        // ── Heading ─────────────────────────────────────────────────────────
        setHeading(previewMode, widgetValue) {
            const el = this.$target[0].querySelector('.milestone-heading');
            if (el) el.textContent = widgetValue;
        },

        // ── Generic per-card setters ─────────────────────────────────────────
        /**
         * All four card-level setters share the same helper.
         * The we-input elements carry  data-card-index="N"  which Odoo
         * passes through as params.cardIndex.
         */
        setCardIcon(previewMode, widgetValue, params) {
            const card = this._getCard(params.cardIndex);
            if (!card) return;
            const icon = card.querySelector('.milestone-icon i');
            if (icon) icon.className = widgetValue || 'fas fa-star';
        },

        setCardCount(previewMode, widgetValue, params) {
            const card = this._getCard(params.cardIndex);
            if (!card) return;
            const counter = card.querySelector('.counter');
            if (counter) {
                counter.dataset.count = widgetValue || '0';
                // Show the new value immediately while editing
                counter.textContent = widgetValue || '0';
            }
        },

        setCardSuffix(previewMode, widgetValue, params) {
            const card = this._getCard(params.cardIndex);
            if (!card) return;
            // h3 structure: <span class="counter">N</span>SUFFIX
            const h3 = card.querySelector('h3');
            if (!h3) return;
            // The suffix is the text node after the <span>
            let textNode = null;
            h3.childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE) textNode = node;
            });
            if (textNode) {
                textNode.textContent = widgetValue || '+';
            } else {
                h3.appendChild(document.createTextNode(widgetValue || '+'));
            }
        },

        setCardLabel(previewMode, widgetValue, params) {
            const card = this._getCard(params.cardIndex);
            if (!card) return;
            const p = card.querySelector('p');
            if (p) p.textContent = widgetValue;
        },

        // ── State reader (populates inputs when panel opens) ─────────────────
        _computeWidgetState(methodName, params) {
            switch (methodName) {

                case 'setHeading': {
                    const el = this.$target[0].querySelector('.milestone-heading');
                    return el ? el.textContent.trim() : '';
                }

                case 'setCardIcon': {
                    const card = this._getCard(params.cardIndex);
                    if (!card) return '';
                    const icon = card.querySelector('.milestone-icon i');
                    return icon ? icon.className.trim() : '';
                }

                case 'setCardCount': {
                    const card = this._getCard(params.cardIndex);
                    if (!card) return '';
                    const counter = card.querySelector('.counter');
                    return counter ? (counter.dataset.count || counter.textContent.trim()) : '';
                }

                case 'setCardSuffix': {
                    const card = this._getCard(params.cardIndex);
                    if (!card) return '';
                    const h3 = card.querySelector('h3');
                    if (!h3) return '';
                    let suffix = '';
                    h3.childNodes.forEach(node => {
                        if (node.nodeType === Node.TEXT_NODE) {
                            suffix += node.textContent;
                        }
                    });
                    return suffix.trim();
                }

                case 'setCardLabel': {
                    const card = this._getCard(params.cardIndex);
                    if (!card) return '';
                    const p = card.querySelector('p');
                    return p ? p.textContent.trim() : '';
                }
            }
            return this._super(...arguments);
        },

        // ── Private helpers ──────────────────────────────────────────────────
        /**
         * Returns the .milestone-card DOM element for a given 1-based index.
         * @param {string|number} index  – card index from data-card-index attr
         * @returns {Element|null}
         */
        _getCard(index) {
            return this.$target[0].querySelector(
                `.milestone-card[data-card-index="${index}"]`
            ) || null;
        },
    });

});
