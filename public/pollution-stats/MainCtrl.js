 /* global angular $scope*/
                     
    var app = angular.module("pollution-stats");
    
    console.log("Aplicación iniciada");
    app.controller("MainCtrl",["$scope", function($scope,$http){
        console.log("Modular MainCtrl iniciado");
        $scope.url = "/api/v1/pollution-stats";
       
        $scope.send = function(){
            $http.get($scope.url).then(function(response){
            $scope.data = JSON.stringify(response.data,null,2); 
        });
                        
        }
    }])
