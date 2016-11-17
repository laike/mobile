'use strict';

//定义一些个常量
var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 720;
var RADIUS = 8;
var MARGIN_LEFT = 60;
var MARGIN_TOP = 30;
var RAND_COLOR_NUMS = 100;

//获取canvas元素
var canvas = document.querySelector('canvas');
//设置canvas大小
canvas.width = WINDOW_WIDTH;
canvas.height = WINDOW_HEIGHT;
//获取上下文对象
var context = canvas.getContext('2d');
context.width = WINDOW_WIDTH;
context.height = WINDOW_HEIGHT;
//这里需要一个数字的矩阵 已经默认导入了 digit.js 0-9的数字矩阵

//这里定义一个颜色函数可以随机生成随机颜色
function randomColor() {
	return 'rgba(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + Math.random().toFixed(2) + ')';
}
var randomColorsArr = [randomColor(), randomColor(), randomColor(), randomColor(), randomColor(), randomColor(), randomColor(), randomColor(), randomColor(), randomColor()];
//开始时间
var startTime = new Date(2016, 10, 17, 0, 0, 0);
//当前显示时间
var currentShowTime = 0;
//获取当前应该显示的秒速
function getCurrentShowTime() {
	var ret = new Date().getTime() - startTime.getTime(); //这里是毫秒要转换成秒
	ret = ret / 1000;
	return ret > 0 ? ret : 0;
}
var balls = []; //球的数组

currentShowTime = getCurrentShowTime();
//启动定时器每隔50毫秒进行一次重绘
setInterval(function () {
	render(context);
	update();
}, 50);
//这里需要做自适应
document.addEventListener('DOMContentLoaded', function () {});
function renderDigit(x, y, num, ctx) {
	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if (digit[num][i][j] == 1) {
				ctx.beginPath();
				// ctx.fillStyle = randomColorsArr[Math.floor(Math.random()*10)];
				ctx.fillStyle = "rgb(0,102,153)";
				ctx.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI);
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}
function drawBall(ctx, x, y, color) {
	ctx.beginPath();
	ctx.arc(x, y, RADIUS, 0, 2 * Math.PI);
	//ctx.fillStyle = randomColorsArr[Math.floor(Math.random()*10)];
	ctx.fillStyle = color;

	ctx.fill();
	ctx.closePath();
}
function render(ctx) {
	//首先要清除画布
	ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
	//获取时间的时 分秒
	var hours = parseInt(currentShowTime / 3600);
	var minutes = parseInt(currentShowTime % 3600 / 60);
	var seconds = parseInt(currentShowTime % 3600 % 60);
	//然后我们先来绘制时的矩阵字体
	renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), ctx); //绘制最高位
	renderDigit(MARGIN_LEFT + (RADIUS + 1) * 15, MARGIN_TOP, parseInt(hours % 10), ctx);
	//绘制分钟
	renderDigit(MARGIN_LEFT + (RADIUS + 1) * 39, MARGIN_TOP, parseInt(minutes / 10), ctx); //绘制最高位
	renderDigit(MARGIN_LEFT + (RADIUS + 1) * 54, MARGIN_TOP, parseInt(minutes % 10), ctx);
	//绘制秒
	renderDigit(MARGIN_LEFT + (RADIUS + 1) * 78, MARGIN_TOP, parseInt(seconds / 10), ctx); //绘制最高位
	renderDigit(MARGIN_LEFT + (RADIUS + 1) * 93, MARGIN_TOP, parseInt(seconds % 10), ctx);
	//绘制缓存的球
	for (var i = 0; i < balls.length; i++) {
		var color = balls[i].color;
		drawBall(ctx, balls[i].x, balls[i].y, color);
	}
}
function update() {
	//这里是更新小球以及时间的函数
	//计算出下一次的时间和当前时间进行对比如果秒数不相同那么更新currentShowTime
	var nextShowTime = getCurrentShowTime();

	var nextHours = parseInt(nextShowTime / 3600);
	var nextMinutes = parseInt(nextShowTime % 3600 / 60);
	var nextSeconds = parseInt(nextShowTime % 3600 % 60);

	var hours = parseInt(currentShowTime / 3600);
	var minutes = parseInt(currentShowTime % 3600 / 60);
	var seconds = parseInt(currentShowTime % 3600 % 60);

	//只需要比价秒数
	if (nextSeconds != seconds) {
		if (parseInt(hours / 10) != parseInt(nextHours / 10)) {
			addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(hours / 10));
		}
		if (parseInt(hours % 10) != parseInt(nextHours % 10)) {
			addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours / 10));
		}

		if (parseInt(minutes / 10) != parseInt(nextMinutes / 10)) {
			addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10));
		}
		if (parseInt(minutes % 10) != parseInt(nextMinutes % 10)) {
			addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10));
		}

		if (parseInt(seconds / 10) != parseInt(nextSeconds / 10)) {
			addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10));
		}
		if (parseInt(seconds % 10) != parseInt(nextSeconds % 10)) {
			addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(nextSeconds % 10));
		}

		currentShowTime = nextShowTime;
	}
	//更新小球的位置
	updateBallsPosition();
}
function updateBallsPosition() {
	for (var i = 0; i < balls.length; i++) {

		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;

		if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
			balls[i].y = WINDOW_HEIGHT - RADIUS;
			balls[i].vy = -balls[i].vy * 0.75;
		}
	}
	//优化代码对于出了屏幕的小球就进行移除
	var cnt = 0;
	for (var _i = 0; _i < balls.length; _i++) {
		if (balls[_i].x + RADIUS > 0 && balls[_i].x - RADIUS < WINDOW_WIDTH) {
			balls[cnt++] = balls[_i];
		}
	}
	while (balls.length > cnt) {
		balls.pop(); //弹出			
	}
}
function addBalls(x, y, num, ctx) {
	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if (digit[num][i][j] == 1) {
				//这里不需要填充只需要
				balls.push({
					x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
					y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
					vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
					vy: -4,
					g: 1.5 + Math.random(),
					color: randomColorsArr[Math.floor(Math.random() * 10)]
				});
			}
		}
	}
}