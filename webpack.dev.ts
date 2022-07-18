import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import { merge } from 'webpack-merge';
import commonConfiguration from './webpack.common';

interface WebpackConfigurationWithDevServer extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const configuration: WebpackConfigurationWithDevServer = merge(commonConfiguration(false), {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    static: {
      watch: true,
    },
    historyApiFallback: true,
  },
});

export default configuration;
