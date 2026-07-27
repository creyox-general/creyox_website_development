# -*- coding: utf-8 -*-
# Part of Creyox Technologies

import json
from odoo import api, fields, models


# Blog Post Model For Schema.
class BlogPost(models.Model):
    _inherit = "blog.post"

    schema = fields.Html(string="Schema Code", sanitize=False)

    def _generate_default_schema(self):
        self.ensure_one()
        headline = self.name or ""
        description = self.subtitle or ""
        # Images Extraction
        images = []
        if self.cover_properties:
            try:
                cover_data = json.loads(self.cover_properties)
                bg_img = cover_data.get('background-image', 'none')
                if bg_img and bg_img != 'none':
                    if bg_img.startswith("url("):
                        bg_img = bg_img[4:-1].strip("'\"")
                    images.append(bg_img)
            except Exception:
                pass
        
        # Extract all img tags from content
        if self.content:
            import re
            found_images = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', self.content)
            for img in found_images:
                if img not in images:
                    images.append(img)
                    
        # Make all image URLs absolute
        absolute_images = []
        for img in images:
            if img.startswith('/'):
                absolute_images.append((self.get_base_url() or "") + img)
            else:
                absolute_images.append(img)
            
        author_name = self.author_name or self.author_id.name or ""
        publisher_name = self.website_id.name or self.env.company.name or ""
        publisher_logo_url = (self.get_base_url() or "") + ("/web/image/res.company/%s/logo" % self.env.company.id)
        
        date_published = (self.post_date or self.published_date or fields.Datetime.now()).strftime('%Y-%m-%d')
        date_modified = (self.write_date or fields.Datetime.now()).strftime('%Y-%m-%d')
        
        # Escape quotes in strings to produce valid JSON
        headline_esc = json.dumps(headline)
        description_esc = json.dumps(description)
        author_name_esc = json.dumps(author_name)
        publisher_name_esc = json.dumps(publisher_name)
        publisher_logo_url_esc = json.dumps(publisher_logo_url)
        
        # Format the image field based on the number of images found
        if len(absolute_images) > 1:
            image_val_esc = json.dumps(absolute_images)
        elif len(absolute_images) == 1:
            image_val_esc = json.dumps(absolute_images[0])
        else:
            image_val_esc = json.dumps("")
        
        # Format the schema
        schema_code = f"""<script type="application/ld+json">
{{
"@context": "https://schema.org",
"@type": "BlogPosting",
"headline": {headline_esc},
"description": {description_esc},
"image": "",
"author": {{
    "@type": "Organization",
    "name": {author_name_esc}
}},  
"publisher": {{
    "@type": "Organization",
    "name": {publisher_name_esc},
    "logo": {{
    "@type": "ImageObject",
    "url": {publisher_logo_url_esc}
    }}
}},
"datePublished": "{date_published}",
"dateModified": "{date_modified}"
}}
</script>"""
        return schema_code

    @api.model
    def _cron_generate_default_schema(self):
        blog_posts = self.search([('is_published', '=', True)])
        for post in blog_posts:
            try:
                schema_code = post._generate_default_schema()
                post.write({'schema': schema_code})
            except Exception:
                pass
        cron = self.env.ref('cr_website_blog_customisation.ir_cron_generate_blog_post_schemas', raise_if_not_found=False)
        if cron:
            cron.write({'active': False})

    @api.model_create_multi
    def create(self, vals_list):
        records = super(BlogPost, self).create(vals_list)
        for record in records:
            if record.is_published and not record.schema:
                # We can write directly to record.schema during creation post-save
                super(BlogPost, record).write({'schema': record._generate_default_schema()})
        return records

    def write(self, vals):
        res = super(BlogPost, self).write(vals)
        is_publishing = vals.get('is_published') or vals.get('website_published')
        for record in self:
            if (is_publishing or record.is_published) and not record.schema:
                super(BlogPost, record).write({'schema': record._generate_default_schema()})
        return res
