/* global angular */
/* global google */
google
angular.module("SOS181912App")
    .controller("ElementsCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("Elements Controller initialized.");
    
    var API1 = "/api/v1/youth-unemployment-stats";
    var API2= "https://sos1819-14.herokuapp.com/api/v1/elements";
    
    var countries = [];
    var provinces = [];
    var youth_unemployments = [];
    var victims = [];
    
     
    var data=[];
    
    
    
     $http.get(API1).then(function(response){
        countries = response.data.map(function(d) { return d.country });
        youth_unemployments = response.data.map(function(d) { return parseFloat(d.youth_unemployment) });
        data= response.data;
        console.log(data);
    
    
    $http
            .get(API2)
            .then(function(response) {
                provinces = response.data.map(function(d) { return d.province });
                victims = response.data.map(function(d) { return d.victims });
                data = response.data;
                console.log("Data received:" + JSON.stringify(response.data, null, 2));

           //GoogleCharts
       google.charts.load('current', {packages: ['corechart', 'bar']});
        google.charts.setOnLoadCallback(drawBasic);
        
        function drawBasic() {
        
              var data = google.visualization.arrayToDataTable([
                ['Site', 'Datos',],
                [countries[3],youth_unemployments[0]],
                [provinces[0], victims[0]],
                [countries[12], youth_unemployments[12]],
                [provinces[6], victims[6]],
                [countries[24], youth_unemployments[24]]
              ]);
        
              var options = {
                title: '',
                chartArea: {width: '50%'},
                hAxis: {
                  title: 'Número de víctimas/Porcentaje de desempleo juvenil',
                  minValue: 0
                },
                vAxis: {
                  title: 'Sites'
                }
              };
        
              var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
        
              chart.draw(data, options);
            }
             
            });   
        
    });
}]);