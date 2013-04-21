define([
    'streamhub-sdk/stream-manager',
    'streamhub-sdk/clients/livefyre-bootstrap-client',
    'streamhub-sdk/streams/livefyre-stream',
    'streamhub-sdk/streams/livefyre-reverse-stream'],
function (StreamManager, LivefyreBootstrapClient, LivefyreStream, LivefyreReverseStream) {

    /*
     * Get a StreamManager that will later be bound to a Livefyre Collection
     * No HTTP requests will be made until `.start()` is called.
     * @param opts {Object} Opts for a Livefyre Collection: network, siteId, articleId, environment
     * @throws Error if creating LivefyreStreamManager
     */
    var getLivefyreStreamManager = function (opts) {
        var streamManager = new StreamManager({}),
            starting = false,
            started = false;
        // Only init the LivefyreStreams once the StreamManager has been started
        streamManager.start = function () {
            if (starting || started) return;
            starting = true;
            getLivefyreStreamManager.createLivefyreStreams(opts, function (err, streams) {
                if (err) {
                    console.log("Error creating LivefyreStreamManager. Check your options", opts);
                    throw new Error("Error creating LivefyreStreamManager", err);
                }
                streamManager.set(streams);
                StreamManager.prototype.start.call(streamManager);
                started = true;
            });
        };
        return streamManager;
    };

    /**
     * Create a set of Streams bound to a Livefyre Collection, and passes to a callback
     * This requires a single HTTP request
     * @exports streamhub-sdk/streams/livefyre-collection-streams
     */
    getLivefyreStreamManager.createLivefyreStreams = function (opts, callback) {
        var self = this;

        LivefyreBootstrapClient.getContent(opts, function(err, data) {
            if (err) {
                return callback(err);
            }

            var pages = data.archiveInfo.pageInfo;
            var pageKeys = Object.keys(pages);
            var lastPageNum = pageKeys[pageKeys.length - 1];
            var collectionId = data.collectionId;
            var commentId = data.event;

            var mainStream = new LivefyreStream($.extend({
                collectionId: collectionId,
                commentId: commentId
            }, opts));
            var reverseStream = new LivefyreReverseStream($.extend({
                page: lastPageNum
            }, opts));

            callback(null, { 'main': mainStream, 'reverse': reverseStream });
        });
    };

    StreamManager.addHelper(function(create) {
        create.livefyreStreams = getLivefyreStreamManager;
    });

    return getLivefyreStreamManager;
});