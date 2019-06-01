/* global angular*/
/*global Highcharts*/

angular.module("SOS181912App").controller("ViewCtrl",["$scope","$http","$routeParams", "$location", function ($scope, $http,$routeParams,$location){
        console.log("View Controller initialized");
        var API = "/api/v1/pollution-stats";
        
        var countries = [];
        var years = [];
        var pollution_tco3 = [];
        var pollution_kg1000_3 = [];
        var pollution_perca3 = [];
     
        var data=[];
        
        $http.get(API).then(function(response){
            countries = response.data.map(function(d) { return d.country });
            years = response.data.map(function(d) { return parseInt(d.year) });
            pollution_tco3 = response.data.map(function(d) { return parseFloat(d.pollution_tco3) });
            pollution_kg1000_3 = response.data.map(function(d) { return parseFloat(d.pollution_kg1000) });
            pollution_perca3 = response.data.map(function(d) { return parseFloat(d.pollution_perca) });

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
            text: 'from 2016 to 2017'
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
            categories: ['2015', '2016', '2017']
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
              name: 'españa',
              data: [23,25,36]
              
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