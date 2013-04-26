define([
    'jquery',
    'streamhub-sdk/content/types/oembed',
    'streamhub-sdk/content/types/livefyre-content'],
function($, Oembed, LivefyreContent) {

    /**
     * An Oembed constructed from a StreamHub state of oEmbed type
     * @param json {Object} A state object from StreamHub APIs
     * @param json.content.oembed {Object} An Object conforming to the oEmbed spec
     */
    var LivefyreOembed = function(json) {
        LivefyreContent.call(this, json);
        Oembed.call(this, json.content.oembed);
        
        /*if (this.provider_name === "Facebook" && this.url &&
            this.thumbnail_url && this.html === "") {
            this.html = "<a href='"+this.url+"'/><img src='"+this.thumbnail_url+"'/></a>";
        }*/
    };
    LivefyreOembed.prototype = $.extend(new Oembed(), LivefyreContent.prototype);

    return LivefyreOembed;
 });