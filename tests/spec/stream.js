define([
    'jquery',
    'jasmine',
    'streamhub-sdk/stream',
    'jasmine-jquery'],
function ($, jasmine, Stream) {
    describe('A base Stream', function () {
        var stream, opts;
        
        beforeEach(function() {
            stream = new Stream();
            stream._read = jasmine.createSpy();
            stream._write = jasmine.createSpy();
            opts = {"asdf": "blah"};
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

        it ("should call _write when write() is called", function () {
            stream.write(opts);
    
            waitsFor(function() {
                return stream._write.callCount > 0;
            });
            runs(function() {
                expect(stream._write).toHaveBeenCalled();
                expect(stream._write.callCount).toBe(1);
                expect(stream._write.mostRecentCall.args.length).toBe(1);
                expect(stream._write.mostRecentCall.args[0]).toBe(opts);
            });
        });
    }); 
});