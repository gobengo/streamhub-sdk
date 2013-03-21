define([
    'jquery',
    'jasmine',
    'streamhub-sdk/view',
    'jasmine-jquery'],
function ($, jasmine, View) {
    describe('A base View', function () {
        var view, opts;
        
        beforeEach(function() {
            opts = {
                streams: {
                    main: { start: jasmine.createSpy(), on: jasmine.createSpy() },
                    reverse: { start: jasmine.createSpy(), on: jasmine.createSpy() }
                }
            };
        });

        it ("should call on() on all streams when constructed", function () {
            view = new View(opts);
    
            waitsFor(function() {
                return opts.streams.main.on.callCount > 0 && opts.streams.reverse.on.callCount > 0;
            });
            runs(function() {
                expect(opts.streams.main.on).toHaveBeenCalled();
                expect(opts.streams.main.on.callCount).toBe(1);
                expect(opts.streams.main.on).toHaveBeenCalled();
                expect(opts.streams.main.on.callCount).toBe(1);
            });                            
        });
        
        describe('after construction', function () {
            beforeEach(function() {
	            view = new View(opts);
	        });
	        
	        it ("should call start() on main stream when startStreams() is called with no args", function () {
	            view.startStreams();
	    
	            waitsFor(function() {
	                return opts.streams.main.start.callCount > 0;
	            });
	            runs(function() {
	                expect(opts.streams.main.start).toHaveBeenCalled();
	                expect(opts.streams.main.start.callCount).toBe(1);
	            });                            
	        });

            it ("should call start() on reverse stream when streamOlder()", function () {
                view.streamOlder();
        
                waitsFor(function() {
                    return opts.streams.reverse.start.callCount > 0;
                });
                runs(function() {
                    expect(opts.streams.reverse.start).toHaveBeenCalled();
                    expect(opts.streams.reverse.start.callCount).toBe(1);
                });                            
            });
	        
	    });

    }); 
});