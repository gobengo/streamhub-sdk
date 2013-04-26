define(['jquery', 'streamhub-sdk/content/content'], function($, Content) {

    var Oembed = function(json) {
        Content.call(this);

        if (json && Oembed.types.indexOf(json.type) === -1) {
            throw new Error("Oembeds must be constructed with .type in "+Oembed.types);
        }

        json = json || {};

        $.extend(this, json);

        if (this.html && this.html.trim() === "") {
            this.html = null;
        }
    };

    Oembed.types = ['photo', 'video', 'link', 'rich'];

    $.extend(Oembed.prototype, Content.prototype);

    return Oembed;
 });