/*global angular */
/*global google*/

angular.module("SOS181912App")

    .controller("bioCtrl", ["$scope", "$http", function($scope, $http) {
    
    console.log("countries Controller initialized.");

    var API = "/api/v1/pollution-stats";
    var G10 = "proxyG10";

    
    var pollution_kg1000 = [];
    
    var ethanolFuel = [];
    var dryNaturalGas=[];
   
   
     
    var data=[];
    
     

    $http.get(API).then(function(response){
        
        pollution_kg1000 = response.data.map(function(d) { return d.pollution_kg1000 });
       
        data= response.data;
        console.log(data);

    $http
        .get(G10)
        .then(function(response) {
            ethanolFuel = response.data.map(function(d) { return d.ethanolFuel });
            dryNaturalGas = response.data.map(function(d) { return d.dryNaturalGas });
            
            data = response.data;
            console.log("Data received:" + JSON.stringify(response.data, null, 2));
            
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawSeriesChart);

    function drawSeriesChart() {

      var data = google.visualization.arrayToDataTable([
        ['ID',     'ethanolFuel',               'dryNaturalGas',         'stat',                         'pollution_kg1000'],
        ['tco2',    ethanolFuel[0],              dryNaturalGas[0],      'pollution_tco2',                pollution_kg1000[0]             ],
        ['kg1000',  ethanolFuel[1],              dryNaturalGas[1],      'pollution_kg1000',               pollution_kg1000[1]             ],
        ['perca',   ethanolFuel[2],              dryNaturalGas[2],      'pollution_perca',                pollution_kg1000[2]             ]
      ]);

      var options = {
        title: 'Correlación entre  ethanolFuel ' +
               'and dryNaturalGas con pollution_kg1000 , pollution_tco2 , pollution_perca',
        hAxis: {title: 'ethanolFuel'},
        vAxis: {title: 'dryNaturalGas'},
        bubble: {textStyle: {fontSize: 11}}
      };

      var chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
      chart.draw(data, options);
    }
        });
    });
}]);