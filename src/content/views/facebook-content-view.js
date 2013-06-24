define([
    'streamhub-sdk/content/views/content-view',
    'hgn!streamhub-sdk/content/templates/facebook',
    'streamhub-sdk/jquery'],
function (ContentView, FacebookContentTemplate, $) {

    /**
     * A view for rendering facebook content into an element.
     * @param opts {Object} The set of options to configure this view with (See ContentView).
     * @exports streamhub-sdk/content/views/facebook-content-view
     * @constructor
     */
    var FacebookContentView = function FacebookContentView (opts) {
        ContentView.call(this, opts);
    };
    
    FacebookContentView.prototype = new ContentView();
    
    FacebookContentView.prototype.elClass += ' content-facebook ';
    FacebookContentView.prototype.template = FacebookContentTemplate;
    
    return FacebookContentView;
});