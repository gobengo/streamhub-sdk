define([
    'jquery',
    'jasmine',
    'streamhub-sdk/stream',
    'jasmine-jquery'],
function ($, jasmine, Stream) {
    describe('A base Stream', function () {
        var stream;
        
        beforeEach(function() {
            stream = new Stream();
            stream._read = jasmine.createSpy();
        });

        it ("should call _read when start() is called", function () {
            stream.start();
    
            waitsFor(function() {
                return stream._read.callCount > 0;
            });
            runs(function() {
                expect(stream._read).toHaveBeenCalled();
                expect(stream._read.callCount).toBe(1);
            });                            
        });
    }); 
});