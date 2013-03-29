define(function (require, exports) {

var Mustache = require('mustache'),
	ContentHtml = require('text!./Content.html'),
	ContentMustache = Mustache.compile(ContentHtml);

var ContentTemplate = function ContentTemplate (content) {
	console.debug('ContentTemplate', content);
	return ContentMustache(content);
}

return exports = ContentTemplate;

});