odoo.define('cr_internal_website_theme.s_feature_mesh_options', function (require) {
    'use strict';

    const options = require('web_editor.snippets.options');

    options.registry.FeatureMeshOptions = options.Class.extend({
        selector: '.s_feature_mesh',

        // ── SECTION HEADER ──────────────────────────────────────────────

        setTitle: function (previewMode, widgetValue, params) {
            const titleEl = this.$target[0].querySelector('.mesh-title');
            if (!titleEl) return;
            for (let i = 0; i < titleEl.childNodes.length; i++) {
                if (titleEl.childNodes[i].nodeType === Node.TEXT_NODE) {
                    titleEl.childNodes[i].textContent = widgetValue + ' ';
                    return;
                }
            }
            titleEl.insertBefore(document.createTextNode(widgetValue + ' '), titleEl.firstChild);
        },

        setGradientWord: function (previewMode, widgetValue, params) {
            const el = this.$target[0].querySelector('.mesh-title .text-gradient');
            if (el) el.textContent = widgetValue;
        },

        setSubtitle: function (previewMode, widgetValue, params) {
            const el = this.$target[0].querySelector('.mesh-main-text');
            if (el) el.textContent = widgetValue;
        },

        // ── CARD CONTENT ────────────────────────────────────────────────

        setCardTitle: function (previewMode, widgetValue, params) {
            const idx = parseInt(params.index) - 1;
            const el = this.$target[0].querySelectorAll('.split-card .card-title')[idx];
            if (el) el.textContent = widgetValue;
        },

        setCardText: function (previewMode, widgetValue, params) {
            const idx = parseInt(params.index) - 1;
            const el = this.$target[0].querySelectorAll('.split-card .card-text')[idx];
            if (el) el.textContent = widgetValue;
        },

        // ── ADD BLOCK ────────────────────────────────────────────────────

        addCard: function (previewMode, widgetValue, params) {
            if (previewMode) return;

            const row = this.$target[0].querySelector('.fm-card-row');
            if (!row) return;

            const count = row.querySelectorAll('.fm-card-col').length + 1;
            const colClass = this._getColClass();

            const colDiv = document.createElement('div');
            colDiv.className = 'col-md-6 fm-card-col ' + colClass;
            colDiv.setAttribute('data-aos', 'fade-up');
            colDiv.innerHTML =
                '<div class="split-card">' +
                    '<div class="card-title-zone">' +
                        '<h3 class="card-title">New Feature ' + count + '</h3>' +
                    '</div>' +
                    '<div class="card-body-zone">' +
                        '<p class="card-text">Describe this feature here.</p>' +
                    '</div>' +
                '</div>';

            row.appendChild(colDiv);
        },

        // ── REMOVE LAST BLOCK ────────────────────────────────────────────

        removeLastCard: function (previewMode, widgetValue, params) {
            if (previewMode) return;

            const row = this.$target[0].querySelector('.fm-card-row');
            if (!row) return;
            const cols = row.querySelectorAll('.fm-card-col');
            if (cols.length > 1) {
                cols[cols.length - 1].remove();
            }
        },

        // ── COLUMN CLASS HELPER ──────────────────────────────────────────

        _getColClass: function () {
            const section = this.$target[0];
            if (section.classList.contains('sg-cols-2')) return 'col-lg-6';
            if (section.classList.contains('sg-cols-4')) return 'col-lg-3';
            return 'col-lg-4'; // default 3 cols
        },

        // ── WIDGET STATE ─────────────────────────────────────────────────

        _computeWidgetState: function (methodName, params) {
            const idx = parseInt(params.index) - 1;
            switch (methodName) {
                case 'setTitle': {
                    const titleEl = this.$target[0].querySelector('.mesh-title');
                    if (titleEl) {
                        for (let i = 0; i < titleEl.childNodes.length; i++) {
                            if (titleEl.childNodes[i].nodeType === Node.TEXT_NODE) {
                                return titleEl.childNodes[i].textContent.trim();
                            }
                        }
                    }
                    return '';
                }
                case 'setGradientWord': {
                    const el = this.$target[0].querySelector('.mesh-title .text-gradient');
                    return el ? el.textContent.trim() : '';
                }
                case 'setSubtitle': {
                    const el = this.$target[0].querySelector('.mesh-main-text');
                    return el ? el.textContent.trim() : '';
                }
                case 'setCardTitle': {
                    const el = this.$target[0].querySelectorAll('.split-card .card-title')[idx];
                    return el ? el.textContent.trim() : '';
                }
                case 'setCardText': {
                    const el = this.$target[0].querySelectorAll('.split-card .card-text')[idx];
                    return el ? el.textContent.trim() : '';
                }
                // Add/Remove buttons have no state to read back
                case 'addCard':
                case 'removeLastCard':
                    return '';
            }
            return this._super(...arguments);
        },
    });

});
