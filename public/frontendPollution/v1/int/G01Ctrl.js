/* global angular */

angular.module("SOS181912App")

    .controller("disastersCtrl", ["$scope", "$http", function($scope, $http) {
/*global Morris*/

    console.log("disasters Controller initialized.");

    var API = "/api/v1/pollution-stats";
    var G01 = "proxyG01";

    var years = [];
    var deaths = [];
   
     
    var data=[];

    $http.get(API).then(function(response){
        years = response.data.map(function(d) { return d.year });
        data= response.data;
        console.log(data);
    
    
    $http
        .get(G01)
        .then(function(response) {
            deaths = response.data.map(function(d) { return d.death });
            data = response.data;
        //console.log("Data received:" + JSON.stringify(response.data, null, 2));
            
    
    new Morris.Line({
    
    element: 'G01',
 
        data: [
        { year: years[1].toString(), value: deaths[29]},
        { year: years[2].toString(), value: deaths[8]},
        { year: years[0].toString(), value: deaths[0]}
    ],
    xkey: 'year',
    ykeys: ['value'],
    labels: ['Numero de muertes']
    
});

        });
    });
}]);