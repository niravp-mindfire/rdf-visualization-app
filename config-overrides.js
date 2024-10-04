const webpack = require('webpack');

module.exports = function override(config, env) {
  // Add fallbacks for Node.js core modules
  config.resolve.fallback = {
    assert: require.resolve('assert/'),
    buffer: require.resolve('buffer/'),
    crypto: require.resolve('crypto-browserify'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    net: false,
    tls: false,
    path: require.resolve('path-browserify'),
    zlib: require.resolve('browserify-zlib'),
    fs: require.resolve('browserify-fs'),
    stream: require.resolve('stream-browserify'),
    url: require.resolve('url/'),
    querystring: require.resolve('querystring-es3'),
  };

  // Add process and Buffer as globals
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    })
  );

  return config;
};
