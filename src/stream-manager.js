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
		this._Streams = {};
		this._Views = [];
		var self = this;
		this.on('readable', function(stream) {
            var content = stream.read();
            for (var view in self._Views) {
                view.emit('add', content, stream, view);
            }
        });
		this.set(streamObj);
	}
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
		if (typeof nameOrStreamObj === 'object') {
			var streamObject = nameOrStreamObj;
			for (var key in streamObject) {
				if (streamObject.hasOwnProperty(key)) {
					self.set(key, streamObject[key]);
				}
			}
			return;
		}
		var name = nameOrStreamObj;
		self._Streams[name] = stream;
		stream.on('readable', function () {
			self.emit('readable', stream);
		});
	};

	/**
	 * Get all the StreamManager inside this StreamManager object
	 * @param name {?String} Get only a stream with this name
	 */
	StreamManager.prototype.get = function (name) {
		if (name) {
			return this._Streams[name];
		}
		return this._Streams;
	};

    /**
     * Binds a view to this stream, making it emit an "add" event every time data is received.
     * @params view {View} The view to bind.
     */
	StreamManager.prototype.bindView = function(view) {
	   this._Views.push(view);
	};

	/**
	 * Iterate over the StreamManager in the StreamManager object
	 * @param cb {Function} A callback that will be called for each Stream with
	 *     `(stream, streamName)`
	 */
	StreamManager.prototype.forEach = function (cb) {
		for (var key in this._Streams) {
			cb.apply(this, [this._Streams[key], key]);
		}
	};

	/**
	 * Start all StreamManager
	 */
	StreamManager.prototype.start = function () {
		this.forEach(function (stream, name) {
			stream.start();
		});
		return this;
	};

	return StreamManager;
});