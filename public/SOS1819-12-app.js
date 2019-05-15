/* global angular */
angular.module("SOS181912App",["ngRoute"])
    .config(function ($routeProvider){
        $routeProvider
            .when("/", {
                templateUrl: "index.html"
            }).when("/ui/v1/life-expectancy-stats",{
                controller: "ListLESCtrl",
                templateUrl: "frontend/v1/list-LES.html"
            }).when("/ui/v1/life-expectancy-stats/edit/:country/:year",{
                controller: "EditLESCtrl",
                templateUrl: "frontend/v1/edit-LES.html"
            });
    });
console.log("SOS1819-12 App initialized!");