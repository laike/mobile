//结构
//let [sex,username,age] = ['man','laike',25];
//延展操作符
let [sex,...me] = ['man','laike',25];
let showName = ([username,age])=>`我的名字：${username} 年龄是 : ${age}`;

//console.log(me.length);
//alert(showName(me));

//这里我们要去了解线程 携程

 function *show(){
    let [username,sex] = ['laike','Man'];
    yield username;
    yield sex;
}
var sh = show();
console.log(sh.next().value);
console.log(sh.next().value);
