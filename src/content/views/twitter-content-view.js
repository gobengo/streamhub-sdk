define([
	'streamhub-sdk/content/views/content-view',
	'hgn!streamhub-sdk/content/templates/Tweet',
	'jquery'],
function (ContentView, TwitterContentTemplate, $) {
	
    /**
     * A view for rendering twitter content into an element.
     * @param opts {Object} The set of options to configure this view with (See ContentView).
     */

	var TwitterContentView = function TwitterContentView (opts) {
		ContentView.call(this, opts);
	};
	
	TwitterContentView.prototype = new ContentView();
	
	TwitterContentView.prototype.elClass += ' content-tweet ';
	TwitterContentView.prototype.template = TwitterContentTemplate;
	
	return TwitterContentView;
});