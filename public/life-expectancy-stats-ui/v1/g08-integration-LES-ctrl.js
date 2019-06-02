/* global angular */
/*global Highcharts*/

angular.module("SOS181912App").controller("G08IntegrationLESCtrl",["$scope","$http", function ($scope,$http){
        console.log("G08 integration LES Controller initialized");
        var API = "/api/v1/life-expectancy-stats";
        var API_2 = "/proxy/api/emigrations-by-countries";
        
        
        $http.get(API).then(function(response){
            $http.get(API_2).then(function(response2){
                
               Highcharts.chart('container-LES', {
                    chart: {
                        type: 'bar'
                    },
                    title: {
                        text: 'Integration between emigration and life expectancy for women'
                    },
                    xAxis: {
                        categories: response.data.map(function(d){return d.country+"-"+d.year}),
                        title: {
                            text: null
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Years/ People *10000',
                            align: 'high'
                        },
                        labels: {
                            overflow: 'justify'
                        }
                    },
                    tooltip: {
                        valueSuffix: ' millions'
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'top',
                        x: -40,
                        y: 80,
                        floating: true,
                        borderWidth: 1,
                        backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                        shadow: true
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: 'Life expectancy for woman',
                        data: response.data.slice(0,5).map(function(d){return d["expectancy_woman"]})
                    }, {
                        name: 'Emigration for woman',
                        data: response2.data.map(function(d){return d["emigrantwoman"]/10000})
                    }]
                });
            
            });
        });
}]);