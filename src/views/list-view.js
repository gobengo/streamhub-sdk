define(['jquery', 'streamhub-sdk/view', 'streamhub-sdk/content/views/content-view'],
function($, View, ContentView) {
    
    /**
     * A simple View that displays Content in a list (`<ul>` by default).
     * @param opts {Object} A set of options to config the view with
     * @param opts.el {HTMLElement} The element in which to render the streamed content
     * @exports streamhub-sdk/views/list-view
     * @constructor
     */
    var ListView = function(opts) {
        opts = opts || {};
        View.call(this, opts);

        $(this.el).addClass('streamhub-list-view');

        this.contentViews = [];

        var self = this;
    };
    $.extend(ListView.prototype, View.prototype);

    /**
     * Add a piece of Content to the ListView
     *     .createContentView(content)
     *     add newContentView to this.contentViews[]
     *     render the newContentView
     *     insert the newContentView into this.el
     * @param content {Content} A Content model to add to the ListView
     * @return the newly created ContentView
     */
    ListView.prototype.add = function(content, stream) {
        var contentView = this.getContentView(content);

        if (contentView) {
            return contentView;
        }

        contentView = this.createContentView(content);
        this.contentViews.push(contentView);
        contentView.render();

        // @todo implement more excellent logic for sorting
        $(contentView.el).prependTo(this.el);

        return contentView;
    };

    /**
     * Given a new Content instance, return an existing contentView that
     * should be used to update the content (based on content.id).
     * @param newContent {Content} The piece of content to find the view for.
     * @returns {ContentView | null} The contentView for the content, or null.
     */
    ListView.prototype.getContentView = function (newContent) {
        var existingContentView;
        for (var i=0; i < this.contentViews.length; i++) {
            var contentView = this.contentViews[i];
            if (newContent.id && contentView.content.id === newContent.id) {
                return contentView;
            }
        }
        return null;
    };

    return ListView;
});
