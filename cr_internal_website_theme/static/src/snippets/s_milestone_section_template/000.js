odoo.define('cr_internal_website_theme.s_milestone_section', function (require) {
    'use strict';

    const publicWidget = require('web.public.widget');

    publicWidget.registry.MilestoneSection = publicWidget.Widget.extend({
        selector: '.s_milestone_section',

        start: function () {
            const self = this;
            this.counters = this.$el.find('.counter');
            this.animated = false;

            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !self.animated) {
                        self.animated = true;
                        self._onScrollIntoView();
                    }
                });
            }, { threshold: 0.4 });

            this.observer.observe(this.el);

            return this._super.apply(this, arguments);
        },

        destroy: function () {
            if (this.observer) {
                this.observer.disconnect();
            }
            this._super.apply(this, arguments);
        },

        _onScrollIntoView: function () {
            const self = this;
            this.counters.each(function () {
                const $counter = $(this);
                const target = parseInt($counter.attr('data-count')) || 0;
                self._animateCounter($counter, target);
            });
        },

        _animateCounter: function ($el, target) {
            let count = 0;
            const duration = 2000;
            const startTime = performance.now();

            const update = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Smoother easing simulation
                const easedProgress = 1 - Math.pow(1 - progress, 3);

                const currentCount = Math.floor(easedProgress * target);
                $el.text(currentCount.toLocaleString());

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    $el.text(target.toLocaleString());
                }
            };
            requestAnimationFrame(update);
        }
    });

    return publicWidget.registry.MilestoneSection;
});
