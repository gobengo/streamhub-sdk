define([
    'jquery',
    'streamhub-sdk/content/content',
], function($, Content) {
    var TwitterStreamingContent = function (json) {
        Content.call(this);
        this.tweetId = json.id_str;
        this.author = {
            twitterUserId: json.user.id_str,
            displayName: json.user.screen_name,
            name: json.user.name
        };
        this.htmlString = json.text;
    }
    $.extend(TwitterStreamingContent.prototype, Content.prototype);
     
    return TwitterStreamingContent;
 });