odoo.define('cr_internal_website_theme.s_animated_circle_waves', function (require) {
    'use strict';

    const publicWidget = require('web.public.widget');

    publicWidget.registry.s_animated_circle_waves = publicWidget.Widget.extend({
        selector: '.s_animated_circle_waves',

        start: function () {
            this._super.apply(this, arguments);
            
            // Re-trigger AOS animations if present
            if (window.AOS) {
                window.AOS.refresh();
            }

            this._initTypewriter();
        },

        _initTypewriter: function () {
            var $rotatingWords = this.$('.rotating-words');
            if (!$rotatingWords.length) return;

            // Extract words from original .word elements (maintains Odoo editor editability)
            var $wordElems = $rotatingWords.find('.word');
            var words = $wordElems.map(function () {
                return $(this).text().trim();
            }).get();

            if (!words.length) {
                words = ['Development', 'Implementation', 'Consulting', 'Integration'];
            }

            // Clear and create typewriter structure
            $rotatingWords.empty();
            var $typewriterWord = $('<span class="typewriter-word"></span>').appendTo($rotatingWords);
            var $typewriterCursor = $('<span class="typewriter-cursor">|</span>').appendTo($rotatingWords);

            var wordIndex = 0;
            var charIndex = 0;
            var isDeleting = false;
            var typingSpeed = 100;
            var deletingSpeed = 50;
            var pauseEnd = 2000;
            var pauseStart = 500;

            function type() {
                var currentWord = words[wordIndex];
                if (isDeleting) {
                    $typewriterWord.text(currentWord.substring(0, charIndex));
                    charIndex--;

                    if (charIndex < 0) {
                        isDeleting = false;
                        wordIndex = (wordIndex + 1) % words.length;
                        setTimeout(type, pauseStart);
                    } else {
                        setTimeout(type, deletingSpeed);
                    }
                } else {
                    $typewriterWord.text(currentWord.substring(0, charIndex + 1));
                    charIndex++;

                    if (charIndex === currentWord.length) {
                        isDeleting = true;
                        setTimeout(type, pauseEnd);
                    } else {
                        setTimeout(type, typingSpeed);
                    }
                }
            }

            // Start typewriter loop
            type();
        }
    });
});
