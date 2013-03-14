define(['jquery'], function($) {

    var StreamClient = function(opts) {
        opts = opts || {};
        this.network = opts.network || "livefyre.com";
        this.siteId = opts.siteId;
        this.commentId = opts.commentId || 0;
        this._urlBase = "http://stream1." + this.network + "/v3.0/collection/" + this.siteId + "/";
    };
    
    StreamClient.prototype.load = function(callback) {
        var url = this._urlBase + this.commentId + "/";

        $.get(url, function(data) {
            console.log("success", arguments);
        }).fail(function(err) {
            console.log("error", arguments);
        });
    };
    
    return StreamClient;

});