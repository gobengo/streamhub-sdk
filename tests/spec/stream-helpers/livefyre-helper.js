define([
    'streamhub-sdk/jquery',
    'jasmine',
    'streamhub-sdk',
    'jasmine-jquery',
    'streamhub-sdk-tests/mocks/jasmine-spy-stream',
    'streamhub-sdk/clients/livefyre-bootstrap-client',
    'streamhub-sdk/streams/livefyre-stream',
    'streamhub-sdk/streams/livefyre-reverse-stream'],
function ($, jasmine, Hub, jasminejquery, JasmineSpyStream, LivefyreBootstrapClient,
LivefyreStream, LivefyreReverseStream) {
    describe('Livefyre StreamManager Helper', function () {
        it('is registered with StreamManager.create on require', function () {
            expect(Hub.StreamManager.create.livefyreStreams).toBeDefined();
            expect(typeof Hub.StreamManager.create.livefyreStreams).toBe('function');
        });

        beforeEach(function () {

        });

        it('creates Livefyre streams lazily on .start()', function () {
            spyOn(Hub.StreamManager.create.livefyreStreams, 'createLivefyreStreams')
            .andCallFake(function (opts, cb) {
                var streams = {
                    main: new JasmineSpyStream(),
                    reverse: new JasmineSpyStream()
                };
                cb.call(this, null, streams);
            });


            var sm = Hub.StreamManager.create.livefyreStreams({});
            expect(sm.get().main).not.toBeDefined();
            expect(sm.get().reverse).not.toBeDefined();

            sm.start();
            expect(sm.get().main).toBeDefined();
            expect(sm.get().reverse).toBeDefined();
        });

        it("doesn't use LivefyreBootstrapClient until .start()", function () {
            var mockData = {"networkId": "labs-t402.fyre.co", "archiveInfo": {"nPages": 5, "pageInfo": {"1": {"url": "/t402.livefyre.com/labs-t402.fyre.co/303827/Z2VuZV9wdWJsaXNoXzA=/1.json", "last": 1359851209, "first": 1359839728}, "0": {"url": "/t402.livefyre.com/labs-t402.fyre.co/303827/Z2VuZV9wdWJsaXNoXzA=/0.json", "last": 1359839709, "first": 1359668916}, "3": {"url": "/t402.livefyre.com/labs-t402.fyre.co/303827/Z2VuZV9wdWJsaXNoXzA=/3.json", "last": 1359853588, "first": 1359852338}, "2": {"url": "/t402.livefyre.com/labs-t402.fyre.co/303827/Z2VuZV9wdWJsaXNoXzA=/2.json", "last": 1359852289, "first": 1359851232}, "4": {"url": "/t402.livefyre.com/labs-t402.fyre.co/303827/Z2VuZV9wdWJsaXNoXzA=/4.json", "last": 1360283812, "first": 1359853608}}, "pathBase": "/t402.livefyre.com/labs-t402.fyre.co/303827/Z2VuZV9wdWJsaXNoXzA=/"}, "allowEditComments": false, "collectionId": "10669131", "url": "", "checksum": "", "bootstrapUrl": "/t402.livefyre.com/labs-t402.fyre.co/303827/Z2VuZV9wdWJsaXNoXzA=/head.json", "title": "", "numVisible": 248, "nestLevel": 0, "siteId": "303827", "commentsDisabled": false, "allowGuestComments": false, "followers": 2, "config": {"nestLevel": 4, "__modified__": 1360628410.86003}, "data": [], "event": 1360628346051952, "editCommentInterval": 0};
            spyOn(LivefyreBootstrapClient, 'getContent').andCallFake(function (opts, cb) {
                cb.call(this, null, mockData);
            });
            // Don't actually do anything when starting individual streams
            // prevents tests from causing ajax requests
            spyOn(LivefyreStream.prototype, 'start').andCallFake(function () {});
            spyOn(LivefyreReverseStream.prototype, 'start').andCallFake(function () {});

            var sm = Hub.StreamManager.create.livefyreStreams({});
            expect(LivefyreBootstrapClient.getContent).not.toHaveBeenCalled();

            sm.start();
            expect(LivefyreBootstrapClient.getContent).toHaveBeenCalled();
        });

        it("doesn't call LivefyreBootstrapClient more than once on multiple .start()s", function () {
            var mockData = {"networkId": "labs-t402.fyre.co", "archiveInfo": {"nPages": 5, "pageInfo": {"1": {"url": "/t402.livefyre.com/labs-t402.fyre.co/303827/Z2VuZV9wdWJsaXNoXzA=/1.json", "last": 1359851209, "first": 1359839728}, "0": {"url": "/t402.livefyre.com/labs-t402.fyre.co/303827/Z2VuZV9wdWJsaXNoXzA=/0.json", "last": 1359839709, "first": 1359668916}, "3": {"url": "/t402.livefyre.com/labs-t402.fyre.co/303827/Z2VuZV9wdWJsaXNoXzA=/3.json", "last": 1359853588, "first": 1359852338}, "2": {"url": "/t402.livefyre.com/labs-t402.fyre.co/303827/Z2VuZV9wdWJsaXNoXzA=/2.json", "last": 1359852289, "first": 1359851232}, "4": {"url": "/t402.livefyre.com/labs-t402.fyre.co/303827/Z2VuZV9wdWJsaXNoXzA=/4.json", "last": 1360283812, "first": 1359853608}}, "pathBase": "/t402.livefyre.com/labs-t402.fyre.co/303827/Z2VuZV9wdWJsaXNoXzA=/"}, "allowEditComments": false, "collectionId": "10669131", "url": "", "checksum": "", "bootstrapUrl": "/t402.livefyre.com/labs-t402.fyre.co/303827/Z2VuZV9wdWJsaXNoXzA=/head.json", "title": "", "numVisible": 248, "nestLevel": 0, "siteId": "303827", "commentsDisabled": false, "allowGuestComments": false, "followers": 2, "config": {"nestLevel": 4, "__modified__": 1360628410.86003}, "data": [], "event": 1360628346051952, "editCommentInterval": 0};
            spyOn(LivefyreBootstrapClient, 'getContent').andCallFake(function (opts, cb) {
                cb.call(this, null, mockData);
            });
            // Don't actually do anything when starting individual streams
            // prevents tests from causing ajax requests
            spyOn(LivefyreStream.prototype, 'start').andCallFake(function () {});
            spyOn(LivefyreReverseStream.prototype, 'start').andCallFake(function () {});

            var sm = Hub.StreamManager.create.livefyreStreams({});
            expect(LivefyreBootstrapClient.getContent).not.toHaveBeenCalled();

            sm.start();
            sm.start();
            sm.start();

            expect(LivefyreBootstrapClient.getContent).toHaveBeenCalled()
            expect(LivefyreBootstrapClient.getContent.callCount).toBe(1);
        });
    });
});