"use strict";
//这里我们使用babel来进行学习哈  非常重要哈 么么哒 
// let username = 'laike';
// module.exports = username;

var m = require('laike');
var entity = new m.UserEntity();
entity.UserName = 'laikedouD';
var service = new m.UserService(entity);
console.log(service._UserName);
