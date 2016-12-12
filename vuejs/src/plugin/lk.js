export default{
  install(Vue){

     //这里我们使用自定义的组件
     Vue.component('lk-text',{
       template:'<div><input type="text" v-model="username"  class="form-control"   v-on:change="usernameChange" v-bind:placeholder="placeholder" >' +
       '<p><label class="label label-danger" v-if="showErrorLabel">{{msg}}</label></p></div>',
        props:['placeholder'],
          data(){
          return{
            username:"",
            msg: '用户名不合法'
          }
        },
        computed:{
          showErrorLabel(){
            if(/\w{6,20}/.test(this.username)|| this.username==""){
              return false;
            }else{
              return true;
            }

          }
        },
        methods:{
          usernameChange(){
            this.$store.state.users.user_name = this.username;
          }
        }
     })
      Vue.prototype.checkUsername=(username)=>{
        return /\w{6,20}/.test(username)
      }
     Vue.prototype.errorLabel=null;
     Vue.prototype.hasError=false;
      //定义自己的指令
      Vue.directive('uname',{
        bind(){
          let error = Vue.extend({
            template: '<p><label class="label label-danger">{{msg}}</label></p>',
            data: function () {
              return {
                msg: '用户名不合法'
              }
            }
          })
          Vue.errorLabel=new error().$mount().$el
        },
        update(ele,binding,vnode){
             // console.log(ele,binding,vnode);
             //这种方式是把业务封装在插件中不推荐
             if(/\w{6,20}/.test(ele.value)){
                //vnode.context['showErrorLabel'] = false;
               if(Vue.hasError) {
                 ele.parentNode.removeChild(Vue.errorLabel)
                 Vue.hasError=!Vue.hasError;
               }
             }else{
               // vnode.context['showErrorLabel'] = true;
               if(!Vue.hasError)
               {
                 ele.parentNode.appendChild(Vue.errorLabel);//显示 错误label
                 Vue.hasError=!Vue.hasError;
               }
             }
             //vnode.context[binding.expression]();
        }
      })

  }

}
