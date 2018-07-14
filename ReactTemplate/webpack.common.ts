import * as path from 'path';
import { Configuration, ExternalsObjectElement, NamedModulesPlugin, IgnorePlugin, ProvidePlugin, DefinePlugin } from 'webpack';

const config: Configuration = {
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "index.js",
        publicPath: "/dist/",
        libraryTarget: "umd"
    },
    target: 'web',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.json$/, 
                use: ['json-loader']
            },
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                use: "source-map-loader"
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'stage-0'],
                            compact: false
                        }
                    },
                    {
                        loader: 'ts-loader'
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".json"]
    },
    plugins: [
        new DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NOVE_ENV)
            }
        }),
        new IgnorePlugin(/^\.\/locale/, /moment/)
    ]
}

export default config;