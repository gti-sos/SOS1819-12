/* global angular */
angular.module("SOS181912App").controller("EditLESCtrl",["$scope","$http","$routeParams","$location", function ($scope,$http,$routeParams,$location){
    console.log("Edit LES controller initialized");
    var API = "/api/v1/life-expectancy-stats";
    
    $scope.status = undefined;
    
    var country = $routeParams.country;
    var year = $routeParams.year;
    
    console.log("Requesting life expectancy stats to <"+API+">...");
    $http.get(API+"/"+country+"/"+year).then(function (response){
        $scope.stat1 = response.data;
    });
    
    $scope.put2Stat = function (country,year){
        var updaStat = $scope.stat1;
        updaStat.year = parseInt(updaStat.year);
        updaStat.expectancy_woman = parseFloat(updaStat.expectancy_woman);
        updaStat.expectancy_man = parseFloat(updaStat.expectancy_man);
        updaStat.expectancy = parseFloat(updaStat.expectancy);
        console.log("Updating stat with country: "+country+" and year: "+year);
        $http.put(API+"/"+country+"/"+year,updaStat).then(function (response){
            console.log("PUT response: "+response.status+" "+response.data);
            $scope.status = response.status + " " + response.statusText;
            if(response.status==200){
                alert("Elemento editado con éxito");
                $location.path("#!/ui/v1/life-expectancy-stats");
            }
        }).catch(function(response2){
                $scope.status = response2.status + " " + response2.statusText;
                //$scope.life_expectancy_stats = response2.data;
                if(response2.status==404){
                    alert("Elemento no editado: El elemento no existe");
                }else if(response2.status==400){
                    alert("Elemento no editado: Revise el si todos los campos están completados y el formato de estos");
                }
        });
    }
}]);