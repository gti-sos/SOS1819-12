/* global angular */
angular.module("LifeExpectancyStatsApp").controller("ListLESCtrl",["$scope","$http", function ($scope,$http){
    console.log("List LES controller initialized");
    var API = "/api/v1/life-expectancy-stats";
    
    var elementosTotales = 0;
    $scope.status = undefined;
    refresh();
    
    function refresh(){
        console.log("Requesting life expectancy stats to <"+API+">...");
        $http.get(API).then(function (response){
            $scope.status = response.status + " " + response.statusText;
            //console.log("Data received: " + JSON.stringify(response.data,null,2));
            $scope.life_expectancy_stats = response.data;
            elementosTotales = response.data.length;
        }).catch(function(response2){
            $scope.status = response2.status + " " + response2.statusText;
            //$scope.life_expectancy_stats = response2.data;
        });
    }
    
    $scope.addStat = function (){
        var newStat = $scope.newStat;
        //if(newStat.country==null||newStat.country==null||newStat.country==null||newStat.country==null||newStat.country==null)
        if(newStat){
            newStat.year = parseInt(newStat.year);
            newStat.expectancy_woman = parseFloat(newStat.expectancy_woman);
            newStat.expectancy_man = parseFloat(newStat.expectancy_man);
            newStat.expectancy = parseFloat(newStat.expectancy);
            elementosTotales = elementosTotales + 1;
            console.log("Adding a new stat: "+JSON.stringify(newStat,null,2));
            $http.post(API,newStat).then(function (response){
                console.log("POST Response: " + response.status + " " + response.data);
                $scope.status = response.status + " " + response.statusText;
                if(response.status==201){
                    alert("Elemento añadido con éxito");
                }
                refresh();
            }).catch(function(response2){
                $scope.status = response2.status + " " + response2.statusText;
                //$scope.life_expectancy_stats = response2.data;
                if(response2.status==400){
                    alert("Elemento no añadido: Revise el si todos los campos están completados y el formato de estos");
                }else if(response2.status==409){
                    alert("Elemento no añadido: Elemento ya existente");
                }
            });
        }
    };
    $scope.putStat = function (){
        var updateStat = $scope.updateStat;
        //if(newStat.country==null||newStat.country==null||newStat.country==null||newStat.country==null||newStat.country==null)
        if(updateStat){
            updateStat.year = parseInt(updateStat.year);
            updateStat.expectancy_woman = parseFloat(updateStat.expectancy_woman);
            updateStat.expectancy_man = parseFloat(updateStat.expectancy_man);
            updateStat.expectancy = parseFloat(updateStat.expectancy);
            console.log("Updating a stat: "+JSON.stringify(updateStat,null,2));
            $http.put(API+"/"+updateStat.country+"/"+updateStat.year,updateStat).then(function (response){
                console.log("POST Response: " + response.status + " " + response.data);
                $scope.status = response.status + " " + response.statusText;
                if(response.status==200){
                    alert("Elemento editado con éxito");
                }
                refresh();
            }).catch(function(response2){
                $scope.status = response2.status + " " + response2.statusText;
                //$scope.life_expectancy_stats = response2.data;
                if(response2.status==404){
                    alert("Elemento no editado: El elemento no existe");
                }else if(response2.status==400){
                    alert("Elemento no editado: Revise el si todos los campos están completados y el formato de estos");
                }
            });
        }
    };
    $scope.deleteStat = function (country,year){
        console.log("Deleting stat with country: <"+country+"> and year: <"+year+">");
        elementosTotales = elementosTotales - 1;
        $http.delete(API+"/"+country+"/"+year).then(function (response){
            console.log("DELETE Response: " + response.status + " " + response.data);
            if(response.status==200){
                alert("Elemento eliminado con éxito");
            }
            refresh();
        }).catch(function (data){
            console.log(data.status);
            if(data.status!=200){
                alert("Elemento no eliminado: Ha ocurrido un problema");
            }
        });
    };
    //$scope.putStat = function (country,year,expectancy_woman,expectancy_man,expectancy){};
    $scope.deleteAllStats = function (){
        console.log("Deleting all stats");
        elementosTotales = 0;
        $http.delete(API).then(function (response){
            console.log("DELETE Response: " + response.status + " " + response.data);
            if(response.status==200){
                alert("Elementos eliminados con éxito");
            }
            refresh();
        }).catch(function (data){
            console.log(data.status);
            if(data.status!=200){
                alert("Elementos no eliminados: Ha ocurrido un problema");
            }
        });
    };
    $scope.restoreStats = function (){
        console.log("Restoring stats");
        $http.get(API+"/loadInitialData").then(function (response){
            //console.log("Data received: " + JSON.stringify(response.data,null,2));
            //$scope.life_expectancy_stats = response.data;
            if(response.status==201){
                alert("Elementos restaurados con éxito");
            }
            refresh();
        }).catch(function (data){
            console.log(data.status);
            if(data.status==409){
                alert("Elementos no restaurados: Ya están en la base de datos");
            }
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
            if(response.data.length==0){
                alert("No se encontraro resultados para la siguiente búsqueda: "+
                "\n País: "+ searchedStat.country+
                "\n Año: "+ searchedStat.year+
                "\n Experanza para la mujer: "+ searchedStat.expectancy_woman+
                "\n Esperanza para el hombre: "+ searchedStat.expectancy_man+
                "\n Esperanza: "+ searchedStat.expectancy);
            }else{
                $scope.life_expectancy_stats = response.data;
            }
        }).catch(function (data){
            console.log(data.status);
        });
    }
    $scope.searchTimeInterval = function (){
        var searchStringT = API;
        var searchedStatT = $scope.searchedStatT;
        if(searchedStatT.from>searchedStatT.to){
            alert("El campo 'Desde' debe ser menor o igual al campo 'Hasta'");
        }
        if(searchedStatT){
        if(searchedStatT.from&&searchedStatT.to){
            searchStringT = searchStringT+"?";
            if(searchedStatT.from){searchStringT = searchStringT+"from="+searchedStatT.from+"&";}
            if(searchedStatT.to){searchStringT = searchStringT+"to="+searchedStatT.to+"&";}
        }else{
            alert("Hay que definir ambos parámetros para buscar por intervalo temporal");
        }}
        console.log("Searching stats: "+searchStringT);
        $http.get(searchStringT).then(function (response){
            //console.log("Data received: " + JSON.stringify(response.data,null,2));
            if(response.data.length==0){
                alert("No se encontraro resultados para la siguiente búsqueda: "+
                "\n Desde el año: "+ searchedStatT.from+
                "\n Hasta el año: "+ searchedStatT.to);
            }else{
                $scope.life_expectancy_stats = response.data;
            }
        });
    }
    var empezarPor = 0;
    var numeroAVisualizar = 10;
    $scope.paged = function () {
        var paginadoAPI = API;
        var pageded = $scope.pageded;
        if(pageded){
            paginadoAPI = paginadoAPI+"?";
            if(pageded.inicio){
                paginadoAPI = paginadoAPI+"offset="+pageded.inicio+"&";
                empezarPor = parseInt(pageded.inicio);
            }
            if(pageded.numero){
                paginadoAPI = paginadoAPI+"limit="+pageded.numero+"&";
                numeroAVisualizar = parseInt(pageded.numero);
            }
        }
        console.log("Paging stats: "+paginadoAPI);
        $http.get(paginadoAPI).then(function (response){
            //console.log("Data received: " + JSON.stringify(response.data,null,2));
            $scope.life_expectancy_stats = response.data;
        });
    }
    $scope.pagedPrevious = function () {
        var paginadoAPIP = API;
        if((empezarPor-numeroAVisualizar)<0){
            console.log("Estos son los primeros "+numeroAVisualizar+" elementos");
            alert("Estos son los primeros "+numeroAVisualizar+" elementos");
            empezarPor = 0;
        }else{
            empezarPor = empezarPor - numeroAVisualizar;
        }
        paginadoAPIP = paginadoAPIP+"?";
        paginadoAPIP = paginadoAPIP+"offset="+empezarPor+"&";
        paginadoAPIP = paginadoAPIP+"limit="+numeroAVisualizar+"&";
        console.log("Paging stats: "+paginadoAPIP);
        $http.get(paginadoAPIP).then(function (response){
            //console.log("Data received: " + JSON.stringify(response.data,null,2));
            $scope.life_expectancy_stats = response.data;
        });
    }
    $scope.pagedFollowing = function () {
        var paginadoAPIF = API;
        //console.log(elementosTotales);
        //console.log(empezarPor);
        //console.log(numeroAVisualizar);
        if((empezarPor+numeroAVisualizar)>=elementosTotales){
            empezarPor = elementosTotales-numeroAVisualizar;
            console.log("Estos son los últimos "+numeroAVisualizar+" elementos");
            alert("Estos son los últimos "+numeroAVisualizar+" elementos");
        }else{
            empezarPor = empezarPor + numeroAVisualizar;
        }
        paginadoAPIF = paginadoAPIF+"?";
        paginadoAPIF = paginadoAPIF+"offset="+empezarPor+"&";
        paginadoAPIF = paginadoAPIF+"limit="+numeroAVisualizar+"&";
        console.log("Paging stats: "+paginadoAPIF);
        $http.get(paginadoAPIF).then(function (response){
            //console.log("Data received: " + JSON.stringify(response.data,null,2));
            $scope.life_expectancy_stats = response.data;
        });
    }
}]);