/** 
 * A module to render lists of Content
 * @module streamhub-sdk/views/list-view
 */
define(['jquery', 'streamhub-sdk/views/stream-view'],
function($, StreamView) {
    
    /**
     * A simple View that displays Content in a list (`<ul>` by default).
     * @alias module:streamhub-sdk/views/list-view
     * @param opts {Object} A set of options to config the view with
     * @param opts.streams {Object.<string, Stream>} A dictionary of streams to listen to
     * @param opts.el {HTMLElement} The element in which to render the streamed content
     * @constructor
     */
    var ListView = StreamView.extend({
        initialize: function () {
            var self = this;
            StreamView.prototype.initialize.apply(this, arguments);

            this.contentViews = [];
            self.on('add', function(content, stream) {
                self.add(content, stream);
            });
        },

        elTag: 'ul',
        elClass: 'content-list',

        /**
         * Add a piece of Content to the ListView
         *     .createContentView(content)
         *     add newContentView to this.contentViews[]
         *     render the newContentView
         *     insert the newContentView into this.el
         * @param content {Content} A Content model to add to the ListView
         * @return the newly created ContentView
         */
        add: function(content, stream) {
            var newContentView = this.createContentView(content);

            this.contentViews.push(newContentView);
            newContentView.render();

            $(newContentView.el).prependTo(this.$el);

            return newContentView;
        }
    });

    return ListView;
});