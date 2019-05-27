/* global angular */
/*global Highcharts*/
/*global google*/

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

 
    
        
        //HighCharts
        
        
        Highcharts.chart('container', {

    title: {
        text: 'My data'
    },

    subtitle: {
        text: 'Source: thesolarfoundation.com'
    },
    xAxis: {
                
                categories:  years
               
   },
    yAxis: {
        title: {
            text: 'Hola'
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
                connectorAllowed: false
            },
            pointStart: 2010
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