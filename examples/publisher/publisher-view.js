define(['streamhub-zepto', 'streamhub-sdk/view'], function($, View) {
    
    /**
     * A view that allows you to write to the stream.
     * @param opts {Object} A set of options to config the view with
     * @param opts.streams {Object.<string, Stream>} A dictionary of streams to listen to
     * @param opts.el {HTMLElement} The element in which to render the streamed content
     * @constructor
     */
    var PublisherView = function(opts) {
        View.call(this, opts);
        this.render();
        
        var self = this;
        self.on('add', function(content, stream) {
            self._showContent(content, stream);
        });
    };
    $.extend(PublisherView.prototype, View.prototype);

	PublisherView.prototype.render = function() {
		// draw an input box
		// $(this.el).doSomething
		
		// and a post button
		// $(this.el).doSomethingElse
		
		// on click, post to stream
	};
	
    PublisherView.prototype._showContent = function(content, stream) {
		
    };

    return PublisherView;
});