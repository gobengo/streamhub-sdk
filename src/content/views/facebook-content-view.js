define([
    'streamhub-sdk/content/views/content-view',
    'hgn!streamhub-sdk/content/templates/Facebook',
    'jquery'],
function (ContentView, FacebookContentTemplate, $) {

    // Construct a FacebookContentView
    var FacebookContentView = function FacebookContentView (opts) {
        ContentView.call(this, opts);
    };
    
    FacebookContentView.prototype = new ContentView();
    
    FacebookContentView.prototype.elClass += ' content-facebook ';
    FacebookContentView.prototype.template = FacebookContentTemplate;
    
    return FacebookContentView;
});