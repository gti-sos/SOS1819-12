/* global angular */
/*global am4core*/
/*global am4charts*/
/*global am4themes_animated*/

angular.module("SOS181912App").controller("G09IntegrationLESCtrl",["$scope","$http", function ($scope,$http){
        console.log("G09 integration LES Controller initialized");
        var API = "/api/v1/life-expectancy-stats";
        var API_2 = "/proxy/api/populationstats";
        
        $http.get(API).then(function(response){
            $http.get(API_2).then(function(response2){
                
                var mezcla2 = [];
                for(var i=0; i<5;i++){
                    var c = response.data.slice(i,i+1).map(function(d){return d["country"]});
                    c = c[0];
                    var e = response.data.slice(i,i+1).map(function(d){return d["expectancy"]});
                    e = e[0];
                    var t = response2.data.slice(i+3,i+4).map(function(d){return d["accesstoelectricity"]});
                    t = t[0];
                    mezcla2.push({c,e,t});
                }
                
               am4core.ready(function() {

                    // Themes begin
                    am4core.useTheme(am4themes_animated);
                    // Themes end
                    
                    // Create chart instance
                    var chart = am4core.create("container-LES", am4charts.XYChart3D);
                    
                    chart.titles.create().text = "% Expectancy life in front of % population with access to electricity";
                    
                    // Add data
                    chart.data = mezcla2;
                    
                    // Create axes
                    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                    categoryAxis.dataFields.category = "c";
                    categoryAxis.renderer.grid.template.location = 0;
                    categoryAxis.renderer.grid.template.strokeOpacity = 0;
                    
                    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                    valueAxis.renderer.grid.template.strokeOpacity = 0;
                    valueAxis.min = -10;
                    valueAxis.max = 110;
                    valueAxis.strictMinMax = true;
                    valueAxis.renderer.baseGrid.disabled = true;
                    valueAxis.renderer.labels.template.adapter.add("text", function(text) {
                      if ((text > 100) || (text < 0)) {
                        return "";
                      }
                      else {
                        return text + "%";
                      }
                    })
                    
                    // Create series
                    var series1 = chart.series.push(new am4charts.ConeSeries());
                    series1.dataFields.valueY = "e";
                    series1.dataFields.categoryX = "c";
                    series1.columns.template.width = am4core.percent(80);
                    series1.columns.template.fillOpacity = 0.9;
                    series1.columns.template.strokeOpacity = 1;
                    series1.columns.template.strokeWidth = 2;
                    
                    var series2 = chart.series.push(new am4charts.ConeSeries());
                    series2.dataFields.valueY = "t";
                    series2.dataFields.categoryX = "c";
                    series2.stacked = true;
                    series2.columns.template.width = am4core.percent(80);
                    series2.columns.template.fill = am4core.color("#000");
                    series2.columns.template.fillOpacity = 0.1;
                    series2.columns.template.stroke = am4core.color("#000");
                    series2.columns.template.strokeOpacity = 0.2;
                    series2.columns.template.strokeWidth = 2;
                    
                    }); // end am4core.ready()
                    
            });  
        });
}]);