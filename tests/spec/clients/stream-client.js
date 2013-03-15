define([
    'jquery',
    'jasmine',
    'streamhub-sdk/clients/stream-client',
    'jasmine-jquery'],
function ($, jasmine, StreamClient) {
	describe('A StreamClient', function () {
		
		// construction behavior
	    describe('can be constructed', function() {
	    	it ("with no options", function () {
		        var client = new StreamClient();
	        	expect(client).toBeDefined();
	    	});
	    	
	    	it ("with empty options", function () {
	        	var client = new StreamClient({});
	        	expect(client).toBeDefined();
	    	});
        });
        
		// post construction behavior    
	    describe ("after correct construction", function () {
		    var client;
		    
		    beforeEach(function() {
		        client = new StreamClient({
                    "network": "labs.fyre.co",
                    "siteId": "33129653",
                    "commentId": "0"
                });
			});
	        it ("should connect to a remote collection", function () {
                var mockData = {"states":{"tweet-312328006913904641@twitter.com":{"vis":1,"content":{"replaces":"","bodyHtml":"<a vocab=\"http://schema.org\" typeof=\"Person\" rel=\"nofollow\" resource=\"acct:14268796\" data-lf-handle=\"\" data-lf-provider=\"twitter\" property=\"url\" href=\"https://twitter.com/#!/TheRoyalty\" target=\"_blank\" class=\"fyre-mention fyre-mention-twitter\">@<span property=\"name\">TheRoyalty</span></a> hoppin on a green frog after the set at <a vocab=\"http://schema.org\" typeof=\"Person\" rel=\"nofollow\" resource=\"acct:1240466234\" data-lf-handle=\"\" data-lf-provider=\"twitter\" property=\"url\" href=\"https://twitter.com/#!/Horseshoe_SX13\" target=\"_blank\" class=\"fyre-mention fyre-mention-twitter\">@<span property=\"name\">Horseshoe_SX13</span></a> showcase during <a href=\"https://twitter.com/#!/search/realtime/%23sxsw\" class=\"fyre-hashtag\" hashtag=\"sxsw\" rel=\"tag\" target=\"_blank\">#sxsw</a> <a href=\"http://t.co/lUqA5TT7Uy\" target=\"_blank\" rel=\"nofollow\">pic.twitter.com/lUqA5TT7Uy</a>","annotations":{},"authorId":"190737922@twitter.com","parentId":"","updatedAt":1363299774,"id":"tweet-312328006913904641@twitter.com","createdAt":1363299774},"source":1,"lastVis":0,"type":0,"event":1363299777181024},"oem-3-tweet-312328006913904641@twitter.com":{"vis":1,"content":{"targetId":"tweet-312328006913904641@twitter.com","authorId":"-","link":"http://twitter.com/PlanetLA_Music/status/312328006913904641/photo/1","oembed":{"provider_url":"http://twitter.com","title":"Twitter / PlanetLA_Music: @TheRoyalty hoppin on a green ...","url":"","type":"rich","html":"<blockquote class=\"twitter-tweet\"><a href=\"https://twitter.com/PlanetLA_Music/status/312328006913904641\"></a></blockquote><script async src=\"//platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>","author_name":"","height":0,"thumbnail_width":568,"width":0,"version":"1.0","author_url":"","provider_name":"Twitter","thumbnail_url":"https://pbs.twimg.com/media/BFWcquJCUAA7orG.jpg","thumbnail_height":568},"position":3,"id":"oem-3-tweet-312328006913904641@twitter.com"},"source":1,"lastVis":0,"type":3,"event":1363299777193595}},"authors":{"190737922@twitter.com":{"displayName":"PlanetLA_Music","tags":[],"profileUrl":"https://twitter.com/#!/PlanetLA_Music","avatar":"http://a0.twimg.com/profile_images/1123786999/PLAnew-logo_normal.jpg","type":3,"id":"190737922@twitter.com"}},"jsver":"10026","maxEventId":1363299777193595};
                console.log(mockData);
                var spy = spyOn($, "getJSON").andCallFake(function(url, cb) {
                    cb({"data": mockData});
                    return {fail: function() {}};
                });
                spy.fail = function() {};
                
                var callback = jasmine.createSpy();
	        	client.load(callback);

	        	waitsFor(function() {
			        return callback.callCount > 0;
			    });
			    runs(function() {
			        window.gene = callback.mostRecentCall.args[1];
			        console.log(window.gene);
			        expect(callback).toHaveBeenCalled();
			        expect(callback.callCount).toBe(1);
			        expect(callback.mostRecentCall.args[0]).toBeNull();
                    expect(callback.mostRecentCall.args[1]).toBeDefined();
                    expect(callback.mostRecentCall.args[1].states).toBeDefined();
                    expect(Object.keys(callback.mostRecentCall.args[1].states).length).toBeGreaterThan(0);
                    expect(callback.mostRecentCall.args[1].authors).toBeDefined();
                    expect(Object.keys(callback.mostRecentCall.args[1].authors).length).toBeGreaterThan(0);
			    });				        	
	        });
	    });
	}); 
});