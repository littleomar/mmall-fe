const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const HtmlLoader = require("html-loader");
const path = require("path");
let config = {
    entry: {
        // commons:'./src/page/common/common.js',
        index:'./src/page/index/index.js',
        login:'./src/page/login/index.js'
    },
    output:{
        path:path.resolve(__dirname, 'dist'),
        publicPath: "/dist",
        filename:'js/[name][hash:5].js'
    },
    module : {
        rules : [
            {
                test : /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test : /\.html$/,
                use: {
                    loader : 'html-loader'
                }
            }
        ]

    },
    devServer: {

    },
    plugins:[
        new webpack.ProvidePlugin({
            $ : 'jquery'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name : 'commons',
            filename: 'js/base[hash:5].js'
        }),
        new ExtractTextPlugin("css/[name][hash:5].css"),
        new HtmlPlugin({
            template : './src/index.html',
            filename : 'view/index.html',
            inject: true,
            hash :true,
            chunks : ['commons','index']
        })
    ]
};

module.exports = config;