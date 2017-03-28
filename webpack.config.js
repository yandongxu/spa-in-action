const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const server = require('./server');

const SRC_DIR = path.join(__dirname, 'src');
const DIST_DIR = path.join(__dirname, 'dist');

module.exports = {
    context: SRC_DIR,

    // webpack -d 会修改 devtool 为 '#cheap-module-eval-source-map'
    // devtool: '#cheap-module-eval-source-map',
    devtool: process.env.NODE_ENV === 'production' ? null : '#source-map',
    // devtool: '#source-map',

    entry: {
        app: './app.js',
        vendor: ['vue']
    },

    output: {
        filename: '[name].[chunkhash].js',
        path: DIST_DIR,
        publicPath: '/assets'
    },

    module: {
        loaders: [
            {
                test: /\.vue$/,
                include: [
                    SRC_DIR
                ],
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                include: [
                    SRC_DIR
                ],
                loader: 'babel-loader',
                query: {
                    presets: [
                        'es2015'
                    ]
                },
                plugins: [
                    'transform-object-assign'
                ]
            }
        ]
    },

    plugins: [
        // 文件分割
        new webpack.optimize.CommonsChunkPlugin({
            names: [
                // 'runtime',
                'vendor'
            ]
        }),

        // 自动生成 HTML 文件
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'tpl.ejs'),
            title: 'My App',
            filename: path.join(DIST_DIR, 'index.html'),
            cache: false,
            alwaysWriteToDisk: true
        }),

        // NOTE: 解决 HtmlWebpackPlugin 与 WebpackDevServer 搭配使用时, 不能正常生成 html 的问题
        new HtmlWebpackHarddiskPlugin(),

        new DashboardPlugin()
    ],

    // webpack dev server
    devServer: {
        proxy: {
            // proxy
            // 'webservices': 'http://localhost:9090/webservices'
        },
        setup: server
    }

};
