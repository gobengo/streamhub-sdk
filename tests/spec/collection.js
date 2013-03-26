define([
    'jquery',
    'jasmine',
    'streamhub-sdk/collection',
    'streamhub-sdk/stream',
    'jasmine-jquery'],
function ($, jasmine, Collection, Stream) {
    describe('A base Collection', function () {
        var collection, opts;
        
        it ("should call on() on all streams when constructed", function () {
            opts = {
                streams: {
                    main: { start: jasmine.createSpy(), on: jasmine.createSpy() },
                    reverse: { start: jasmine.createSpy(), on: jasmine.createSpy() }
                }
            };

            collection = new Collection(opts);
    
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
                opts = {
                    streams: {
                        main: new Stream(),
                        reverse: new Stream
                    }
                };
                opts.streams.main.start = jasmine.createSpy();
                opts.streams.reverse.start = jasmine.createSpy();
            
	            collection = new Collection(opts);
	        });
	        
	        it ("should call start() on main stream when startStreams() is called with no args", function () {
	            collection.startStreams();
	    
	            waitsFor(function() {
	                return opts.streams.main.start.callCount > 0;
	            });
	            runs(function() {
	                expect(opts.streams.main.start).toHaveBeenCalled();
	                expect(opts.streams.main.start.callCount).toBe(1);
	            });                            
	        });

            it ("should call start() on all streams when startStreams() is called with '*'", function () {
                collection.startStreams("*");
        
                waitsFor(function() {
                    return opts.streams.main.start.callCount > 0 &&  opts.streams.reverse.start.callCount > 0;
                });
                runs(function() {
                    expect(opts.streams.main.start).toHaveBeenCalled();
                    expect(opts.streams.main.start.callCount).toBe(1);
                    expect(opts.streams.reverse.start).toHaveBeenCalled();
                    expect(opts.streams.reverse.start.callCount).toBe(1);
                });                            
            });

            it ("should call start() on main & reverse streams when startStreams() is called with ['main, 'reverse']", function () {
                collection.startStreams(['main', 'reverse']);
        
                waitsFor(function() {
                    return opts.streams.main.start.callCount > 0 && opts.streams.reverse.start.callCount > 0;
                });
                runs(function() {
                    expect(opts.streams.main.start).toHaveBeenCalled();
                    expect(opts.streams.main.start.callCount).toBe(1);
                    expect(opts.streams.reverse.start).toHaveBeenCalled();
                    expect(opts.streams.reverse.start.callCount).toBe(1);
                });                            
            });

            it ("should call start() on reverse stream when streamOlder()", function () {
                collection.streamOlder();
        
                waitsFor(function() {
                    return opts.streams.reverse.start.callCount > 0;
                });
                runs(function() {
                    expect(opts.streams.reverse.start).toHaveBeenCalled();
                    expect(opts.streams.reverse.start.callCount).toBe(1);
                });                            
            });

            it ("should emit('add') when a stream pushes new content", function () {
                window.collection = collection;

                var mockObj = "mockObj";
                var spy = jasmine.createSpy();
                collection.on('add', spy);
                
                opts.streams.main._push(mockObj);
        
                waitsFor(function() {
                    return spy.callCount > 0;
                });
                runs(function() {
                    expect(spy).toHaveBeenCalled();
                    expect(collection.contentSet.length).toBe(1);
                    expect(collection.contentSet[0]).toBeDefined();
                });
            });
        });
    }); 
});
