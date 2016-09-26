var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry:[
        './src/es6-1.js'//代表入口(总)文件 ，可以写多个。
    ],
    output: {
        path: './build/',  //输出文件夹
        filename:'es6-1-webpack.js'   //最终打包生成的文件名
    },
    devServer:{
        historyApiFallback:true,
        hot:true,
        inline:true,
        progress:true,
        port:9090//此端口可以自定义
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'es2015test.html',
            filename: './../index-test.html',
            inject:true,    //允许插件修改哪些内容，包括head与body
            hash:true,    //为静态资源生成hash值
            minify:{    //压缩HTML文件
                removeComments:true,    //移除HTML中的注释
                collapseWhitespace:true    //删除空白符与换行符
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.(js)|(jsx)$/,   //是一个正则，代表js或者jsx后缀的文件要使用 下面的loader
                loader: 'babel',
                query:{
                    presets:['es2015','react']
                }
            },
            {
                test: /\.css$/,
                loaders: ['style','css'],
            },
            { test: /\.(png)|(jpg)$/, loader: "url?limit=50000" }


        ]
    }
}
