odoo.define('cr_internal_website_theme.s_hr_job_listing', function (require) {
    'use strict';

    const publicWidget = require('web.public.widget');

    publicWidget.registry.s_hr_job_listing = publicWidget.Widget.extend({
        selector: '.s_hr_job_listing',
        events: {
            'click .parent-card-item': '_onParentCardClick',
        },

        start: function () {
            this._super.apply(this, arguments);
            // Interaction logic is identical to s_interactive_cards 
            // but scoped to this specific snippet
        },

        _onParentCardClick: function (ev) {
            const $item = $(ev.currentTarget);
            const targetId = $item.data('target');

            // Update Parent Cards
            this.$('.parent-card-item').removeClass('active');
            $item.addClass('active');

            // Update Job Grids
            this.$('.sub-cards-container').removeClass('active');
            this.$('#' + targetId).addClass('active');
            
            // Re-trigger AOS animations for the new content
            if (window.AOS) {
                window.AOS.refresh();
            }
        },
    });
});
