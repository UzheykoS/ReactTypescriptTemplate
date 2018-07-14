import * as path from 'path';
import commonConfig from "./webpack.common";
const HtmlWebpackPlugin = require('html-webpack-plugin');

commonConfig.entry = "./test/index.tsx";
commonConfig.output = {
    filename: "bundle.js",
    path: path.join(__dirname, 'dist')
};
commonConfig.plugins.push(
    new HtmlWebpackPlugin({
        title: "Template Test"
    })
)
commonConfig.devtool = "inline-source-map";
(commonConfig.module as any).rules.push({ //delays coverage til after tests are run, fixing transpiled source coverage error
    enforce: 'post',
    test: /\.(ts|tsx)$/,
    exclude: [
        'node_modules',
        /\.spec\.(ts|tsx)$/
    ],
    loader: 'istanbul-instrumenter-loader'
});
commonConfig.externals = {
    'jsdom': 'window',
    // 'cheerio': 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
};
commonConfig.node = {
    fs: "empty",
    child_process: 'empty'
}

module.exports = commonConfig;