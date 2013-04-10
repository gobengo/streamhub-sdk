/** 
 * A module to render tiled walls of Content
 * @module streamhub-sdk/util
 */
define(['jquery'], function ($) {
    var exports = {};

    /**
     * Extend `this` with a provided prototype to return a Subclass
     */
	exports.extend = function (prototypeExtension, staticExtension) {
		var Super = this;
		var Constructor = function () { return Super.apply(this, arguments); };

		// Extenders can specify their own .constructor function
		if (prototypeExtension && prototypeExtension.hasOwnProperty('constructor')) {
			Constructor = prototypeExtension.constructor;
		}

		// Extensions get any static properties of the Super, and
		// any they specify manually
		$.extend(Constructor, Super, staticExtension);

		// Set Constructor.prototype chain to get to Super
		var Extension = function () { this.constructor = Constructor; };
		Extension.prototype = Super.prototype;
		Constructor.prototype = new Extension();

		// Extend the new Constructor's prototype with the prototypeExtension
		if (prototypeExtension) { $.extend(Constructor.prototype, prototypeExtension); }

		Constructor.__super__ = Super.prototype;

		return Constructor;
	};

    exports.outerWidth = function(el) {
        return parseInt(el.css('width'), 10) +
            parseInt(el.css('padding-left'), 10) +
            parseInt(el.css('padding-right'), 10) +
            parseInt(el.css('border-left-width'), 10) +
            parseInt(el.css('border-right-width'), 10) +
            parseInt(el.css('margin-left'), 10) +
            parseInt(el.css('margin-right'), 10);
    };

    exports.outerHeight = function(el) {
        return parseInt(el.css('height'), 10) +
            parseInt(el.css('padding-top'), 10) +
            parseInt(el.css('padding-bottom'), 10) +
            parseInt(el.css('border-top-width'), 10) +
            parseInt(el.css('border-bottom-width'), 10) +
            parseInt(el.css('margin-top'), 10) +
            parseInt(el.css('margin-bottom'), 10);
    };
    
    exports.innerWidth = function(el) {
        return parseInt(el.css('width'), 10);
    };

    exports.innerHeight = function(el) {
        return parseInt(el.css('height'), 10);
    };
    
    exports.formatDate = function(stamp) {
        var date = new Date(stamp*1000).toLocaleString().substr(0, 16);
        var hour = date.substr(-5, 2);
        var ampm = hour<12 ? ' AM' : ' PM';
        if (hour>12) hour-= 12;
        if (hour===0) hour = 12;
        return date.substr(0, date.indexOf(' ')) +' &bull; ' + hour + date.substr(13) + ampm;
    };

	return exports;
});