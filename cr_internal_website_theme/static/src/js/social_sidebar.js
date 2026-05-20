odoo.define('cr_internal_website_theme.social_sidebar_chat', function (require) {
    'use strict';

    var publicWidget = require('web.public.widget');

    publicWidget.registry.SocialSidebarChat = publicWidget.Widget.extend({
        selector: '#wrapwrap',
        
        start: function () {
            var self = this;
            // Immediate check on click of known chat triggers
            $(document).on('click', '.o_livechat_button, .o_thread_window_header, .o_mail_thread_content', function() {
                setTimeout(function() { self._updateSidebarVisibility(); }, 50);
            });

            // Fast polling for dynamic height changes (minimized vs maximized)
            this.chatInterval = setInterval(function() {
                self._updateSidebarVisibility();
            }, 100);
            return this._super.apply(this, arguments);
        },

        _updateSidebarVisibility: function () {
            // Target common Odoo chat/thread window classes
            var $chatWindow = $('.o_thread_window, .o_chat_window, .o_livechat_chat_window, .o_livechat_thread');
            var isChatActive = false;

            if ($chatWindow.length) {
                $chatWindow.each(function() {
                    var $el = $(this);
                    // A chat window is active if it is visible, not minimized, not hidden via class, and taller than 100px
                    if ($el.is(':visible') && !$el.hasClass('o_minimized') && !$el.hasClass('d-none') && $el.css('display') !== 'none' && $el.height() > 100) {
                        isChatActive = true;
                    }
                });
            }

            if (isChatActive) {
                document.body.classList.add('hide-social-sidebar');
            } else {
                document.body.classList.remove('hide-social-sidebar');
            }
        },

        destroy: function () {
            if (this.chatInterval) {
                clearInterval(this.chatInterval);
            }
            this._super.apply(this, arguments);
        },
    });
});
