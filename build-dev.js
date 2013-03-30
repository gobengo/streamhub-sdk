({
  paths: {
    jquery: 'lib/zepto/zepto',
    base64: 'lib/base64/base64',
    almond: 'lib/almond/almond'
  },
  packages: [{
     name: "streamhub-sdk",
     location: "src"
  }],
  shim: {
    jquery: {
        exports: '$'
    }
  },
  baseUrl: '.',
  name: "streamhub-sdk",
  exclude: ['jquery', 'almond', 'base64'],
  out: "streamhub-sdk.built.js",
  optimize: "none",
  wrap: {
    start: "/*jslint browser: true, devel: false, node: false," +
           "rhino: false, windows: false, passfail: false, nomen: true," +
           "sloppy: true, stupid: false, white: true, indent: 4, " + 
           "vars: true, maxerr: 500, maxlen: 100 */\n" +
           "var define = function() {};\n" +
           "(function() {",
    end: "}());"
  }
})
