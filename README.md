# streamhub-sdk

SDK to stream Content from Livefyre's StreamHub platform, create Views to render Streams and Content, and build amazing real-time social web applications.

## Quick Example

To render Content from a StreamHub Collection as a list

    var opts = {
        "network": "labs-t402.fyre.co",
        "siteId": "303827",
        "articleId": "labs_demo_fire",
        "environment": "t402.livefyre.com"
    };
    
    var listView = new ListView({
        el: document.getElementById("listView")
    });

    var livefyreStreams = Hub.StreamManager.create.livefyreStreams(opts)
    livefyreStreams.bind(listView).start();

## Getting Started

Make sure you have NPM. It is bundled with [node.js](http://nodejs.org/)

    npm install

This will install devDependencies and then use [Bower](https://github.com/twitter/bower) to download client-side dependencies to `lib/`.

Run a web server for the project

    npm start

Then check out [http://localhost:8080/examples/listview](http://localhost:8080/examples/listview) for an example of `streamhub-sdk/views/list-view`

## Content

`streamhub-sdk/content/content` provides a structured base class to represent any Content on the web. Content must only have a `.body`, which is an HTML string.

    var content = new Content('<p>Hello, world!</p>');
    c.body; // '<p>Hello, world!</p>';

Content can also have the following properties:

* more Content instances in its Array of `.replies`
* `streamhub-sdk/content/types/oembed` instances in an array of `.attachments`
* an `.author` object

Along with the Content base class, this SDK is bundled with:

* `streamhub-sdk/content/types/livefyre-content`: Content sourced from Livefyre StreamHub
* `streamhub-sdk/content/types/livefyre-twitter-content`: Tweets sourced from Livefyre StreamHub
* `streamhub-sdk/content/types/livefyre-facebook-content`: Facebook posts sourced from Livefyre StreamHub
* `streamhub-sdk/content/types/livefyre-oembed`: oEmbed Content sourced from Livefyre StreamHub

### ContentViews

Usually you will want to render Content in a DOMElement using a `streamhub-sdk/content/views/content-view`.

    var contentView = new ContentView({
        content: new Content('<p>Hello, world!</p>'),
        el: document.getElementById('example')
    });

By default, this will render Content using the included `hgn!streamhub-sdk/content/templates/content.mustache` template to show the author's avatar and name with the content `.body` and any `.attachments`.

These other ContentViews are also included:

* `streamhub-sdk/content/views/twitter-content-view`, a ContentView subclass for rendering tweets. This includes the twitter logo and the default template includes twitter's @anywhere intents for viewing the author's twitter profile as well as replying, retweeting, and favoriting the tweet.
* `streamhub-sdk/content/views/facebook-content-view`, which renders Content with a Facebook logo  

## Streams

Streams provide a standard interface to remote sources of Content, and behave like [node.js streams2](http://nodejs.org/api/stream.html#stream_compatibility).

    stream.on('readable', function () {
        var content = stream.read();
        content instanceof require('streamhub-sdk/content/content'); //true
    }).start();

Livefyre StreamHub is a great source of Content, so this SDK includes two Stream subclasses to stream Content from StreamHub:

* `streamhub-sdk/streams/livefyre-stream`: Stream new, real-time Content in a Livefyre Collection
* `streamhub-sdk/streams/livefyre-reverse-stream`: Stream content from a Livefyre Collection in reverse-chronological order. Useful to load older Content in views of a Collection.

## StreamManager

`streamhub-sdk/stream-manager` exports a StreamManager constructor, instances of which can be used to `.start()` and otherwise manage multiple Streams at once.

    var streamManager = new StreamManager({
        main: new MockStream(),
        reverse: new MockStream()
    }).start();

StreamManagers emit a 'readable' event whenever a stream that it manages is readable, and the readable stream is passed to the event listener.

    streamManager.on('readable', function (stream) {
        var content = stream.read();
    });

StreamManagers can also be bound to Views, and the StreamManager will automatically read from its streams and `.add` the Content to any bound Views.

    streamManager.bind({
        add: function (content) {
            // Called when there's new Content in streamManager's Streams
        }
    });

`StreamManager.create` provides an extension point for helpers to register methods that will create StreamManagers. `streamhub-sdk/stream-helpers/livefyre-helper` is one such helper and will return a StreamManager managing a LivefyreStream and LivefyreReverseStream for a StreamHub Collection.

    var livefyreStreamManager = StreamManager.create.livefyreStreams({
        "network": "labs-t402.fyre.co",
        "siteId": "303827",
        "articleId": "labs_demo_fire",
        "environment": "t402.livefyre.com"
    });

## Views

Views can render a Stream of Content into ContentViews to create real-time social Content experiences.

`streamhub-sdk/views/list-view` provides a basic view that will render a Stream of Content as an unordered list.

    var view = new ListView({
        el: document.getElementById('example');
    });

    view.add(new Content('<p>Hello</p>'));

Views should implement a `.add(content)` method so they can be used with StreamManager's `.bind()`.

    streamManager.bind(view).start();

## CSS

The following CSS files are included as good defaults for your embedded Content experiences:

* `src/content/css/content.less`: CSS for ContentViews
* `src/views/css/list-view.less`: CSS for ListViews
