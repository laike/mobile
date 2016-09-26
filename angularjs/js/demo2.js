/**
 * Created by Administrator on 2016/7/13.
 */
var userInfoModule = angular.module('UserInfoModule',[]);
userInfoModule.controller('UserInfoCtrl',['$scope',function($scope){
    $scope.userinfo={
        email:'925462390@qq.com',
        password:'54641654641',
        autologin:true
    };
    $scope.getFormData=function(){
        console.log($scope.userinfo);
    }
    $scope.setFormData=function(){
        $scope.userinfo={
            email:'425353758@qq.com',
            password:'1234535',
            autologin:false
        };
    }
    $scope.resetFormData=function(){
        $scope.userinfo={
            email:'925462390@qq.com',
            password:'54641654641',
            autologin:true
        };
    }
}]);