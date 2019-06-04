/* global angular */

angular.module("SOS181912App")

    .controller("moviesCtrl", ["$scope", "$http", function($scope, $http) {
/*global Morris*/

    console.log("movies Controller initialized.");

    var API = "/api/v1/pollution-stats";
    var G02 = "proxyG02";

    var pollution_perca1 = [];
    var movienominations = [];
   
     
    var data=[];

    $http.get(API).then(function(response){
        pollution_perca1 = response.data.map(function(d) { return d.pollution_perca });
        data= response.data;
        console.log(data);
    
    
    $http
        .get(G02)
        .then(function(response) {
            movienominations = response.data.map(function(d) { return d.movienomination });
            data = response.data;
        //console.log("Data received:" + JSON.stringify(response.data, null, 2));
            
    
    new Morris.Bar({
    
    element: 'G02',
 
        data: [
        { year: pollution_perca1[1].toString(), value: movienominations[1]},
        { year: pollution_perca1[2].toString(), value: movienominations[2]},
        { year: pollution_perca1[0].toString(), value: movienominations[0]}
    ],
    xkey: 'year',
    ykeys: ['value'],
    labels: ['nominaciones']
    
});

        });
    });
}]);