odoo.define('cr_website_blog_customisation.blog_progress_bar', function (require) {
    'use strict';

    var publicWidget = require('web.public.widget');

    // Widget for Circular Scroll Progress Indicator
    publicWidget.registry.BlogProgressBar = publicWidget.Widget.extend({
        selector: '#wrapwrap',
        events: {
            'click #cr-blog-progress-circle-wrap': '_onScrollToTop',
        },

        start: function () {
            this.$progressWrap = this.$('#cr-blog-progress-circle-wrap');
            this.$content = this.$('#o_wblog_post_content, .o_wblog_post_content_field, #blog_content, [field="post_content"]');

            // Add custom styling classes to all raw HTML tags inside the blog post content (excluding base layout snippets & custom grids)
            if (this.$content.length) {
                // List of Odoo base structural/layout snippets to completely protect and ignore
                var baseSnippets = [
                    '.s_cover', '.s_three_columns', '.s_four_columns', '.s_image_text', '.s_text_image',
                    '.s_features', '.s_comparisons', '.s_call_to_action', '.s_showcase', '.s_banner',
                    '.s_media_list', '.s_color_blocks', '.s_numbers', '.s_picture', '.s_faq_collapse',
                    '.s_quotes_carousel', '.s_references', '.s_table_of_content', '.cr_blocks',
                    '.s_author_card', '.s_blog_toc', '.s_blog_contact_us'
                ];
                var excludeFilter = baseSnippets.map(function(s) { return ':not(' + s + ' *)'; }).join('');

                this.$content.find('p').filter(excludeFilter).addClass('cr-blog-paragraph');
                this.$content.find('h1').filter(excludeFilter).addClass('cr-blog-h1');
                this.$content.find('h2').filter(excludeFilter).addClass('cr-blog-h2');
                this.$content.find('h3').filter(excludeFilter).addClass('cr-blog-h3');
                this.$content.find('h4').filter(excludeFilter).addClass('cr-blog-h4');
                this.$content.find('h5').filter(excludeFilter).addClass('cr-blog-h5');
                this.$content.find('h6').filter(excludeFilter).addClass('cr-blog-h6');
                this.$content.find('strong, b').filter(excludeFilter).addClass('cr-blog-bold');
                this.$content.find('a:not(.btn):not([class*="btn"]):not(:has(img))').filter(excludeFilter).addClass('cr-blog-link');
                this.$content.find('ul').filter(excludeFilter).addClass('cr-blog-ul');
                this.$content.find('ol').filter(excludeFilter).addClass('cr-blog-ol');
                this.$content.find('li').filter(excludeFilter).addClass('cr-blog-li');
                this.$content.find('blockquote').filter(excludeFilter).addClass('cr-blog-blockquote');
                this.$content.find('pre').filter(excludeFilter).addClass('cr-blog-pre');
                this.$content.find('code').filter(excludeFilter).addClass('cr-blog-code');
                this.$content.find('img').filter(excludeFilter).addClass('cr-blog-image');
            }

            if (this.$progressWrap.length && this.$content.length) {
                this.$progressWrap.removeClass('d-none');
                this.$progressBar = this.$progressWrap.find('.cr-progress-circle-bar');
                this.$progressText = this.$progressWrap.find('.cr-progress-circle-text');
                this.totalLength = 150.8; // 2 * PI * r (r=24)

                $(window).on('resize.blog_progress', this._onScrollActive.bind(this));
                $('#wrapwrap').on('scroll.blog_progress', this._onScrollActive.bind(this));

                this._onScrollActive();
            }
            return this._super.apply(this, arguments);
        },

        _onScrollActive: function () {
            if (!this.$progressWrap.length || !this.$content.length) return;

            var contentEl = this.$content[0];
            var rect = contentEl.getBoundingClientRect();
            var viewportHeight = window.innerHeight;
            var threshold = 75;

            if (rect.top > threshold) {
                this.$progressWrap.removeClass('show');
                return;
            }

            var contentHeight = rect.height;
            var scrollRange = contentHeight - (viewportHeight - threshold);
            if (scrollRange <= 0) {
                scrollRange = contentHeight;
            }

            var scrolled = threshold - rect.top;
            var scrollPercent = (scrolled / scrollRange) * 100;
            scrollPercent = Math.max(0, Math.min(100, scrollPercent));

            if (rect.top <= threshold && rect.bottom >= threshold) {
                this.$progressWrap.addClass('show');
            } else {
                this.$progressWrap.removeClass('show');
            }

            var offset = this.totalLength - (scrollPercent / 100) * this.totalLength;
            this.$progressBar.css('stroke-dashoffset', Math.max(0, Math.min(this.totalLength, offset)));
            this.$progressText.text(Math.round(scrollPercent) + '%');
        },

        _onScrollToTop: function () {
            $('#wrapwrap, html, body').animate({
                scrollTop: 0
            }, 600);
        },

        destroy: function () {
            $(window).off('.blog_progress');
            $('#wrapwrap').off('.blog_progress');
            this._super.apply(this, arguments);
        },
    });

});
