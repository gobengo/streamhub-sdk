define(['jquery'], function($) {
    
    /**
     * Stream client connects to livefyre's stream server will fetch content objects
     * from the stream.
     * @param opts {Object} A set of options to config the stream client with
     * @param opts.network {string} The name of the network in the livefyre platform
     * @param opts.siteId {string} The livefyre siteId for the conversation stream
     * @param opts.commentId {string?} The commentId to start streaming from (default "0")
     * @constructor
     */
    var StreamClient = function(opts) {
        opts = opts || {};
        this.network = opts.network || "livefyre.com";
        this.siteId = opts.siteId;
        this.commentId = opts.commentId || "0";
        this._commentId = this.commentId;
        this._urlBase = "http://stream1." + this.network + "/v3.0/collection/" + this.siteId + "/";
    };
    
    /**
     * Fetches content from the livefyre conversation stream that this client
     * has been configured with.
     * @param callback {function} A callback that is called upon success/failure of the
     * stream request. Callback signature is "function(error, data)". 
     */
    StreamClient.prototype.load = function(callback) {
        callback = callback || function() {};
        var url = this._urlBase + this.commentId + "/";
        var self = this;

        $.getJSON(url, function(data, status, jqXhr) {
            self.commentId = data.data.maxEventId + ""; 
            callback(null, data.data);
        }).fail(function(jqXhr, status, err) {
            callback(err);
        });
    };
    
    return StreamClient;

});