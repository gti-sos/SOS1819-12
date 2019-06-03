/* global angular */
/* global Highcharts */


angular.module("SOS181912App")
    .controller("ScorersCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("Scorers Controller initialized.");
    
    var API1 = "/api/v1/youth-unemployment-stats";
    var API2= "https://sos1819-02.herokuapp.com/api/v1/scorers-stats";
    
    var countries1 = [];
    var countries2 = [];
    var youth_unemployment = [];
    var scorergoals = [];
    
     
    var data=[];
    
    
    
     $http.get(API1).then(function(response){
        countries1 = response.data.map(function(d) { return d.country });
        youth_unemployment = response.data.map(function(d) { return parseFloat(d.youth_unemployment) });
        data= response.data;
        console.log(data);
    
    
    $http
            .get(API2)
            .then(function(response) {
                countries2 = response.data.map(function(d) { return d.country });
                scorergoals = response.data.map(function(d) { return d.scorergoal });
                data = response.data;
                console.log("Data received:" + JSON.stringify(response.data, null, 2));

           Highcharts.chart('container', {
    chart: {
        type: 'scatter',
        margin: [70, 50, 60, 80],
        events: {
            click: function (e) {
                // find the clicked values and the series
                var x = Math.round(e.xAxis[0].value),
                    y = Math.round(e.yAxis[0].value),
                    series = this.series[0];

                // Add it
                series.addPoint([x, y]);

            }
        }
            },
         
            subtitle: {
                text: 'Comparamos los goles de futbolistas con el desempleo juvenil de paises'
            },
            xAxis: {title: {
                    text: 'Porcentaje de desempleo juvenil'
                },
                gridLineWidth: 1,
                minPadding: 0.2,
                maxPadding: 0.2,
                maxZoom: 60
            },
            yAxis: {
                title: {
                    text: 'Goles'
                },
                minPadding: 0.2,
                maxPadding: 0.2,
                maxZoom: 60,
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            plotOptions: {
                series: {
                    lineWidth: 1,
                    point: {
                        events: {
                            click: function () {
                                if (this.series.data.length > 1) {
                                    this.remove();
                                }
                            }
                        }
                    }
                }
            },
            series: [{
                data: [[youth_unemployment[0],scorergoals[0]], [youth_unemployment[3],scorergoals[3]],[youth_unemployment[6],scorergoals[6]]]
            }]
        });
       
     
            });   
        
    });
}]);