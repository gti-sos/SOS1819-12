/* global angular */
angular.module("LifeExpectancyStatsApp",["ngRoute"])
    .config(function ($routeProvider){
        $routeProvider
            .when("/",{
                controller: "ListLESCtrl",
                templateUrl: "list-LES.html"
            }).when("/edit/:country/:year",{
                controller: "EditLESCtrl",
                templateUrl: "edit-LES.html"
            });
    });
console.log("LifeExpectancyStatsApp initialized!");