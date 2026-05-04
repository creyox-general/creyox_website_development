odoo.define('cr_internal_website_theme.snippet_options_industry_use_cases', function (require) {
    'use strict';

    const options = require('web_editor.snippets.options');

    options.registry.IndustryUseCasesOptions = options.Class.extend({
        selector: '.s_industry_use_cases',

        /**
         * Adds a new card if count < 8
         */
        addCard: function (previewMode, widgetValue, params) {
            const $list = this.$target.find('.web-usecase-list');
            const $cards = $list.find('.usecase');
            const count = $cards.length;
            if (count < 8) {
                const $newCard = $cards.first().clone();
                $newCard.find('h4').text('New Industry');
                $newCard.find('p').text('Description for the new industry use case.');
                
                // Update AOS delay for the new card
                const newDelay = (count + 1) * 100;
                $newCard.attr('data-aos-delay', newDelay);
                
                $list.append($newCard);
                
                if (window.AOS) {
                    window.AOS.refresh();
                }
            }
        },

        /**
         * Removes the last card if count > 2
         */
        removeCard: function (previewMode, widgetValue, params) {
            const $list = this.$target.find('.web-usecase-list');
            const $cards = $list.find('.usecase');
            const count = $cards.length;
            if (count > 2) {
                $cards.last().remove();
            }
        },
    });
});
