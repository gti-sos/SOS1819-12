/* global angular */
/* global google */

angular.module("SOS181912App").controller("EX2IntegrationLESCtrl",["$scope","$http", function ($scope,$http){
        console.log("EX2 integration LES Controller initialized");
        var API = "/api/v1/life-expectancy-stats";
        var API_2 = "/externa2";
        
        $http.get(API).then(function(response){
            $http.get(API_2).then(function(response2){
                var mezclaGO2 = [];
                for(var i=0; i<10;i++){
                    var c = response.data.slice(i,i+1).map(function(d){return d["country"]});
                    c = c[0];
                    var e = response.data.slice(i,i+1).map(function(d){return d["expectancy_man"]});
                    e = e[0];
                    var y = response.data.slice(i,i+1).map(function(d){return d["expectancy_woman"]});
                    y = y[0];
                    var r = response2.data.data.slice(i,i+1).map(function(d){return d["game"]["visitor_team_score"]});
                    r = r[0];
                    var s = response2.data.data.slice(i,i+1).map(function(d){return d["game"]["home_team_score"]});
                    s = s[0];
                    mezclaGO2.push([c,e,y,r,s]);
                }
                    
                google.charts.load('current', {'packages':['corechart']});
                google.charts.setOnLoadCallback(drawChart);

                  function drawChart() {
                    var data = google.visualization.arrayToDataTable(mezclaGO2, true);
                
                    var options = {
                      legend:'none'
                    };
                
                    var chart = new google.visualization.CandlestickChart(document.getElementById('go_div'));
                
                    chart.draw(data, options);
                  }
                    
            });
        });
}]);