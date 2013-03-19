define([
    'jquery',
    'jasmine',
    'streamhub-sdk',
    'jasmine-jquery'],
function ($, jasmine, Hub) {
    describe('A Streamhub SDK', function () {

        var callback, opts;
        
        beforeEach(function() {
            callback = jasmine.createSpy();
            opts = {
                "network": "labs-t402.fyre.co",
                "siteId": "303827",
                "articleId": "gene_publish_0",
                "environment": "t402.livefyre.com"
            };
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