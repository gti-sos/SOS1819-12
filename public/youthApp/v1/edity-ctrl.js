/* global angular */
angular.module("SOS181912App").controller("EdityCtrl",["$scope","$http","$routeParams","$location", function ($scope,$http,$routeParams,$location){

    console.log("Edit controller initialized");
    var API = "/api/v1/youth-unemployment-stats";
    console.log("ok");
    
    
    var country = $routeParams.country;
    var year = $routeParams.year;
    
    console.log("Requesting contact <"+API+"/"+country+"/"+year+">...");
    $http.get(API+"/"+country+"/"+year).then(function(res){
    console.log("parece que va bien definitivamente");
    $scope.youth_unemployment_stats = res.data;
        
    });
    

    $scope.u2Stat = function (){
        var youth_unemployment_stats = $scope.youth_unemployment_stats;
        if(youth_unemployment_stats){
            
            youth_unemployment_stats.year = parseInt(youth_unemployment_stats.year);
            youth_unemployment_stats.youth_unemployment = parseFloat(youth_unemployment_stats.youth_unemployment);
            youth_unemployment_stats.youth_unemployment_man = parseFloat(youth_unemployment_stats.youth_unemployment_man);
            youth_unemployment_stats.youth_unemployment_woman = parseFloat(youth_unemployment_stats.youth_unemployment_woman);
            console.log("Updating a stat: "+JSON.stringify(youth_unemployment_stats,null,2));
            $http.put(API+"/"+youth_unemployment_stats.country+"/"+youth_unemployment_stats.year,youth_unemployment_stats).then(function (response){
                console.log("PUT Response: " + response.status + " " + response.data);
                $scope.status = response.status + " " + response.statusText;
                if(response.status==200){
                    alert("Elemento editado con éxito");
                }
            }).catch(function(response2){
                $scope.status = response2.status + " " + response2.statusText;
                if(response2.status==404){
                    alert("Elemento no editado: El elemento no existe");
                }else if(response2.status==400){
                    alert("Elemento no editado: Revise el si todos los campos están completados y el formato de estos");
                }
            });
            $location.path("/");
        }
        
    };

}]);