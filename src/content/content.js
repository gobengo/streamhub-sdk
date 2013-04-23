define([
    'jquery',
    'streamhub-sdk/event-emitter'
], function($, EventEmitter) {

    /**
     * A piece of Web Content
     * @param body {String|Object} A string of HTML, the Content body.
     *     If an object, it should have a .body property
     */
    var Content = function(bodyOrObj) {
        var body = bodyOrObj;
        EventEmitter.call(this);
        if (typeof bodyOrObj === 'object') {
            body = body.body;
        }
        this.body = this.body || body;
        this.attachments = [];
        this.replies = [];
    };
    $.extend(Content.prototype, EventEmitter.prototype);

    /**
     * Attach an Oembed to the Content
     * @param obj {Oembed} An Oembed Content instance to attach
     * @fires Content#addAttachment
     */
    Content.prototype.addAttachment = function(obj) {
        this.attachments.push(obj);
        this.emit('addAttachment', obj);
    };

    /**
     * Add a reply to the Content
     * @param obj {Content} A piece of Content in reply to this one
     * @fires Content#addReply
     */
    Content.prototype.addReply = function(obj) {
        this.replies.push(obj);
        this.emit('addReply', obj);
    };

    /**
     * Set some properties and emit 'change' and 'change:{property}' events
     * @param newProperties {Object} An object of properties to set on this Content
     * @fires Content#change
     * @fires Content#change:{property}
     */
    Content.prototype.set = function (newProperties) {
        newProperties = newProperties || {};
        var oldProperties = {};
        var oldVal, newVal;
        for (var key in newProperties) { if (newProperties.hasOwnProperty(key)) {
            oldVal = oldProperties[key] = this[key];
            newVal = this[key] = newProperties[key];
            this.emit('change:'+key, newVal, oldVal);
        }}
        this.emit('change', newProperties, oldProperties);
    };

    return Content;
 });