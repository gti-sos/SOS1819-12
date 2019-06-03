/* global angular */
/* global Highcharts */

angular.module("SOS181912App")
    .controller("ClimaCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("Clima Controller initialized.");
    
    var API1 = "/api/v1/youth-unemployment-stats";
    var API2 = "/proxy/api/climate-stats";
    
    var countries1 = [];
    var countries2 = [];
    var youth_unemployments = [];
    var co2_stats = [];
    var years1 = [];
    var years2 = [];
    var data=[];
    
    
    
     $http.get(API1).then(function(response){
        countries1 = response.data.map(function(d) { return d.country });
        youth_unemployments = response.data.map(function(d) { return parseFloat(d.youth_unemployment) });
        years1 = response.data.map(function(d) { return parseFloat(d.year) });
        data= response.data;
        console.log(data);
    
    
    $http
            .get(API2)
            .then(function(response) {
                countries2 = response.data.map(function(d) { return d.country });
                years2 = response.data.map(function(d) { return parseFloat(d.year) });
                co2_stats = response.data.map(function(d) { return parseFloat(d.co2_stats) });
                data = response.data;
                console.log("Data received:" + JSON.stringify(response.data, null, 2));

           Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
   
    subtitle: {
        text: 'Source: WorldClimate.com'
    },
    xAxis: {
        categories: [
            years1[1],years1[2],years1[0],years2[2],years2[7],years2[13]
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Rainfall (mm)'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: countries2[2],
        data: [youth_unemployments[2], youth_unemployments[1], youth_unemployments[0], co2_stats[2], co2_stats[7], co2_stats[13]]

    }, {
        name: countries2[0],
        data: [youth_unemployments[18], youth_unemployments[14], youth_unemployments[9], co2_stats[0], co2_stats[5], co2_stats[10]]

    }, {
        name: countries2[4],
        data: [youth_unemployments[10], youth_unemployments[26], youth_unemployments[22], co2_stats[4], co2_stats[9], co2_stats[14]]

    }]
});
       
     
            });   
        
    });
}]);