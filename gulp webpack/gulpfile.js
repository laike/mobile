var gulp = require("gulp");
var concat = require('gulp-concat');
var ungly = require('gulp-uglify');
var gulp_webpack = require('gulp-webpack');
var gulp_config = require('./webpack.config.js');
var webpack = require('webpack');
var gulp_tpl = require('gulp-template');
var gulp_ejs = require('gulp-ejs');
var news = require('laike');

//首先我们建立第一个任务
gulp.task('default', function() {

});
gulp.task('laike', function() {
    //gulp.src(['*.js','!gulpfile.js']).pipe(gulp.dest('./build/js'));
    //gulp.src(['./css/*.css']).pipe(gulp.dest('./build/css'));
    gulp.src(['index.js', '!gulpfile.js'])
        .pipe(gulp_webpack(gulp_config, webpack)) //配合webpack来进行编码需要加载配置文件
        .pipe(ungly()) //压缩
        .pipe(gulp.dest('./build/js'));
});
//生成模板的操作
gulp.task('page', function() {
    gulp.src(['index.html'])
        .pipe(gulp_tpl({
            "age": 18
        }))
        .pipe(gulp.dest('./build/html'));
});
//获取新闻列表 暂时使用的是结合php的等以后我弄懂了怎么使用nodejs来进行获取api数据
gulp.task('newslist', function() {
    news.loadNews(function(body) {
        var data = {
            newslist: body.showapi_res_body.pagebean.contentlist
        };
        gulp.src(['./ejs/news.html'])
            .pipe(gulp_ejs(data))
            .pipe(gulp.dest('./build/ejs'));
    });
});

//生成js文件
gulp.task('build-js', function() {
    gulp_webpack(gulp_config, webpack)
        .pipe(gulp.dest('./build/js'));
});
//最终生成
// gulp.task('run',['build-js'],function(){
//     gulp.src(['./src/tpl/*.html'])
//     .pipe(gulp.dest('./build/html'))
// });
//读取配置文件
function entryArr() {
    var ret = {};
    var arr = [];
    var fs = require('fs');
    var mroot = __dirname + '/src/module/';
    var pluginroot = __dirname + '/src/plugins/';
    arr = fs.readdirSync(mroot);
    arr.forEach(function(item, index) {
        moudle = mroot + item + '/';
        var farr = [];
        var mfiles = fs.readdirSync(moudle);
        mfiles.forEach(function(value) {
            farr.push(moudle + value);
        });
        ret[item] = farr;
    });
    //这里我们还要读取插件文件夹如果有的话
    plugins = fs.readdirSync(pluginroot);
    var pluginArr = [];
    plugins.forEach(function(item, index) {
        var pattern = /^jquery/i;
        if (pattern.test(item)) {
            //这个属于是jQuery插 
            pluginArr.push(pluginroot + item);
            ret['jqueryplugin'] = pluginArr;
        }

    });

    return ret;
}
gulp.task('config', function() {
    console.log('read dynmic config....');
    gulp_config.entry = entryArr();

});
gulp.task('run', ['config'], function() {
    //这里我们引入我们自己写的模块 然后调用他的loadNews方法来记载新闻
    var m = require('laike');
    var n = new m.News();
    n.loadHotNews(__dirname, function() {
        webpack(gulp_config, function(err, data) {

        });
    });

});