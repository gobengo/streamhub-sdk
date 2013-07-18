/** 
 * A module to Stream new Content in a Livefyre Collection
 * @module streamhub-sdk/stream-helpers/livefyre-helper
 */
define([
    'streamhub-sdk/jquery',
    'streamhub-sdk/stream-manager',
    'streamhub-sdk/clients/livefyre-bootstrap-client',
    'streamhub-sdk/streams/livefyre-stream',
    'streamhub-sdk/streams/livefyre-reverse-stream'],
function ($, StreamManager, LivefyreBootstrapClient, LivefyreStream, LivefyreReverseStream) {

    /**
     * Get a StreamManager that will later be bound to a Livefyre Collection. No HTTP requests
     * will be made until `.start()` is called.
     * @param opts {Object} Options to configure a Livefyre Stream with.
     * @param opts.network {string} The network name to configure.
     * @param opts.siteId {number} The site id to configure.
     * @param opts.articleId {string} The name of the article to configure.
     * @param opts.environment {?string} The name of the environment (prod/dev/uat/etc) to connect
     *        to. 
     * @throws Error if creating LivefyreStreamManager
     * @returns {StreamManager} A stream manager, configured for use with livefyre's streaming
     *          platform.
     */
    var getLivefyreStreamManager = function (opts) {
        var streamManager = new StreamManager({}),
            starting = false,
            started = false;
        // Only init the LivefyreStreams once the StreamManager has been started
        streamManager.start = function () {
            if (starting || started) {
                return;
            }
            starting = true;
            getLivefyreStreamManager.createLivefyreStreams(opts, function (err, streams) {
                if (err) {
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
     * Create a set of Streams bound to a Livefyre Collection, and passes to a callback.
     * This makes a single HTTP request.
     * @param opts {Object} Options to configure with.
     * @param opts.network {string} The network name to configure.
     * @param opts.siteId {number} The site id to configure.
     * @param opts.articleId {string} The name of the article to configure.
     * @param opts.environment {?string} The name of the environment (prod/dev/uat/etc) to connect
     *        to. 
     * @exports streamhub-sdk/stream-helpers/livefyre-helper
     */
    getLivefyreStreamManager.createLivefyreStreams = function (opts, callback) {
        var self = this;

        LivefyreBootstrapClient.getContent(opts, function(err, data) {
            if (err) {
                return callback(err);
            }
            var collectionSettings = data.collectionSettings;
            var pages = collectionSettings.archiveInfo.pageInfo;
            var pageKeys = Object.keys(pages);
            pageKeys.sort();
            var lastPageNum = pageKeys[pageKeys.length - 1];
            var collectionId = collectionSettings.collectionId;
            var commentId = collectionSettings.event;

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

    /**
     * @exports streamhub-sdk/stream-helpers/livefyre-helper
     */
    StreamManager.addHelper(function(create) {
        create.livefyreStreams = getLivefyreStreamManager;
    });

    return getLivefyreStreamManager;
});

