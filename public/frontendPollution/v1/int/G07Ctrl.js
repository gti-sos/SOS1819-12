/*global angular */
/*global Highcharts*/
angular.module("SOS181912App")

    .controller("subsCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("subsidy Controller initialized.");

    var API = "/api/v1/pollution-stats";
    var G07 = "proxyG07";

    var pollution_perca = [];
    var subsidyPercentage = [];
   
     
    var data=[];

    $http.get(API).then(function(response){
        pollution_perca = response.data.map(function(d) { return d.pollution_perca });
        data= response.data;
        console.log(data);
    
    
    $http
        .get(G07)
        .then(function(response) {
            subsidyPercentage = response.data.map(function(d) { return d.subsidyPercentage });
            data = response.data;
            console.log("Data received:" + JSON.stringify(response.data, null, 2));
            
        Highcharts.chart('G07', {
            chart: {
            type: 'area'
            },
            title: {
            text: 'subsidyPercentage and pollution_perca '
            },
            subtitle: {
            },
            xAxis: {
            allowDecimals: false,
            labels: {
            formatter: function () {
            return this.value; // clean, unformatted number for year
            }
            }
            },
            yAxis: {
            title: {
            },
            labels: {
            formatter: function () {
            return this.value / 1;
            }
            }
            },
            tooltip: {
            pointFormat: '{series.name}'
            },
            plotOptions: {
            area: {
            pointStart: 2015,
            marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
            hover: {
            enabled: true
          }}}}},
            series: [{
            name: 'subsidyPercentage',
            data: [0,0,subsidyPercentage[1]]
            }, {
            name: 'pollution_perca',
            data: [pollution_perca[1],pollution_perca[2],pollution_perca[0]]
            }]
            });

        });
    });
}]);