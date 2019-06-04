/* global angular */
/*global google*/

angular.module("SOS181912App").controller("AnalyticsCtrl",["$scope","$http", function ($scope,$http){
        console.log("Analytics Controller initialized");
        var API = "/api/v1/life-expectancy-stats";
        var API_2 = "/api/v1/youth-unemployment-stats";
        var API_3 = "/api/v1/pollution-stats";
        
        $http.get(API).then(function(response){
            $http.get(API_2).then(function(response2){
                $http.get(API_3).then(function(response3){
                    console.log(response2.data);
                    var com = [];
                    com.push(['Country-Year', 'Life expectancy (years)', 'Pollution (kg/co2)', 'Unemployment (*1000)'])
                    for(var i=0; i<10;i++){
                        var c = response.data.slice(i,i+1).map(function(d){return d["country"]});
                        c = c[0];
                        var z = response.data.slice(i,i+1).map(function(d){return d["expectancy"]});
                        z = z[0];
                        var e = response3.data.slice(i,i+1).map(function(d){return d["pollution_perca"]});
                        e = e[0];
                        var y = response2.data.slice(i,i+1).map(function(d){return d["youth_unemployment"]});
                        y = y[0];
                        com.push([c,z,e,y]);
                    }
                    console.log(com);
                    google.charts.load('current', {'packages':['corechart']});
                      google.charts.setOnLoadCallback(drawChart);
                
                      function drawChart() {
                        var data = google.visualization.arrayToDataTable(com);
                
                        var options = {
                          title: 'SOS1819 group 12 integration',
                          curveType: 'function',
                          legend: { position: 'bottom' }
                        };
                
                        var chart = new google.visualization.LineChart(document.getElementById('go_div'));
                
                        chart.draw(data, options);
                      }
                
                });
            });
        });
}]);