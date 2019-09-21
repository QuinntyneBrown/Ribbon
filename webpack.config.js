const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode:"development",
    entry: "./Views/Site.ts",
    output: {
        path: path.resolve(__dirname, "wwwroot/js"),
        filename: "[name].js",
        publicPath: "/"
    },
    resolve: {
        extensions: [".ts",".less"]
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            strictMath: true,
                            noIeCompat: true,
                        },
                    }
                ],
            }
        ]
    },
    plugins: [
    ]
};