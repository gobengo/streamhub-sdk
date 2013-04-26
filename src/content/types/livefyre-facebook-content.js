define([
    'jquery',
    'streamhub-sdk/content/types/livefyre-content'
], function($, LivefyreContent) {

    /**
     * Represents a piece of Livefyre's content curated from Facebook.
     * @param json {Object} An object obtained via a Livefyre stream that represents the
     *        state of the content.
     */ 
    var LivefyreFacebookContent = function (json) {
        LivefyreContent.call(this, json); 
        var bodyEl = $(this.body);
        bodyEl.find('.fyre-image, .fyre-link').remove();
        this.body = bodyEl.html();
    };
    $.extend(LivefyreFacebookContent.prototype, LivefyreContent.prototype);
    
    return LivefyreFacebookContent;
});