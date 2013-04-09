define(['hgn!streamhub-sdk/content/templates/Tweet'], function (TweetMustache) {

var TweetTemplate = function TweetTemplate (content) {
	return TweetMustache(content);
};

exports = TweetTemplate;
return exports;
});