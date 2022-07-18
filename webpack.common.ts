import { Configuration as WebpackConfiguration } from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const commonConfiguration = (isProduction: boolean): WebpackConfiguration => ({
  entry: {
    main: {
      import: './src/index.tsx',
      filename: `[name]${isProduction ? '.min' : ''}.js`,
    },
  },
  output: {
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/assets/images/icons/favicon.ico',
      chunks: ['main'],
      filename: 'index.html',
      inject: false,
      hash: isProduction,
      title: 'Online store',
      mode: !isProduction ? 'development' : 'production',
    }),
    new MiniCssExtractPlugin({
      filename: `[name]${isProduction ? '.min' : ''}.css`,
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/content',
          to: 'static/content',
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/images/[name][ext]',
        },
      },
      {
        test: /\.(ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/fonts/[name][ext]',
        },
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: {
                localIdentName: '[local]--[hash:base64:5]',
              },
            },
          },
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.ts', '.tsx'],
        },
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: ['...', new CssMinimizerPlugin()],
  },
});

export default commonConfiguration;
