
//这里我们需要定义一个列表类

function List(){
  //首先定义一些个属性
  this.listSize = 0;
  this.pos = 0;
  this.dataStore=[];

}
List.prototype={
  append:function(data){
      this.dataStore[this.listSize++]=data;
  },
  remove:function(element){
    var foundAt = this.find(element);
    if(foundAt>-1){
      this.dataStore.splice(foundAt,1);
      --this.listSize;
      return true;
    }
    return false;
  },
  find:function(element){
     for (var i = 0; i < this.dataStore.length; i++) {
       if(element == this.dataStore[i]){
         return i;A
       }
     }
     return -1;
  },
  length:function(){
    return this.listSize;
  },
  toString:function(){
    return this.dataStore;
  },
  insert:function(element,after){
    var afterpos = this.find(after);
    if(afterpos >-1){
      this.dataStore.splice(afterpos+1,0,element);
      ++this.listSize;
      return true;
    }
    return false;
  },
  clear:function(){
    delete this.dataStore;
    this.pos = this.listSize= 0;
    this.dataStore = [];
  },
  contains:function(element){
    for (var i = 0; i < this.dataStore.length; i++) {
      if(element === this.dataStore[i]){
        return true;
      }
    }
    return false;
  },
  front:function(){
    this.pos = 0;
  },
  end:function(){
    this.pos = this.listSize-1;
  },
  prev:function(){
    if(this.pos > 0){
      --this.pos;
    }
  },
  next:function(){
    if(this.pos<this.listSize-1){
      ++this.pos;
    }
  },
  curPos:function(){
    return this.pos;
  },
  moveTo:function(position){
    this.pos = position;
  },
  getElement:function(){
    return this.dataStore[this.pos];
  }

};

var names = new List();
names.append('laike');
names.append('clayton');
names.append('raymond');
names.append('jenifer');
names.append('bryan');
names.append('danny');

names.front();
console.log(names.getElement());

names.next();
console.log(names.getElement());
names.next();
names.prev();
console.log(names.getElement());

console.log(names.contains('laike'));

names.remove('laike');
console.log(names.contains('laike'));
names.insert('laike','jenifer');
console.log(names.contains('laike'));
console.log(names.toString());
