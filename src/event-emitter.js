define(function() {

  var slice = Array.prototype.slice;

  var EventEmitter = function() {
    this._listeners = {};
  };

  EventEmitter.prototype.on = function(name, fn) {
    this._listeners[name] = this._listeners[name] || [];
    this._listeners[name].push(fn);
    return this;
  };

  EventEmitter.prototype.remove = function(name, fn) {
    if (fn && this._listeners[name]) {
        this._listeners[name].splice(this._listeners[name].indexOf(fn), 1);
    }
  };

  EventEmitter.prototype.emit = function(name) {
    var listeners = this._listeners[name] || [];
    var args = slice.call(arguments, 1);
    
    for (i in listeners.length) {
      try {
        listeners[i].apply(this, args); 
      } catch(err) {
        this.emit('error', err);
      }
    }
  };

  EventEmitter.prototype.emits = function(name, fn) {
    var ee = this;
    return function() {
      var args = slice.call(arguments),
          result = fn.apply(this, args),
          emit = result instanceof Array ? result : [result];

      // destructuring emit
      ee.emit.apply(ee, [name].concat(emit));
      return result;
    };
  };
  
  return EventEmitter;
});