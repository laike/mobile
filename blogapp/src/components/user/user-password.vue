<template>
    <div>
            <div class="form-group">
                <label   class="col-sm-2 control-label">密码:</label>
                <div class="col-sm-10">
                    <input type="password" v-model="password"
                           class="form-control"   v-bind:placeholder="placeholder">
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
        password:""
     }
   }
}


</script>
