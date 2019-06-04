/* global angular */
/* global google */

angular.module("SOS181912App").controller("EX1IntegrationLESCtrl",["$scope","$http", function ($scope,$http){
        console.log("EX1 integration LES Controller initialized");
        var API = "/api/v1/life-expectancy-stats";
        var API_2 = "/externa1";
        
        $http.get(API).then(function(response){
            $http.get(API_2).then(function(response2){
                var mezclaGO2 = [];
                mezclaGO2.push(['Country', 'Expectancy man', 'Expectancy woman', 'Population', 'Area']);
                for(var i=0; i<4;i++){
                    var c = response.data.slice(i,i+1).map(function(d){return d["country"]});
                    c = c[0];
                    var e = response.data.slice(i,i+1).map(function(d){return d["expectancy_man"]});
                    e = e[0];
                    var y = response.data.slice(i,i+1).map(function(d){return d["expectancy_woman"]});
                    y = y[0];
                    var r = response2.data.slice(i+2,i+3).map(function(d){return d["population"]/10000});
                    r = r[0];
                    var s = response2.data.slice(i,i+1).map(function(d){return d["area"]/1000});
                    s = s[0];
                    mezclaGO2.push([c,e,y,r,s]);
                }
                console.log(mezclaGO2);
                    
                google.charts.load("current", {packages:["corechart"]});
                google.charts.setOnLoadCallback(drawChart);
                function drawChart() {
                  var data = google.visualization.arrayToDataTable(mezclaGO2);
              
                var options = {
                  title: 'Life expectancy in front of population and area of country',
                  legend: { position: 'top', maxLines: 2 },
                  colors: ['#5C3292', '#1A8763', '#871B47', '#999999', '#B8C728'],
                  interpolateNulls: false,
                };
          
                  var chart = new google.visualization.Histogram(document.getElementById('go_div'));
                  chart.draw(data, options);
                }
                    
            });
        });
}]);