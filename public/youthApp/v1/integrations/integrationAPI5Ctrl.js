/* global angular */


angular.module("SOS181912App")
    .controller("ScorersCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("Scorers Controller initialized.");
    
    var API1 = "/api/v1/youth-unemployment-stats";
    var API2= "https://sos1819-01.herokuapp.com/api/v1/testing-of-nuclear-bombs";
    
    var countries1 = [];
    var countries2 = [];
    var youth_unemployment = [];
    
     
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

           
       
     
            });   
        
    });
}]);