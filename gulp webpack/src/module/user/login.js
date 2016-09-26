$('#login').click(function() {
    alert('登陆');
});

"use strict"
//这里我们使用babel来进行学习哈  非常重要哈 么么哒 
// let username = 'laike';
// module.exports = username;
let m = require('laike');
let entity = new m.UserEntity();
entity.UserName = 'laikedouD';
let service = new m.UserService(entity);
console.log(service._UserName);