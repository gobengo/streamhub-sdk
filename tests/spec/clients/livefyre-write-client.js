define([
    'jquery',
    'jasmine',
    'streamhub-sdk/clients/livefyre-write-client',
    'jasmine-jquery'],
function ($, jasmine, LivefyreWriteClient) {
    describe('A LivefyreWriteClient', function () {

        it ("should post data when postContent is called", function () {
            var mockData = {"networkId": "labs-t402.fyre.co", "archiveInfo": {"nPages": 5, "pageInfo": {"1": {"url": "/t402.livefyre.com/labs-t402.fyre.co/303827/Z2VuZV9wdWJsaXNoXzA=/1.json", "last": 1359851209, "first": 1359839728}, "0": {"url": "/t402.livefyre.com/labs-t402.fyre.co/303827/Z2VuZV9wdWJsaXNoXzA=/0.json", "last": 1359839709, "first": 1359668916}, "3": {"url": "/t402.livefyre.com/labs-t402.fyre.co/303827/Z2VuZV9wdWJsaXNoXzA=/3.json", "last": 1359853588, "first": 1359852338}, "2": {"url": "/t402.livefyre.com/labs-t402.fyre.co/303827/Z2VuZV9wdWJsaXNoXzA=/2.json", "last": 1359852289, "first": 1359851232}, "4": {"url": "/t402.livefyre.com/labs-t402.fyre.co/303827/Z2VuZV9wdWJsaXNoXzA=/4.json", "last": 1360283812, "first": 1359853608}}, "pathBase": "/t402.livefyre.com/labs-t402.fyre.co/303827/Z2VuZV9wdWJsaXNoXzA=/"}, "allowEditComments": false, "collectionId": "10669131", "url": "", "checksum": "", "bootstrapUrl": "/t402.livefyre.com/labs-t402.fyre.co/303827/Z2VuZV9wdWJsaXNoXzA=/head.json", "title": "", "numVisible": 248, "nestLevel": 0, "siteId": "303827", "commentsDisabled": false, "allowGuestComments": false, "followers": 2, "config": {"nestLevel": 4, "__modified__": 1360628410.86003}, "data": [], "event": 1360628346051952, "editCommentInterval": 0}

            var spy = spyOn($, "post").andCallFake(function(url, postData, cb) {
                expect(url).toBe("http://quill.labs-t402.fyre.co/api/v3.0/collection/33129653/post/");
                expect(postData.body).toBe("oh <strong>hi</strong> there");
                expect(postData.lftoken).toBe("my token");
                cb(mockData);
                return {fail: function() {}};
            });
            
            var callback = jasmine.createSpy();
            var opts = {
                "network": "labs-t402.fyre.co",
                "collectionId": "33129653",
                "body": "oh <strong>hi</strong> there",
                "lftoken": "my token"
            };
            
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