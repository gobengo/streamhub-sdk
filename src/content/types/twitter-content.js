define(['streamhub-sdk/content/content'], function(Content) {
    
    var TwitterContent = function (json) {
        Content.call(this);
    };
    TwitterContent.prototype = new Content();

    return TwitterContent;
 });