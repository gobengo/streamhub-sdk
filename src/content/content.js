define([
    'jquery',
    'streamhub-sdk/event-emitter'
], function($, EventEmitter) {

    var Content = function(body) {
        EventEmitter.call(this);
        this.body = this.body || body;
        this.attachments = opts.attachments || [];
        this.replies = opts.replies || [];
    };
    $.extend(Content.prototype, EventEmitter.prototype);

    Content.prototype.addAttachment = function(obj) {
        this.attachments.push(obj);
        this.emit('attachment', obj);
    };

    Content.prototype.addReply = function(obj) {
        this.replies.push(obj);
        this.emit('reply', obj);
    };

    return Content;
 });