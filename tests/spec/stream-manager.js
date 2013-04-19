define([
    'jquery',
    'jasmine',
    'streamhub-sdk',
    'jasmine-jquery',
    'streamhub-sdk-tests/mocks/jasmine-spy-stream'],
function ($, jasmine, Hub, jasmineJquery, JasmineSpyStream) {
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
            var streamManager;

            beforeEach(function () {
                streamManager = new Hub.StreamManager({
                    main: new JasmineSpyStream(),
                    reverse: new JasmineSpyStream()
                });
            });

            it ('can be constructed with an object of named streams', function () {
                expect(streamManager).toBeDefined();
                expect(streamManager instanceof Hub.StreamManager);
            });
        });

    });
});