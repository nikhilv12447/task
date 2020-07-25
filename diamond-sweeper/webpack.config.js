const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    entry: {
        main: "./src/index.js",
        test: "./src/test/testScript1.js"
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "build")
    },
    devServer: {
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    MiniCssExtractPlugin.loader,
                    // "style-loader",
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader'
                    },
                ],
            }
        ]
    },
    plugins: [new webpack.HotModuleReplacementPlugin(), new HtmlWebpackPlugin({ template: "./src/template.html" }), new MiniCssExtractPlugin({filename: "style.css"})]
    // plugins: [ new webpack.HotModuleReplacementPlugin(), new HtmlWebpackPlugin({ template: "./src/template.html" })]
}