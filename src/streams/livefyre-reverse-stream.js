define([
    'streamhub-sdk/jquery',
    'streamhub-sdk/stream',
    'streamhub-sdk/streams/livefyre-stream',
    'streamhub-sdk/clients/livefyre-bootstrap-client',
    'streamhub-sdk/content/types/livefyre-content',
    'streamhub-sdk/content/types/livefyre-twitter-content',
    'streamhub-sdk/content/types/livefyre-facebook-content',
    'streamhub-sdk/content/types/oembed',
    'streamhub-sdk/storage'
], function(
    $, 
    Stream, 
    LivefyreStream,
    LivefyreBootstrapClient, 
    LivefyreContent, 
    LivefyreTwitterContent, 
    LivefyreFacebookContent, 
    Oembed, 
    Storage
) {

    /**
     * Defines a livefyre stream that is readable in reverse time order from a livefyre
     * conversation.
     * @param opts {Object} A set of options to config the stream client with
     * @exports streamhub-sdk/streams/livefyre-reverse-stream
     * @constructor
     */
    var LivefyreReverseStream = function(opts) {
        Stream.call(this);
        this.opts = opts || {};
        this.network = opts.network;
        this.siteId = opts.siteId;
        this.articleId = opts.articleId;
        this.environment = opts.environment;
        this.followers = opts.followers || [];
        this.page = opts.page;
        this.headDocument = opts.headDocument;
        this._headDocumentContentIds = this.getContentIdsFromBootstrapDocument(this.headDocument);
        this._pushedHeadDocument = false;
    };
    $.extend(LivefyreReverseStream.prototype, Stream.prototype);

    /**
     * Reads data from a Livefyre bootstrap page endpoint.
     * @private
     */
    LivefyreReverseStream.prototype._read = function() {
        var self = this;

        if (this.page < 0) {
            return self._endRead();
        }

        var opts = {
            network: this.network,
            siteId: this.siteId,
            articleId: this.articleId,
            page: this.page ? this.page.toString() : null
        };
        if (this.environment) {
            opts.environment = this.environment;
        }
        if (this.headDocument && ! this._pushedHeadDocument) {
            self._handleBootstrapDocument(this.headDocument);
            this._pushedHeadDocument = true;
            self._endRead();
        } else {
            LivefyreBootstrapClient.getContent(opts, function (err, data) {
                if (err) {
                    self.emit('error', err);
                    self._endRead();
                    return;
                }
                self._handleBootstrapDocument(data);
                self.page--;
                self._endRead();
            });
        }
    };

    LivefyreReverseStream.prototype._handleBootstrapDocument = function (data) {
        var authors = data.authors;
        if (this._isReading === false) {
            this._endRead();
            return;
        }
        for (var i in data.content) {
            var state = data.content[i];
            // Don't re-emit content that was already in the headDocument
            if (this._pushedHeadDocument && this._headDocumentContentIds.indexOf(state.content.id) !== -1) {
                continue;
            }

            state.author = authors[state.content.authorId];

            // Ignore non-publicly-visible messages
            // vis 1 means public content
            if (state.vis !== 1) {
                continue;
            }

            var content = LivefyreStream.createContent(state);

            if (content && content.id) {
                Storage.set(content.id, content);
            }
            this._push(content);

            // todo: make this recursive for nested replies
            for (var j in state.childContent) {
                var child = state.childContent[j];

                if (child.content && child.content.authorId) {
                    child.author = authors[child.content.authorId];
                }
                var childContent = LivefyreStream.createContent(child);
                
                if (childContent instanceof Oembed) {
                    content.addAttachment(childContent);
                } else {
                    content.addReply(childContent);
                }
                if (childContent && childContent.id) {
                    Storage.set(childContent.id, childContent);
                }
            }
        }
    };
    
    LivefyreReverseStream.prototype.getContentIdsFromBootstrapDocument = function (data) {
        data = data || {};
        var states = data.content || [];
        var contentIds = $.map(states, function (state) {
            return state.content.id;
        });
        return contentIds;
    };

    return LivefyreReverseStream;
});
