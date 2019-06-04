/*global angular */
/*global google*/

angular.module("SOS181912App")

    .controller("countriesCtrl", ["$scope", "$http", function($scope, $http) {
    
    console.log("countries Controller initialized.");

    var API = "/api/v1/pollution-stats";
    var G08 = "proxyG08";

    var pollution_perca = [];
    var expensePerCapita = [];
   
     
    var data=[];
    
     

    $http.get(API).then(function(response){
        pollution_perca = response.data.map(function(d) { return d.pollution_perca });
        data= response.data;
        console.log(data);

    $http
        .get(G08)
        .then(function(response) {
            expensePerCapita = response.data.map(function(d) { return d.expensePerCapita });
            data = response.data;
            console.log("Data received:" + JSON.stringify(response.data, null, 2));
            
    
     google.charts.load('current', {'packages':['corechart']});
     google.charts.setOnLoadCallback(drawChart);
     
     function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['expensePerCapita','pollution_perca and expensePerCapita'],
          [ expensePerCapita[0],pollution_perca[0]],
          [ expensePerCapita[1],pollution_perca[1]],
          [ expensePerCapita[2],pollution_perca[2]],
          [ expensePerCapita[3],pollution_perca[3]],
          [ expensePerCapita[4],pollution_perca[4]],
          [ expensePerCapita[5],pollution_perca[5]],
          [ expensePerCapita[6],pollution_perca[6]],
          [ expensePerCapita[7],pollution_perca[7]],
          [ expensePerCapita[8],pollution_perca[8]],
          [ expensePerCapita[9],pollution_perca[9]],
        ]);

        var options = {
          title: 'expensePerCapita vs. pollution_perca comparison',
          hAxis: {title: 'expensePerCapita', minValue: 0, maxValue: 2010},
          vAxis: {title: 'pollution_perca', minValue: 0, maxValue: 10},
          legend: 'none'
        };

        var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));

        chart.draw(data, options);
      }   
      
        });
    });
}]);