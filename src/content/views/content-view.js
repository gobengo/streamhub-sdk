define([
    'jquery',
    'hgn!streamhub-sdk/content/templates/Content',
    'streamhub-sdk/util'
], function ($, ContentTemplate, Util) {
    
    // Construct a ContentView
    var ContentView = function ContentView (opts) {
        opts = opts || {};
        this.content = opts.content;
        
        if (this.content) {
            var self = this;
            this.content.on("attachment", function(content) {
                self.render();
                var newImg = $(self.el).find('img').last();
                newImg.hide();
                newImg.on('load', function() {
                    newImg.fadeIn();
                    $(self.el).trigger('imageLoaded');
                });
                newImg.on('error', function() {
                    self.content.attachments.pop();
                    newImg.remove();
                    self.render();
                });
            });
        }
        
        this.setElement(opts.el || document.createElement(this.elTag));
    };
    
    ContentView.prototype.elTag = 'article';
    ContentView.prototype.elClass = 'content';
    ContentView.prototype.template = ContentTemplate;
    
     /**
     * Set the .el DOMElement that the ContentView should render to
     * @param el {DOMElement} The new element the ContentView should render to
     */
    ContentView.prototype.setElement = function (el) {
        this.el = el;
        this.$el = $(el);
        this.$el.addClass(this.elClass);
        if (this.content && this.content.id) {
            this.$el.attr('data-content-id', this.content.id);
        }
    };
    
    // Render the content inside of the ContentView's element
    ContentView.prototype.render = function () {
        var context = this.getTemplateContext();
        context.formattedCreatedAt = Util.formatDate(this.content.createdAt);
        this.el.innerHTML = this.template(context);
    };
    
    ContentView.prototype.getTemplateContext = function () {
        var context = $.extend({}, this.content);
        context.renderAttachment = this.renderAttachment;
        return context;
    };

    ContentView.prototype.renderAttachment = function () {
        var linkHtml;
        switch (this.type) {
            case 'photo':
                return '<img src="{url}" />'.replace('{url}', this.url);
            case 'video':
                return this.html;
            case 'link':
                /** @todo show thumbnails */
                linkHtml = '<a href="{href}"><p>OMFGOMFG</p>{body}</a>'
                    .replace("{href}", this.url)
                    .replace("{body}", linkAttachmentBody(this));
                return linkHtml;
            case 'rich':
                return this.html;
            default:
                return '';
        }
    };

    function linkAttachmentBody (oembed) {
        var body = oembed.title;
        if (oembed.thumbnail_url) {
            body = '<img src="'+oembed.thumbnail_url+'" />';
        }
        return body;
    }
    
    return ContentView;
});