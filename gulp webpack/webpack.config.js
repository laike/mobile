/**
 * Created by laike on 2016/9/16.
 */
var HtmlWebpackPlugin = require('html-webpack-plugin');
//初始化分离css样式插件
var ExtractTextPlugin = require("extract-text-webpack-plugin");
//这里使用webpack的一个插件使得$变为全局变量
var webpack = require('webpack');




module.exports = {
    // entry:[//入口文件
    //     __dirname+'/src/main.js',
    //     __dirname+'/src/login.js',
    //     __dirname+'/src/reg.js'
    // ],
    entry: {},
    output: {
        path: __dirname + '/build/js', //输出的路径
        filename: '[name].js' //输出的js文件名
    },
    externals: {
        'jquery': 'jQuery'
    },
    module: {
        // loaders: [{
        //     test: /\.css$/,
        //     loader: 'style|css'
        // }]
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
            { test: /\.(.include|json)$/, loader: 'raw' },
            { test: /\.(.js)$/, loader: 'babel' }
        ]
    },
    plugins: [ //插件参数列表

        new HtmlWebpackPlugin({
            filename: __dirname + '/build/html/login_build.html',
            template: __dirname + '/src/tpl/login.html',
            hash: true,
            inject: 'body',
            chunk: ['main', 'user'],
            title: '登录页面'
        }),
        new HtmlWebpackPlugin({
            filename: __dirname + '/build/html/index_build.html',
            template: __dirname + '/src/tpl/index.html',
            hash: true,
            inject: 'body',
            chunk: ['main'],
            title: '首页'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        //使用webpack的优化插件
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'user',
        //     filename: 'user.js'
        // }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common', //这里不需要.js后缀'
            chunks: ['main', 'user', 'index'] //需要依赖的入口文件
        }),
        //这里我们还要整合一下类似于jquery的插件那种
        new webpack.optimize.CommonsChunkPlugin({
            name: 'jqueryplugin', //这里不需要.js后缀'
            filename: 'jqp.js' //需要依赖的入口文件
        }),
        new ExtractTextPlugin("[name].css")

    ]
}