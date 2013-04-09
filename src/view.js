/** 
 * A module that provides a Base View to render Streams of Content
 * @module streamhub-sdk/view
 */
define([
    'jquery',
    'streamhub-sdk/event-emitter',
    'streamhub-sdk/streams',
    'streamhub-sdk/util',
    'streamhub-sdk/content/content',
    'streamhub-sdk/content/types/livefyre-content',
    'streamhub-sdk/content/types/livefyre-twitter-content',
    'streamhub-sdk/content/types/oembed',
    'streamhub-sdk/content/types/twitter-content',
    'streamhub-sdk/content/types/twitter-search-content',
    'streamhub-sdk/content/types/twitter-streaming-content',
    'streamhub-sdk/content/views/content-view',
    'streamhub-sdk/content/views/twitter-content-view'
], function(
    $,
    EventEmitter,
    Streams,
    Util,
    Content,
    LivefyreContent,
    LivefyreTwitterContent,
    Oembed,
    TwitterContent,
    TwitterSearchContent,
    TwitterStreamingContent, 
    ContentView,
    TwitterContentView
) {

    /**
     * Defines a base view object that listens to a set streams, adds objects to an 
     * internal collection when received from the streams, and then emits an 'add' event.
     * Subclasses are responsible for listening to the "add" events and using them to 
     * display streamed content.
     * @alias module:streamhub-sdk/view
     * @param opts {Object} A set of options to config the view with
     * @param opts.streams {Object.<string, Stream>} A dictionary of streams to listen to
     * @param opts.el {HTMLElement} The element in which to render the streamed content
     * @constructor
     */
    var View = function(opts) {
        EventEmitter.call(this);
        opts = opts || {};
        this.opts = opts;

        var streams = opts.streams;
        if (!(streams instanceof Streams)) {
            streams = new Streams(streams);
        }
        this.streams = streams;

        this.el = opts.el;
        this.contentSet = [];
        this.contentRegistry = View.DEFAULT_REGISTRY;

        var self = this;

        streams.on('readable', function (stream) {
            var content = stream.read();
            self.contentSet.push(content);
            self.emit('add', content, self);
        });

        this.initialize.apply(this, arguments);
    };
    $.extend(View.prototype, EventEmitter.prototype);

    /**
     * The default registry for Content -> ContentView rendering.
     * Expects entries to always contain a "type" property, and either a view property (the type function itself) or a viewFunction property (a function that returns a type function, useful for conditional view selection.).
     */
    View.DEFAULT_REGISTRY = [
	    { type: LivefyreTwitterContent, view: TwitterContentView },
		{ type: TwitterContent, view: TwitterContentView },
	    { type: TwitterSearchContent, view: TwitterContentView },
	    { type: TwitterStreamingContent, view: TwitterContentView },
	    { type: LivefyreContent, view: ContentView },
	    { type: Content, view: ContentView }
    ];
    /**
     * Create an extended subclass of View
     * @param prototypeExtension {Object} Properties to add to the subclass's prototype
     */
    View.extend = Util.extend;

    /**
     * Initializes the View after construction. Subclasses can implement this
     */
    View.prototype.initialize = function () {};

    /**
     * Triggers the view's streams to start.
     * @param streamNames {?Array.<string>|string} A list of (or singular) stream names to call
     *     .start() on (Defaults to ["main"]). Also accepts "*" for all streams. 
     */
    View.prototype.startStreams = function(streamNames) {
        this.streams.start(streamNames);
    };

    /**
     * Triggers the view's reverse stream to start, if present.
     */
    View.prototype.streamOlder = function() {
        this.startStreams("reverse");
    };
    
    /**
     * Creates a content view from the given piece of content, by looking in this view's
     * content registry for the supplied content type.
     * @param content {Content} A content object to create the corresponding view for.
     * @return {ContentView} A new content view object for the given piece of content.
     */
    View.prototype.createContentView = function(content) {
        for (var i in this.contentRegistry) {
            var current = this.contentRegistry[i];
            
            if (content instanceof current.type) {
                var currentType;
                
                if (current.view) {
                    currentType = current.view;
                } else if (current.viewFunction) {
                    currentType = current.viewFunction(content);
                }
                return new currentType({content:content});
            }
        }
    };
    return View;
});