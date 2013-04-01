define(['jquery',
    'streamhub-sdk/content',
    'streamhub-sdk/content-types/livefyre-content'
], function($, Content, LivefyreContent) {

    var LivefyreTweet = function (json) {
        LivefyreContent.call(this, json);
        debugger;
    }
    $.extend(LivefyreTweet.prototype, LivefyreContent.prototype);

    LivefyreTweet.canParse = function(json) {
        var canParseAsLivefyreContent = LivefyreContent.canParse(json);
        if ( ! canParseAsLivefyreContent) {
            return false;
        }
        debugger;
    };

    Content.register(LivefyreTweet);
     
    return LivefyreTweet;
 });