/* global angular */

angular.module("SOS181912App").controller("EX1IntegrationLESCtrl",["$scope","$http", function ($scope,$http){
        console.log("EX1 integration LES Controller initialized");
        var API = "/api/v1/life-expectancy-stats";
        var API_2 = "Marvelstefan-skliarovV1.p.rapidapi.com";
        var API_KEY = "1505ad8e30msha9665b349d5bba0p130853jsn0d04595275e9";
        
        
        $http.get(API).then(function(response){
            $http.get(API_2).then(function(response2){
                
                var mezcla = [];
                for(var i=0; i<10;i++){
                    var c = response.data.slice(i,i+1).map(function(d){return d["country"]});
                    c = c[0];
                    var e = response.data.slice(i,i+1).map(function(d){return d["expectancy"]});
                    e = e[0];
                }
                console.log(response2.data);
            });    
        });
}]);