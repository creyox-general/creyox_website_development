# -*- coding: utf-8 -*-
# Part of Creyox Technologies
{
    "name": "Blog Customization",
    "author": "Creyox Technologies",
    "website": "https://www.creyox.com",
    "summary":
        """
        """,
    "version": "16.0.0.3",
    "sequence": 10,
    "description":
        """
        """,
    "category": "website",
    "price": "",
    "currency": "USD",
    "license": "AGPL-3",
    "depends": ["base", "website", "website_blog"],
    "data": [
        "data/color_data.xml",
        "views/cr_color.xml",
        "views/website_blog.xml",
        "views/website_blog_components.xml",
        "views/website_blog_posts_loop.xml",
        "views/website_blog_templates.xml",
        "views/snippets/random_blogs.xml",
        "views/snippets/blog_toc.xml",
        "views/snippets/blog_contact_us.xml",
        "views/snippets/blog_intro_banner.xml",
        "views/snippets.xml",
        "security/ir.model.access.csv",
    ],
    'assets': {
        'web.assets_frontend': [
            'cr_website_blog_customisation/static/src/scss/website_blog.scss',
            'cr_website_blog_customisation/static/src/scss/cr_blog_toc.scss',
            'cr_website_blog_customisation/static/src/scss/cr_blog_contact_us.scss',
            'cr_website_blog_customisation/static/src/scss/cr_blog_intro_banner.scss',
            'cr_website_blog_customisation/static/src/js/website_blog_progress.js',
            'cr_website_blog_customisation/static/src/js/cr_blog_toc.js',
        ],
        'website.assets_wysiwyg': [
            'cr_website_blog_customisation/static/src/snippets/cr_random_blogs/options.js',
            'cr_website_blog_customisation/static/src/snippets/blog_contact_us/options.js',
            'cr_website_blog_customisation/static/src/js/wysiwyg_commands.js',
        ],
    },
    "installable": True,
    "auto_install": False,
    "application": True,
}
