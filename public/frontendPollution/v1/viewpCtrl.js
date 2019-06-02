/* global angular*/
/*global Highcharts*/

angular.module("SOS181912App").controller("viewpCtrl",["$scope","$http","$routeParams", "$location", function ($scope, $http,$routeParams,$location){
        console.log("View Controller initialized");
        var API = "/api/v1/pollution-stats";
        
        var countries = [];
        var years = [];
        var pollution_tco = [];
        var pollution_kg1000 = [];
        var pollution_perca = [];
     
        var data=[];
        
        $http.get(API).then(function(response){
            countries = response.data.map(function(d) { return d.country });
            years = response.data.map(function(d) { return parseInt(d.year) });
            pollution_tco = response.data.map(function(d) { return parseFloat(d.pollution_tco2) });
            pollution_kg1000 = response.data.map(function(d) { return parseFloat(d.pollution_kg1000) });
            pollution_perca = response.data.map(function(d) { return parseFloat(d.pollution_perca) });

            data= response.data;
            console.log(data);


        Highcharts.chart('containerp', {
          chart: {
            type: 'spline'
          },
        
          accessibility: {
            description: 'Descripción'},
        
          legend: {
            symbolWidth: 40
          },
        
          title: {
            text: 'from 2015 to 2017'
          },
        
          subtitle: {
            text: 'subtitle'
          },
        
          yAxis: {
            title: {
              text: 'yAxis'
            }
          },
        
          xAxis: {
            title: {
              text: 'Tiempo'
            },
            accessibility: {
              description: 'Time from 2015 to 2017'
            },
            categories: ['españa 2015', 'españa 2016', 'españa 2017','alemania 2015','alemania 2016','alemania 2017'
                        ,'reino unido 2015','reino unido 2016','reino unido 2017','francia 2015','francia 2016','francia 2017'
                        ,'italia 2015','italia 2016','italia 2017']
          },
        
          tooltip: {
            split: true
          },
        
          plotOptions: {
            series: {
              point: {
                events: {
                  click: function () {
                    window.location.href = this.series.options.website;
                  }
                }
              },
              cursor: 'pointer'
            }
          },
        
          series: [
            {
              name: 'pollution_tco',
              data: pollution_tco
              
            }, {
              name: 'pollution_kg1000',
              data: pollution_kg1000
              
            }, {
              name: 'pollution_perca',
              data: pollution_perca
              
            }, 
            
          ],
        
          responsive: {
            rules: [{
              condition: {
                maxWidth: 500
              },
              chartOptions: {
                legend: {
                  itemWidth: 150
                }
              }
            }]
          }
        });
        });
}]);