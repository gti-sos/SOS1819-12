/* global angular */
/* global refresh */
/*global am4core*/
/*global am4themes_animated*/
/*global am4charts*/

angular.module("SOS181912App")
    .controller("BombsCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("Bombs Controller initialized.");
    
    var API1 = "/api/v1/youth-unemployment-stats";
    var API2= "https://sos1819-01.herokuapp.com/api/v1/testing-of-nuclear-bombs";
    
    var countries1 = [];
    var countries2 = [];
    var youth_unemployment = [];
    var shots = [];
     
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
                shots = response.data.map(function(d) { return d.shot });
                data = response.data;
                console.log("Data received:" + JSON.stringify(response.data, null, 2));

           
        //amCharts
        am4core.ready(function() {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end
        
        var chart = am4core.create("chartdiv", am4charts.XYChart);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
        
        chart.data = [
          {
            country: countries1[0],
            feature: youth_unemployment[0]
          },
          {
            country: countries2[0],
            feature: shots[0]
          },
          {
            country: countries1[3],
            feature: youth_unemployment[3]
          },
          {
            country: countries2[1],
            feature: shots[1]
          },
          {
            country: countries1[6],
            feature: youth_unemployment[6]
          },
          {
            country: countries2[3],
            feature: shots[3]
          },
          {
            country: countries1[9],
            feature: youth_unemployment[9]
          },
          {
            country: countries2[6],
            feature: shots[6]
          },
          {
            country: countries1[12],
            feature: youth_unemployment[12]
          },
          {
            country: countries2[8],
            feature: shots[8]
          }
        ];
        
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.dataFields.category = "country";
        categoryAxis.renderer.minGridDistance = 40;
        categoryAxis.fontSize = 11;
        
        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.max = 100;
        valueAxis.strictMinMax = true;
        valueAxis.renderer.minGridDistance = 30;
        
        /*
        // this is exactly the same, but with events
        axisBreak.events.on("over", function() {
          axisBreak.animate(
            [{ property: "breakSize", to: 1 }, { property: "opacity", to: 0.1 }],
            1500,
            am4core.ease.sinOut
          );
        });
        axisBreak.events.on("out", function() {
          axisBreak.animate(
            [{ property: "breakSize", to: 0.005 }, { property: "opacity", to: 1 }],
            1000,
            am4core.ease.quadOut
          );
        });*/
        
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.categoryX = "country";
        series.dataFields.valueY = "feature";
        series.columns.template.tooltipText = "País: {categoryX}\nValor: {valueY}";
        series.columns.template.tooltipY = 0;
        series.columns.template.strokeOpacity = 0;
        
        // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
        series.columns.template.adapter.add("fill", function(fill, target) {
          return chart.colors.getIndex(target.dataItem.index);
        });
        
        }); // end am4core.ready()
     
            });   
        
    });
}]);