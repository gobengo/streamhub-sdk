define(function (require, exports) {

var Mustache = require('lib/mustache/mustache');
var ContentHtml = require('text!./Content.mustache');
var ContentMustache = Mustache.compile(ContentHtml);

window.gene = {};
window.gene.h = require('hgn!./Content');
window.gene.m = ContentMustache;


var ContentTemplate = function ContentTemplate (content) {
	return ContentMustache(content);
};

exports = ContentTemplate;
return exports;
});