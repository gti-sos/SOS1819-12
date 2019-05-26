/* global angular */
angular.module("SOS181912App",["ngRoute"])
    .config(function ($routeProvider){
        $routeProvider
            .when("/", {
                templateUrl: "index.html"
            }).when("/ui/v1/life-expectancy-stats",{
                controller: "ListLESCtrl",
                templateUrl: "life-expectancy-stats-ui/v1/list-LES.html"
            }).when("/ui/v1/life-expectancy-stats/edit/:country/:year",{
                controller: "EditLESCtrl",
                templateUrl: "life-expectancy-stats-ui/v1/edit-LES.html"
            }).when("/ui/v1/life-expectancy-stats/analytics",{
                controller: "ViewLESCtrl",
                templateUrl: "life-expectancy-stats-ui/v1/view-LES.html"

            }).when("/ui/v1/youth-unemployment-stats",{               
                controller: "ListyCtrl",
                templateUrl: "youthApp/v1/listy.html"
            }).when("/ui/v1/youth-unemployment-stats/edit/:country/:year",{
                controller: "EdityCtrl",
                templateUrl: "youthApp/v1/edity.html"
           
            }).when("/ui/v1/pollution-stats",{
                controller: "ListpCtrl",
                templateUrl: "frontendPollution/v1/listp.html"
            }).when("/ui/v1/pollution-stats/edit/:country/:year",{
                controller: "EditpCtrl",
                templateUrl: "frontendPollution/v1/editp.html"
            }).when("/ui/v1/youth-unemployment-stats/analytics",{
                controller: "ViewCtrl",
                templateUrl: "youthApp/v1/youthView.html"
            });

    });
            
console.log("SOS1819-12 App initialized!");