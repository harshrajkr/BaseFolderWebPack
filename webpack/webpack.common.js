const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
    // Entry point for the webpack
    entry: path.resolve(__dirname, '../src/script.js'),

    // Modules
    module: {
        rules: [
            // HTML
            {
                test: /\.html$/i,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true
                        }
                    }
                ],
            },

            // JS
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            },

            // SCSS
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },

            //CSS
            {
                test: /\.css$/,
                use:
                    [
                        MiniCSSExtractPlugin.loader,
                        'css-loader'
                    ]
            },

            // File Loader
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'assets/images/'
                        }
                    },
                ],
            },

            //Fonts 
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use:
                    [
                        {
                            loader: 'file-loader',
                            options:
                            {
                                outputPath: 'assets/fonts/'
                            }
                        }
                    ]
            },
        ]
    },

    // Output of the webpack 

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[contenthash].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            minify: true
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, '../static') }
            ]
        }),
        new MiniCSSExtractPlugin()
    ],
    //Development tools

    devtool: 'source-map',

    //Mode

    // mode: process.env.NODE_ENV === "production" ? "production" : "development",
}