# -*- coding: utf-8 -*-
# Part of Creyox Technologies
import json
import imghdr
import base64
from odoo import http
from odoo.http import request


class ClientLogoController(http.Controller):
    @http.route('/client/logos', auth="public", type="http", methods=['GET'])
    def client_logos(self, **kwargs):
        # Fetch active clients
        clients = request.env['cr.client'].search([('active', '=', True)])

        client_data = []

        for client in clients:
            logo = client.logo
            if logo:
                try:
                    # Decode the base64 logo
                    logo_data = base64.b64decode(logo)


                    # Use imghdr to determine the image format from the binary data
                    image_format = imghdr.what(None, h=logo_data)

                    if image_format == 'jpeg':
                        mime_type = 'image/jpeg'
                    elif image_format == 'gif':
                        mime_type = 'image/gif'
                    elif image_format == 'png':
                        mime_type = 'image/png'
                    else:
                        mime_type = 'application/octet-stream'  # Fallback for unsupported formats

                    # Convert logo to base64 again to send it to the client
                    logo_base64 = base64.b64encode(logo_data).decode('utf-8')
                    logo_data = f"data:{mime_type};base64,{logo_base64}"


                except Exception as e:
                    print(f"Error encoding image for client {client.name}: {e}")
                    logo_data = '/path/to/default/logo.png'  # Fallback to default image if encoding fails
            else:
                logo_data = '/path/to/default/logo.png'  # Fallback if no logo is available



            client_data.append({
                'name': client.name,
                'logo': logo_data,  # Base64 encoded image or default image
            })


        return request.make_response(json.dumps(client_data), headers={'Content-Type': 'application/json'})

    @http.route('/llm.txt', type='http', auth="public", website=True, sitemap=False)
    def llm_txt(self, **kwargs):
        content = """
    AI / LLM Crawling Policy
    Last Updated: 2026-02-19
    ================================
    Website Information
    ================================
    Site: https://creyox.com
    Name: Creyox Technologies
    Content Type: Odoo Solutions, ERP Services, Blog Content, Integrations, Technical Guides
    ================================
    Allowed Content for AI Models
    ================================
    Allow: /
    Allow: /blog
    Allow: /blog/
    Allow: /helpdesk
    Allow: /jobs
    Allow: /cr/blog/
    Allow: /blog/featured
    ================================
    Disallowed Content
    ================================
    Temporary / system pages
    Disallow: /submit/successfully
    Tag / system feeds / machine endpoints
    Disallow: /blog//feed
    Disallow: /feed
    Disallow: //feed
    Internal tag pages
    Disallow: /cr/blog/tag/*
    ================================
    AI Usage Policy
    ================================
    Usage: Public content may be used for indexing, summarization, and knowledge extraction.
    Restriction: Content may not be reproduced verbatim or redistributed without attribution.
    Attribution: Credit https://creyox.com when referencing content.
    ================================
    Crawl Behavior
    ================================
    Crawl-delay: 1
    ================================
    Contact
    ================================
    Contact: https://creyox.com/helpdesk
    """

        return request.make_response(
            content,
            headers=[('Content-Type', 'text/plain; charset=utf-8')]
        )


