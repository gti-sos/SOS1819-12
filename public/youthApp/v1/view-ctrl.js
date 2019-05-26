/* global angular */
/*global Highcharts*/

angular.module("SOS181912App").controller("ViewCtrl",["$scope","$http", function ($scope,$http){
        console.log("View Controller initialized");
        var API = "/api/v1/youth-unemployment-stats";
        
        
        $http.get(API).then(function(response){
            
            Highcharts.chart('stadistics1', {

            title: {
                text: 'My Data Graphic'
            },
        
        
            xAxis: {
                
                categories:  response.data.map(function(d){return (parseInt(d.year))})
               
            },
            yAxis: {
                title: {
                    text: 'pass rate'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
        
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: true
                    }
                }
            },
        
            series: [{
                
                name: 'YOUTH UNEMPLOYMENT WOMAN',
                data: response.data.map(function(d){return d["youth_unemployment_woman"]})
            }, {
                name: 'YOUTH UNEMPLOYMENT',
                data:  response.data.map(function(d){return d["youth_unemployment"]})
            }, {
                name: 'YOUTH UNEMPLOYMENT MAN',
                data: response.data.map(function(d){return d["youth_unemployment_man"]})
            }],
            
        
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        
        });
    });
}]);