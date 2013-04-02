define(['jquery',
    'streamhub-sdk/content/content'
], function($, Content) {

    var Oembed = function(json) {
        Content.call(this);
        
        $.extend(this, json.content.oembed);
        
        this.id = json.content.id;
        this.author = json.author;
        this.createdAt = json.content.createdAt;
        this.updatedAt = json.content.updatedAt;
        this.visibility = json.vis;
        this.meta = json;
    };
    $.extend(Oembed.prototype, Content.prototype);

    return Oembed;
 });