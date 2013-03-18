define(['jquery',
    '../stream',
    '../clients/livefyre-bootstrap-client' 
], function($, Stream, LivefyreBootstrapClient) {

    /**
     * Defines a livefyre stream that is readable in reverse time order from a livefyre
     * conversation.
     * @param opts {Object} A set of options to config the stream client with
     * @constructor
     */
    var LivefyreReverseStream = function(opts) {
        this.opts = opts || {};
        this.network = opts.network;
        this.siteId = opts.siteId;
        this.articleId = opts.articleId;
        this.environment = opts.environment;
        this.page = opts.page;
        Stream();
    };
    $.extends(LivefyreReverseStream.prototype, Stream.prototype);
    
    LivefyreReverseStream.prototype._read = function() {
        var opts = {
            network: this.network,
            siteId: this.siteId,
            articleId: this.articleId,
            page: this.page
        };
        if (this.environment) {
            opts.environment = this.environment;
        }

        LivefyreBootstrapClient.getContent(opts, function(err, data) {
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