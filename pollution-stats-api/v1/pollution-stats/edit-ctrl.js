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
    $scope.pollutionStat = res.data;
        
    });
    

    $scope.updateStat = function (){
        var pollutionStatpollutionStat = $scope.pollutionStat;
        if(pollutionStat){
            
            pollutionStat.year = parseInt(pollutionStat.year);
            pollutionStat.pollution_tco2 = parseFloat(pollutionStat.pollution_tco2);
            pollutionStat.pollution_kg1000 = parseFloat(pollutionStat.pollution_kg1000);
            pollutionStat.pollution_perca = parseFloat(pollutionStat.pollution_perca);
            console.log("Updating a stat: "+JSON.stringify(pollutionStat,null,2));
            $http.put(API+"/"+updateStat.country+"/"+pollutionStat.year,pollutionStat).then(function (response){
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