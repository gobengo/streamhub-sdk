define([
	'streamhub-sdk/content/views/content-view',
	'hgn!streamhub-sdk/content/templates/Tweet',
	'jquery'],
function (ContentView, TwitterContentTemplate, $) {
	
	// Construct a TwitterContentView
	var TwitterContentView = function TwitterContentView (opts) {
		ContentView.call(this, opts);
	};
	
	TwitterContentView.prototype = new ContentView();
	
	TwitterContentView.prototype.elClass += ' content-tweet ';
	TwitterContentView.prototype.template = TwitterContentTemplate;
	
	return TwitterContentView;
});