var app = angular.module('myApp', []);
    
    app.config(function($interpolateProvider){
        $interpolateProvider.startSymbol('{{').endSymbol('}}');
    });

   
   
    //创建加载invite数据的服务 ---------没有使用
    app.factory('inviteService',['$http',function($scope, $rootsScope, $http){
       var doGet = function(type, current){
          var programs = [];
          $http.get("/invite-panel.json").success(function(data){
                
           });
           
           return programs;
        } 
        
        return {
            programs:function(){
                return doGet();
            }
        }
        
    }]);
    
    //创建invite对象
    
    app.factory('invitee',['$rootScope',function($rootScope){
        var invitee = {
          
          invitees : [], //被邀请的对象组成的数组
          current : false,//标记当前对象是否已被邀请
          id: -1, //记录id值
          name: null,
          
          doInvite: function(invitee){
              
              if(invitee.current){
                  
                  //循环便利函数,检测要删除的元素在invitees中的位置
                    var rander = function(array){
                        var item;
                        angular.forEach(array, function(element,index) {
                        
                            if(element.id == invitee.id){
                            item = index;
                            }
                        });
                        
                        return item;
                    }
                    invitee.current = false;
                    this.invitees.splice(rander(this.invitees), 1);
                  
              }else{
                  
                   invitee.current = true;
                   this.invitees.push(invitee);
              }
          },
          
          /**不使用的方法
          getInvite: function(invitee){
            //将邀请人添加在invitees中
       
              
              invitee.current = true;
              this.invitees.push(invitee);
             
              
          },
          
          cancleInvite :function(invitee){
              
              //循环便利函数,检测要删除的元素在invitees中的位置
              var rander = function(array){
                 var item;
                  angular.forEach(array, function(element,index) {
                   
                    if(element.id == invitee.id){
                       item = index;
                    }
                  });
                  
                  return item;
              }
              invitee.current = false;
              this.invitees.splice(rander(this.invitees), 1);
            
            
          }
           */
        };
        
        return invitee;
    }]);
   
    
     // Parent scope
     app.controller('MyController',['$rootScope','$scope','$http','invitee', function($rootScope,$scope, $http, invitee){
         
         $scope.invitee = invitee;
         //对invitees数组进行监控,如果改变则更新页面
         $scope.$watch('invitee.invitees.length', function(newVal) {
            
            $scope.invitees = invitee.invitees;
            
          });
         
         //把json数据全部取出来
        $http.get("/invite_panel.json").success(function(data, status) {
            // $scope.programs = data.list.story;
            $scope.programs = [];
            
            //填充邀请人名单
            angular.forEach(data.invited, function(data) {
            
            data.current = true;
            
            $scope.programs.push(data);
            console.log(data.avatarUrl);
            invitee.invitees.push(data);
            
            
            });
            
            //填充推荐名单
            angular.forEach(data.recommended, function(data) {
            
             data.current = false;
             
            $scope.programs.push(data);    
            
            });
        }).error(function(data, status) {
        });
    }]);