/*global angular */
/*global am4themes_animated*/
/*global am4core*/
/*global am4charts*/



angular.module("SOS181912App")

    .controller("youthCtrl", ["$scope", "$http", function($scope, $http) {
    
    console.log("youth Controller initialized.");

    var API = "/api/v1/pollution-stats";
    var G15 = "proxyG12";

    
    var pollution_tco2 = [];
    
    var youth_unemployment=[]
   
     
    var data=[];
    
     

    $http.get(API).then(function(response){
        
        pollution_tco2 = response.data.map(function(d) { return d.pollution_tco2 });
       
        data= response.data;
        console.log(data);

    $http
        .get(G15)
        .then(function(response) {
            
            youth_unemployment = response.data.map(function(d) { return d.youth_unemployment });
            
            data = response.data;
            console.log("Data received:" + JSON.stringify(response.data, null, 2));
  

am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
var chart = am4core.create("chartdiv", am4charts.XYChart);

// Add data
chart.data = [{
  "year": "2015",
  "pollution_tco2": pollution_tco2[1],
  "youth_unemployment": youth_unemployment[2]
}, {
  "year": "2016",
  "pollution_tco2": pollution_tco2[2],
  "youth_unemployment": youth_unemployment[1]
}, {
}, {
  "year": "2017",
  "pollution_tco2": pollution_tco2[0],
  "youth_unemployment": youth_unemployment[0]
}, {
}];

chart.legend = new am4charts.Legend();
chart.legend.position = "right";

// Create axes
var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "year";
categoryAxis.renderer.grid.template.opacity = 0;

var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
valueAxis.min = 0;
valueAxis.renderer.grid.template.opacity = 0;
valueAxis.renderer.ticks.template.strokeOpacity = 0.5;
valueAxis.renderer.ticks.template.stroke = am4core.color("#495C43");
valueAxis.renderer.ticks.template.length = 10;
valueAxis.renderer.line.strokeOpacity = 0.5;
valueAxis.renderer.baseGrid.disabled = true;
valueAxis.renderer.minGridDistance = 40;

// Create series
function createSeries(field, name) {
  var series = chart.series.push(new am4charts.ColumnSeries());
  series.dataFields.valueX = field;
  series.dataFields.categoryY = "year";
  series.stacked = true;
  series.name = name;
  
  var labelBullet = series.bullets.push(new am4charts.LabelBullet());
  labelBullet.locationX = 0.5;
  labelBullet.label.text = "{valueX}";
  labelBullet.label.fill = am4core.color("#fff");
}

createSeries("pollution_tco2", "pollution_tco2");
createSeries("youth_unemployment", "youth_unemployment");
});
        });
    });
}]);