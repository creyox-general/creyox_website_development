# -*- coding: utf-8 -*-
# Part of Creyox Technologies

from odoo import http
from odoo.http import request

class CrFAQSnippet(http.Controller):
    @http.route(route='/faq', type='json', website=True, auth="public")
    def fetch_faq(self, path='', **kwargs):
        faqs = request.env['faq.snippet'].sudo().search([])
        records = []
        for faq in faqs:
            if faq.website_page_id.website_url == path:
                records.append({
                    'id': faq.id,
                    'question': faq.question,
                    'answer': faq.answer,
                })

        return {
            'records': records,
            'path': path
        }