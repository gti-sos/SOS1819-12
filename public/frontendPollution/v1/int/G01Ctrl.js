/* global angular */

angular.module("SOS181912App")

    .controller("disastersCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("disasters Controller initialized.");

    var API = "proxyD/api/v1/major-disasters";
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