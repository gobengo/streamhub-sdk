define([
    'jasmine-jquery',
    'streamhub-sdk/clients/stream-client'],
function (jasmine, StreamClient) {
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
		        setFixtures(
			        '<div id="hub-ScorecardView">'+
			        '<div class="score1"></div>'+
	  				'<div class="score2"></div>'+
	  				'<div class="quarter"></div>'+
			        '</div>'
			    );
		        client = new StreamClient({
                    "network": "labs.fyre.co",
                    "siteId": "33129653",
                    "commentId": "0"
                });
			});
	        it ("should connect to a remote collection", function () {
	        	client.load();
	        	expect(client).toBeDefined();
	        });
	    });
	}); 
});