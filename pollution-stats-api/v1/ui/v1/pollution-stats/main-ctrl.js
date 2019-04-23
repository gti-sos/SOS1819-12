/* global angular */
angular.module("PollutionApp").controller("MainCtrl",["$scope","$http", function ($scope,$http){
    console.log("Main controller initialized");
    
    var API = "/api/v1/pollution-stats";
    
    refresh();
    
    
    function refresh(){
        console.log("Requesting pollution stats to <"+API+">...");
        $http.get(API).then(function (response){
            //console.log("Data received: " + JSON.stringify(response.data,null,2));
            $scope.pollution_stats = response.data;
        });
    }
    
    $scope.addStat = function (){
        var newStat = $scope.newStat;
        newStat.year = parseInt(newStat.year);
        newStat.pollution_tco2 = parseFloat(newStat.pollution_tco2);
        newStat.pollution_kg1000 = parseFloat(newStat.pollution_kg1000);
        newStat.pollution_perca = parseFloat(newStat.pollution_perca);
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
        if(searchedStat.country||searchedStat.year||searchedStat.pollution_tco2||searchedStat.pollution_kg1000||searchedStat.pollution_perca){
            searchString = searchString+"?";
            if(searchedStat.country){searchString = searchString+"country="+searchedStat.country+"&";}
            if(searchedStat.year){searchString = searchString+"year="+searchedStat.year+"&";}
            if(searchedStat.pollution_tco2){searchString = searchString+"pollution_tco2="+searchedStat.pollution_tco2+"&";}
            if(searchedStat.pollution_kg1000){searchString = searchString+"pollution_kg1000="+searchedStat.pollution_kg1000+"&";}
            if(searchedStat.pollution_perca){searchString = searchString+"pollution_perca="+searchedStat.pollution_perca+"&";}
        }}
        console.log("Searching stats: "+searchString);
        $http.get(searchString).then(function (response){
            //console.log("Data received: " + JSON.stringify(response.data,null,2));
            $scope.pollution_stats = response.data;
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
            $scope.pollution_stats = response.data;
        });
    }
}]);
