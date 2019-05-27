/* global angular */
/*global Highcharts*/
/*global google*/

angular.module("SOS181912App").controller("ViewCtrl",["$scope","$http", function ($scope,$http){
        console.log("View Controller initialized");
        var API = "/api/v1/youth-unemployment-stats";
        
        //HighCharts
        
        $http.get(API).then(function(response){
            
            Highcharts.chart('stadistics1', {

            title: {
                text: 'My Data Graphic'
            },
        
        
            xAxis: {
                
                categories:  response.data.map(function(d){return (parseInt(d.year))})
               
            },
            yAxis: {
                title: {
                    text: 'pass rate'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
        
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: true
                    }
                }
            },
        
            series: [{
                
                name: 'YOUTH UNEMPLOYMENT WOMAN',
                data: response.data.map(function(d){return d["youth_unemployment_woman"]})
            }, {
                name: 'YOUTH UNEMPLOYMENT',
                data:  response.data.map(function(d){return d["youth_unemployment"]})
            }, {
                name: 'YOUTH UNEMPLOYMENT MAN',
                data: response.data.map(function(d){return d["youth_unemployment_man"]})
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
    
    /*  //GeoCharts
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
          ['Spain', parseInt(response.data.filter(d=>d.country=="spain").
                        map(function(d){return (parseFloat(d["youth_unemployment_woman"])+
                                            parseFloat(d["youth_unemployment"])+
                                            parseFloat(d["youth_unemployment_man"]))
                                             /response.data.filter(d=>d.country=="spain").length
                        }))],
          ['Alemania', parseInt(response.data.filter(d=>d.province=="alemania").
                        map(function(d){return (parseFloat(d["youth_unemployment_woman"])+
                                            parseFloat(d["youth_unemployment"])+
                                            parseFloat(d["youth_unemployment_man"]))
                                             /response.data.filter(d=>d.province=="alemania").length
                        }))],
          ['Italia', parseInt(response.data.filter(d=>d.province=="italia").
                        map(function(d){return (parseFloat(d["youth_unemployment_woman"])+
                                            parseFloat(d["youth_unemployment"])+
                                            parseFloat(d["youth_unemployment_man"]))
                                             /response.data.filter(d=>d.province=="italia").length
                                            
                        }))],
          ['Holanda', parseInt(response.data.filter(d=>d.province=="granada").
                        map(function(d){return (parseFloat(d["public-school"])+
                                            parseFloat(d["private-school"])+
                                            parseFloat(d["charter-school"]))
                                             /response.data.filter(d=>d.province=="granada").length
                        }))],
          ['Almería', parseInt(response.data.filter(d=>d.province=="almeria").
                        map(function(d){return (parseFloat(d["public-school"])+
                                            parseFloat(d["private-school"])+
                                            parseFloat(d["charter-school"]))
                                             /response.data.filter(d=>d.province=="almeria").length
                        }))],
          ['Cadiz', parseInt(response.data.filter(d=>d.province=="cadiz").
                        map(function(d){return (parseFloat(d["public-school"])+
                                            parseFloat(d["private-school"])+
                                            parseFloat(d["charter-school"]))
                                             /response.data.filter(d=>d.province=="cadiz").length
                        }))],
          ['Jaen', parseInt(response.data.filter(d=>d.province=="jaen").
                        map(function(d){return (parseFloat(d["public-school"])+
                                            parseFloat(d["private-school"])+
                                            parseFloat(d["charter-school"]))
                                             /response.data.filter(d=>d.province=="jaen").length
                        }))],
          ['Cordoba', parseInt(response.data.filter(d=>d.province=="cordoba").
                        map(function(d){return (parseFloat(d["public-school"])+
                                            parseFloat(d["private-school"])+
                                            parseFloat(d["charter-school"]))
                                             /response.data.filter(d=>d.province=="cordoba").length
                        }))],
        ]);

        var options = {};

        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

        chart.draw(data, options);
      }*/
      
      // amCharts
      
      
      
}]);