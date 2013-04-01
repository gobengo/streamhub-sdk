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
        Stream.call(this);
        this.opts = opts || {};
        this.network = opts.network;
        this.siteId = opts.siteId;
        this.articleId = opts.articleId;
        this.environment = opts.environment;
        this.page = opts.page;
    };
    $.extend(LivefyreReverseStream.prototype, Stream.prototype);
    
    /**
     * Reads data from a Livefyre bootstrap page endpoint.
     * @private
     */
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
            var authors = data.authors;
            for (var i in data.content) {
                var content = data.content[i];
                content.author = authors[content.content.authorId];
                self._push(content);
            }
            self._endRead();
        });
    };
    
    return LivefyreReverseStream;
});
