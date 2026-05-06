# -*- coding: utf-8 -*-
# Part of Creyox Technologies

from odoo import api, fields, models

class FaqSnippet(models.Model):
    _name = 'faq.snippet'
    _description = 'FAQ Snippet'
    _rec_name = 'question'

    website_page_id = fields.Many2one(comodel_name='website.page', string="Website Page")
    question = fields.Char(string="Question")
    answer = fields.Text(string="Answer")