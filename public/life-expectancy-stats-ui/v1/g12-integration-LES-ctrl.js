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
                
                var mezcla = [];
                for(var i=0; i<10;i++){
                    var c = response.data.slice(i,i+1).map(function(d){return d["country"]});
                    c = c[0];
                    var e = response.data.slice(i,i+1).map(function(d){return d["expectancy"]});
                    e = e[0];
                    var y = response2.data.slice(i,i+1).map(function(d){return d["youth_unemployment"]});
                    y = y[0];
                    mezcla.push({c,e,y});
                }
                
               am4core.ready(function() {

                    // Themes begin
                    am4core.useTheme(am4themes_animated);
                    // Themes end
                    
                    /* Create chart instance */
                    var chart = am4core.create("container-LES", am4charts.RadarChart);
                    
                    /* Add data */
                    chart.data =  mezcla;
                    /* Create axes */
                    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                    categoryAxis.dataFields.category = "c";
                    
                    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                    valueAxis.renderer.axisFills.template.fill = chart.colors.getIndex(2);
                    valueAxis.renderer.axisFills.template.fillOpacity = 0.05;
                    
                    /* Create and configure series */
                    var series = chart.series.push(new am4charts.RadarSeries());
                    series.name = "Life expectancy";
                    series.dataFields.valueY = "y";
                    series.dataFields.categoryX = "c";
                    series.strokeWidth = 3;
                    /* Create and configure series */
                    var series2 = chart.series.push(new am4charts.RadarSeries());
                    series2.name = "Youth unemployment";
                    series2.dataFields.valueY = "e";
                    series2.dataFields.categoryX = "c";
                    series2.strokeWidth = 3;
                    
                    /* Add legend */
                    chart.legend = new am4charts.Legend();
                    
                    /* Add cursor */
                    chart.cursor = new am4charts.RadarCursor();
                    
                    }); // end am4core.ready()
            
            });
        });
}]);