define(['jquery', 'streamhub-sdk/view', 'streamhub-sdk/content/views/content-view'],
function($, View, ContentView) {
    
    /**
     * A simple view that displays content in a list.
     * @param opts {Object} A set of options to config the view with
     * @param opts.streams {Object.<string, Stream>} A dictionary of streams to listen to
     * @param opts.el {HTMLElement} The element in which to render the streamed content
     * @constructor
     */
    var ListView = function(opts) {
        View.call(this, opts);
        
        this.setElement(opts.el || document.createElement(this.tagName));

        var self = this;
        self.on('add', function(content, stream) {
            self._add(content, stream);
        });
    };
    $.extend(ListView.prototype, View.prototype);

    ListView.prototype.tagName = 'ul';
    ListView.prototype.className = 'content-list-view content-list';

    /**
     * Set the .el DOMElement that the View should render to
     * @param el {DOMElement} The new element the View should render to
     */
    ListView.prototype.setElement = function (el) {
        this.el = el;
        this.$el = $(el);
        this.$el.addClass(this.className);
        // Insert base, static HTML
    };

    ListView.prototype._add = function(content, stream) {
        var contentEl = document.createElement('div'),
            contentView = new ContentView({
                el: contentEl,
                content: content
            });
        console.log(content);
        contentView.render();
        $(this.el).prepend(contentEl);
    };

    return ListView;
});