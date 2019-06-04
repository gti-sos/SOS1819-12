/* global angular */
/* global zingchart */

angular.module("SOS181912App").controller("G11IntegrationLESCtrl",["$scope","$http", function ($scope,$http){
        console.log("G11 integration LES Controller initialized");
        var API = "/api/v1/life-expectancy-stats";
        var API_2 = "/proxy/api/general-public-expenses";
        
        $http.get(API).then(function(response){
            $http.get(API_2).then(function(response2){
                
                zingchart.THEME="classic";
                var myConfig = 
                    {
                        "type": "line",
                        "background-color": "#003849",
                        "utc": true,
                        "title": {
                            "y": "7px",
                            "text": "Integration between life expectancy and health and education public expenses",
                            "background-color": "#003849",
                            "font-size": "24px",
                            "font-color": "white",
                            "height": "25px"
                        },
                        "plotarea": {
                            "margin": "20% 8% 14% 12%",
                            "background-color": "#003849"
                        },
                        "legend": {
                            "layout": "float",
                            "background-color": "none",
                            "border-width": 0,
                            "shadow": 0,
                            "text-align":"middle",
                            "offsetY": 35,
                            "align": "center",
                            "item": {
                                "font-color": "#f6f7f8",
                                "font-size": "14px"
                            }
                        },
                        "scale-x": {
                            "values": response.data.slice(0,13).map(function(d){return d["country"]+"-"+d["year"]}),
                            "shadow": 0,
                            "step": 3600000,
                            "line-color": "#f6f7f8",
                            "tick": {
                                "line-color": "#f6f7f8"
                            },
                            "guide": {
                                "line-color": "#f6f7f8"
                            },
                            "item": {
                                "font-color": "#f6f7f8"
                            },
                            
                            "label": {
                                "visible": false
                            },
                            "minor-ticks": 0
                        },
                        "scale-y": {
                            "values": "0:100:10",
                            "line-color": "#f6f7f8",
                            "shadow": 0,
                            "tick": {
                                "line-color": "#f6f7f8"
                            },
                            "guide": {
                                "line-color": "#f6f7f8",
                                "line-style": "dashed"
                            },
                            "item": {
                                "font-color": "#f6f7f8"
                            },
                            "label": {
                                "text": "Years/Millions",
                                "font-color": "#f6f7f8"
                            },
                            "minor-ticks": 0,
                            "thousands-separator": ","
                        },
                        "crosshair-x": {
                            "line-color": "#f6f7f8",
                            "plot-label": {
                                "border-radius": "5px",
                                "border-width": "1px",
                                "border-color": "#f6f7f8",
                                "padding": "10px",
                                "font-weight": "bold"
                            },
                            "scale-label": {
                                "font-color": "#00baf0",
                                "background-color": "#f6f7f8",
                                "border-radius": "5px"
                            }
                        },
                        "tooltip": {
                            "visible": false
                        },
                        "plot": {
                            "tooltip-text": "%t views: %v<br>%k",
                            "shadow": 0,
                            "line-width": "3px",
                            "marker": {
                                "type": "circle",
                                "size": 3
                            },
                            "hover-marker": {
                                "type": "circle",
                                "size": 4,
                                "border-width": "1px"
                            }
                        },
                        "series": [
                            {
                                "values": response.data.slice(0,13).map(function(d){return d["expectancy"]}),
                                "text": "Life expectancy",
                                "line-color": "#007790",
                                "legend-marker": {
                                    "type": "circle",
                                    "size": 5,
                                    "background-color": "#007790",
                                    "border-width": 1,
                                    "shadow": 0,
                                    "border-color": "#69dbf1"
                                },
                                "marker": {
                                    "background-color": "#007790",
                                    "border-width": 1,
                                    "shadow": 0,
                                    "border-color": "#69dbf1"
                                }
                            },
                            {
                                "values": response2.data.slice(0,13).map(function(d){return d["healthExpense"]}),
                                "text": "Health expense",
                                "line-color": "#009872",
                                "legend-marker": {
                                    "type": "circle",
                                    "size": 5,
                                    "background-color": "#009872",
                                    "border-width": 1,
                                    "shadow": 0,
                                    "border-color": "#69f2d0"
                                },
                                "marker": {
                                    "background-color": "#009872",
                                    "border-width": 1,
                                    "shadow": 0,
                                    "border-color": "#69f2d0"
                                }
                            },
                            {
                                "values": response2.data.slice(0,13).map(function(d){return d["educationExpense"]}),
                                "text": "Education expense",
                                "line-color": "#da534d",
                                "legend-marker": {
                                    "type": "circle",
                                    "size": 5,
                                    "background-color": "#da534d",
                                    "border-width": 1,
                                    "shadow": 0,
                                    "border-color": "#faa39f"
                                },
                                "marker": {
                                    "background-color": "#da534d",
                                    "border-width": 1,
                                    "shadow": 0,
                                    "border-color": "#faa39f"
                                }
                            }
                        ]
                    };
 
                zingchart.render({ 
                	id : 'container-LES', 
                	data : myConfig
                });
                    
            });
        });
}]);