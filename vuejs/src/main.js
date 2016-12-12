import Vue from 'vue'
//使用vuex 来进行状态管理
import Vuex from  'vuex';

import Mint from 'mint-ui';

//引入vuex模块
import UserModule from './store/modules/UserModule.js';

import BlogModule from './store/modules/BlogModule.js';

//引入样式
import 'mint-ui/lib/style.css'

//import userlogin from './components/user-login.vue'
//
//import bloglist from './components/blog-list.vue'
//
//import pagenav from "./components/page-nav.vue"
//
//import blogdetail from "./components/blog-detail.vue"

//通过loader 引入第三方js库
require("./third/jquery.js")

require("./third/velocity.js")

//require("./third/bootstrap.min.js")

//异步加载组件 以及代码分包功能
const   userlogin = r=>{
  require.ensure([],()=>{
    r(require('./components/user-login.vue'));
  });

}
const   bloglist = r=>{
  require.ensure([],()=>{
    r(require('./components/blog-list.vue'));
  });

}
const   pagenav = r=>{
  require.ensure([],()=>{
    r(require('./components/page-nav.vue'));
  });

}
const   blogdetail = r=>{
  require.ensure([],()=>{
    r(require('./components/blog-detail.vue'));
  });

}

//导入路由
import VueRouter from "vue-router"
//这里我们引入vue-resource
import VueResource from "vue-resource"

//这里我们引入自己写的插件
import Lk from "./plugin/lk.js"

Vue.use(Lk);//使用这个插件

Vue.use(VueRouter)//使用插件的方式引入router

Vue.use(VueResource)

//使用vuex
Vue.use(Vuex);
//使用mintui 组件库
Vue.use(Mint);

//创建vuex仓库
const vuex_store = new Vuex.Store({
    modules:{
      users:UserModule,
      blog:BlogModule
    }
})
// 2. 定义路由
const routes = [
  {path:'/',component:bloglist},
  { path: '/blog', component: bloglist ,name:'blog-list'},
  { path: '/login', component: userlogin,name:'user-login'},
  { path:'/blog/:blogid',component:blogdetail,name:'blog-detail'}
]
const routeConfig = new VueRouter({
  routes
});

let params = {
  el: '#app',
  components: { 'user-login': userlogin }
}
//这里我们需要使用到vuejs的过滤器功能
Vue.filter('unescape', function (html) {
  return html
    .replace(html ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "\'");

})
Vue.component('page-nav',pagenav);
new Vue({
  el:"#app",
  router:routeConfig,
  store:vuex_store,//使用vuex
  mounted(){

  }
})
