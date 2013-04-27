define(['streamhub-sdk/content/content'], function(Content) {
    
    /**
     * A base class that represents any piece of twitter content. This constructor saves the
     * "tweetId" property of the json object to "this".
     * @param json {Object} An object obtained via a Livefyre stream that represents the
     *        state of the content.
     * @exports streamhub-sdk/content/types/twitter-content
     * @constructor
     */  
    var TwitterContent = function (json) {
        Content.call(this);
        json = json || {};
        this.tweetId = json.tweetId;
    };
    TwitterContent.prototype = new Content();

    return TwitterContent;
 });