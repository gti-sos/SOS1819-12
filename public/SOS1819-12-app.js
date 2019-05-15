/* global angular */
angular.module("SOS181912App",["ngRoute"])
    .config(function ($routeProvider){
        $routeProvider
            .when("/", {
                templateUrl: "index.html"
            })
            .when("/ui/v1/life-expectancy-stats",{
                controller: "ListLESCtrl",
                templateUrl: "frontend/v1/list-LES.html"
            })
            .when("/ui/v1/life-expectancy-stats/edit/:country/:year",{
                controller: "EditLESCtrl",
                templateUrl: "frontend/v1/edit-LES.html"

            })
            .when("/ui/v1/youth-unemployment-stats",{
                controller: "ListyCtrl",
                templateUrl: "youthApp/v1/listy.html"
            })
            .when("/ui/v1/youth-unemployment-stats/edit/:country/:year",{
                controller: "EdityCtrl",
                templateUrl: "youthApp/v1/edity.html"
            })

              .when("/ui/v1/pollution-stats",{
                controller: "ListCtrl",
                templateUrl: "frontendPollution/v1/list.html"
            })
            .when("/ui/v1/pollution-stats/edit/:country/:year",{
                controller: "EditCtrl",
                templateUrl: "frontendPollution/v1/edit.html"
            }) 
            
            
            
            ;
>>>>>>> f29d1d5e6f8364cb56c97bc559664db457436ec3
    });
console.log("SOS1819-12 App initialized!");