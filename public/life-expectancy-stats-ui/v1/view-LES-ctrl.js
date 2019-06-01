/* global angular */
/*global Highcharts*/

angular.module("SOS181912App").controller("ViewLESCtrl",["$scope","$http", function ($scope,$http){
        console.log("View LES Controller initialized");
        var API = "/api/v1/life-expectancy-stats";
        
        
        $http.get(API).then(function(response){
            
            Highcharts.chart('container-LES', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Life expectancy stats'
                },
                subtitle: {
                    text: 'Source: datosmacro.expansion.com'
                },
                xAxis: {
                    categories: response.data.map(function(d){return d.country+"-"+d.year}),
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Age'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f} years</b></td></tr>',
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
                    name: 'Life expectancy for woman',
                    data: response.data.map(function(d){return d["expectancy_woman"]})
            
                }, {
                    name: 'Life expectancy for man',
                    data: response.data.map(function(d){return d["expectancy_man"]})
            
                }, {
                    name: 'Life expectancy',
                    data: response.data.map(function(d){return d["expectancy"]})
            
                }]
            });
            
        });
}]);