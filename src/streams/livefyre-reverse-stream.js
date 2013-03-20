define(['jquery',
    'streamhub-sdk/stream',
    'streamhub-sdk/clients/livefyre-bootstrap-client' 
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
        Stream.call(this);
    };
    $.extend(LivefyreReverseStream.prototype, Stream.prototype);
    
    LivefyreReverseStream.prototype._read = function() {
        var self = this;
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
                self.emit('error', err);
                self._endRead();
                return;
            }
            for (i in data.content) {
                self._push(data.content[i]);
            }
            self._endRead();
        });
    };
    
    return LivefyreReverseStream;

});