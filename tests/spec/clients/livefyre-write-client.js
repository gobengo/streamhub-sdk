define([
    'jquery',
    'jasmine',
    'streamhub-sdk/clients/livefyre-write-client',
    'jasmine-jquery'],
function ($, jasmine, LivefyreWriteClient) {
    describe('A LivefyreWriteClient', function () {
        var spy, mockData, callback, opts;
        
        beforeEach(function() {
            mockData = {"status": "ok", "code": 200, "data": {"messages": [{"content": {"replaces": null, "bodyHtml": "<p>oh hi there 2</p>", "annotations": {"moderator": true}, "source": 0, "authorId": "system@labs-t402.fyre.co", "parentId": null, "mentions": [], "shareLink": "http://t402.livefyre.com/.fyreit/w9lbch.4", "id": "26394571", "createdAt": 1363808885}, "vis": 1, "type": 0, "event": null, "source": 0}], "authors": {"system@labs-t402.fyre.co": {"displayName": "system", "tags": [], "profileUrl": "", "avatar": "http://gravatar.com/avatar/e23293c6dfc25b86762b045336233add/?s=50&d=http://d10g4z0y9q0fip.cloudfront.net/a/anon/50.jpg", "type": 1, "id": "system@labs-t402.fyre.co"}}}};

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