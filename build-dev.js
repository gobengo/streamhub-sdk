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
  optimize: "uglify2",
  uglify2: {
    compress: {
      unsafe: true
    },
    mangle: true
  }
})
