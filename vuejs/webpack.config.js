var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack=require("webpack");
module.exports =
{
    entry:
    {
       "index":__dirname+'/src/jssrc/index.js',
      },
    output: {
        path: __dirname+'/src/webapp/js',  //输出文件夹
        filename:'[name].js'   //最终打包生成的文件名(just 文件名，不带路径的哦)
    },
   resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    externals: {

    },
    module:{
        loaders:[
            {test:/\.js$/,loader:"babel",query:{compact:true}},
            {test:/\.vue$/,loader:"vue"},
            {test:/\.css$/,loader:"css"},
            {test:/\.jpg|png|gif|jpeg$/,loader:"file"}
            //这里肯定要加入n个loader 譬如vue-loader、babel-loader、css-loader等等
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename: __dirname+'/src/webapp/index.html',//目标文件
            template: __dirname+'/src/tpl/index.html',//模板文件
            inject:'body',
            hash:true,
            chunks:["index"]
        })

    ]

}
