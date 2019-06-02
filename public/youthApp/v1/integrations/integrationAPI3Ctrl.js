/* global angular */
/* global $ */
/*global vis*/
/*global options*/


angular.module("SOS181912App")
    .controller("LifeCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("Life Expectancy Controller initialized.");
    
    var API1 = "/api/v1/youth-unemployment-stats";
    var API2= "/api/v1/life-expectancy-stats";
    
    var countries1 = [];
    var countries2 = [];
    var youth_unemployment = [];
    var youth_unemployment_woman = [];
    var expectancy = [];
    var expectancy_woman = [];
     
    var data=[];
    
    
    
     $http.get(API1).then(function(response){
        countries1 = response.data.map(function(d) { return d.country });
        youth_unemployment = response.data.map(function(d) { return parseFloat(d.youth_unemployment_man) });
        data= response.data;
        console.log(data);
    
    
   $http
            .get(API2)
            .then(function(response) {
                countries2 = response.data.map(function(d) { return d.country });
                expectancy = response.data.map(function(d) { return d.expectancy_man });
                data = response.data;
                console.log("Data received:" + JSON.stringify(response.data, null, 2));
                
                
    //Graph2d 
    
    var container = document.getElementById('visualization');
    var groups = new vis.DataSet();
                groups.add({ id: 0, content: "Desempleo Juvenil" })
                groups.add({ id: 1, content: "Esperanza de vida" })
  var items = [
    {x: countries1[0], y: youth_unemployment[0], group: 0},
    {x: countries1[3], y: youth_unemployment[3], group:0},
    {x: countries1[6], y: youth_unemployment[6], group:0},
    {x: countries1[0], y: expectancy[0], group:1},
    {x: countries1[3], y: expectancy[3], group:1},
    {x: countries1[6], y: expectancy[6], group:1}
  ];

  var dataset = new vis.DataSet(items);
  var options = {
    start: countries1[0],
    end: countries1[9]
  };
  var graph2d = new vis.Graph2d(container, items, groups, options);
                
                });
            
    });   
}]);