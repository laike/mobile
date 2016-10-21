//定义一个打印函数
function print(msg){
  console.log(msg);
}

//定义一个堆栈类使用js 进行实现
function Stack(){
  this.top=0;
  this.dataStore=[];
}
//定义相关方法继承在原型上面
Stack.prototype={
  push:function(data){
      this.dataStore[this.top++] = data;
  },
  pop:function(){
      return this.dataStore[--this.top];
  },
  peek:function(){
      return this.dataStore[this.top-1];
  },
  length:function(){
    return this.top;
  },
  clear:function(){
    this.top = 0;
  }

};
var s = new Stack();

s.push('david');
s.push('raymond');
s.push('bryan');
print('lenght:'+s.length());
print(s.peek());
var popped = s.pop();
print('the popped element is : '+popped);
s.push('cynthia');
print(s.peek());
s.clear();
print('length :'+s.length());
print(s.peek());
s.push('clayton');
print(s.peek());

//输出
// lenght:3
// stack.js:3 bryan
// stack.js:3 the popped element is : bryan
// stack.js:3 cynthia
// stack.js:3 length :0
// stack.js:3 undefined
// stack.js:3 clayton
