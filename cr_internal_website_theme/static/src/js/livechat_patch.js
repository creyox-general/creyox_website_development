/** @odoo-module **/

import { registerPatch } from '@mail/model/model_core';
import { clear } from '@mail/model/model_field_command';
// import PublicLivechatWindow from '@im_livechat/legacy/widgets/public_livechat_window/public_livechat_window';
// import { deleteCookie } from 'web.utils.cookies';

// 1. [COMMENTED OUT] Patch the legacy chat window widget to hide instead of destroy when closed
/*
PublicLivechatWindow.include({
    close() {
        this.$el.hide();
        window.livechat_closed_on_page = true;
        
        if (this.messaging && this.messaging.publicLivechatGlobal && this.messaging.publicLivechatGlobal.livechatButtonView) {
            const buttonView = this.messaging.publicLivechatGlobal.livechatButtonView;
            if (buttonView.widget && buttonView.widget.$el) {
                buttonView.widget.$el.show();
            }
        }
    }
});
*/

// 2. Patch the LivechatButtonView model to reset states and show button on reopen/close
registerPatch({
    name: 'LivechatButtonView',
    recordMethods: {
        // [COMMENTED OUT] Ensure the chat window is shown when reopened
        /*
        async openChatWindow() {
            await this._super(...arguments);
            window.livechat_closed_on_page = false;
            if (this.messaging && this.messaging.publicLivechatGlobal && this.messaging.publicLivechatGlobal.chatWindow && this.messaging.publicLivechatGlobal.chatWindow.widget) {
                this.messaging.publicLivechatGlobal.chatWindow.widget.$el.show();
            }
        },
        */
        closeChat() {
            if (this.messaging && this.messaging.publicLivechatGlobal) {
                this.messaging.publicLivechatGlobal.update({ publicLivechat: clear() });
            }
            this._super(...arguments);
            if (this.widget && this.widget.$el) {
                this.widget.$el.show();
            }
        },
    },
});

// 3. Patch the notification handler to clean up its event listeners when destroyed
registerPatch({
    name: 'PublicLivechatGlobalNotificationHandler',
    lifecycleHooks: {
        _willDelete() {
            if (this.env && this.env.services && this.env.services['bus_service']) {
                this.env.services['bus_service'].removeEventListener('notification', this._onNotification);
            }
        },
    },
});

// 3. [COMMENTED OUT] Register page unload handlers to clear the session cookie only if the chat was closed
/*
const cleanupSession = function () {
    if (window.livechat_closed_on_page) {
        deleteCookie('im_livechat_session');
    }
};
window.addEventListener('unload', cleanupSession);
window.addEventListener('beforeunload', cleanupSession);
window.addEventListener('pagehide', cleanupSession);
*/
