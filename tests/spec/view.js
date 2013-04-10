define([
    'jquery',
    'jasmine',
    'streamhub-sdk/view',
    'streamhub-sdk/stream',
    'jasmine-jquery',
    'streamhub-sdk-tests/mocks/jasmine-spy-stream'],
function ($, jasmine, View, Stream, jasmineJquery, JasmineSpyStream) {
    describe('A base View', function () {
        var view, opts;
        
        it ("should call on() on all streams when constructed", function () {
            opts = {
                streams: {
                    main: { start: jasmine.createSpy(), on: jasmine.createSpy() },
                    reverse: { start: jasmine.createSpy(), on: jasmine.createSpy() }
                }
            };

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

        describe('.extend()', function () {
            var MyView,
                view;
            beforeEach(function () {
                MyView = View.extend({
                    initialize: jasmine.createSpy()
                });
                view = new MyView({
                    streams: {
                        main: { start: jasmine.createSpy(), on: jasmine.createSpy() }
                    }
                });
            });

            it('can be used to create subclasses', function () {
                expect(view instanceof View).toBe(true);
                expect(view instanceof MyView).toBe(true);
                expect(MyView.extend).toBeDefined();
            });

            it('can create subclasses that can be .extended', function () {
                var MyMyView = MyView.extend({}),
                    myMyView = new MyMyView({
                        streams: {
                            main: { start: jasmine.createSpy(), on: jasmine.createSpy() }
                        }
                    });
                expect(myMyView instanceof MyView).toBe(true);
                expect(myMyView instanceof MyMyView).toBe(true);
            });

            it('subclasses call .initialize on construction', function () {
                expect(view.initialize).toHaveBeenCalled();
            });

        });

        describe('when constructed', function () {
            beforeEach(function() {
                opts = {
                    streams: {
                        main: new Stream(),
                        reverse: new Stream()
                    }
                };
                opts.streams.main.start = jasmine.createSpy();
                opts.streams.reverse.start = jasmine.createSpy();

                spyOn(View.prototype, 'setElement').andCallThrough();

                view = new View(opts);
            });

            it ("calls .setElement", function () {
                expect(view.setElement).toHaveBeenCalled();
            });

            it ("has a .el with class of this.elClass", function () {
                expect(view.$el).toHaveClass(view.elClass);
            });

            it ("uses a .el with an HTML tag of this.elTag", function () {
                expect(view.$el).toBe(view.elTag);
            });

            describe("with opts.el", function () {
                beforeEach(function () {
                    setFixtures(sandbox());
                    $el = $('#sandbox');
                    el = $el[0];

                    view = new View({
                        el: el,
                        streams: {
                            main: new JasmineSpyStream()
                        }
                    });
                });

                it ("should have .el set to opts.el", function () {
                    expect(view.el).toBe(el);
                });

                it ("should have .$el set to $(opts.el)", function () {
                    expect(view.$el).toBe($el);
                });
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

            it ("should call start() on all streams when startStreams() is called with '*'", function () {
                view.startStreams("*");
        
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
                view.startStreams(['main', 'reverse']);
        
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
                view.streamOlder();
        
                waitsFor(function() {
                    return opts.streams.reverse.start.callCount > 0;
                });
                runs(function() {
                    expect(opts.streams.reverse.start).toHaveBeenCalled();
                    expect(opts.streams.reverse.start.callCount).toBe(1);
                });                            
            });

            it ("should emit('add') when a stream pushes new content", function () {
                window.view = view;

                var mockObj = "mockObj";
                var spy = jasmine.createSpy();
                view.on('add', spy);
                
                opts.streams.main._push(mockObj);
        
                waitsFor(function() {
                    return spy.callCount > 0;
                });
                runs(function() {
                    expect(spy).toHaveBeenCalled();
                    expect(view.contentSet.length).toBe(1);
                    expect(view.contentSet[0]).toBeDefined();
                });
            });
        });
    }); 
});
