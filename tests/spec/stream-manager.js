define([
    'jquery',
    'jasmine',
    'streamhub-sdk',
    'jasmine-jquery',
    'streamhub-sdk-tests/mocks/jasmine-spy-stream',
    'streamhub-sdk-tests/mocks/mock-stream'],
function ($, jasmine, Hub, jasmineJquery, JasmineSpyStream, MockStream) {
    describe('A StreamManager', function () {

        it ('can be constructed with no args', function () {
            var streamManager = new Hub.StreamManager();
            expect(streamManager).toBeDefined();
            expect(streamManager instanceof Hub.StreamManager);
        });

        it ('can be constructed with an empty object', function () {
            var streamManager = new Hub.StreamManager({});
            expect(streamManager).toBeDefined();
            expect(streamManager instanceof Hub.StreamManager);
        });

        describe("when constructed with an object of named streams", function () {
            var streams,
                streamManager;

            beforeEach(function () {
                streams = {
                    main: new JasmineSpyStream(),
                    reverse: new JasmineSpyStream()
                };
                streamManager = new Hub.StreamManager(streams);
            });

            it('is a StreamManager', function () {
                expect(streamManager).toBeDefined();
                expect(streamManager instanceof Hub.StreamManager);
            });

            it('can retrieve streams by name with .get(name)', function () {
                for (var key in streams) {
                    expect(streamManager.get(key)).toBe(streams[key]);
                }
            });

            it('can retrieve all streams with .get and no parameters', function () {
                var gottenStreams = streamManager.get();
                for (var key in streams) {
                    expect(gottenStreams[key]).toBe(streams[key]);
                }
            });

            it('can set streams by name with .set(name, stream)', function () {
                var newStream = new JasmineSpyStream();
                streamManager.forEach(function (stream, name) {
                    expect(stream).not.toBe(newStream);
                });
                streamManager.set('new', newStream);
                expect(streamManager.get('new')).toBe(newStream);
            });
            it('can set multiple streams with .set(streamObject)', function () {
                var newStreams = {
                    'new1': new JasmineSpyStream(),
                    'new2': new JasmineSpyStream()
                };
                for (var key in newStreams) {
                    expect(streamManager.get(key)).not.toBeDefined();
                }
                streamManager.set(newStreams);
                for (var key1 in newStreams) {
                    expect(streamManager.get(key1)).toBe(newStreams[key1]);
                }
            });
            it('iterates over all streams with .forEach', function () {
                var checkedStreams = [];
                // Make sure everything from forEach was in orig streams
                streamManager.forEach(function (stream, name) {
                    expect(stream).toBeDefined();
                    expect(name).toBeDefined();
                    expect(name in streams).toBe(true);
                    expect(streams[name]).toBe(stream);
                    checkedStreams.push(stream);
                });
                // Make sure everything in origStreams was sent to forEach
                for (var key in streams) {
                    expect(checkedStreams.indexOf(streams[key]) >= 0).toBe(true);
                }
            });
            it('starts all streams when .start() is called', function () {
                streamManager.start();
                expect(streamManager.get('main').start).toHaveBeenCalled();
                expect(streamManager.get('reverse').start).toHaveBeenCalled();
            });
            it("doesn't start newly added streams once started", function () {
                streamManager.start();
                streamManager.set('new', new JasmineSpyStream());
                expect(streamManager.get('new').start).not.toHaveBeenCalled();

                if (streamManager.isStarted) streamManager.get('new').start();
                expect(streamManager.get('new').start).toHaveBeenCalled();
            });
            it(".isStarted returns started status", function () {
                expect(streamManager.isStarted).toBe(false);
                streamManager.start();
                expect(streamManager.isStarted).toBe(true);
            });
        });

        describe("when dealing with views", function () {
            it("reads from readable streams and calls .add on any bound views", function () {
                var streamManager = new Hub.StreamManager({
                    main: new MockStream()
                });

                var view1 = { add: jasmine.createSpy() };
                var view2 = { add: jasmine.createSpy() };
                streamManager.bind(view1).bind(view2);

                streamManager.start();

                expect(view1.add).toHaveBeenCalled();
                // First arg is a Content instance
                expect(view1.add.mostRecentCall.args[0].body).toBeDefined();
                // Second arg is the stream
                expect(view1.add.mostRecentCall.args[1]).toBe(streamManager.get().main);
                expect(view2.add).toHaveBeenCalled();
                expect(view2.add.mostRecentCall.args[0].body).toBeDefined();
                expect(view2.add.mostRecentCall.args[1]).toBeDefined(streamManager.get().main);
            });

            it("doesn't read from a stream if there are no views", function () {
                var streamManager = new Hub.StreamManager({
                    main: new MockStream()
                });

                var readableStream = null;
                streamManager.on('readable', function (stream) {
                    readableStream = stream;
                });
                streamManager.start();

                waits(readableStream);
                expect(readableStream.read()).toBeDefined();
            });
        })

    });
});