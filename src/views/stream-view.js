/** 
 * A module that provides a Base View to render Streams of Content
 * @module streamhub-sdk/view
 */
define([
    'streamhub-sdk/streams',
    'streamhub-sdk/content/content',
    'streamhub-sdk/content/types/livefyre-content',
    'streamhub-sdk/content/types/livefyre-twitter-content',
    'streamhub-sdk/content/types/oembed',
    'streamhub-sdk/content/types/twitter-content',
    'streamhub-sdk/content/types/twitter-search-content',
    'streamhub-sdk/content/types/twitter-streaming-content',
    'streamhub-sdk/view',
    'streamhub-sdk/content/views/content-view',
    'streamhub-sdk/content/views/twitter-content-view'
], function(
    Streams,
    Content,
    LivefyreContent,
    LivefyreTwitterContent,
    Oembed,
    TwitterContent,
    TwitterSearchContent,
    TwitterStreamingContent,
    View,
    ContentView,
    TwitterContentView
) {

    var StreamView = View.extend({
        initialize: function (opts) {
            View.prototype.initialize.apply(this, arguments);

            var self = this;

            var streams = opts.streams;
            if (!(streams instanceof Streams)) {
                streams = new Streams(streams);
            }
            this.streams = streams;

            this.contentRegistry = StreamView.DEFAULT_REGISTRY;
            this.contentSet = [];

            streams.on('readable', function (stream) {
                var content = stream.read();
                self.contentSet.push(content);
                self.emit('add', content, self);
            });
        }
    });

    /**
     * The default registry for Content -> ContentView rendering.
     * Expects entries to always contain a "type" property, and either a view property (the type function itself) or a viewFunction property (a function that returns a type function, useful for conditional view selection.).
     */
    StreamView.DEFAULT_REGISTRY = [
        { type: LivefyreTwitterContent, view: TwitterContentView },
        { type: TwitterContent, view: TwitterContentView },
        { type: TwitterSearchContent, view: TwitterContentView },
        { type: TwitterStreamingContent, view: TwitterContentView },
        { type: LivefyreContent, view: ContentView },
        { type: Content, view: ContentView }
    ];

    /**
     * Creates a content view from the given piece of content, by looking in this view's
     * content registry for the supplied content type.
     * @param content {Content} A content object to create the corresponding view for.
     * @return {ContentView} A new content view object for the given piece of content.
     */
    StreamView.prototype.createContentView = function(content) {
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

    /**
     * Triggers the view's streams to start.
     * @param streamNames {?Array.<string>|string} A list of (or singular) stream names to call
     *     .start() on (Defaults to ["main"]). Also accepts "*" for all streams. 
     */
    StreamView.prototype.startStreams = function(streamNames) {
        this.streams.start(streamNames);
    };

    /**
     * Triggers the view's reverse stream to start, if present.
     */
    StreamView.prototype.streamOlder = function() {
        this.startStreams("reverse");
    };

    return StreamView;
});