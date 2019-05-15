/* global angular */
angular.module("SOS181912App").controller("EditpCtrl",["$scope","$http","$routeParams","$location", function ($scope,$http,$routeParams,$location){
    console.log("Edit controller initialized");
    var API = "/api/v1/pollution-stats";
    console.log("ok");
    
    
    var country = $routeParams.country;
    var year = $routeParams.year;
    
    console.log("Parece que va bien");
    $http.get(API+"/"+country+"/"+year).then(function(res){
    console.log("parece que va bien definitivamente");
    $scope.updateStat21 = res.data;
        
    });
    

    $scope.uS2tat = function (){
        var updateStat2 = $scope.updateStat2;
        if(updateStat2){
            updateStat2.year = parseInt(updateStat2.year);
            updateStat2.pollution_tco2 = parseFloat(updateStat2.pollution_tco2);
            updateStat2.pollution_kg1000 = parseFloat(updateStat2.pollution_kg1000);
            updateStat2.pollution_perca = parseFloat(updateStat2.pollution_perca);
            console.log("Updating a stat: "+JSON.stringify(updateStat2,null,2));
            $http.put(API+"/"+updateStat2.country+"/"+updateStat2.year,updateStat2).then(function (response){
                console.log("PUT Response: " + response.status + " " + response.data);
                $scope.status = response.status + " " + response.statusText;
                if(response.status==200){
                    alert("Elemento editado con éxito");
                    $location.path("/ui/v1/pollution-stats");
                }
            }).catch(function(response2){
                $scope.status = response2.status + " " + response2.statusText;
                if(response2.status==404){
                    alert("Elemento no editado: El elemento no existe");
                }else if(response2.status==400){
                    alert("Elemento no editado: Revise el si todos los campos están completados y el formato de estos");
                }
            });
            
        }
    };

}]);