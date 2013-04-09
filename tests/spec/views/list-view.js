define([
    'jasmine',
    'jasmine-jquery',
    'jquery',
    'streamhub-sdk/views/list-view',
    'streamhub-sdk/content/content',
    'streamhub-sdk/content/views/content-view',
    'streamhub-sdk/stream',
    'streamhub-sdk-tests/mocks/jasmine-spy-stream'],
function (jasmine, jasmineJquery, $, ListView, Content, ContentView, Stream, JasmineSpyStream) {
    describe('A ListView', function () {
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

        describe("when adding Content", function () {
            var content,
                newContentView;

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

                spyOn(listView, 'createContentView').andCallThrough();

                content = new Content({
                    content: 'Say what'
                });
                newContentView = listView.add(content);
            });

            it("returns the new ContentView", function () {
                expect(newContentView instanceof ContentView).toBe(true);
            });

            describe("and ContentViews are created", function () {
                it("stores them in .contentViews", function () {
                    expect(listView.contentViews.length).toBe(1);
                    expect(listView.contentViews[0] instanceof ContentView).toBe(true);
                });

                it("uses .createContentView(content) to create the ContentViews", function () {
                    expect(listView.createContentView.callCount).toBe(1);
                    expect(listView.createContentView.mostRecentCall.args[0]).toBe(content);
                });
            });

            describe("and a ContentView is inserted", function () {
                it("the new ContentView is in the DOM", function () {
                    expect(listView.$el).toContain(newContentView.$el);
                });
            });
        });
    });

    describe("Default ListView.prototype.contentView", function () {
        var contentView;

        beforeEach(function () {
            contentView = new ContentView('');
        });

        describe("when constructed", function () {
            it ("uses a <article> tag for .el", function () {
                expect(contentView.el).toBe('article')
            })
        });
    });
});
