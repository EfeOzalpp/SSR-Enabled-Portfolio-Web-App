// config-overrides.js
const path = require('path');
const postcssPrefixSelector = require('postcss-prefix-selector');
const LoadablePlugin = require('@loadable/webpack-plugin');

module.exports = function override(config, env) {
  // ---- keep your existing fallbacks
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

  const oneOfRule = config.module.rules.find((rule) => Array.isArray(rule.oneOf));

  if (oneOfRule) {
    // 1) your ?raw css loader (unchanged)
    oneOfRule.oneOf.unshift({
      test: /\.css$/i,
      resourceQuery: /raw/,
      use: 'raw-loader',
      include: path.resolve(__dirname, 'src/styles'),
    });

    // 2) add postcss prefixer after css-loader (unchanged)
    const cssRule = oneOfRule.oneOf.find(
      (rule) =>
        rule.test &&
        rule.test.toString().includes('.css') &&
        Array.isArray(rule.use)
    );

    if (cssRule) {
      const cssLoaderIndex = cssRule.use.findIndex(
        (loader) => loader.loader && loader.loader.includes('css-loader')
      );
      if (cssLoaderIndex !== -1) {
        cssRule.use.splice(cssLoaderIndex + 1, 0, {
          loader: require.resolve('postcss-loader'),
          options: {
            postcssOptions: {
              plugins: [
                postcssPrefixSelector({
                  prefix: '#efe-portfolio',
                  transform: (prefix, selector, prefixed) => {
                    if (
                      selector.startsWith('html') ||
                      selector.startsWith('body') ||
                      selector.startsWith(':root')
                    ) return selector;
                    return prefixed;
                  },
                }),
              ],
            },
          },
        });
      }
    } else {
      console.warn('[⚠️] Could not find base CSS rule to patch postcss-loader');
    }
    
    // SSR
    // 3) add Emotion babel plugin to babel-loader
    const babelRule = oneOfRule.oneOf.find(
      (rule) => rule.loader && rule.loader.includes('babel-loader')
    );
    if (babelRule && babelRule.options) {
      babelRule.options.plugins = babelRule.options.plugins || [];
      const hasEmotion = babelRule.options.plugins.some((p) => {
        const name = Array.isArray(p) ? p[0] : p;
        return typeof name === 'string' && name.includes('@emotion/babel-plugin');
      });
      if (!hasEmotion) {
        babelRule.options.plugins.push(require.resolve('@emotion/babel-plugin'));
      }
    }
  }

  // 4) emit loadable-stats.json for SSR chunk discovery
  const isDev = process.env.NODE_ENV !== 'production';
  config.plugins.push(
    new LoadablePlugin({
      filename: 'loadable-stats.json',
      writeToDisk: true,          // ← important for CRA dev server
    })
  );


  return config;
};
