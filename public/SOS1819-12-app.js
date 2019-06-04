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
            }).when("/ui/v1/life-expectancy-stats/integrations",{
                templateUrl: "life-expectancy-stats-ui/integrations.html"
            }).when("/ui/v1/life-expectancy-stats/integration-g04",{
                controller: "G04IntegrationLESCtrl",
                templateUrl: "life-expectancy-stats-ui/v1/view-LES.html"
            }).when("/ui/v1/life-expectancy-stats/integration-g06",{
                controller: "G06IntegrationLESCtrl",
                templateUrl: "life-expectancy-stats-ui/v1/view-LES.html"
            }).when("/ui/v1/life-expectancy-stats/integration-g08",{
                controller: "G08IntegrationLESCtrl",
                templateUrl: "life-expectancy-stats-ui/v1/view-LES.html"
            }).when("/ui/v1/life-expectancy-stats/integration-g09",{
                controller: "G09IntegrationLESCtrl",
                templateUrl: "life-expectancy-stats-ui/v1/view-LES.html"
            }).when("/ui/v1/life-expectancy-stats/integration-g10",{
                controller: "G10IntegrationLESCtrl",
                templateUrl: "life-expectancy-stats-ui/v1/view-LES.html"
            }).when("/ui/v1/life-expectancy-stats/integration-g11",{
                controller: "G11IntegrationLESCtrl",
                templateUrl: "life-expectancy-stats-ui/v1/view-LES.html"
            }).when("/ui/v1/life-expectancy-stats/integration-g12",{
                controller: "G12IntegrationLESCtrl",
                templateUrl: "life-expectancy-stats-ui/v1/view-LES.html"
            }).when("/ui/v1/life-expectancy-stats/integration-ex1",{
                controller: "EX1IntegrationLESCtrl",
                templateUrl: "life-expectancy-stats-ui/v1/view2-LES.html"
            }).when("/ui/v1/life-expectancy-stats/integration-ex2",{
                controller: "EX2IntegrationLESCtrl",
                templateUrl: "life-expectancy-stats-ui/v1/view2-LES.html"
            
                
                
                
            }).when("/ui/v1/youth-unemployment-stats",{               
                controller: "ListyCtrl",
                templateUrl: "youthApp/v1/listy.html"
            }).when("/ui/v1/youth-unemployment-stats/edit/:country/:year",{
                controller: "EdityCtrl",
                templateUrl: "youthApp/v1/edity.html"
           })
            
           //Parte de Escobar
           
            .when("/ui/v1/pollution-stats",{
                controller: "ListpCtrl",
                templateUrl: "frontendPollution/v1/listp.html"
            }).when("/ui/v1/pollution-stats/edit/:country/:year",{
                controller: "EditpCtrl",
                templateUrl: "frontendPollution/v1/editp.html"
            }).when("/ui/v1/pollution-stats/analytics",{
                controller: "viewpCtrl",
                templateUrl: "frontendPollution/v1/viewp.html"
            }).when("/ui/v1/pollution-stats/int/G01", {
                controller: "disastersCtrl",
                templateUrl: "frontendPollution/v1/int/G01.html"
            }).when("/ui/v1/pollution-stats/int/G02", {
                controller: "moviesCtrl",
                templateUrl: "frontendPollution/v1/int/G02.html"
            }).when("/ui/v1/pollution-stats/int/G06", {
                controller: "transCtrl",
                templateUrl: "frontendPollution/v1/int/G06.html"
            }).when("/ui/v1/pollution-stats/int/G07", {
                controller: "subsCtrl",
                templateUrl: "frontendPollution/v1/int/G07.html"
            }).when("/ui/v1/pollution-stats/int/G08", {
                controller: "countriesCtrl",
                templateUrl: "frontendPollution/v1/int/G08.html"
            }).when("/ui/v1/pollution-stats/int/G10", {
                controller: "bioCtrl",
                templateUrl: "frontendPollution/v1/int/G10.html"
            }).when("/ui/v1/pollution-stats/int/G12", {
                controller: "youthCtrl",
                templateUrl: "frontendPollution/v1/int/G12.html"
            }).when("/ui/v1/pollution-stats/int/G15", {
                controller: "eduCtrl",
                templateUrl: "frontendPollution/v1/int/G15.html"
            })
            
            
            
            
            
            
            
            .when("/ui/v1/youth-unemployment-stats/analytics",{
                controller: "ViewCtrl",
                templateUrl: "youthApp/v1/youthView.html"
            }).when("/ui/v1/youth-unemployment-stats/integrations/api1", {
                controller: "SportsCtrl",
                templateUrl: "youthApp/v1/integrations/integrationAPI1.html"
                
            }).when("/ui/v1/youth-unemployment-stats/integrations/api2", {
                controller: "BombsCtrl",
                templateUrl: "youthApp/v1/integrations/integrationAPI2.html"
            
           }).when("/ui/v1/youth-unemployment-stats/integrations/api3", {
                controller: "LifeCtrl",
                templateUrl: "youthApp/v1/integrations/integrationAPI3.html"
            
           }).when("/ui/v1/youth-unemployment-stats/integrations/api4", {
                controller: "ClimaCtrl",
                templateUrl: "youthApp/v1/integrations/integrationAPI4.html"
            
           }).when("/ui/v1/youth-unemployment-stats/integrations/api5", {
                controller: "ScorersCtrl",
                templateUrl: "youthApp/v1/integrations/integrationAPI5.html"
            
           }).when("/ui/v1/youth-unemployment-stats/integrations/api6", {
                controller: "ElementsCtrl",
                templateUrl: "youthApp/v1/integrations/integrationAPI6.html"
            
           }).when("/ui/v1/youth-unemployment-stats/integrations/api7", {
                controller: "CompaniesCtrl",
                templateUrl: "youthApp/v1/integrations/integrationAPI7.html"
            
           }).when("/ui/v1/youth-unemployment-stats/integrations/api8", {
                controller: "ApiExt1Ctrl",
                templateUrl: "youthApp/v1/integrations/integrationAPI8.html"
            
           }).when("/ui/v1/youth-unemployment-stats/integrations/api9", {
                controller: "ApiExt2Ctrl",
                templateUrl: "youthApp/v1/integrations/integrationAPI9.html"
            
           });

    });
            
console.log("SOS1819-12 App initialized!");