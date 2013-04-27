define([
    'hgn!streamhub-sdk/content/templates/Content',
    'streamhub-sdk/util'
], function (ContentTemplate, Util) {
    
    /**
     * Defines the base class for all content-views. Handles updates to attachments
     * and loading of images.
     * @param opts {Object} The set of options to configure this view with.
     * @param opts.content {Content} The content object to use when rendering. 
     * @param opts.el {?HTMLElement} The element to render this object in.
     * @exports streamhub-sdk/content/views/content-view
     * @constructor
     */
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
    
    /**
     * Render the content inside of the ContentView's element.
     */
    ContentView.prototype.render = function () {
        var context = this.getTemplateContext();
        context.formattedCreatedAt = Util.formatDate(this.content.createdAt);
        this.el.innerHTML = this.template(context);
    };
    
    /**
     * Gets the template rendering context. By default, returns "this.content".
     * @return {Content} The content object this view was instantiated with.
     */  
    ContentView.prototype.getTemplateContext = function () {
        return this.content;
    };
    
    return ContentView;
});