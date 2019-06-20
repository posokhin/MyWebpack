const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const CopyPlugin = require('copy-webpack-plugin');



module.exports = {
    entry: [
        './src/js/main.js',
    ],
    output: {
        filename: './js/main.js',
    },
    devServer: {
        overlay: true
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, '/src/js'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: 'env'
                    }
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
            },
            {
                test: /\.pug$/,
                use: "pug-loader"
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/',
                            publicPath: 'img/'
                        },
                    },
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'style.css',
        }),
        new HtmlWebpackPlugin({
            template: './src/pug/index.pug'
        }),
        new CopyPlugin([
            { from: './src/img', to: 'img' },
            { from: './src/fonts', to: 'fonts' },
        ]),
    ]
}