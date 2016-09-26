class Hello{
    //注意静态方法中无法访问this
    static getInstance(){
		return 'static function';
	}
	constructor(msg='hello world!'){
         this.msg = msg;
	}
	say(){
		console.log(this.msg);
	}
	get message(){
		return this.msg;
	}
	set message(str){
		this.msg = str;
	}

}

var hello = new Hello();
hello.say();
hello.message = 'go go go es6!';
console.log(hello.message);
//console.log(Hello.getInstance());

class User{
	constructor(_name){
		this.name = _name;
	}
	say(){
		console.log(this.name);
	}
	//这里我们可以使用static 来实现类似User.Student的继承
	static get Student(){
	   return class extends User{
		   constructor(_name){
			   super(_name);
		   }
		   say(){
			   console.log('我是学生！');
		   }
	   }
	}
	static get Teacher(){
		return class extends User{
			constructor(_name){
				super(_name);
			}
			say(){
				console.log('我是老师！');
			}
		}
	}
}

class Student extends User.Student{

	constructor(_name){

		 super(_name);

	 }
}

let std = new Student('laike');
std.say();