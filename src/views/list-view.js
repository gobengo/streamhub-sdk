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
        
        this.setElement(opts.el || document.createElement(this.elTag));
        this.itemViews = [];

        var self = this;
        self.on('add', function(content, stream) {
            self._add(content, stream);
        });
    };
    $.extend(ListView.prototype, View.prototype);

    ListView.prototype.elTag = 'ul';
    ListView.prototype.elClass = 'content-list';

    /**
     * Set the .el DOMElement that the View should render to
     * @param el {DOMElement} The new element the View should render to
     */
    ListView.prototype.setElement = function (el) {
        this.el = el;
        this.$el = $(el);
        this.$el.addClass(this.elClass);
        // Insert base, static HTML
    };

    ListView.prototype._add = function(content, stream) {
        var newItemView = this.createItemView(content);
        this.itemViews.push(newItemView);
        newItemView.render();
        $(this.el).prepend(newItemView.el);
    };

    var ListItemView = ContentView;
    ListItemView.prototype = $.extend(new ContentView(), {
        elTag: 'li',
        elClass: 'content-list-item ' + ContentView.prototype.elClass
    });

    ListView.prototype.itemView = ListItemView;
    ListView.prototype.getItemView = function (content) {
        return this.itemView;
    };
    ListView.prototype.createItemView = function (content) {
        var ItemView = this.getItemView(content),
            itemView = new ItemView({
                content: content
            });
        return itemView;
    };

    return ListView;
});