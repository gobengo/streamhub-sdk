({
  paths: {
    base64: 'lib/base64/base64',
    almond: 'lib/almond/almond',
    text: 'lib/requirejs-text/text',
    hogan: 'lib/hogan/web/builds/2.0.0/hogan-2.0.0.amd',
    hgn: 'lib/requirejs-hogan-plugin/hgn',
    'streamhub-zepto': 'lib/zepto/build/zepto.min'
  },
  packages: [{
    name: "streamhub-sdk",
    location: "src"
  }],
  shim: {
    jquery: {
      exports: '$',
      init: function() {
        console.log('here gene', window, this);
        return this.Zepto;
      }
    }
  },
  baseUrl: '.',
  name: "streamhub-sdk",
  include: ['almond'],
  stubModules: ['text', 'hgn'],
  //exclude: ['almond', 'jquery', 'base64'],
  skipModuleInsertion: false,
  //todo: make this streamhub-sdk-$SDK_VERSION+build.$BUILD_NUMBER.min.js
  out: "streamhub-sdk.min.js",
  namespace: 'Livefyre',
  pragmasOnSave: {
    excludeHogan: true
  },
  optimize: "none", //"uglify2",
  uglify2: {
    compress: {
      unsafe: true
    },
    mangle: true
  }
})
