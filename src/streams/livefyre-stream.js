define(['jquery',
    'streamhub-sdk/stream',
    'streamhub-sdk/clients/livefyre-stream-client',
    'streamhub-sdk/clients/livefyre-write-client'
], function($, Stream, LivefyreStreamClient, LivefyreWriteClient) {

    /**
     * Defines a livefyre stream that is readable and writable from and to a livefyre conversation.
     * @param opts {Object} A set of options to config the stream client with
     * @constructor
     */
    var LivefyreStream = function(opts) {
        this.opts = opts || {};
        this.network = opts.network;
        this.collectionId = opts.collectionId;
        this.commentId = opts.commentId;
        Stream.call(this);
    };
    $.extend(LivefyreStream.prototype, Stream.prototype);
    
    /**
     * Reads data from the Livefyre stream endpoint.
     * @private
     */
    LivefyreStream.prototype._read = function() {
        var self = this;
        
        var opts = {
            network: this.network,
            collectionId: this.collectionId,
            commentId: this.commentId
        };

        LivefyreStreamClient.getContent(opts, function(err, data) {
            if (err) {
                self.emit('error', err);
                self._endRead();
                return;
            }
            var latestEvent = 0;
            
            for (i in data.states) {
                var state = data.states[i];
                if (state.event > latestEvent) {
                    latestEvent = state.event;
                }
                self._push(state);
            }
            self.commentId = latestEvent;
            self._endRead();
        });
    };
    
    return LivefyreStream;

});