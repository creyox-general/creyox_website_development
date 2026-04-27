# -*- coding: utf-8 -*-
# Part of Creyox Technologies

import logging
from odoo import models, api, http
from odoo.http import request
from werkzeug.exceptions import NotFound, Forbidden

_logger = logging.getLogger(__name__)

class Website(models.Model):
    _inherit = 'website'

    def _enumerate_pages(self, query_string=None, force=False):
        """ Overridden to filter out URLs that return 404 or are otherwise invalid, and ensure no duplicates. """
        seen_urls = set()
        
        for page in super(Website, self)._enumerate_pages(query_string=query_string, force=force):
            url = page.get('loc')
            if not url:
                continue
                
            # Remove duplicate URLs
            if url in seen_urls:
                continue
            seen_urls.add(url)
            
            # Skip specific patterns that are known to 404
            if '/feed' in url:
                _logger.info("Sitemap: Skipping unwanted feed URL: %s", url)
                continue

            yield page
