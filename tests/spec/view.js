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

        });
    }); 
});
