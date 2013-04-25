/** 
 * A module to render lists of Content
 * @module streamhub-sdk/views/list-view
 */
define(['jquery', 'streamhub-sdk/view', 'streamhub-sdk/content/views/content-view'],
function($, View, ContentView) {
    
    /**
     * A simple View that displays Content in a list (`<ul>` by default).
     * @alias module:streamhub-sdk/views/list-view
     * @param opts {Object} A set of options to config the view with
     * @param opts.el {HTMLElement} The element in which to render the streamed content
     * @constructor
     */
    var ListView = function(opts) {
        opts = opts || {};
        View.call(this, opts);

        this.contentViews = [];

        var self = this;
        self.on('add', function(content, stream) {
            self.add(content, stream);
        });
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

        $(contentView.el).prependTo(this.el);

        return contentView;
    };

    /**
     * Given a new Content instance, return an existing contentView that
     * should be used to view the content.
     * Current heuristic: Check content.id
     */
    ListView.prototype.getContentView = function (newContent) {
        var existingContentView;
        for (var i=0; i < this.contentViews.length; i++) {
            var contentView = this.contentViews[i];
            if (newContent.id && contentView.content.id === newContent.id) {
                return contentView;
            }
        }
    };

    return ListView;
});