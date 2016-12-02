<template>
    <div>
            <div class="form-group">
                <label   class="col-sm-2 control-label">您的爱好:</label>
                <div class="col-sm-10">
                  <input type="text"
                         class="form-control"   v-model="inputText" v-bind:placeholder="placeholder">
                  <div class="table-responsive">
                    <table class="table table-bordered" v-if="showTable()">
                      <thead>
                      <tr>
                        <th>类别名称</th>
                        <th>类别标签</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for=" fav in getFavs">
                        <td >{{fav.class1}}</td>
                        <td>
                          <a href="#" v-for="code in filterClass2(fav.class2)" class="pdl-10">{{code}}</a>
                        </td>
                      </tr>


                      </tbody>
                    </table>
                  </div>
                </div>
            </div>

        </div>
</template>
<style>
.pdl-10{
  padding-left:5px;
}
</style>
<script>

export default{
   props:['placeholder'],
   data(){
     return{
        inputText:"",
        favs:[
          {class1:'web前端开发',class2:["web","js","css","css3","canvas","webrtc"]},
          {class1:'php开发',class2:["php","mysql","sql","memecache","radius"]},
          {class1:'java开发',class2:["java","oracle","sqlserver"]},
          {class1:'nodejs开发',class2:["nodejs","crample","curl"]},
          {class1:'linux服务器',class2:["linux","shell",'cmd',""]},

        ]
     }
   },
   methods:{
     showTable:function(){
       return this.inputText != "" ? true : false;
     },
     filterClass2:function(class2){
             return class2.filter(function(c2){

                      return c2.indexOf(this.inputText) >= 0;

             }.bind(this));
     },
     selectAreaChange:function(){
       this.$emit('childChange','userarea',this.selectArea)
     }
   },
   //计算属性
   computed:{
     getFavs(){
          return this.favs.filter(function(v){
             //这里要进行判断class2
             if(v.class2.filter(function(c2){

                      return c2.indexOf(this.inputText) >= 0;

             }.bind(this)).length>0){
               return true;
             }else{
               return false;
             }
          }.bind(this));
     }
   }
}


</script>
