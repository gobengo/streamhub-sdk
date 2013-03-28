({
  paths: {
    jquery: 'lib/zepto/zepto.min',
    base64: 'lib/base64/base64',
    'streamhub-sdk': 'src'
  },
  baseUrl: '.',
  name: "src/main",
  //exclude: ["jquery"],
  out: "streamhub-sdk.built.js",
  optimize: "uglify2",
  uglify2: {
    compress: {
      unsafe: true
    },
    mangle: true
  },
})
