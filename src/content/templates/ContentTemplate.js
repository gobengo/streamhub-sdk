define(['hgn!streamhub-sdk/content/templates/Content'], function (ContentHtml) {

var ContentTemplate = function ContentTemplate (content) {
	return ContentHtml(content);
};

exports = ContentTemplate;
return exports;
});