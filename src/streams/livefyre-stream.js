define(['jquery',
    '../stream',
    '../clients/livefyre-stream-client',
    '../clients/livefyre-write-client'
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
        Stream();
    };
    $.extends(LivefyreStream.prototype, Stream.prototype);
    
    LivefyreStream.prototype._read = function() {
        var opts = {
            network: this.network,
            collectionId: this.collectionId,
            commentId = this.commentId
        };

        LivefyreStreamClient.getContent(opts, function(err, data) {
            if (err) {
                this.emit('error', err);
                this._endRead();
                return;
            }
            for (i in data.states) {
                this._push(data.states[i]);
            }
            this._endRead();
        });
    };
    
    return LivefyreStream;

});