define([
    'jasmine',
    'jasmine-jquery',
    'jquery',
    'streamhub-sdk/views/list-view',
    'streamhub-sdk/stream',
    'streamhub-sdk/streams/mocks/jasmine-spy-stream'],
function (jasmine, jasmineJquery, $, ListView, Stream, JasmineSpyStream) {
    describe('a ListView', function () {
        var fixtureId = 'sandbox',
            listView,
            el,
            $el;


        beforeEach(function () {
            spyOn(ListView.prototype, 'setElement').andCallThrough();

            listView = new ListView({
                streams: {
                    main: new JasmineSpyStream()
                }
            });
        });

        describe ("when constructed", function () {

            it ("is instanceof ListView", function () {
                expect(listView instanceof ListView).toBe(true);
            });

            it ("should call on() on all streams", function () {
                expect(listView.streams.main.on).toHaveBeenCalled();
                expect(listView.streams.main.on.callCount).toBe(1);
            });

            it ("has .content-list CSS class", function () {
                expect(listView.$el).toHaveClass('content-list');
            });

            it ("uses <ul> as the default .el HTML tag", function () {
                expect(listView.$el).toBe('ul');
            });

            // @todo move to base View ?

            it ("calls .setElement", function () {
                expect(listView.setElement).toHaveBeenCalled();
            });

            it ("has a .el with class of this.elClass", function () {
                expect(listView.$el).toHaveClass(listView.elClass);
            });

            it ("uses a .el with an HTML tag of this.elTag", function () {
                expect(listView.$el).toBe(listView.elTag);
            });

            describe("with opts.el", function () {

                beforeEach(function () {
                    setFixtures(sandbox());
                    $el = $('#'+fixtureId);
                    el = $el[0];

                    listView = new ListView({
                        el: el,
                        streams: {
                            main: new JasmineSpyStream()
                        }
                    });
                });

                it ("should have .el set to opts.el", function () {
                    expect(listView.el).toBe(el);
                });

                it ("should have .$el set to $(opts.el)", function () {
                    expect(listView.$el).toBe($el);
                });
            });
        });

    });

    describe("a ListItemView", function () {
        var fixtureId = 'sandbox',
            itemView;

        beforeEach(function () {
            var ItemView = ListView.prototype.itemView;
            
            itemView = new ItemView('');
        });

        describe("when constructed", function () {
            it ("has a .el HTMLElement", function () {
                expect(itemView.el).toBeTruthy();
            });
        });
    });
});
