define(['streamhub-sdk/content/content'], function(Content) {
    
    var TwitterContent = function (json) {
        Content.call(this);
        json = json || {};
        this.tweetId = json.tweetId;
    };
    TwitterContent.prototype = new Content();

    return TwitterContent;
 });