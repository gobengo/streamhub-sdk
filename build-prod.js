({
  paths: {
    jquery: 'lib/zepto/zepto',
    base64: 'lib/base64/base64',
    almond: 'lib/almond/almond',
    text: 'lib/requirejs-text/text',
    hogan: 'lib/hogan/web/builds/2.0.0/hogan-2.0.0.amd',
    hgn: 'lib/requirejs-hogan-plugin/hgn',
    main: 'src/main'
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
  include: ['almond'],
  stubModules: ['text', 'hgn'],
  //exclude: ['almond', 'jquery', 'base64'],

  //todo: make this streamhub-sdk-$SDK_VERSION+build.$BUILD_NUMBER.min.js
  out: "streamhub-sdk.min.js",
  pragmasOnSave: {
    excludeHogan: true
  },
  wrap: {
      startFile: 'tools/start.frag',
      endFile: 'tools/end.frag'
  },
  optimize: "uglify2",
  uglify2: {
    compress: {
      unsafe: true
    },
    mangle: true
  }
})
