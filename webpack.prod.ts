import { Configuration as WebpackConfiguration } from 'webpack';
import { merge } from 'webpack-merge';
import commonConfiguration from './webpack.common';

const configuration: WebpackConfiguration = merge(commonConfiguration(true), {
  mode: 'production',
  devtool: 'source-map',
});

export default configuration;
