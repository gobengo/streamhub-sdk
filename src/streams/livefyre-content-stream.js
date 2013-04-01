define(['jquery',
    'streamhub-sdk/stream',
    'streamhub-sdk/content',
    'streamhub-sdk/streams/livefyre-stream'
], function($, Stream, Content, LivefyreStream) {

    /**
     * Defines a livefyre content stream that turns livefyre emitted content into
     * a standard content format, and handles update events on the stream.
     * @param opts {Object} A set of options to config the stream client with
     * @constructor
     */
    var LivefyreContentStream = function(opts) {
        Stream.call(this);
        this.contentCache = {};
        
        var self = this;

        this.stream = new opts.upstream(opts);
        this.stream.on('readable', function() {
            self._readStream();
        });
        this.stream.on('end', function() {
            self.emit('end');
        });
    };
    $.extend(LivefyreContentStream.prototype, Stream.prototype);
    
    /**
     * Read an object from the underlying stream and convert it to content object
     * @private
     */
    LivefyreContentStream.prototype._readStream = function() {

        var contentData = this.stream.read();
        if (contentData.content && contentData.content.targetId) {
            if (this.contentCache[content.targetId]) {
                this.contentCache[content.targetId].update(contentData);
            }
        } else {
            var content = Content.create(contentData);
            this.contentCache[content.id] = content;
            this._push(content);
        }
    };
    
    /**
     * Streams content objects from the Livefyre stream's data.
     * @private
     */
    LivefyreContentStream.prototype._read = function() {
        this.stream._read();
    };
    
    /**
     * Writes content to the underlying Livefyre stream.
     * @param opts {Object} Options to pass to the LivefyreStream
     * @private
     */
    LivefyreContentStream.prototype._write = function(opts) {
        this.stream._write(opts);
    };

    return LivefyreContentStream;
});
