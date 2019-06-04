/* global angular */
/* global chart */
/* global zingchart */
/* global ZC */

angular.module("SOS181912App")
    .controller("ApiExt2Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
        console.log("External Api Controller initialized ");
    
    var API1 = "/api/v1/youth-unemployment-stats";
    var API2 = "https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?t=manchester";
    var youth_unemployments = [];
    var countries = [];
    var strTeams = [];
    var data = [];
     
     $http.get(API1).then(function(response){
        youth_unemployments = response.data.map(function(d) { return d.youth_unemployment });
       countries = response.data.map(function(d) { return d.country });
        
            $http.get(API2).then(function(response) {
                    data = response.data;
                    
            for (var e = 0; e < 5; e++) {
                 strTeams.push(response.data['player'][e].strPlayer)
                }
                    console.log(data);
                    console.log(strTeams);

        //ZingCharts
        ZC.LICENSE = ["b55b025e438fa8a98e32482b5f768ff5"];
        zingchart.THEME = "classic";
 
        var myConfig = {
            "graphset": [{
                "type": "venn",
                "background-color": "#F4F4F4",
                "title": {
                    "y": "0px",
                    "text": "API EXTERNA 2",
                    "background-color": "#424242",
                    "font-color": "#fff",
                    "font-size": "18",
                    "font-weight": "none",
                    "height": "40px"
                },
                "plotarea": {
                    "margin": "25 0 0 0"
                },
                "series": [{
                        "text": "Stalking",
                        "values": [
                            100
                        ],
                        "join": [
                            33
                        ],
                        "value-box": {
                            "text": strTeams[1],
                            "font-family": "arial",
                            "font-size": "18px",
                            "font-color": "#000000",
                            "bold": true,
                            "joined": {
                                "text": countries[15],
                                "font-size": "14px",
                                "bold": false,
                                "offset-y": 40
                            }
                        },
                        "background-color": "#673ab7",
                        "border-width": "2px",
                        "border-color": "#000000",
                        "alpha": "0.75",
                        "shadow": false,
                        "tooltip": {
                            "text": "<i>Stalk</i><br>1. pursue or approach stealthily.<br>2. stride somewhere in a proud, stiff, or angry manner.",
                            "shadow": false,
                            "border-radius": "3px"
                        }
                    },
                    {
                        "text": "Distraction",
                        "values": [
                            100
                        ],
                        "join": [
                            33
                        ],
                        "value-box": {
                            "text": strTeams[2],
                            "offset-x": "5%",
                            "font-family": "arial",
                            "font-size": "18px",
                            "font-color": "#000000",
                            "bold": true,
                            "joined": {
                                "text": countries[21],
                                "font-size": "14px",
                                "bold": false,
                                "offset-x": 30,
                                "offset-y": -20
                            }
                        },
                        "background-color": "#009688",
                        "border-width": "2px",
                        "border-color": "#000000",
                        "alpha": "0.75",
                        "shadow": false,
                        "tooltip": {
                            "text": "<i>Distraction</i><br>1. a thing that prevents someone from giving full attention to something else.<br>2. extreme agitation of the mind or emotions.",
                            "shadow": false,
                            "border-radius": "3px"
                        }
                    },
                    {
                        "text": "Vanity",
                        "values": [
                            100
                        ],
                        "join": [
                            33
                        ],
                        "value-box": {
                            "text":strTeams[0],
                            "font-family": "arial",
                            "font-size": "18px",
                            "font-color": "#000000",
                            "bold": true,
                            "joined": {
                                "text": countries[0],
                                "font-size": "14px",
                                "bold": false,
                                "offset-x": -30,
                                "offset-y": -20
                            },
                            "shared": {
                                "text": countries[6],
                                "font-size": "14px"
                            }
                        },
                        "background-color": "#03a9f4",
                        "border-width": "2px",
                        "border-color": "#000000",
                        "alpha": "0.75",
                        "shadow": false,
                        "tooltip": {
                            "text": "<i>Vanity</i><br>1. excessive pride in or admiration of one's own appearance or achievements.<br>2. the quality of being worthless or futile.",
                            "shadow": false,
                            "border-radius": "3px"
                        }
                    }
                ]
            }]
        };
 
        zingchart.render({
            id: 'myChart',
            data: myConfig,
        });
                  
            
                });
        });
    
    
    }]);