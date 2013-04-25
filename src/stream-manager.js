/** 
 * A module wrap a Set of named Stream instances
 * @module streamhub-sdk/StreamManager
 */
define(['jquery', 'streamhub-sdk/event-emitter'], function ($, EventEmitter) {

    /**
     * Manages a collection of Streams 
     * @alias module:streamhub-sdk/stream-manager
     */
    var StreamManager = function(streamObj) {
        EventEmitter.call(this);
        streamObj = streamObj || {};
        this._streams = {};
        this._views = [];
        this.isStarted = false;
        var self = this;
        this.on('readable', function(stream) {
            // Don't read off the buffer if StreamManager isn't going to put it anywhere
            if (self._views.length === 0) return;

            var content = stream.read(),
                view;
            for (var i=0; i < self._views.length; i++) {
                view = self._views[i];
                if (typeof view.add === 'function') {
                    view.add(content, stream)
                }
            }
        });
        this.set(streamObj);
    };
    $.extend(StreamManager.prototype, EventEmitter.prototype);

    /**
     * A set of pluggable stream creator methods.
     */
    StreamManager.create = {};

    /**
     * Adds a helper method to the "create" property of the StreamManager
     * @param helperFn {Function} A function that will add creators to the "create" property 
     */
    StreamManager.addHelper = function(helperFn) {
        helperFn(StreamManager.create);
    };

    /**
     * Add a Stream to the StreamManager object
     * Can call as `.set(name, stream)` or
     * `.set({ name1: stream1, name2: stream2 })`
     */
    StreamManager.prototype.set = function (nameOrStreamObj, stream) {
        var self = this;

        // If passed an object, call recursively with each key/val
        if (typeof nameOrStreamObj === 'object') {
            var streamObject = nameOrStreamObj;
            for (var key in streamObject) {
                if (streamObject.hasOwnProperty(key)) {
                    self.set(key, streamObject[key]);
                }
            }
            return;
        }

        if (! stream) return;

        var name = nameOrStreamObj;
        self._streams[name] = stream;
        stream.on('readable', function () {
            self.emit('readable', stream);
        });
    };

    /**
     * Get all the streams inside this StreamManager object
     * @param name {?String} Get only a stream with this name
     */
    StreamManager.prototype.get = function (name) {
        if (name) {
            return this._streams[name];
        }
        return this._streams;
    };

    /**
     * Binds a view to this stream, whose .add will be called every time data is received.
     * @params view {View} The view to bind.
     */
    StreamManager.prototype.bind= function(view) {
       this._views.push(view);
       return this;
    };

    /**
     * Iterate over the StreamManager in the StreamManager object
     * @param cb {Function} A callback that will be called for each Stream with
     *     `(stream, streamName)`
     */
    StreamManager.prototype.forEach = function (cb) {
        for (var key in this._streams) {
            cb.apply(this, [this._streams[key], key]);
        }
    };

    /**
     * Start all StreamManagers
     */
    StreamManager.prototype.start = function () {
        this.forEach(function (stream, name) {
            stream.start();
        });
        this.isStarted = true;
        return this;
    };

    return StreamManager;
});