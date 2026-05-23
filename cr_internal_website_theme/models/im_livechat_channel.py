# -*- coding: utf-8 -*-
# Part of Creyox Technologies

from odoo import models, fields, api

class ImLivechatChannel(models.Model):
    _inherit = 'im_livechat.channel'

    def _get_available_users(self):
        """ Overridden to always return all assigned operators,
        regardless of their real-time 'online' presence status.
        This ensures that the livechat button remains visible and active 
        on the website even if the backend operators are logged out/offline.
        """
        self.ensure_one()
        return self.sudo().user_ids
