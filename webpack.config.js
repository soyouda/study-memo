'use strict';

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = (env, options) => {
    const config = {
        entry: {
            app: ['./src/app.js']
        },
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }
        },
        module:{
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            js: 'babel-loader'
                        }
                    }
                }, {
                    test: /\.css$/,
                    use: [
                        'vue-style-loader',
                        'css-loader'
                    ]
                }, {
                    test: /\.styl(su)?$/,
                    use: [
                        'vue-style-loader',
                        'css-loader',
                        'stylus-loader'
                    ]
                }
            ]
        }
    }

    if(options.mode === 'development') {
        config.plugins = [
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                filename: './index.html',
                template: './src/index.html',
                inject: true
            }),
            new VueLoaderPlugin()
        ];

        config.devtool = 'inline-source-map';

        config.devServer = {
            hot: true,
            host: '0.0.0.0',
            watchOptions: {
                poll: true
            },
            contentBase: path.resolve(__dirname, 'dist'),
            stats: {
                color: true
            }
        };
    } else {
        config.plugins = [
            new CleanWebpackPlugin(['dist'])
        ];
    }

    return config;
};