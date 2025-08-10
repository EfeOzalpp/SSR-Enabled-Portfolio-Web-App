// webpack.server.js
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = (_env, argv) => {
  const mode = argv.mode || 'production';

  return {
    name: 'server',
    mode,
    target: 'node',
    entry: path.resolve(__dirname, 'src/server/index.jsx'),
    output: {
      path: path.resolve(__dirname, 'build-ssr'), // ← matches your scripts
      filename: 'server.js',
      libraryTarget: 'commonjs2',
      clean: true,
    },

    // Don’t bundle node_modules (keep runtime small), but allow a few libs to be bundled if imported.
    externals: [
      nodeExternals({
        allowlist: [
          /^@loadable\//,
          /^@emotion\//,
          /^react-router-dom/,   // DOM bindings
          /^react-router\//,     // covers react-router/server
        ],
      }),
    ],

    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },

    module: {
      rules: [
        // Ignore plain CSS on the server — use Emotion for SSR styles.
        { test: /\.css$/i, use: 'null-loader' },

        // Static assets imported from components rendered on the server.
        // Emit URLs that mirror CRA’s structure so tags point to /static/media/...
        {
          test: /\.(png|jpe?g|gif|svg|ico|webp|avif|bmp|woff2?|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'static/media/[name].[contenthash:8][ext][query]',
          },
        },

        // Transpile server code. We keep this lean and explicit.
        {
          test: /\.[jt]sx?$/i,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              configFile: false,
              presets: [
                [require.resolve('@babel/preset-env'), { targets: { node: 'current' } }],
                require.resolve('@babel/preset-react'),
                require.resolve('@babel/preset-typescript'),
              ],
              plugins: [
                require.resolve('@loadable/babel-plugin'),
                require.resolve('@emotion/babel-plugin'),
              ],
            },
          },
        },
      ],
    },

    // Helpful in local dev; fine to ship for this local-only server bundle too.
    devtool: 'source-map',

    // Keep Node globals behaving like Node.
    node: {
      __dirname: false,
      __filename: false,
    },

    // Reduce noise a bit.
    stats: 'minimal',
  };
};
