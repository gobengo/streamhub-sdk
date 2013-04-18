define([
    'jquery',
    'streamhub-sdk/content/types/livefyre-content'
], function($, LivefyreContent) {

    var LivefyreFacebookContent = function (json) {
        LivefyreContent.call(this, json);
    };
    $.extend(LivefyreFacebookContent.prototype, LivefyreContent.prototype);

    return LivefyreFacebookContent;
});