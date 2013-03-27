define(['jquery', 'base64'], function($) {
    var LivefyreWriteClient = {};
    
    /**
     * Posts a piece of content to a Livefyre collection.
     * @param opts.network {string} The name of the network in the livefyre platform
     * @param opts.collectionId {string} The livefyre collectionId for the conversation
     * @param opts.lftoken {string} The livefyre user auth token
     * @param opts.body {string} The content's body html with the following allowed tags:
     *     a, img, span, label, p, br, strong, em, u, blockquote, ul, li, ol, pre
     * @param callback {function} A callback that is called upon success/failure of the
     *     write request. Callback signature is "function(error, data)".
     */
    LivefyreWriteClient.postContent = function(opts, callback) {
        opts = opts || {};
        callback = callback || function() {};
        var url = [
            "http://quill.",
            opts.network,
            "/api/v3.0/collection/",
            opts.collectionId,
            "/post/"
        ].join("");

        var postData = {body: opts.body, lftoken: opts.lftoken};
        $.post(url, postData, function(data, status, jqXhr) {
            // todo: (genehallman) check livefyre stream status in data.status
            callback(null, data);
        }).fail(function(jqXhr, status, err) {
            callback(err);
        });
    };
    
    return LivefyreWriteClient;

});