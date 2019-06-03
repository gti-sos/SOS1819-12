/* global angular */
/* global am4core */
/* global am4themes_animated */
/* global am4charts */



angular.module("SOS181912App")
    .controller("LifeCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("Life Expectancy Controller initialized.");
    
    var API1 = "/api/v1/youth-unemployment-stats";
    var API2= "/api/v1/life-expectancy-stats";
    
    var countries1 = [];
    var countries2 = [];
    var years1=[];
    var years2=[];
    var youth_unemployments_man = [];
    var youth_unemployments_woman = [];
    var expectancies_man = [];
    var expectancies_woman = [];
     
    var data=[];
    
    
    
     $http.get(API1).then(function(response){
        countries1 = response.data.map(function(d) { return d.country });
        years1 = response.data.map(function(d) { return d.year });
        youth_unemployments_man = response.data.map(function(d) { return parseFloat(d.youth_unemployment_man) });
        youth_unemployments_woman = response.data.map(function(d) { return parseFloat(d.youth_unemployment_woman) });
        data= response.data;
        console.log(data);
    
    
   $http
            .get(API2)
            .then(function(response) {
                countries2 = response.data.map(function(d) { return d.country });
                years2 = response.data.map(function(d) { return d.year });
                expectancies_man = response.data.map(function(d) { return d.expectancy_man });
                expectancies_woman = response.data.map(function(d) { return d.expectancy_woman });
                data = response.data;
                console.log("Data received:" + JSON.stringify(response.data, null, 2));
                
    //amCharts        
    am4core.ready(function() {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end
        
        var iconPath = "M53.5,476c0,14,6.833,21,20.5,21s20.5-7,20.5-21V287h21v189c0,14,6.834,21,20.5,21 c13.667,0,20.5-7,20.5-21V154h10v116c0,7.334,2.5,12.667,7.5,16s10.167,3.333,15.5,0s8-8.667,8-16V145c0-13.334-4.5-23.667-13.5-31 s-21.5-11-37.5-11h-82c-15.333,0-27.833,3.333-37.5,10s-14.5,17-14.5,31v133c0,6,2.667,10.333,8,13s10.5,2.667,15.5,0s7.5-7,7.5-13 V154h10V476 M61.5,42.5c0,11.667,4.167,21.667,12.5,30S92.333,85,104,85s21.667-4.167,30-12.5S146.5,54,146.5,42 c0-11.335-4.167-21.168-12.5-29.5C125.667,4.167,115.667,0,104,0S82.333,4.167,74,12.5S61.5,30.833,61.5,42.5z"
        
        
        
        var chart = am4core.create("chartdiv", am4charts.SlicedChart);
        chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect
        
        chart.data = [{
            "name": countries1[1] + "-" + years1[1],
            "value": youth_unemployments_man[1]
        }, {
            "name": countries2[0] + "-" + years2[0],
            "value": expectancies_man[0]
        }, {
            "name": countries1[2] + "-" + years1[2],
            "value": youth_unemployments_man[2]
        }, {
            "name": countries2[14] + "-" + years2[14],
            "value": expectancies_man[14]
        }, {
            "name": countries1[0] + "-" + years1[0],
            "value": youth_unemployments_man[0]
        }, {
            "name": countries2[28] + "-" + years2[28],
            "value": expectancies_man[28]
        }];
        
        var series = chart.series.push(new am4charts.PictorialStackedSeries());
        series.dataFields.value = "value";
        series.dataFields.category = "name";
        series.alignLabels = true;
        
        series.maskSprite.path = iconPath;
        series.ticks.template.locationX = 1;
        series.ticks.template.locationY = 0.5;
        
        series.labelsContainer.width = 200;
        
        chart.legend = new am4charts.Legend();
        chart.legend.position = "left";
        chart.legend.valign = "bottom";
        
        }); // end am4core.ready()
                
                });
            
    });   
}]);