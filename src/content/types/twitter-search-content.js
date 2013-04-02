define([
    'jquery',
    'streamhub-sdk/content/content',
], function($, Content) {
    var TwitterSearchContent = function (json) {
        Content.call(this);
        this.tweetId = json.id_str;
        this.author = {
            twitterUserId: json.from_user_id_str,
            displayName: json.from_user,
            name: json.from_user_name
        };
        this.htmlString = json.text;
    }
    $.extend(TwitterSearchContent.prototype, Content.prototype);
     
    return TwitterSearchContent;
 });