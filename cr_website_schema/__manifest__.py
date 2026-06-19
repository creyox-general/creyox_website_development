# -*- coding: utf-8 -*-
# Part of Creyox Technologies

{
    "name": "Website Schema",
    "author": "Creyox Technologies",
    "website": "https://www.creyox.com",
    "support": "support@creyox.com",
    "version": "16.0.0.0",
    "summary": """
        """,
    "sequence": 3,
    "description": """
        """,
    "category": "Website",
    "price": "",
    "currency": "USD",
    "license": "OPL-1",
    "depends": ["base", "website", "website_blog"],
    "data": [
        "security/ir.model.access.csv",
        "views/schema_setup_views.xml",
        "views/website_template.xml"
    ],
    "installable": True,
    "auto_install": False,
    "application": True,
}
