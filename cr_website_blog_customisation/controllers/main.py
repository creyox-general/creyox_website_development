# -*- coding: utf-8 -*-
# Part of Creyox Technologies
import json
import random
import re
import logging
_logger = logging.getLogger(__name__)
import werkzeug
from odoo.addons.website.controllers.main import QueryURL
from odoo import http, fields, tools
from odoo.http import request
from odoo.addons.website_blog.controllers.main import WebsiteBlog
from odoo.addons.http_routing.models.ir_http import slug, unslug

class CrWebsiteBlog(WebsiteBlog):
    _blog_post_per_page = 9

    @http.route([
        '/blog',
        '/blog/page/<int:page>',
        '/blog/tag/<string:tag>',
        '/blog/tag/<string:tag>/page/<int:page>',
        # added this to lines ( For Tag Redirecting )
        #######################
        '/blog/<string:tag>',
        '/blog/<string:tag>/page/<int:page>',
        ########################
        '''/blog/<model("blog.blog"):blog>''',
        '''/blog/<model("blog.blog"):blog>/page/<int:page>''',
        '''/blog/<model("blog.blog"):blog>/tag/<string:tag>''',
        '''/blog/<model("blog.blog"):blog>/tag/<string:tag>/page/<int:page>''',
        '/blog/featured',
        '/blog/featured/page/<int:page>',
    ], type='http', auth="public", website=True, sitemap=True)
    def blog(self, blog=None, tag=None, page=1, search=None, **opt):
        # We completely rewrite the Odoo blog controller to KILL the single-blog redirect feature
        Blog = request.env['blog.blog']
        if isinstance(blog, str):
            blog_match = re.search(r'\d+', blog)
            if blog_match:
                blog = Blog.browse(int(blog_match[0]))
                if not blog.exists():
                    raise werkzeug.exceptions.NotFound()

        blogs = tools.lazy(lambda: Blog.search(request.website.website_domain(), order="create_date asc, id asc"))

        # NOTE: Odoo normally redirects to the single blog if len(blogs) == 1 here. We SKIP that to force the index page!

        date_begin, date_end, state = opt.get('date_begin'), opt.get('date_end'), opt.get('state')

        if tag and request.httprequest.method == 'GET':
            tags = tag.split(',')
            if len(tags) > 1:
                url = QueryURL('' if blog else '/blog', ['blog', 'tag'], blog=blog, tag=tags[0], date_begin=date_begin, date_end=date_end, search=search)()
                return request.redirect(url, code=302)

        values = self._prepare_blog_values(blogs=blogs, blog=blog, date_begin=date_begin, date_end=date_end, tags=tag, state=state, page=page, search=search)

        if isinstance(values, werkzeug.wrappers.Response):
            return values

        if blog:
            values['main_object'] = blog
            values['blog_url'] = QueryURL('', ['blog', 'tag'], blog=blog, tag=tag, date_begin=date_begin, date_end=date_end, search=search)
        else:
            values['blog_url'] = QueryURL('/blog', ['tag'], date_begin=date_begin, date_end=date_end, search=search)
        print(values)

        return request.render("website_blog.blog_post_short", values)

    def _prepare_blog_values(self, blogs, blog=False, date_begin=False, date_end=False, tags=False, state=False, page=False, search=None):
        url_path = request.httprequest.path
        match = re.search(r'/blog/([^/]+)-(\d+)', url_path)
        if match:
            tags = match.group(2)
        else:
            tags = None
        ref = super(CrWebsiteBlog,self)._prepare_blog_values(blogs, blog, date_begin, date_end, tags, state, page, search)
        url_args = dict()
        x = ref['search']
        if search:
            url_args[x] = search

        if date_begin and date_end:
            url_args["date_begin"] = ref['date_begin']
            url_args["date_end"] = ref['date_end']

        if match:
            print("112")
            slug_name = match.group(1)  # Extract the slug
            blog_id = match.group(2)  # Extract the ID
            tag_list = request.env['blog.tag'].search([
                ('id','=',blog_id),
            ])
            ref['tag_list'] = tag_list
            ref['no_of_record_display'] = len(tag_list.post_ids)
            ref['is_latest_post'] = False
            ref['is_pager'] = True
            ref['only_latest'] = False
            pager = tools.lazy(lambda: request.website.pager(
                url=request.httprequest.path.partition('/page/')[0],
                total=len(tag_list.post_ids),
                page=page,
                step=self._blog_post_per_page,
                url_args=url_args,
            ))
            ref['pager'] = pager
        elif url_path == '/blog/page/2':
            ref['tag_list'] = None
            ref['no_of_record_display'] = len(ref['posts'])
            ref['is_latest_post'] = True
            ref['is_pager'] = True
            ref['only_latest'] = True
        else:
            print("111")
            if "/blog/page/" in url_path:
                ref['only_latest'] = True
                ref['is_pager'] = True
            else:
                ref['only_latest'] = False
                ref['is_pager'] = False
            tag_list = request.env['blog.tag'].search([])
            ref['tag_list'] = tag_list
            ref['no_of_record_display'] = 6
            ref['is_latest_post'] = True

        print('ref : ',ref)
        return ref


    @http.route(['/cr/blog/tag/<model("blog.tag"):tag>'], type='http', auth="public", website=True)
    def blog_tag_page(self, tag, **kw):
        blog_tag = request.env['blog.tag'].search([('id', '=', tag.id)])
        return request.redirect("/blog/%s" % (slug(blog_tag)))

    @http.route(['/cr/blog/tag/Latest'], type='http', auth="public", website=True)
    def blog_tag_page_all(self, **kw):
        return request.redirect("/blog/page/2")


    @http.route('/blog/random', auth="public", type="http", methods=['GET'])
    def random_blog_posts(self,**kwargs):
        """
        Method to retrieve random 4 blog posts from the 'blog.post' model
        """
        blog_id = kwargs.get('id')
        blog_posts = request.env['blog.post'].search([('id','!=',blog_id)])

        if blog_posts:
            random_blog_posts = random.sample(blog_posts, min(4, len(blog_posts)))

            blog_data = []
            for blog in random_blog_posts:
                blog_data.append({
                    'title': blog.name,
                    'subtitle': blog.subtitle,
                    'background_color': blog.background_color,
                    'author_name': blog.author_name,
                    'content': blog.content,
                    'url': blog.website_url,
                    'teaser': blog.teaser or blog.teaser_manual
                })
            return request.make_response(json.dumps(blog_data), headers={'Content-Type': 'application/json'})

        else:
            return {'error': 'No blog posts found'}





