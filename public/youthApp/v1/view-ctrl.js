/* global angular */
/*global Highcharts*/
/*global google*/
/*global am4core*/
/*global am4themes_animated*/
/*global am4charts*/

angular.module("SOS181912App").controller("ViewCtrl",["$scope","$http","$routeParams", "$location", function ($scope, $http,$routeParams,$location){
        console.log("View Controller initialized");
        var API = "/api/v1/youth-unemployment-stats";
        
        var countries = [];
        var years = [];
        var youth_unemployment = [];
        var youth_unemployment_man = [];
        var youth_unemployment_woman = [];
        
     
        var data=[];
    
        $http.get(API).then(function(response){
            countries = response.data.map(function(d) { return d.country });
            years = response.data.map(function(d) { return parseInt(d.year) });
            youth_unemployment = response.data.map(function(d) { return parseFloat(d.youth_unemployment) });
            youth_unemployment_man = response.data.map(function(d) { return parseFloat(d.youth_unemployment_man) });
            youth_unemployment_woman = response.data.map(function(d) { return parseFloat(d.youth_unemployment_woman) });
            data= response.data;
            console.log(data);

        //amCharts
      
            
        am4core.ready(function() {
        
        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end
        
        // Create chart instance
        var chart = am4core.create("chartdiv", am4charts.PieChart);
        
        // Add and configure Series
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "youth_unemployment";
        pieSeries.dataFields.category = "country";
        
        // Let's cut a hole in our Pie chart the size of 30% the radius
        chart.innerRadius = am4core.percent(30);
        
        // Put a thick white border around each Slice
        pieSeries.slices.template.stroke = am4core.color("#fff");
        pieSeries.slices.template.strokeWidth = 2;
        pieSeries.slices.template.strokeOpacity = 1;
        pieSeries.slices.template
          // change the cursor on hover to make it apparent the object can be interacted with
          .cursorOverStyle = [
            {
              "property": "cursor",
              "value": "pointer"
            }
          ];
        
        pieSeries.alignLabels = false;
        pieSeries.labels.template.bent = true;
        pieSeries.labels.template.radius = 3;
        pieSeries.labels.template.padding(0,0,0,0);
        
        pieSeries.ticks.template.disabled = true;
        
        // Create a base filter effect (as if it's not there) for the hover to return to
        var shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
        shadow.opacity = 0;
        
        // Create hover state
        var hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists
        
        // Slightly shift the shadow and make it more prominent on hover
        var hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
        hoverShadow.opacity = 0.7;
        hoverShadow.blur = 5;
        
        // Add a legend
        chart.legend = new am4charts.Legend();
        
        chart.data = [{
          "country": countries[3],
          "youth_unemployment": youth_unemployment[3]
        }, {
          "country": countries[6],
          "youth_unemployment": youth_unemployment[6]
        }, {
          "country": countries[9],
          "youth_unemployment": youth_unemployment[9]
        }, {
          "country": countries[12],
          "youth_unemployment": youth_unemployment[12]
        }, {
          "country": countries[15],
          "youth_unemployment": youth_unemployment[15]
        }];
        
        });
 
        //GeoChart
      google.charts.load('current', {
        'packages':['geochart'],
        // Note: you will need to get a mapsApiKey for your project.
        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
        'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
      });
      google.charts.setOnLoadCallback(drawRegionsMap);

      function drawRegionsMap() {
        var data = google.visualization.arrayToDataTable([
          ['Country', 'Popularity'],
          [countries[0], youth_unemployment[0]],
          [countries[3], youth_unemployment[3]],
          [countries[6], youth_unemployment[6]],
          [countries[9], youth_unemployment[9]],
          [countries[12], youth_unemployment[12]],
          [countries[15], youth_unemployment[15]]
        ]);

        var options = {};

        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

        chart.draw(data, options);
      }
        
        //HighCharts
        
        
        Highcharts.chart('container', {

    title: {
        text: 'My data'
    },

    subtitle: {
        text: 'Source: thesolarfoundation.com'
    },
    xAxis: {
                
             categories: response.data.map(function(d){return d.country+"-"+d.year}),
             crosshair: true
               
   },
    yAxis: {
        title: {
            text: 'Datos estadísticos'
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            allowPointSelect: true
        }
    },

     series: [{
                
                name: 'YOUTH UNEMPLOYMENT WOMAN',
                data: youth_unemployment_woman
            }, {
                name: 'YOUTH UNEMPLOYMENT',
                data:  youth_unemployment
            }, {
                name: 'YOUTH UNEMPLOYMENT MAN',
                data: youth_unemployment_man
            }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

});
    
    

    
});

}]);