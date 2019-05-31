/* global angular */
/*global Highcharts*/

angular.module("SOS181912App").controller("G04IntegrationLESCtrl",["$scope","$http", function ($scope,$http){
        console.log("G04 integration LES Controller initialized");
        var API = "/api/v1/life-expectancy-stats";
        var API_2 = "/proxy/api/suicide-rates";
        
        
        $http.get(API).then(function(response){
            $http.get(API_2).then(function(response2){
                
                Highcharts.chart('container-LES', {
                chart: {
                    type: 'areaspline'
                },
                title: {
                    text: 'Integration between suicide rates and life expectancy for men'
                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    verticalAlign: 'top',
                    x: 150,
                    y: 100,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                },
                xAxis: {
                    categories: response.data.map(function(d){return d.country+"-"+d.year}),
                    plotBands: [{ // visualize the weekend
                        from: 4.5,
                        to: 6.5,
                        color: 'rgba(68, 170, 213, .2)'
                    }]
                },
                yAxis: {
                    title: {
                        text: 'Age/Suicides'
                    }
                },
                tooltip: {
                    shared: true,
                    valueSuffix: ' Years/Thousands'
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    areaspline: {
                        fillOpacity: 0.5
                    }
                },
                series: [{
                    name: 'Life expectancy for man',
                    data: response.data.slice(0,15).map(function(d){return d["expectancy_man"]})
                }, {
                    name: 'Rate suicides for man',
                    data: response2.data.map(function(d){return d["noSuicidesMan"]})
                }]
            });
            
            });
        });
}]);