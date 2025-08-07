const path = require('path');
const postcssPrefixSelector = require('postcss-prefix-selector');

module.exports = function override(config, env) {
  // Extend fallback (your existing code)
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
    // ✅ 1. Inject raw-loader for ?raw
    oneOfRule.oneOf.unshift({
      test: /\.css$/i,
      resourceQuery: /raw/,
      use: 'raw-loader',
      include: path.resolve(__dirname, 'src/styles'),
    });

    // ✅ 2. Modify existing .css rule to add postcss-loader only for FrontPage styles
    const cssRule = oneOfRule.oneOf.find(
      (rule) =>
        rule.test &&
        rule.test.toString().includes('.css') &&
        Array.isArray(rule.use)
    );

    if (cssRule) {
      // Insert postcss-loader *after* css-loader
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
                  transform: (prefix, selector, prefixedSelector) => {
                    if (
                      selector.startsWith('html') ||
                      selector.startsWith('body') ||
                      selector.startsWith(':root')
                    ) {
                      return selector;
                    }
                    return prefixedSelector;
                  },
                }),
              ],
            },
          },
        });
      }
    } else {
      console.warn('[⚠️ Webpack config issue] Could not find base CSS rule to patch postcss-loader');
    }
  }

  return config;
};
