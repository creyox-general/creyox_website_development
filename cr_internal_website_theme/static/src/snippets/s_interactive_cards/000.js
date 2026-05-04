odoo.define('cr_internal_website_theme.s_interactive_cards', function (require) {
    'use strict';

    const publicWidget = require('web.public.widget');

    publicWidget.registry.s_interactive_cards = publicWidget.Widget.extend({
        selector: '.s_interactive_cards',
        events: {
            'click .parent-card-item': '_onParentCardClick',
        },

        start: function () {
            this._super.apply(this, arguments);
            // Ensure first card is active if none are
            if (!this.$('.parent-card-item.active').length) {
                this.$('.parent-card-item:first').addClass('active');
                const target = this.$('.parent-card-item:first').data('target');
                this.$('#' + target).addClass('active');
            }
        },

        _onParentCardClick: function (ev) {
            const $item = $(ev.currentTarget);
            const targetId = $item.data('target');

            // Update Parent Cards
            this.$('.parent-card-item').removeClass('active');
            $item.addClass('active');

            // Update Sub-cards Content
            this.$('.sub-cards-container').removeClass('active');
            this.$('#' + targetId).addClass('active');
            
            // Re-trigger AOS animations for the new content if present
            if (window.AOS) {
                window.AOS.refresh();
            }
        },
    });
});
