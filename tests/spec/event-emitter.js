define([
    'streamhub-sdk/jquery',
    'jasmine',
    'streamhub-sdk/event-emitter',
    'jasmine-jquery'],
function ($, jasmine, EventEmitter) {
    describe('A base EventEmitter', function () {
        var emitter, callback;
        
        beforeEach(function() {
            emitter = new EventEmitter();
            callback = jasmine.createSpy();
        });

        it ("should add a listener when .on() is called", function () {
            emitter.on("blah", callback);
            expect(emitter._listeners.blah.length).toBe(1);
            expect(emitter._listeners.blah[0]).toBe(callback);
        });

        it ("should call listener when .emit() is called", function () {
            emitter.on("blah", callback);
            emitter.emit("blah");
            expect(callback).toHaveBeenCalled();
            expect(callback.callCount).toBe(1);
        });

        it ("should remove listener when .remove() is called", function () {
            emitter.on("blah", callback);
            emitter.remove("blah", callback);
            expect(emitter._listeners.blah.length).toBe(0);
        });

        it ("should return an emitter when .emits() is called", function () {
            emitter.on("blah", callback);

            var callback2 = jasmine.createSpy();
            var resultFn = emitter.emits("blah", callback2);
            resultFn(1, "a");
            
            expect(callback).toHaveBeenCalled();
            expect(callback.callCount).toBe(1);
            
            expect(callback2).toHaveBeenCalled();
            expect(callback2.callCount).toBe(1);
            expect(callback2.mostRecentCall.args[0]).toBe(1);
            expect(callback2.mostRecentCall.args[1]).toBe("a");
        });
    }); 
});
