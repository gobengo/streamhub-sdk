define([
    './stream.js',
    './event-emitter.js',
    './clients/livefyre-stream-client',
    './clients/livefyre-bootstrap-client',
    './clients/livefyre-write-client',
    './streams/livefyre-stream',
    './streams/livefyre-reverse-stream'
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
    
    Hub.createLivefyreStreams = function(opts, callback) {
    
        LivefyreBootstrapClient.getContent(opts, function(err, data) {
            if (err) {
                callback(err);
            }

            var pages = data.archiveInfo.pageInfo;
            var pageKeys = Object.keys(pages);
            var lastPage = pages[pageKeys.length - 1];
	        
	        var mainStream = new LivefyreStream($.extend({collectionId}, opts));
	        var reverseStream = new LivefyreReverseStream($.extend({page: lastPage}, opts));
	        
	        callback({ main: mainStream, reverse: reverseStream });
	        
        });
    
    };
    
    return Hub;
});