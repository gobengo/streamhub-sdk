define(['jquery', 'streamhub-sdk/event-emitter'], function($, EventEmitter) {
    
    /**
     * Defines a base stream object that can be triggered to read from its source and
     * will emit events when there is more content available, and once finally when the read
     * completes.
     * @param opts {Object} A set of options to config the stream with
     * @constructor
     */
    var Stream = function(opts) {
        this.opts = opts || {};
        this.buffer = [];
        EventEmitter.call(this);
    };
    $.extend(Stream.prototype, EventEmitter.prototype);
    
    Stream.prototype.start = function() {
        if (!this._isReading) {
            this._read();
            this._isReading = true;
        }
    };

    Stream.prototype._read = function() {
        this.emit('error', new Error('not implemented'));
        this._endRead();
    };

    Stream.prototype.read = function() {
        return this.buffer.shift();
    };
    
    Stream.prototype._write = function(opts) {
        this.emit('error', new Error('not implemented'));
    };
    
    Stream.prototype.write = function(opts) {
        this._write(opts);
        return true;
    };

    Stream.prototype._push = function(obj) {
        this.buffer.push(obj);
        this.emit('readable');
        return true;
    };
    
    Stream.prototype._endRead = function() {
        this._isReading = false;
        this.emit('end');
    };
    
    return Stream;
});