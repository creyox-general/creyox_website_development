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
            var $chatWindow = $('.o_thread_window, .o_chat_window');
            var isChatActive = false;

            if ($chatWindow.length) {
                $chatWindow.each(function() {
                    // If any chat window is taller than 100px, it's considered "open"
                    if ($(this).height() > 100) {
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
