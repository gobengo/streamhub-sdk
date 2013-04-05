define([
    'jquery',
    'jquery-isotope',
    'streamhub-sdk/view',
    'streamhub-sdk/content/views/content-view',
    'jquery-imagesloaded'
], function($, Isotope, View, ContentView) {
    
    /**
     * A view that displays Content in a media wall.
     * @param opts {Object} A set of options to config the view with
     * @param opts.streams {Object.<string, Stream>} A dictionary of streams to listen to
     * @param opts.el {HTMLElement} The element in which to render the streamed content
     * @constructor
     */
    var MediaWallView = function(opts) {
        View.call(this, opts);
        var self = this;
        
        this.el = opts.el || document.createElement('div');
        this.sortOrder = opts.sortOrder || (function(obj) {
            return obj.createdAt || 0;
        });
        
        // these are data structures for efficiently storing, adding
        // and searching displayed content
        this.contentViews = {};
        this.contentViewKeys = [];
        
        self.on('add', function(content, stream) {
            self.add(content, stream);
        });
    };
    $.extend(MediaWallView.prototype, View.prototype);

    /**
     * Add a piece of Content to the MediaWallView
     * @param content {Content} A Content model to add to the MediaWallView
     * @return the newly created ContentView
     */
    MediaWallView.prototype.add = function(content, stream) {
        var self = this;
        
        var sortKey = this.sortOrder(content);

        var contentView = new ContentView({content:content});
        contentView.render();

        console.log('here 1');

        var $contentView = $(contentView.el);

        $contentView.imagesLoaded(function() {
            //console.log('done');
            $contentView.find('img');
        });
        
        // finding where the insertion should be - naive solution is to search left to right
        // which is fine for us, because we're typically prepending 
        var sortKeyIndex = this.contentViewKeys.length;
        console.log(sortKey, content);
        console.log('here 2');
        for (var i in this.contentViewKeys) {
            if (sortKey > this.contentViewKeys[i]) {
                sortKeyIndex = i;
                break;
            }
        }
        console.log('here 3');

        this.contentViews[sortKey] = contentView;
        this.contentViewKeys.splice(sortKeyIndex, 0, sortKey);
        
        $(this.el).prepend($contentView);
    };

    return MediaWallView;
});