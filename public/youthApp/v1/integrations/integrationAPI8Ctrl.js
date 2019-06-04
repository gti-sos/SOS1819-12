/* global angular */
/* global chart */
/* global anychart */

angular.module("SOS181912App")
    .controller("ApiExt1Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
        console.log("External Api Controller initialized ");
    
    var API1 = "/api/v1/youth-unemployment-stats";
    var API2 = "https://api.myjson.com/bins/1lzv8";
    var youth_unemployments = [];
    var countries = [];
    var names=[];
    var albums=[];
    var datos = [];
     
     $http.get(API1).then(function(response){
        youth_unemployments = response.data.map(function(d) { return d.youth_unemployment });
       countries = response.data.map(function(d) { return d.country });
        
            $http.get(API2).then(function(response) {
              
                     names = response.data.map(function(d) { return d.name })
                     albums = response.data.map(function(d) { return d.albums })
                    console.log(datos);


                  
                    
            //AnyCharts
            anychart.onDocumentReady(function () {
        // create pie chart with passed data
        var chart = anychart.pie([
            [names[0], albums[0]],
            [countries[0], youth_unemployments[0]],
            [names[1], albums[1]],
            [countries[3], youth_unemployments[3]],
            [names[2], albums[2]],
            [countries[6], youth_unemployments[6]]
        ]);
    
        // set chart title text settings
        chart.title('Integración API Externa')
                //set chart radius
                .radius('43%')
                // create empty area in pie chart
                .innerRadius('30%');
    
        // set container id for the chart
        chart.container('container');
        // initiate chart drawing
        chart.draw();
      });
                });
        });
    
    
    }]);