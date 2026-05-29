odoo.define('cr_website_blog_customisation.cr_blog_toc', function (require) {
    'use strict';

    var publicWidget = require('web.public.widget');

    publicWidget.registry.BlogTOC = publicWidget.Widget.extend({
        selector: '.s_blog_toc',
        events: {
            'click .cr-toc-item a': '_onTocClick',
        },

        start: function () {
            this.$tocList = this.$('.cr-toc-list');
            this.lastActiveId = null;
            
            // Prioritize the actual rich text body container to isolate scanning from editor helpers & widgets
            var $richContent = $('.o_wblog_post_content_field, #blog_content');
            this.$content = $richContent.length ? $richContent : $('#o_wblog_post_content, [field="post_content"]');

            if (this.$tocList.length && this.$content.length) {
                this._initTableOfContents();

                // Bind ScrollSpy scrolling and sizing events
                $('#wrapwrap').on('scroll.blog_toc', this._updateScrollSpy.bind(this));
                $(window).on('resize.blog_toc', this._updateScrollSpy.bind(this));
                
                this._updateScrollSpy();
            }
            return this._super.apply(this, arguments);
        },

        _initTableOfContents: function () {
            var self = this;
            var $allHeadings = this.$content.find('h1, h2, h3, h4, h5');
            this.$tocList.empty();

            if ($allHeadings.length) {
                var hasValidHeadings = false;

                // COMPREHENSIVE AUTOMATED FILTER: Exclude any headers inside footer/comment sections or nested snippets
                var $headings = $allHeadings.filter(function () {
                    var $el = $(this);
                    
                    // 1. Explicitly skip comments, footer, header sections
                    var $excludedParent = $el.closest('#o_wblog_post_footer, .o_wblog_post_footer, #comments, .o_wblog_post_comments, footer, header');
                    if ($excludedParent.length > 0) return false;

                    // 2. Walk up parent chain and skip headings inside unwanted dynamic layout widgets
                    var isInsideSnippet = false;
                    $el.parents().each(function () {
                        var className = $(this).attr('class') || '';
                        var idName = $(this).attr('id') || '';
                        // Targeted blacklist for dynamic grids, sliders, newsletters, shares, and related widgets
                        if (className.indexOf('s_share') !== -1 || 
                            className.indexOf('oe_share') !== -1 || 
                            className.indexOf('s_newsletter') !== -1 || 
                            className.indexOf('s_blog_posts') !== -1 || 
                            className.indexOf('s_dynamic_snippet') !== -1 || 
                            className.indexOf('cr_random_blogs') !== -1 || 
                            className.indexOf('related') !== -1 ||
                            idName.indexOf('random-blogs') !== -1) {
                            isInsideSnippet = true;
                            return false; // Break loop
                        }
                    });

                    return !isInsideSnippet;
                });

                var $sidebar = this.$('.cr-blog-toc-sidebar');
                var isMainOnly = $sidebar.hasClass('mode-main-only');
                var isFullyExpanded = $sidebar.hasClass('mode-fully-expanded');

                // DYNAMIC HIERARCHY CALCULATOR: Find the highest heading importance (lowest numeric level) used in the post
                var highestLevel = 5; 
                $headings.each(function (index, el) {
                    var $el = $(el);
                    // Extract clean, stripped text exactly like the main rendering loop
                    var $clone = $el.clone();
                    $clone.find('.badge, [class*="bg-"], i, a').remove(); 
                    var text = $clone.text().replace(/\u00a0/g, ' ').trim();
                    
                    // Only calculate based on headings that actually contain reader text!
                    if (text && text !== "") {
                        var level = parseInt(el.tagName.substring(1));
                        if (!isNaN(level) && level < highestLevel) {
                            highestLevel = level;
                        }
                    }
                });

                var $currentGroup = null;
                var $currentSublist = null;

                $headings.each(function (index, el) {
                    var $el = $(el);

                    // Get clean text (strip decorative badges, icons)
                    var $clone = $el.clone();
                    $clone.find('.badge, [class*="bg-"], i, a').remove(); 
                    var text = $clone.text().replace(/\u00a0/g, ' ').trim();

                    if (!text || text === "") return;

                    hasValidHeadings = true;

                    // ALWAYS assign clean, safe, sequential ID
                    var safeId = 'cr-heading-' + index;
                    $el.attr('id', safeId);

                    var tagName = el.tagName.toLowerCase();
                    var level = parseInt(tagName.substring(1));

                    if (level === highestLevel) {
                        // Create parent accordion group (mapped dynamically to cr-toc-h2 numbered style)
                        $currentGroup = $('<li>').addClass('cr-toc-group');
                        if (isFullyExpanded) {
                            $currentGroup.addClass('expanded');
                        }
                        
                        var $item = $('<div>')
                            .addClass('cr-toc-item cr-toc-h2')
                            .append($('<a>')
                                .attr('href', '#' + safeId)
                                .text(text)
                            );
                        
                        $currentGroup.append($item);
                        
                        // Nested sub-list for child tags
                        $currentSublist = $('<ul>').addClass('cr-toc-sublist');
                        $currentGroup.append($currentSublist);
                        
                        self.$tocList.append($currentGroup);
                    } else {
                        // Skip subheadings if display hierarchy is set to Main Topics Only
                        if (isMainOnly) return;

                        // Map lower level tag offsets dynamically to sub-topic styling classes
                        var mappedClass = 'cr-toc-h3'; 
                        var diff = level - highestLevel;
                        if (diff === 1) {
                            mappedClass = 'cr-toc-h3';
                        } else if (diff === 2) {
                            mappedClass = 'cr-toc-h4';
                        } else if (diff >= 3) {
                            mappedClass = 'cr-toc-h5';
                        }

                        // Create nested sub-topic item
                        var $subItem = $('<li>')
                            .addClass('cr-toc-item ' + mappedClass)
                            .append($('<a>')
                                .attr('href', '#' + safeId)
                                .text(text)
                            );
                        
                        if ($currentSublist) {
                            $currentSublist.append($subItem);
                        } else {
                            var $standaloneItem = $('<li>')
                                .addClass('cr-toc-item ' + mappedClass)
                                .append($('<a>')
                                    .attr('href', '#' + safeId)
                                    .text(text)
                                );
                            self.$tocList.append($standaloneItem);
                        }
                    }
                });

                if (hasValidHeadings) {
                    this.$el.removeClass('d-none');
                    this.$tocItems = this.$tocList.find('.cr-toc-item');
                    this.$tocGroups = this.$tocList.find('.cr-toc-group');
                } else {
                    this.$el.addClass('d-none');
                }
            } else {
                this.$el.addClass('d-none');
            }
        },

        _updateScrollSpy: function () {
            if (!this.$tocItems || !this.$tocItems.length) return;

            var currentActive = null;
            var threshold = 75; 

            // Query only the organic content headings (applying the exact same snippet filters)
            var $allHeadings = this.$content.find('h1, h2, h3, h4, h5');
            var $headings = $allHeadings.filter(function () {
                var $el = $(this);
                var $excludedParent = $el.closest('#o_wblog_post_footer, .o_wblog_post_footer, #comments, .o_wblog_post_comments, footer, header');
                if ($excludedParent.length > 0) return false;

                var isInsideSnippet = false;
                $el.parents().each(function () {
                    var className = $(this).attr('class') || '';
                    var idName = $(this).attr('id') || '';
                    if (className.indexOf('s_share') !== -1 || 
                        className.indexOf('oe_share') !== -1 || 
                        className.indexOf('s_newsletter') !== -1 || 
                        className.indexOf('s_blog_posts') !== -1 || 
                        className.indexOf('s_dynamic_snippet') !== -1 || 
                        className.indexOf('cr_random_blogs') !== -1 || 
                        className.indexOf('related') !== -1 ||
                        idName.indexOf('random-blogs') !== -1) {
                        isInsideSnippet = true;
                        return false;
                    }
                });

                return !isInsideSnippet;
            });

            $headings.each(function (index, el) {
                var rect = el.getBoundingClientRect();
                if (rect.top <= threshold + 30) {
                    currentActive = el.id;
                }
            });

            var newlyActive = currentActive || null;
            if (this.lastActiveId !== newlyActive) {
                this.lastActiveId = newlyActive;
                
                this.$tocItems.removeClass('active');
                if (newlyActive) {
                    var $activeItem = this.$tocItems.filter(function () {
                        return $(this).find('a').attr('href') === '#' + newlyActive;
                    });
                    $activeItem.addClass('active');

                     var $activeGroup = $activeItem.closest('.cr-toc-group');
                     if ($activeGroup.length && this.$tocGroups) {
                         var $sidebar = this.$('.cr-blog-toc-sidebar');
                         if (!$sidebar.hasClass('mode-fully-expanded')) {
                             this.$tocGroups.removeClass('expanded');
                         }
                         $activeGroup.addClass('expanded');
                     }

                     // Dynamic Scroll Centering inside the scrollable TOC list (triggered only on active change!)
                     if ($activeItem.length) {
                         var container = this.$tocList[0];
                         var item = $activeItem[0];
                         if (container && item) {
                             var containerScrollTop = container.scrollTop;
                             var containerRect = container.getBoundingClientRect();
                             var itemRect = item.getBoundingClientRect();
                             
                             // Nesting-independent offset calculation
                             var relativeItemTop = itemRect.top - containerRect.top + containerScrollTop;
                             var containerHeight = container.clientHeight;
                             var itemHeight = item.clientHeight;
                             
                             var targetScrollTop = relativeItemTop - (containerHeight / 2) + (itemHeight / 2);
                             
                             this.$tocList.stop().animate({
                                 scrollTop: targetScrollTop
                             }, 200);
                         }
                     }
                }
            }
        },

        _onTocClick: function (e) {
            e.preventDefault();
            var targetId = $(e.currentTarget).attr('href');
            var $target = $(targetId);
            
            if ($target.length) {
                var $scrollContainer = $('#wrapwrap');
                var currentScroll = $scrollContainer.scrollTop();
                var targetTop = $target[0].getBoundingClientRect().top;
                var targetScrollTop = currentScroll + targetTop - 90; // offset for sticky header

                $scrollContainer.animate({
                    scrollTop: targetScrollTop
                }, 600);
            }
        },

        destroy: function () {
            $('#wrapwrap').off('.blog_toc');
            $(window).off('.blog_toc');
            this._super.apply(this, arguments);
        },
    });
});
