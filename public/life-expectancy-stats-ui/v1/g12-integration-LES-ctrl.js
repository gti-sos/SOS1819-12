/* global angular */
/*global am4core*/
/*global am4charts*/
/*global am4themes_animated*/

angular.module("SOS181912App").controller("G12IntegrationLESCtrl",["$scope","$http", function ($scope,$http){
        console.log("G12 integration LES Controller initialized");
        var API = "/api/v1/life-expectancy-stats";
        var API_2 = "/api/v1/youth-unemployment-stats";
        
        
        $http.get(API).then(function(response){
            $http.get(API_2).then(function(response2){
                
               am4core.ready(function() {

                    // Themes begin
                    am4core.useTheme(am4themes_animated);
                    // Themes end
                    
                    /* Create chart instance */
                    var chart = am4core.create("container-LES", am4charts.RadarChart);
                    
                    /* Add data */
                    chart.data =  response.data.slice(0,10);
                    
                    /* Create axes */
                    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                    categoryAxis.dataFields.category = "country";
                    
                    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                    valueAxis.renderer.axisFills.template.fill = chart.colors.getIndex(2);
                    valueAxis.renderer.axisFills.template.fillOpacity = 0.05;
                    
                    /* Create and configure series */
                    var series = chart.series.push(new am4charts.RadarSeries());
                    series.dataFields.valueY = "expectancy";
                    series.dataFields.categoryX = "country";
                    series.name = "Years";
                    series.strokeWidth = 3;
                    
                    }); // end am4core.ready()
            
            });
        });
}]);