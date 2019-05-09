/* global angular $scope $routeParams */
var app = angular.module("YouthUnemploymentApp");

app.controller("MainCtrl", ["$scope","$http", function ($scope,$http){
    var API = "/ui/v1/youth-unemployment-stats";
    
     refresh();
            
            
            function refresh(){
                console.log("Requesting countries to <"+API+">....");
            
                $http.get(API).then(function (response){
                    console.log("Data Received:" + JSON.stringify(response.data,null,2));
                    $scope.countries = response.data;
                });
            }
            
            
            
            $scope.deleteElement = function (name) {
                
                console.log("Deleting country with name:<" + name +">");
                $http
                    .delete(API + "/" + name)
                    .then(function (response) {
                        console.log("DELETE Response: " 
                                + response.status + "" 
                                + response.data);
                                
                    refresh();
                });
            } 
    }]);