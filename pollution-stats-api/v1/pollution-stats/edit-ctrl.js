/* global angular */
angular.module("PollutionApp").controller("EditCtrl",["$scope","$http","$routeParams", function ($scope,$http,$routeParams){
    console.log("Edit controller initialized");
    var API = "/api/v1/pollution-stats";
    console.log("ok");
    
    
    var country = $routeParams.country;
    var year = $routeParams.year;
    
    console.log("Parece que va bien");
    $http.get(API+"/"+country+"/"+year).then(function(res){
    console.log("parece que va bien definitivamente");
    $scope.updateStat = res.data;
        
    });
    

    $scope.updateStat = function (){
        var updateStat = $scope.updateStat;
        if(updateStat){
            
            updateStat.year = parseInt(updateStat.year);
            updateStat.pollution_tco2 = parseFloat(updateStat.pollution_tco2);
            updateStat.pollution_kg1000 = parseFloat(updateStat.pollution_kg1000);
            updateStat.pollution_perca = parseFloat(updateStat.pollution_perca);
            console.log("Updating a stat: "+JSON.stringify(updateStat,null,2));
            $http.put(API+"/"+updateStat.country+"/"+updateStat.year,updateStat).then(function (response){
                console.log("POST Response: " + response.status + " " + response.data);
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
        }
    };

}]);