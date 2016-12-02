<template>
    <div>
            <div class="form-group">
                <label   class="col-sm-2 control-label">用户名:</label>
                <div class="col-sm-10">
                  <select class="form-control" v-model="selectArea" v-on:change="selectAreaChange">
                    <option v-for="area in areas" v-bind:value="area.area_id">{{area.area_text}}</option>
                  </select>
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
        selectArea:0,
        areas:[
          {area_id:0,area_text:"--请选择--"},
          {area_id:1,area_text:"北京"},
          {area_id:2,area_text:"上海"},
          {area_id:3,area_text:"广州"},
          {area_id:4,area_text:"成都"},
          {area_id:5,area_text:"重庆"},
        ]
     }
   },
   methods:{
     selectAreaChange:function(){
       this.$emit('childChange','userarea',this.selectArea)
     }
   }
}


</script>
