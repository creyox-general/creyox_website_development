odoo.define('cr_internal_website_theme.s_process_steps_options', function (require) {
    'use strict';

    const options = require('web_editor.snippets.options');

    options.registry.ProcessStepsOptions = options.Class.extend({
        selector: '.s_process_steps',

        addStep: function (previewMode, widgetValue, params) {
            const $wrapper = this.$target.find('.process-steps-wrapper');
            const $steps = $wrapper.find('.process-step-row');
            const count = $steps.length;

            if (count >= 5) {
                alert('Maximum 5 steps allowed.');
                return;
            }

            const isEven = (count + 1) % 2 === 0;
            const rowClass = isEven ? 'flex-row-reverse' : '';
            
            const $newStep = $(`
                <div class="process-step-row row align-items-center mb-5 ${rowClass}" data-aos="fade-up">
                    <div class="col-lg-6 step-text-col">
                        <div class="step-card text-card">
                            <h3 class="step-title">New Process Step</h3>
                            <p class="step-desc">Click to edit this description and share your workflow detail.</p>
                            <div class="partner-cta-group mt-4">
                                <a href="/contactus" class="cta-button primary">
                                    <span>Learn More</span>
                                    <i class="fas fa-arrow-right ms-2" aria-hidden="true"/>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 step-image-col">
                        <div class="step-card image-card">
                            <img src="/cr_internal_website_theme/static/src/img/odoo_partner_trust.png" alt="New Step" class="img-fluid"/>
                        </div>
                    </div>
                </div>
            `);

            $wrapper.append($newStep);
            
            if (window.AOS) {
                window.AOS.refresh();
            }
        },

        removeStep: function (previewMode, widgetValue, params) {
            const $wrapper = this.$target.find('.process-steps-wrapper');
            const $steps = $wrapper.find('.process-step-row');
            const count = $steps.length;

            if (count <= 1) {
                alert('At least one step is required.');
                return;
            }

            $steps.last().remove();
        },
    });
});
