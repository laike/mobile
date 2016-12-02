<template>
  <nav class="navbar  navbar-inverse navbar-fixed-top" role="navigation">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#"><img src="./../../static/images/logo.png"></a>
      </div>
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
          <li class="active"><router-link to="/blog">博客</router-link></li>
          <li><router-link to="/message">留言</router-link></li>
          <li><router-link to="/login">登录</router-link></li>
          <li><router-link to="/reg">注册</router-link></li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">前端资源 <span class="caret"></span></a>
            <ul class="dropdown-menu" role="menu">
              <li><a href="#">前端搜藏夹</a></li>
              <li><a href="#">前端web圈子</a></li>
              <li><a href="#">联系随风</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<style>
.navbar-brand img{
  height:30px;
}
@import "./../css/bootstrap.css";
@import "./../css/animate.min.css";
</style>
<script>
    export default {

    }
</script>

