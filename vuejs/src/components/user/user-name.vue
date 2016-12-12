<template>
    <div>
            <div class="form-group">
                <label   class="col-sm-2 control-label">用户名:</label>
                <div class="col-sm-10">
                    <lk-text placeholder="请输入用户名"></lk-text>
                </div>
            </div>
        </div>
</template>
<style>

</style>
<script>

export default{
   props:['placeholder'],
   data(){
     return{
        username:"",
        showErrorLabel:false
     }
   },
   methods:{
     showLabel(){
       if(this.checkUsername(this.username)){
          this.showErrorLabel = false;
       }else{
         this.showErrorLabel = true;
       }
     },
     usernameChange:function(){
       //this.$emit('childChange','username',this.username)
       console.log();
       this.$store.state.users.user_name = this.username;
     }
   },
   mounted(){

   }
}

</script>
