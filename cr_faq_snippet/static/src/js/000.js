/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";
const core = require('web.core');
const qweb = core.qweb;

publicWidget.registry.FAQData = publicWidget.Widget.extend({
    selector: ".s_faq_dynamic_snippet",

    start: function () {
    this.path = window.location.pathname;
    this.records = [];

    return this._super(...arguments).then(() => {
        setTimeout(() => {
            this._fetchData();
        }, 0);
    });
},

    _fetchData: function () {
        fetch('/faq', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jsonrpc: '2.0',
                method: 'call',
                params: { path: this.path }
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.result && data.result.records) {
                this.records = data.result.records;
                this._render();
            }
        });
    },

    _getTemplate: function () {
        if (this.$el.hasClass('o_faq_template_2')) {
            return "cr_faq_snippet.faq_template_2";
        }
        if (this.$el.hasClass('o_faq_template_4')) {
            return "cr_faq_snippet.faq_template_4";
        }
        if (this.$el.hasClass('o_faq_template_5')) {
            return "cr_faq_snippet.faq_template_5";
        }
        return "cr_faq_snippet.faq_template_1";
    },

    _render: function () {
        const html = qweb.render(this._getTemplate(), {
            records: this.records
        });

        this.$el.find('.s_faq_container').html(html);
    },

    // Called when layout changes
    updateLayout: function () {
        this._render();
    }
});