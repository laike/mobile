<template>
  <transition
    v-on:before-enter="beforeEnter"
    v-on:leave="leave"
    v-on:enter ="enter"

  >
    <div class="container">
      <div class="blog-article" >
        <h4> {{this.$store.state.blog.blogDetail.post_title}}<span class="label label-danger">new</span> </h4>
        <div class="well excerpt">{{this.$store.state.blog.blogDetail.excerpt}}</div>
        <div class="panel panel-default">
          <div class="panel-body">

            <div v-html="this.$store.state.blog.blogDetail.post_content"></div>
            <button type="button" class="btn btn-success" v-on:click="submitAgree">{{this.$store.state.blog.blogDetail.like}}点赞</button>
          </div>
        </div>

      </div>
      <div class="blog-comments" v-for="comment in this.$store.state.blog.blogDetail.detailComments">
        <ul class="media-list">
          <li class="media well">
            <a class="media-left" href="#">
              <img :src="comment.qq" class="img-circle">
            </a>
            <div class="media-body">
              <h4 class="media-heading ">{{comment.user_name}}</h4>
              <p v-html="comment.content"></p>
              <!-- 回复列表-->
              <div class="media well" v-for="subcomment in comment.subcommentlist">
                <a class="media-left" href="#">
                  <img :src="subcomment.qq" class="img-circle">
                </a>
                <div class="media-body">
                  <h4 class="media-heading ">{{subcomment.user_name}}</h4>
                  <p v-html="subcomment.content"></p>
                </div>
              </div>

            </div>
          </li>
        </ul>
      </div>
    </div>
    </transition>
</template>
<style>
  @import "./../css/monokai.min.css"
  .blog-article{
    padding-top:60px;
  }
  .blog-article img{
    max-width:100%;
  }
  .excerpt{
   max-height:100px;
   overflow:hidden;
   text-overflow:ellipsis;
  }
</style>
<script>

    export default {


          created(){
              this.$http.get('http://192.168.199.139:808/blog/Blog/id/?ajax=1&id='+this.$route.params.blogid)
              .then((response) => {
              // success callback
                let data = JSON.parse(response.body);

                this.$store.state.blog.blogDetail= data.w_data[0];

                data.comment_list.forEach(function(item,i){
                  item.qq = 'http://q1.qlogo.cn/g?b=qq&nk='+item.qq+'&s=100'
                  if(item.subcommentlist.length > 0){
                    item.subcommentlist.forEach(function(v){
                    v.qq  = 'http://q1.qlogo.cn/g?b=qq&nk='+v.qq+'&s=100'
                    });
                  }

                });
                this.$store.state.blog.blogDetail.detailComments= data.comment_list;
              }, (response) => {
                // error callback
              });
          },
          data(){
            return {
              detailData:[],
              detailComments:[]
            }
          },
          mounted(){

          },
          methods:{
            beforeEnter(ele){
              ele.style.opacity = 0;
            },
            leave(ele,done){
               Velocity(ele,{
                opacity:0,
                translateX:400,
               },{duration:800,complete:done})
            },
            enter(ele,done){
               Velocity(ele,{
                 opacity:1,
               },{
                 duration:3000,
                 complete:done
               });
            },
            submitAgree(){
               this.$store.dispatch('agree',this.$route.params.blogid);
            }

          },


    }
</script>
