# -*- coding: utf-8 -*-
# Part of Creyox Technologies

from odoo import fields, models

class WebsitePage(models.Model):
    _name = "schema.setup"
    _description = "Website Page Schema Setup"

    name = fields.Char(string="Name" ,required=True)
    website_page_id = fields.Many2one(comodel_name="website.page",string="Page" ,required=True)
    schema = fields.Html(string="Schema Code", sanitize=False)
    active = fields.Boolean(default=True)