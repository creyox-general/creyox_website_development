odoo.define('cr_internal_website_theme.aos_strict_library_init', function (require) {
    'use strict';

    const publicWidget = require('web.public.widget');

    /**
     * Programmatically sets data-aos on all snippet cards that Odoo's website
     * builder sanitizer may have stripped when the page was saved.
     * Always overwrites (no hasAttribute check) so it reliably works even after saves.
     */
    function injectAosAttributes() {
        // Section 6: Service Showcase cards
        var scHeader = document.querySelector('.s_service_showcase .section-header');
        if (scHeader) { scHeader.setAttribute('data-aos', 'fade-up'); }
        document.querySelectorAll('.s_service_showcase .s_service_card_wrapper').forEach(function (el, i) {
            el.setAttribute('data-aos', 'fade-up');
            el.setAttribute('data-aos-delay', String((i % 4) * 100));
        });

        // Sections 7 & 9: Specialist Grid cards
        document.querySelectorAll('.s_specialist_grid .section-header').forEach(function (el) {
            el.setAttribute('data-aos', 'fade-up');
        });
        document.querySelectorAll('.s_specialist_grid .s_specialist_card_col').forEach(function (el, i) {
            el.setAttribute('data-aos', 'fade-up');
            el.setAttribute('data-aos-delay', String((i % 4) * 100));
        });

        // Section 8: Kinetic Process phase blocks
        var kpHeader = document.querySelector('.s_kinetic_process .section-header');
        if (kpHeader) { kpHeader.setAttribute('data-aos', 'fade-up'); }
        document.querySelectorAll('.s_kinetic_process .phase-block').forEach(function (el, i) {
            el.setAttribute('data-aos', 'fade-up');
            el.setAttribute('data-aos-delay', String(i * 100));
        });
    }

    publicWidget.registry.aos_strict_library_init = publicWidget.Widget.extend({
        selector: '#wrapwrap',

        start: function () {
            if (typeof AOS === 'undefined') {
                console.warn("AOS: Library not found!");
                return this._super.apply(this, arguments);
            }

            // Re-inject data-aos attributes that may have been stripped by Odoo's sanitizer
            injectAosAttributes();

            // Initialize AOS
            AOS.init({
                duration: 800,
                easing: 'ease-out-cubic',
                once: true,
                offset: 80,
                delay: 0,
                disable: false,
            });

            // Odoo 16 scroll container is #wrapwrap. AOS listens to window 'scroll'
            // internally. Forward #wrapwrap scroll events to window so AOS fires.
            this._aosScrollHandler = function () {
                window.dispatchEvent(new Event('scroll'));
                AOS.refresh();
            };

            var wrapwrap = document.getElementById('wrapwrap');
            if (wrapwrap) {
                wrapwrap.addEventListener('scroll', this._aosScrollHandler, { passive: true });
            }

            // Also listen on window scroll directly as a fallback
            window.addEventListener('scroll', function () { AOS.refresh(); }, { passive: true });

            // Safety refreshes at multiple points during page load
            [200, 500, 1000, 2000, 4000].forEach(function (delay) {
                setTimeout(function () { AOS.refresh(); }, delay);
            });

            return this._super.apply(this, arguments);
        },

        destroy: function () {
            var wrapwrap = document.getElementById('wrapwrap');
            if (wrapwrap && this._aosScrollHandler) {
                wrapwrap.removeEventListener('scroll', this._aosScrollHandler);
            }
            this._super.apply(this, arguments);
        },
    });
});
