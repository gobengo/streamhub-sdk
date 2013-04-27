define([], function() {

	/**
	 * This module is extremely EXPERIMENTAL. Currently, it provides a simple oauth login
	 * against Livefyre's QA environment, to test oauth. It should not be used in a production
	 * environment.
	 *
	 * To use, add "require('streamhub-sdk').Auth.login(_siteId_)" to a login click event to
	 * request an oauth token, which can be used to post to the current site's comment stream
	 * for an hour.
	 *
	 * To get/check existance of the current token, call "require('streamhub-sdk').Auth.getToken()"
	 * which will return the lftoken or null if not available.
	 * 
	 * To enable a successful token callback, be sure to include
	 * "require('streamhub-sdk').Auth.checkToken()" on the window.load event, which ensures the
	 * default oauth callback is enabled for the current url.
	 * @exports streamhub-sdk/auth
	 */
    var Auth = {};
    
    Auth._loginWindow = null;
    Auth._token = null;
    Auth._expirey = null;
    
    Auth._oauthHost = "54.236.217.50";
    Auth._oauthPort = 8080;
    Auth._oauthPath = "/oauth/authorize";

    /**
     * Logs in a user via oauth and sets their token on this object, optionally calls
     * a supplied callback.
     * @param siteId {String} The siteId to authenticate against the livefyre oauth server with.
     * @param redirectUrl {?String} optional redirectUrl to override the default (that being the
     *        current window.location.href + ?sh_cb=_random_callback_id).
     * @param userCallback {?function} optional callback to fire after a token is successfully
     *        retrieved. 
     * @returns false
     */
    Auth.login = function(siteId, redirectUrl, userCallback) {
        var callback;
        while (!callback || window[callback]) {
            callback = "_" + (Math.floor(Math.random() * Math.pow(10, 12) ) + 1);
        }

        window[callback] = function(token, expirey) {
            expirey = expirey || 3600;
            Auth._token = token;
            Auth._expirey = new Date(((Date.now() / 1000) + expirey) * 1000);
            
            window[callback] = null;
            if (userCallback) {
                userCallback(token, expirey);
            }
        };

        var redirectUrl = redirectUrl || window.location.href + "?sh_cb=" + callback;
        
        var url = "http://" + Auth._oauthHost + ":" + Auth._oauthPort + Auth._oauthPath + "?redirect_uri=" + redirectUrl + 
            "&response_type=token&client_id=" + siteId + "&scope=all";
        
        Auth._loginWindow = window.open(url, 'name','height=400,width=600');
        
        if (window.focus) {
            Auth._loginWindow.focus();
        }
        
        return false;
    };
    
    /**
     * Gets the token for the currently authenticated user.
     * @returns false
     */
    Auth.getToken = function() {
        return Auth._token;
    };
    
    /**
     * Checks for a token response in the current window, by examining both window.opener and 
     * the current window.location.hash and retreiving and storing the token parameter, calling
     * the callback as retreived via the "sh_cb" callback query param (on the window object),
     * which will trigger the user callback. Useful in window.onload callback if you intend on
     * making use of the simplest form of authentication.
     */
    Auth.checkToken = function() {
        if (window.opener) {
            var hash = window.location.hash || "";
            var hashParts = hash.split(/[#&]+/);
            var callbackParts = window.location.search.match(/[?&]sh_cb=(_\d*)/);
            if (callbackParts && callbackParts.length >= 2) {
                var callback = callbackParts[1];
                var token = null;
                var expirey = null;
                for (var i = 0; i < hashParts.length; i++) {
                    if (hashParts[i].trim().length != 0 && hashParts[i].split('=').length == 2) {
                        var key = hashParts[i].split('=')[0];
                        var value = hashParts[i].split('=')[1];
                        if (key == "token") {
                            token = value;
                        } else if (key == "expirey") {
                            expirey = parseInt(value);
                        }
                    }
                }
                if (callback && window.opener[callback] && token) {
                    window.opener[callback](token, expirey);
                    window.close();
                }
            }
        }
    };

    return Auth;
});
