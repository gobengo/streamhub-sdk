define(['jquery', 'streamhub-sdk/event-emitter'], function($, EventEmitter) {
    /**
     * Defines a collection object that listens to a set streams, adds objects to an 
     * internal array when received from the streams, and then emits an 'add' event.
     * @param opts {Object} A set of options to config the collection with
     * @param opts.streams {Object.<string, Stream>} A dictionary of streams to listen to
     * @constructor
     */
    var Collection = function(opts) {
        EventEmitter.call(this);
        this.streams = opts.streams;
        this.contentSet = [];
        
        var self = this;
        var keys = Object.keys(this.streams);
        for (i in keys) {
            var stream = this.streams[keys[i]];
            stream.on('readable', function() {
                self._readStream(this);
            });
        }
    };
    $.extend(Collection.prototype, EventEmitter.prototype);
    
    /**
     * Reads from a stream and put its content into the contentSet
     * @params stream {Stream} The stream to read from
     * @private
     */
    Collection.prototype._readStream = function(stream) {
        var content = stream.read();
        this.contentSet.push(content);
        this.emit('add', content, stream);
    };
    
    /**
     * Triggers the collection's streams to start.
     * @param streamNames {[Array.<string>|string]?} A list of (or singular) stream names to call
     *     .start() on (Defaults to ["main"]). Also accepts "*" for all streams. 
     */
    Collection.prototype.startStreams = function(streamNames) {
        if (!streamNames) {
            streamNames = ["main"];
        } else if (typeof streamNames == "string") {
            if (streamNames == "*") {
                streamNames = Object.keys(this.streams); 
            } else {
                streamNames = [streamNames];
            }
        }
        
        for (i in streamNames) {
            if (this.streams[streamNames[i]]) {
                this.streams[streamNames[i]].start();
            }
        }
    };

    /**
     * Triggers the collection's reverse stream to start, if present.
     */
    Collection.prototype.streamOlder = function() {
        this.startStreams("reverse");
    };
    
    return Collection;
});