# -*- coding: utf-8 -*-
# Part of Creyox Technologies
{
    "name": "FAQ Snippet",
    "author": "Creyox Technologies",
    "website": "https://www.creyox.com",
    "support": "support@creyox.com",
    "version": "16.0.0.1",
    "summary": """
        """,
    "sequence": 9,
    "description": """
        """,
    "category": "Website",
    "price": "",
    "currency": "USD",
    "license": "OPL-1",
    "depends": ["base", "website", "web"],
    "data": [
        "security/ir.model.access.csv",
        "views/faq_views.xml",
        "views/faq_menu_view.xml",
        "views/snippets/snippets.xml",
        "views/snippets/s_dynamic_snippet_faq.xml",
    ],
    'assets': {
        'web.assets_frontend': [
            'cr_faq_snippet/static/src/xml/template.xml',
            "cr_faq_snippet/static/src/js/000.js",
            "cr_faq_snippet/static/src/scss/000.scss",
        ],
        'website.assets_wysiwyg' : [

            'cr_faq_snippet/static/src/snippets/faq/options.js',
        ],
    },
    "installable": True,
    "auto_install": False,
    "application": True,
}
