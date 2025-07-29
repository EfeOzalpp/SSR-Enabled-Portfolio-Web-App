const path = require('path');

module.exports = function override(config, env) {
  config.resolve = {
    ...config.resolve,
    fallback: {
      ...config.resolve?.fallback,
      fs: false,
      path: false,
      assert: false,
      buffer: false,
      child_process: false,
      crypto: false,
      dns: false,
      http: false,
      https: false,
      net: false,
      os: false,
      stream: false,
      tls: false,
      url: false,
      util: false,
      zlib: false,
    },
  };

  return config;
};
