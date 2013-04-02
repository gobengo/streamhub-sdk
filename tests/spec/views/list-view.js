define([
    'jasmine',
    'jasmine-jquery',
    'jquery',
    'streamhub-sdk/views/list-view',
    'streamhub-sdk/content/content',
    'streamhub-sdk/stream',
    'streamhub-sdk/streams/mocks/jasmine-spy-stream'],
function (jasmine, jasmineJquery, $, ListView, Content, Stream, JasmineSpyStream) {
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

        describe("when creating Views for content", function () {
            var content;
            beforeEach(function () {
                content = new Content({
                    content: 'Say what'
                });
                spyOn(listView, 'createItemView').andCallThrough();
                spyOn(listView, 'getItemView').andCallThrough();
                listView._add(content);
            });

            it("stores them in .itemViews", function () {
                expect(listView.itemViews.length).toBe(1);
                expect(listView.itemViews[0] instanceof listView.getItemView())
            });

            it("uses .createItemView(content) to create the itemViews", function () {
                expect(listView.createItemView.callCount).toBe(1);
                expect(listView.createItemView.mostRecentCall.args[0]).toBe(content);
            });

            it("the default .createItemView uses .getItemView(content) to get the ItemView constructor", function () {
                expect(listView.getItemView.callCount).toBe(1);
                expect(listView.getItemView.mostRecentCall.args[0]).toBe(content);
            });

            it("the default .getItemView(content) returns .itemView", function () {
                expect(listView.getItemView()).toBe(listView.itemView);
            });
        });

    });

    describe("a ListItemView", function () {
        var itemView;

        beforeEach(function () {
            var ItemView = ListView.prototype.itemView;
            itemView = new ItemView('');
        });

        describe("when constructed", function () {
            it ("uses a <li> tag for .el", function () {
                expect(itemView.el).toBe('li')
            })
        });
    });
});
