define(['jquery', 'streamhub-sdk/content/content'], function($, Content) {

    /**
     * Base class for any piece of Livefyre content. Extracts the details of the content
     * from the json object passed in via the Livefyre stream.
     * @param json {Object} An object obtained via a Livefyre stream that represents the
     *        state of the content. 
     */
    var LivefyreContent = function(json) {
        Content.call(this);
        if ( ! json) {
            return this;
        }
        this.body = json.content.bodyHtml;
        this.source = LivefyreContent.SOURCES[json.source];
        this.id = json.content.id;
        this.author = json.author;
        this.createdAt = json.content.createdAt;
        this.updatedAt = json.content.updatedAt;
        this.visibility = json.vis;
        this.meta = json;
    };
    $.extend(LivefyreContent.prototype, Content.prototype);

    /**
     * The set of sources as defined by Livefyre's Stream API
     */
    LivefyreContent.SOURCES = [
        "livefyre", 
        "twitter",
        "twitter",
        "facebook",
        "livefyre",
        "livefyre",
        "facebook",
        "twitter",
        "livefyre",
        "unknown",
        "unknown",
        "unknown",
        "unknown",
        "feed",
        "facebook"
    ];

    return LivefyreContent;
 });