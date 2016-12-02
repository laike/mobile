<template>

        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
                <button type="button" v-on:click="submit" class="btn btn-success">提交</button>
            </div>
        </div>

</template>
<style>

</style>
<script>
  export default{
       data(){
         return {

         }
       },
       methods:{
          submit(){
            //console.log(this.$parent.$data.userarea);
            this.$store.commit('showUserName');
          }
       }

  }
</script>
