
/* global angular */

    angular
        .module("PollutionApp",["ngRoute"])
        .config(function ($routeProvider){
            
            .when("/",{
                controller : "ListCtrl",
                templateUrl: "list.html"
                
            });
        });



console.log("PollutionApp iniciada");