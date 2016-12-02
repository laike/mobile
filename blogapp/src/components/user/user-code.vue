<template>
    <div>
            <div class="form-group">
                <label   class="col-sm-2 control-label">验证码:</label>
                <div class="col-sm-10">
                    <input type="text" v-model="code"
                           class="form-control"   v-bind:placeholder="placeholder">
                </div>
            </div>
          <div class="form-group">
            <label   class="col-sm-2 control-label"></label>
            <div class="col-sm-10">
              <img src="http://laijiadayuan.com/Home/Public/code.html" alt="点击切换验证码">
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
        code:""
     }
   }
}


</script>
