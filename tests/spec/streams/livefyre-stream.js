define([
    'jquery',
    'jasmine',
    'streamhub-sdk/streams/livefyre-stream',
    'jasmine-jquery'],
function ($, jasmine, LivefyreStream) {
    describe('A LivefyreStream', function () {

        var stream, callback, opts;

        beforeEach(function() {
            callback = jasmine.createSpy();
            opts = {
                "network": "labs-t402.fyre.co",
                "siteId": "303827",
                "articleId": "gene_publish_0",
                "environment": "t402.livefyre.com"
            };
            stream = new LivefyreStream();
        });
        
        it ("should create streams when createLivefyreStreams is called", function () {
            Hub.createLivefyreStreams(opts, callback);
    
            waitsFor(function() {
                return callback.callCount > 0;
            });
            runs(function() {
                expect(callback).toHaveBeenCalled();
                expect(callback.callCount).toBe(1);
                expect(callback.mostRecentCall.args[0]).toBeNull();
                expect(callback.mostRecentCall.args[1]).toBeDefined();
                expect(callback.mostRecentCall.args[1].main).toBeDefined();
                expect(callback.mostRecentCall.args[1].reverse).toBeDefined();
            });                            
        });
    }); 
});