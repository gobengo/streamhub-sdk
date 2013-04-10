define([
    'require',
    'streamhub-sdk/view',
    'hgn!streamhub-sdk/content/templates/Content'],
function (require, View, ContentTemplate) {

    var ContentView = View.extend({
        initialize: function (opts) {
            var self = this;
            View.prototype.initialize.apply(this, arguments);

            opts = opts || {};

            this.content = opts.content;
            if (this.content) {
                this.content.on('addAttachment', function () {
                    self.addAttachment.apply(self, arguments);
                });
                this.content.on('addReply', function () {
                    self.addReply.apply(self, arguments);
                });
            }
        },

        elTag: 'article',
        elClass: 'content',
        template: ContentTemplate,

        // Render the content inside of the ContentView's element
        render: function () {
            this.el.innerHTML = this.template(this.getTemplateContext());
        },

        getTemplateContext: function () {
            return this.content;
        },

        addAttachment: function (content) {
            var self = this;
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
        },

        /**
         * Add a Content instance to the DOM as a reply
         * @param replyContent {Content} The reply content
         */
        addReply: function (replyContent) {
            var replyView = new ContentView({
                content: replyContent
            });
            replyView.render();
            this.$el.find('.content-replies').prepend(replyView.el);
        }
    });

    return ContentView;
});