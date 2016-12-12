/**
 * Created by Administrator on 2016/12/5.
 */
import Vue from 'vue'

import { Indicator } from 'mint-ui';

export default{
  state:{
    bloglist:[],
    blogDetail:{}
  },
  mutations:{
    setAgree(state,likeNum){

      state.blogDetail.like = likeNum;
    }
  },
  actions:{
    agree(context,blogid){
      Indicator.open('操作中...');
      Vue.http.get('http://192.168.199.139:808/blog/blog/like/?ajax=1&id='+blogid)
        .then((response) => {
          // success callback
          let data = JSON.parse(response.body);
          context.commit('setAgree',data.like);
          Indicator.close();
        });
    }
  },
  getters:{
    getBlog(state){
      return state.bloglist.filter(function(blog){
        return blog.post_status == 'publish'
      })
    }
  }
}
