define([
    'jquery',
    'jasmine',
    'streamhub-sdk/streams/livefyre-content-stream',
    'streamhub-sdk/streams/livefyre-stream',
    'jasmine-jquery'],
function ($, jasmine, LivefyreContentStream, LivefyreStream) {
    describe('A LivefyreContentStream', function () {
        var stream, opts;
        var mockData = {"vis":1,"content":{"replaces":"","bodyHtml":"<a vocab=\"http://schema.org\" typeof=\"Person\" rel=\"nofollow\" resource=\"acct:14268796\" data-lf-handle=\"\" data-lf-provider=\"twitter\" property=\"url\" href=\"https://twitter.com/#!/TheRoyalty\" target=\"_blank\" class=\"fyre-mention fyre-mention-twitter\">@<span property=\"name\">TheRoyalty</span></a> hoppin on a green frog after the set at <a vocab=\"http://schema.org\" typeof=\"Person\" rel=\"nofollow\" resource=\"acct:1240466234\" data-lf-handle=\"\" data-lf-provider=\"twitter\" property=\"url\" href=\"https://twitter.com/#!/Horseshoe_SX13\" target=\"_blank\" class=\"fyre-mention fyre-mention-twitter\">@<span property=\"name\">Horseshoe_SX13</span></a> showcase during <a href=\"https://twitter.com/#!/search/realtime/%23sxsw\" class=\"fyre-hashtag\" hashtag=\"sxsw\" rel=\"tag\" target=\"_blank\">#sxsw</a> <a href=\"http://t.co/lUqA5TT7Uy\" target=\"_blank\" rel=\"nofollow\">pic.twitter.com/lUqA5TT7Uy</a>","annotations":{},"authorId":"190737922@twitter.com","parentId":"","updatedAt":1363299774,"id":"tweet-312328006913904641@twitter.com","createdAt":1363299774},"source":1,"lastVis":0,"type":0,"event":1363299777181024};
        
        beforeEach(function() {
            opts = {
                "network": "labs-t402.fyre.co",
                "collectionId": "10669131",
                "commentId": "0",
                "upstream": LivefyreStream
            };
            
            stream = new LivefyreContentStream(opts);

            spyOn(stream.stream, "_read").andCallFake(function(opts, fn) {
                stream.stream._push(mockData);
            });
        });
        
        it ("should emit content from the LivefyreStream when _read() is called", function () {
            var readableSpy = jasmine.createSpy();
            stream.on('readable', readableSpy);

            stream._read();
    
            waitsFor(function() {
                return readableSpy.callCount > 0;
            });
            runs(function() {
                var content = stream.read();
                expect(readableSpy).toHaveBeenCalled();
                expect(content.htmlString).toBe(mockData);
            });
        });
    }); 
});
