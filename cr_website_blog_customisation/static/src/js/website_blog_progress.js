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
