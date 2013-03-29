({
  paths: {
    jquery: 'lib/zepto/zepto',
    base64: 'lib/base64/base64',
  },
  packages: [{
     name: "streamhub-sdk",
     location: "src"
  }],
  shim: {
    jquery: {
        exports: '$'
    },
  },
  baseUrl: '.',
  name: "lib/almond/almond",
  include: 'streamhub-sdk',
  out: "streamhub-sdk.built.js",
  optimize: "uglify2",
  uglify2: {
    compress: {
      unsafe: true
    },
    mangle: true
  },
})
