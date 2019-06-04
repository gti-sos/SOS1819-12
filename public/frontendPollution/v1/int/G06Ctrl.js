/*global angular */
/*global Highcharts*/
angular.module("SOS181912App")

    .controller("transCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("transfer Controller initialized.");

    var API = "/api/v1/pollution-stats";
    var G06 = "proxyG06";

    var pollution_tco2 = [];
    var moneyspent = [];
   
     
    var data=[];

    $http.get(API).then(function(response){
        pollution_tco2 = response.data.map(function(d) { return d.pollution_tco2 });
        data= response.data;
        console.log(data);
    
    
    $http
        .get(G06)
        .then(function(response) {
            moneyspent = response.data.map(function(d) { return d.moneyspent });
            data = response.data;
            console.log("Data received:" + JSON.stringify(response.data, null, 2));
            
        Highcharts.chart('G06', {
            chart: {
            type: 'cylinder',
            options3d: {
            enabled: true,
            alpha: 15,
            beta: 15,
            depth: 50,
            viewDistance: 25
        }
        },
        title: {
        text: 'Highcharts Cylinder Chart'
        },
        plotOptions: {
        series: {
        depth: 25,
        colorByPoint: true
        }
        },
        series: [{
        data: [pollution_tco2[0],pollution_tco2[1],pollution_tco2[2], pollution_tco2[3], pollution_tco2[4], moneyspent[0],moneyspent[1],
                moneyspent[2], moneyspent[3], moneyspent[4], moneyspent[5]],
        name: 'Cylinders',
        showInLegend: false
        }]
    });

        });
    });
}]);