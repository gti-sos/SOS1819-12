/* global angular */
angular.module("LifeExpectancyStatsApp").controller("MainCtrl",["$scope","$http", function ($scope,$http){
    console.log("Main controller initialized");
    var API = "/api/v1/life-expectancy-stats";
    
    refresh();
    
    function refresh(){
        console.log("Requesting life expectancy stats to <"+API+">...");
        $http.get(API).then(function (response){
            //console.log("Data received: " + JSON.stringify(response.data,null,2));
            $scope.life_expectancy_stats = response.data;
        });
    }
    
    $scope.addStat = function (){
        var newStat = $scope.newStat;
        newStat.year = parseInt(newStat.year);
        newStat.expectancy_woman = parseFloat(newStat.expectancy_woman);
        newStat.expectancy_man = parseFloat(newStat.expectancy_man);
        newStat.expectancy = parseFloat(newStat.expectancy);
        console.log("Adding a new stat: "+JSON.stringify(newStat,null,2));
        $http.post(API,newStat).then(function (response){
            console.log("POST Response: " + response.status + " " + response.data);
            refresh();
        });
    };
    $scope.deleteStat = function (country,year){
        console.log("Deleting stat with country: <"+country+"> and year: <"+year+">");
        $http.delete(API+"/"+country+"/"+year).then(function (response){
            console.log("DELETE Response: " + response.status + " " + response.data);
            refresh();
        });
    };
    $scope.deleteAllStats = function (){
        console.log("Deleting all stats");
        $http.delete(API).then(function (response){
            console.log("DELETE Response: " + response.status + " " + response.data);
            refresh();
        });
    };
    $scope.restoreStats = function (){
        console.log("Restoring stats");
        $http.get(API+"/loadInitialData").then(function (response){
            //console.log("Data received: " + JSON.stringify(response.data,null,2));
            //$scope.life_expectancy_stats = response.data;
            refresh();
        });
    };
    $scope.searchStat = function (){
        var searchString = API;
        var searchedStat = $scope.searchedStat;
        if(searchedStat){
        if(searchedStat.country||searchedStat.year||searchedStat.expectancy_woman||searchedStat.expectancy_man||searchedStat.expectancy){
            searchString = searchString+"?";
            if(searchedStat.country){searchString = searchString+"country="+searchedStat.country+"&";}
            if(searchedStat.year){searchString = searchString+"year="+searchedStat.year+"&";}
            if(searchedStat.expectancy_woman){searchString = searchString+"expectancy_woman="+searchedStat.expectancy_woman+"&";}
            if(searchedStat.expectancy_man){searchString = searchString+"expectancy_man="+searchedStat.expectancy_man+"&";}
            if(searchedStat.expectancy){searchString = searchString+"expectancy="+searchedStat.expectancy+"&";}
        }}
        console.log("Searching stats: "+searchString);
        $http.get(searchString).then(function (response){
            //console.log("Data received: " + JSON.stringify(response.data,null,2));
            $scope.life_expectancy_stats = response.data;
        });
    }
    $scope.searchTimeInterval = function (){
        var searchStringT = API;
        var searchedStatT = $scope.searchedStatT;
        if(searchedStatT){
        if(searchedStatT.from&&searchedStatT.to){
            searchStringT = searchStringT+"?";
            if(searchedStatT.from){searchStringT = searchStringT+"from="+searchedStatT.from+"&";}
            if(searchedStatT.to){searchStringT = searchStringT+"to="+searchedStatT.to+"&";}
        }}
        console.log("Searching stats: "+searchStringT);
        $http.get(searchStringT).then(function (response){
            //console.log("Data received: " + JSON.stringify(response.data,null,2));
            $scope.life_expectancy_stats = response.data;
        });
    }
}]);