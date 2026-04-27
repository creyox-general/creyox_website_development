# -*- coding: utf-8 -*-
# Part of Creyox Technologies

from odoo import http
from odoo.http import request
from odoo.addons.website_blog.controllers.main import WebsiteBlog

class WebsiteBlogSitemap(WebsiteBlog):

    @http.route(['''/blog/<model("blog.blog"):blog>/feed'''], type='http', auth="public", website=True, sitemap=False)
    def blog_feed(self, blog, limit='15', **kwargs):
        return super(WebsiteBlogSitemap, self).blog_feed(blog, limit=limit, **kwargs)
