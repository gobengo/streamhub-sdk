define(['jquery', 'streamhub-sdk/content/types/oembed'], function($, Oembed) {

    /**
     * An Oembed constructed from a StreamHub state of oEmbed type
     * @param json {Object} A state object from StreamHub APIs
     * @param json.content.oembed {Object} An Object conforming to the oEmbed spec
     */
    var LivefyreOembed = function(json) {
        Oembed.call(this, json.content.oembed);

        if (this.html.trim() === "") {
            this.html = null;
        }
        this.id = json.content.id;
        this.author = json.author;
        this.createdAt = json.content.createdAt;
        this.updatedAt = json.content.updatedAt;
        this.visibility = json.vis;
        this.meta = json;
    };
    LivefyreOembed.prototype = new Oembed();

    return LivefyreOembed;
 });