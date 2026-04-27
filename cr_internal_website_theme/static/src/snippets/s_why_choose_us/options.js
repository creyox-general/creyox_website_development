odoo.define('cr_internal_website_theme.snippet_options_why_choose_us', function (require) {
    'use strict';

    const options = require('web_editor.snippets.options');

    options.registry.WhyChooseUsOptions = options.Class.extend({
        selector: '.s_why_choose_us',

        setTitle(previewMode, widgetValue, params) {
            const el = this.$target[0].querySelector('.section-title');
            if (el) el.innerHTML = widgetValue;
        },

        setDesc(previewMode, widgetValue, params) {
            const el = this.$target[0].querySelector('.section-description');
            if (el) el.textContent = widgetValue;
        },

        setCardTitle(previewMode, widgetValue, params) {
            const index = parseInt(params.index || 0);
            const el = this.$target[0].querySelectorAll('.stack-card .card-title')[index];
            if (el) el.textContent = widgetValue;
        },

        setCardText(previewMode, widgetValue, params) {
            const index = parseInt(params.index || 0);
            const el = this.$target[0].querySelectorAll('.stack-card .card-text')[index];
            if (el) el.textContent = widgetValue;
        },

        setCardIcon(previewMode, widgetValue, params) {
            const index = parseInt(params.index || 0);
            const el = this.$target[0].querySelectorAll('.stack-card .card-icon-inner i')[index];
            if (el) {
                el.className = widgetValue;
            }
        },

        setImage(previewMode, widgetValue, params) {
            const index = parseInt(params.index || 0);
            const el = this.$target[0].querySelectorAll('.mosaic-image-block')[index];
            if (el) {
                el.style.backgroundImage = `url('${widgetValue}')`;
            }
        },

        _computeWidgetState(methodName, params) {
            const index = parseInt(params.index || 0);
            switch (methodName) {
                case 'setTitle': {
                    const el = this.$target[0].querySelector('.section-title');
                    return el ? el.innerHTML : '';
                }
                case 'setDesc': {
                    const el = this.$target[0].querySelector('.section-description');
                    return el ? el.textContent.trim() : '';
                }
                case 'setCardTitle': {
                    const el = this.$target[0].querySelectorAll('.stack-card .card-title')[index];
                    return el ? el.textContent.trim() : '';
                }
                case 'setCardText': {
                    const el = this.$target[0].querySelectorAll('.stack-card .card-text')[index];
                    return el ? el.textContent.trim() : '';
                }
                case 'setCardIcon': {
                    const el = this.$target[0].querySelectorAll('.stack-card .card-icon-inner i')[index];
                    return el ? el.className : '';
                }
                case 'setImage': {
                    const el = this.$target[0].querySelectorAll('.mosaic-image-block')[index];
                    if (el && el.style.backgroundImage) {
                        return el.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
                    }
                    return '';
                }
            }
            return this._super(...arguments);
        },
    });
});
