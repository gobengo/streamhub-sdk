define(function (require, exports, module) {

// Construct a ContentView
var ContentView = function ContentView (opts) {
	this.content = opts.content;
	this.el = opts.el;
};

// Render the content inside of the ContentView's element
ContentView.prototype.render = function () {
	this.el.innerHTML = this.content.html();
};

return exports = ContentView;
});