define(['jquery',
    'streamhub-sdk/event-emitter'
], function($, EventEmitter) {

    var Content = function(contentJson) {
        EventEmitter.call(this);
        this.htmlString = contentJson;
        this.attachments = [];
        this.replies = [];
    };
    $.extend(Content.prototype, EventEmitter.prototype);

    Content.prototype.html = function() {
        return this.htmlString;
    };

    Content.prototype.addAttachment = function(obj) {
        this.attachments.push(obj);
        this.emit('addAttachment', obj);
    };

    Content.prototype.addReply = function(obj) {
        this.replies.push(obj);
        this.emit('addReply', obj);
    };

    return Content;
 });