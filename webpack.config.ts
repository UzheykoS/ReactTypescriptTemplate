
const environment = process.env.NODE_ENV.trim();
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
import { Configuration } from 'webpack';
import commonConfig from "./webpack.common";
import * as path from 'path';

if (environment === "production") {
    const externals: any = {
        'react': {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react',
            umd: 'react'
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom',
            umd: 'react-dom'
        },
        'axios': {
            root: 'axios',
            commonjs2: 'axios',
            commonjs: 'axios',
            amd: 'axios',
            umd: 'axios'
        }
    };
    commonConfig.externals = externals;
    commonConfig.devtool = 'source-map';
} 
else {
    commonConfig.entry = "./test/index.tsx";
    commonConfig.output = {
        filename: "bundle.js",
        path: path.join(__dirname, 'dist')
    };
    commonConfig.devtool = 'inline-source-map';  
    commonConfig.plugins.push(
        new HtmlWebpackPlugin({
            title: "Template Test"
        })
    )
}

export default commonConfig;