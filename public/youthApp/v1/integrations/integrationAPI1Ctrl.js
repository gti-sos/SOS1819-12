    /* global angular */

angular.module("SOS181912App")

    .controller("SportsCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("Sports Controller initialized.");

    var API = "proxySR/api/v1/sports-competitions";
    refresh();

    function refresh() {

        console.log("Requesting to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.competitions = response.data;
            });
    }

}]);