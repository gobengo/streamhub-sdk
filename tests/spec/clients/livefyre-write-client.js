define([
    'jquery',
    'jasmine',
    'streamhub-sdk/clients/livefyre-write-client',
    'jasmine-jquery'],
function ($, jasmine, LivefyreWriteClient) {
    describe('A LivefyreWriteClient', function () {
        var spy, mockData, callback, opts;
        
        beforeEach(function() {
            mockData = "this is my response object";

            spy = spyOn($, "post").andCallFake(function(url, postData, cb) {
                expect(url).toBe("http://quill.labs-t402.fyre.co/api/v3.0/collection/33129653/post/");
                expect(postData.body).toBe("oh <strong>hi</strong> there");
                expect(postData.lftoken).toBe("my token");
                cb(mockData);
                return {fail: function() {}};
            });
            
            callback = jasmine.createSpy();
            opts = {
                "network": "labs-t402.fyre.co",
                "collectionId": "33129653",
                "body": "oh <strong>hi</strong> there",
                "lftoken": "my token"
            };
        });
        
        it ("should post data when postContent is called", function () {            
            LivefyreWriteClient.postContent(opts, callback);
    
            waitsFor(function() {
                return callback.callCount > 0;
            });
            runs(function() {
                expect(callback).toHaveBeenCalled();
                expect(callback.callCount).toBe(1);
                expect(callback.mostRecentCall.args[0]).toBeNull();
                expect(callback.mostRecentCall.args[1]).toBeDefined();
                expect(callback.mostRecentCall.args[1]).toBe(mockData);
            });                            
        });
    }); 
});