/* global angular */
/* global zingchart */

angular.module("SOS181912App").controller("G06IntegrationLESCtrl",["$scope","$http", function ($scope,$http){
        console.log("G06 integration LES Controller initialized");
        var API = "/api/v1/life-expectancy-stats";
        var API_2 = "/proxy/api/uefa-club-rankings";
        
        $http.get(API).then(function(response){
            $http.get(API_2).then(function(response2){
                
                var myConfig = {
                  backgroundColor : "#fff",
                  globals : {
                    shadow : false,
                    fontFamily : "Helvetica"
                  },
                 	type: "area", 
                 	title :{
                 	  text : "Integration between life expectancy and uefa club rankings",
                 	  fontColor : "#5f5f5f",
                 	  backgroundColor : "transparent",
                 	  textAlign : "left",
                 	  padding: "15px 15px",
                 	  fontSize : "20px"
                 	},
                 	legend : {
                    layout:'float',
                 	  backgroundColor : "transparent",
                 	  borderColor : "transparent",
                 	  marginTop:30,
                 	  marker : {
                 	    borderRadius : "50px",
                 	    borderColor : "transparent"
                 	  },
                 	  item : {
                 	    fontColor : "#5f5f5f"
                 	  }
                 	  
                 	},
                 	scaleX : {
                 	  maxItems : 8,
                 	  transform : {
                 	    type : 'date'
                 	  },
                 	  zooming : true,
                 	  values : response.data.slice(0,9).map(function(d){return d["country"]+"-"+d["year"]}),
                 	  lineColor : "#5f5f5f",
                 	  lineWidth : "1px",
                 	  tick : {
                 	    lineColor : "#5f5f5f",
                 	    lineWidth : "1px"
                 	  },
                 	  item : {
                 	    fontColor : "#5f5f5f"
                 	  },
                 	  guide : {
                 	    visible : false
                 	  }
                 	},
                 	scaleY : {
                 	  lineColor : "#5f5f5f",
                 	  lineWidth : "1px",
                 	  tick : {
                 	    lineColor : "#5f5f5f",
                 	    lineWidth : "1px"
                 	  },
                 	  guide : {
                 	    lineStyle : "solid",
                 	    lineColor : "#626262"
                 	  },
                 	   item : {
                 	    fontColor : "#5f5f5f"
                 	  },
                 	},
                 	tooltip : {
                 	  visible : false
                 	},
                 	crosshairX :{
                 	  scaleLabel : {
                 	    backgroundColor : "#fff",
                 	    fontColor : "black",
                 	    borderColor:"#333",
                 	    borderWidth: 1,
                 	    borderRadius: 3
                 	  },
                 	  plotLabel :{
                 	    backgroundColor : "#434343",
                 	    fontColor : "#FFF"
                 	  }
                 	},
                 	plot : {
                 	  "contour-on-top":false,
                 	  alphaArea : 1,
                 	  lineWidth : "2px",
                 	  aspect : "spline",
                 	  marker : {
                 	    visible : false
                 	  },
                 	  animation:{
                      delay: 500,
                      effect: "ANIMATION_SLIDE_TOP",
                      speed: 700,
                      method: 0,
                      sequence: 1
                 	  }
                 	},
                	series : [
                	{
                      text:"Points (*1000)",
                      values:response2.data.slice(0,9).map(function(d){return d["points"]/1000}),
                      backgroundColor1: "#45C392",
                      backgroundColor2: "#45C392",
                      lineColor : "#45C392"
                    },
                    {
                      text:"Life expectancy",
                      values: response.data.slice(0,9).map(function(d){return d["expectancy"]}),
                      backgroundColor1: "#E84F28",
                      backgroundColor2: "#E84F28",
                      lineColor : "#E84F28"
                    },
                    {
                      text:"Points be for season (*1000)",
                      values:response2.data.slice(0,9).map(function(d){return d["ptsbeforeseason"]/1000}),
                      backgroundColor1: "#FBA645",
                      backgroundColor2: "#FBA645",
                      lineColor : "#FBA645"
                    },
                    {
                      text:"Poinst season (*1000)",
                      values:response2.data.slice(0,9).map(function(d){return d["ptsseason"]/1000}),
                      backgroundColor1: "#28C2D1",
                      backgroundColor2: "#28C2D1",
                      lineColor : "#28C2D1"
                    },
                    {
                      text:"Club - season",
                      values:response2.data.slice(0,9).map(function(d){return d["team"]+"-"+d["season"]}),
                      backgroundColor1: "#C2D128",
                      backgroundColor2: "#C2D128",
                      lineColor : "#C2D128"
                    }
                	]
                };
                 
                zingchart.render({ 
                	id : 'container-LES', 
                	data : myConfig, 
                	height: '100%', 
                	width: '100%' ,
                });
                    
            });
        });
}]);