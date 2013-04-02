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
        this.emit('addAttachment');
    };

    Content.prototype.addReply = function(obj) {
        this.replies.push(obj);
        this.emit('addReply');
    };

    Content._contentTypes = [];    

    Content.register = function(contentType) {
        //todo: (gene) dedupe this list on insert
        Content._contentTypes.push(contentType);
        return true;
    };
    
    Content.create = function(contentJson) {
        for (var i in Content._contentTypes) {
            if (Content._contentTypes[i].canParse(contentJson)) {
                return new Content._contentTypes[i](contentJson);
            }
        }
        return new Content(contentJson);
    };

    return Content;
 });