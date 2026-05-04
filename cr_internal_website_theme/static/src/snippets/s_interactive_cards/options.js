odoo.define('cr_internal_website_theme.s_interactive_cards_options', function (require) {
    'use strict';

    const options = require('web_editor.snippets.options');

    options.registry.InteractiveCardsOptions = options.Class.extend({
        selector: '.s_interactive_cards',

        addParentCard: function (previewMode, widgetValue, params) {
            const $wrapper = this.$target.find('.parent-cards-grid');
            const count = $wrapper.find('.parent-card-item').length;

            if (count >= 6) {
                alert('Maximum 6 parent cards allowed.');
                return;
            }

            const newId = 'content-' + (new Date().getTime());
            const $newCard = $(`
                <div class="col-lg-4 col-md-6 parent-card-item" data-target="${newId}">
                    <div class="parent-card">
                        <div class="card-icon"><i class="fa fa-star"></i></div>
                        <h3 class="card-title">New Service</h3>
                        <p class="card-desc">Click to edit this description and add sub-features below.</p>
                        <div class="active-indicator"></div>
                    </div>
                </div>
            `);

            const $newContainer = $(`
                <div class="sub-cards-container" id="${newId}">
                    <div class="row g-4">
                        <div class="col-lg-3 col-md-6 sub-card-item">
                            <div class="sub-card">
                                <div class="sub-icon"><i class="fa fa-check"></i></div>
                                <h4>New Feature</h4>
                                <p>Describe your feature here.</p>
                            </div>
                        </div>
                    </div>
                </div>
            `);

            $wrapper.append($newCard);
            this.$target.find('.sub-cards-content-wrapper').append($newContainer);

            // Activate the new card
            $newCard.click();
        },

        removeParentCard: function (previewMode, widgetValue, params) {
            const $activeCard = this.$target.find('.parent-card-item.active');
            const count = this.$target.find('.parent-card-item').length;

            if (count <= 2) {
                alert('Minimum 2 parent cards required.');
                return;
            }

            const targetId = $activeCard.data('target');
            this.$target.find('#' + targetId).remove();
            $activeCard.remove();

            // Activate the first remaining card
            this.$target.find('.parent-card-item:first').click();
        },

        addSubCard: function (previewMode, widgetValue, params) {
            const $activeContainer = this.$target.find('.sub-cards-container.active .row');
            const $newSubCard = $(`
                <div class="col-lg-3 col-md-6 sub-card-item">
                    <div class="sub-card">
                        <div class="sub-icon"><i class="fa fa-check"></i></div>
                        <h4>New Sub-Feature</h4>
                        <p>Describe your sub-feature here.</p>
                    </div>
                </div>
            `);
            $activeContainer.append($newSubCard);
        },

        removeSubCard: function (previewMode, widgetValue, params) {
            const $activeContainer = this.$target.find('.sub-cards-container.active');
            const $subCards = $activeContainer.find('.sub-card-item');

            if ($subCards.length <= 1) {
                alert('At least one sub-card is required.');
                return;
            }

            $subCards.last().remove();
        },
    });
});
