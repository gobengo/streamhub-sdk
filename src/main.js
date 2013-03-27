define([
    'streamhub-sdk/stream',
    'streamhub-sdk/event-emitter',
    'streamhub-sdk/clients/livefyre-stream-client',
    'streamhub-sdk/clients/livefyre-bootstrap-client',
    'streamhub-sdk/clients/livefyre-write-client',
    'streamhub-sdk/streams/livefyre-stream',
    'streamhub-sdk/streams/livefyre-reverse-stream'
], function(Stream, 
    EventEmitter, 
    LivefyreStreamClient, 
    LivefyreBootstrapClient, 
    LivefyreWriteClient, 
    LivefyreStream, 
    LivefyreReverseStream
) {
    
    var Hub = {};
    Hub.Stream = Stream;
    Hub.EventEmitter = EventEmitter;
    
    Hub.Clients = {};
    Hub.Clients.LivefyreStreamClient = LivefyreStreamClient;
    Hub.Clients.LivefyreBootstrapClient = LivefyreBootstrapClient;
    Hub.Clients.LivefyreWriteClient = LivefyreWriteClient;
    
    Hub.Streams = {};
    Hub.Streams.LivefyreStream = LivefyreStream;
    Hub.Streams.LivefyreReverseStream = LivefyreReverseStream;
    
    /**
     * Helper method for easily setting up Livefyre streams
     * @param opts {Object} A set of options used in the creation of the individual streams
     * @return 
     */
    Hub.createLivefyreStreams = function(opts, callback) {
        LivefyreBootstrapClient.getContent(opts, function(err, data) {
            if (err) {
                return callback(err);
            }

            var pages = data.archiveInfo.pageInfo;
            var pageKeys = Object.keys(pages);
            var lastPageNum = pageKeys[pageKeys.length - 1];
            var collectionId = data.collectionId;
            var commentId = data.event;
	        
	        var mainStream = new LivefyreStream($.extend({collectionId: collectionId, commentId: commentId}, opts));
	        var reverseStream = new LivefyreReverseStream($.extend({page: lastPageNum}, opts));
	        
	        callback(null, { main: mainStream, reverse: reverseStream });
	        
        });
    
    };
    
    return Hub;
});