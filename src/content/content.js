define([
    'jquery',
    'streamhub-sdk/event-emitter'
], function($, EventEmitter) {

    var Content = function(body) {
        EventEmitter.call(this);
        this.body = this.body || body;
        this.attachments = [];
        this.replies = [];
    };
    $.extend(Content.prototype, EventEmitter.prototype);

    Content.prototype.addAttachment = function(obj) {
        this.attachments.push(obj);
        this.emit('addAttachment', obj);
    };

    Content.prototype.addReply = function(obj) {
        this.replies.push(obj);
        this.emit('addReply', obj);
    };

    /**
     * Set some properties and emit a 'change' event
     */
    Content.prototype.set = function (newProperties) {
        newProperties = newProperties || {};
        var oldProperties = {};
        var oldVal, newVal;
        for (var key in newProperties) {
            oldVal = oldProperties[key] = this[key];
            newVal = this[key] = newProperties[key];
            this.emit('change:'+key, newVal, oldVal);
        }
        this.emit('change', newProperties, oldProperties);
    };

    return Content;
 });