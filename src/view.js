/** 
 * A module that provides a Base View to render Streams of Content
 * @module streamhub-sdk/view
 */
define(['jquery', 'streamhub-sdk/event-emitter', 'streamhub-sdk/util'],
function($, EventEmitter, Util) {

    /**
     * Defines a base view object that listens to a set streams, adds objects to an 
     * internal collection when received from the streams, and then emits an 'add' event.
     * Subclasses are responsible for listening to the "add" events and using them to 
     * display streamed content.
     * @alias module:streamhub-sdk/view
     * @param opts {Object} A set of options to config the view with
     * @param opts.streams {Object.<string, Stream>} A dictionary of streams to listen to
     * @param opts.el {HTMLElement} The element in which to render the streamed content
     * @constructor
     */
    var View = function(opts) {
        EventEmitter.call(this);
        opts = opts || {};

        this.setElement(opts.el || document.createElement(this.elTag));

        this.initialize.apply(this, arguments);
    };
    $.extend(View.prototype, EventEmitter.prototype);

    /**
     * Create an extended subclass of View
     * @param prototypeExtension {Object} Properties to add to the subclass's prototype
     */
    View.extend = Util.extend;

    /**
     * The HTML tag to use for elements created for this View
     */
    View.prototype.elTag = 'div';

    /**
     * An HTML class attribute string to use for elements created for this View
     */
    View.prototype.elClass = '';

    /**
     * Initializes the View after construction. Subclasses can implement this
     */
    View.prototype.initialize = function () {};

    /**
     * Set the .el DOMElement that the View should render to. Creates internal .el and
     *    .$el properties and adds this.elClass
     * @param el {DOMElement} The new element the View should render to
     */
    View.prototype.setElement = function (el) {
        this.el = el;
        this.$el = $(el);
        this.$el.addClass(this.elClass);
    };

    return View;
});