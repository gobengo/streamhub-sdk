define([
    'jquery',
    'jasmine',
    'streamhub-sdk/view',
    'streamhub-sdk/stream',
    'jasmine-jquery'],
function ($, jasmine, View, Stream) {
    describe('A base View', function () {
        var view, opts;
        
        describe('after construction', function () {
            beforeEach(function() {
                opts = {
                    collection: {};
                };
            
	            view = new View(opts);
	        });
	        
	        it ("should do something", function () {
	            expect(1).toBe(1);
	        });

        });
    }); 
});
