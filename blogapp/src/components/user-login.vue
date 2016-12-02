<template>
      <div id="user" class="col-md-8 col-md-offset-2">
        <h2 class="text-center" v-if="isadmin">管理员登录</h2>
        <h2 class="text-center" v-else>用户登录</h2>
        <form class="form-horizontal" role="form">
          <user-name placeholder="输入你的用户名"  ref="uname"></user-name>
          <user-password placeholder="请输入密码"></user-password>
          <user-area ></user-area>
          <user-favs></user-favs>
          <user-code placeholder="请输入验证码"></user-code>
          <user-submit></user-submit>

        </form>
      </div>
</template>
<style>

</style>
<script>
import usersubmit from "./user/user-submit.vue"
import username from "./user/user-name.vue"
import userpassword from "./user/user-password.vue"
import usercode from "./user/user-code.vue"
import userarea from "./user/user-area.vue"
import userfavs from "./user/user-favs.vue"
export default{
   data(){
     return{
        username:'',
        userpassword:'',
        isadmin:false,
        userarea:0
     }
   },
   methods:{
      setValue:function(key,value){
         this.$data[key] = value;
      }
   },
   mounted:function(){

     this.$children.forEach(function($cc){

         $cc.$on('childChange',this.setValue);

     }.bind(this));

   },
   components:{
        'user-submit':usersubmit,
        'user-name':username,
        'user-password':userpassword,
        'user-code':usercode,
        'user-area':userarea,
        'user-favs':userfavs,
   }
}
</script>
