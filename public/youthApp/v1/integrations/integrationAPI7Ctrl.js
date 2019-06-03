/* global angular */
/* global google */


angular.module("SOS181912App")
    .controller("CompaniesCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("Companies Controller initialized.");
    
    var API1 = "/api/v1/youth-unemployment-stats";
    var API2= "https://sos1819-03.herokuapp.com/api/v1/companies";
    
    var countries1 = [];
    var countries2 = [];
    var youth_unemployment = [];
    var sectors =[];
     
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
                sectors = response.data.map(function(d) { return d.sector });
                data = response.data;
                console.log("Data received:" + JSON.stringify(response.data, null, 2));


    //GoogleCharts
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          [countries1[0],     youth_unemployment[0]],
          [countries2[0],      sectors[0]],
          [countries1[3],   youth_unemployment[3]],
          [countries2[0],      sectors[3]],
          [countries1[12],   youth_unemployment[12]]
        ]);

        var options = {
          title: 'Mi gráfica'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
      }
       
     
            });   
        
    });
}]);