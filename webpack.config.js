const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
console.log('IS DEV', isDev);
const isProd = !isDev;

const optimization = () => {
  const config = {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    },
  }

  if (isProd) {
    config.minimizer = [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ]
  }

  return config
}

const map = () => {
  if (isDev) {
    return 'eval-cheap-module-source-map'
  }
}

const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env'],
      plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-transform-runtime'
      ]
    },
  }]

  return loaders
}

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    landingPage: './pages/landing-page/landing-page.js',
    searchRoom: './pages/search-room/search-room.js',
    roomDetails: './pages/room-details/room-details.js',
    registration: './pages/registration/registration.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: optimization(),
  devServer: {
    port: 4200,
    static: path.join(__dirname, 'src'),
    hot: isDev
  },

  devtool: map(),

  plugins: [
    new HtmlWebpackPlugin({
      template: './pages/landing-page/landing-page.pug',
      chunks: ['landingPage'],
      filename: 'landing-page.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new HtmlWebpackPlugin({
      template: './pages/search-room/search-room.pug',
      chunks: ['searchRoom'],
      filename: 'search-room.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new HtmlWebpackPlugin({
      template: './pages/room-details/room-details.pug',
      chunks: ['roomDetails'],
      filename: 'room-details.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
     new HtmlWebpackPlugin({
      template: './pages/registration/registration.pug',
      chunks: ['registration'],
      filename: 'registration.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      // chunkFilename: "[id].css",
    }),
    new CleanWebpackPlugin(),
    new ESLintPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "assets/images", to: "assets/images" },
        { from: "data.json", to: "" },
        { from: "reviews.json", to: "" },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/images/[hash][ext][query]'
        }
      },
      {
        test: /\.svg/,
        type: 'asset/inline'
      },
      {
        test: /\.(css|s[ac]ss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(woff2|woff|ttf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/fonts/[hash][ext][query]'
        }
      },
      {
        test: /\.svg$/,
        include: [
          path.resolve(__dirname, 'src/assets/fonts/'),
        ],
        type: 'asset/resource',
        generator: {
          filename: 'static/fonts/[hash][ext][query]'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders()
      },
      {
        test: require.resolve('jquery'),
        use: [
          {
            loader: "expose-loader",
            options: {
              exposes: ["$", "jQuery"]
            }
          }
        ]
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
        pretty: false
        }
      },
    ]
  }
}

module.exports = config;
