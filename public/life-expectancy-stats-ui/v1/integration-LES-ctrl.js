/* global angular */
/*global Highcharts*/

angular.module("SOS181912App").controller("IntegrationLESCtrl",["$scope","$http", function ($scope,$http){
        console.log("Integrations LES Controller initialized");
        var API = "/api/v1/life-expectancy-stats";
        
        
        $http.get(API).then(function(response){
            
            
            
        });
}]);