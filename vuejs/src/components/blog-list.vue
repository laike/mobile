<template>
  <div class="container blog-list">
    <div class="media" v-for="info in this.$store.getters.getBlog">
      <router-link class="media-left"  :to="{ name: 'blog-detail', params: { blogid: info.ID }}">
          <img  alt="64x64" :src="info.thumbnail" class="blog-list-info-img">
      </router-link>
      <div class="media-body">
        <h4 class="media-heading">{{info.post_title}}</h4>
        {{info.excerpt}}
      </div>
    </div>
  </div>
</template>
<style>
 .blog-list{
   padding-top:60px;
 }
 .blog-list-info-img{
   width:120px;
   height:120px;
 }
</style>
<script>

    export default {

          created(){

              if(this.$store.state.blog.bloglist.length==0){

                this.$http.get('http://192.168.199.139:808/blog/Home/Public/api/?action=index&args=',{emulateJSON:true})
                .then((response) => {
                // success callback
                  this.$store.state.blog.bloglist= JSON.parse(response.body);
                }, (response) => {
                  // error callback
                });

              }

          },
          data(){
            return {
              blogListData:[]
            }
          }
    }
</script>
