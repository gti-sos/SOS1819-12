/* global angular */
/* global zingchart */

var app = angular.module("SOS181912App");

app.controller("SportsCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("Sports Controller initialized.");

    var API1 = "/api/v1/youth-unemployment-stats";
    var API2 = "https://sos1819-15.herokuapp.com/api/v2/sports-competitions";

    var countries1 = [];
    var lengthactivities = [];
    var youth_unemployments = [];
    var schoolcenters = [];
     
    var data=[];
    
    
    
     $http.get(API1).then(function(response){
        countries1 = response.data.map(function(d) { return d.country });
        youth_unemployments = response.data.map(function(d) { return parseFloat(d.youth_unemployment) });
        data= response.data;
        console.log(data);
    
    
    $http
            .get(API2)
            .then(function(response) {
                schoolcenters = response.data.map(function(d) { return d.schoolcenter });
                lengthactivities = response.data.map(function(d) { return d.lengthactivity });
                data = response.data;
              console.log("Data received:" + JSON.stringify(response.data, null, 2));
            

         //ZingCharts 
       
 
        var myConfig = {
         	type: "pie",
         	backgroundColor : "#f1f1f1 #ffffff",
         	title : {
         	  text : "",
         	  backgroundColor:"#052C4E"
         	},
         	subtitle : {
         	  text : ""
         	},
         	legend:{
         	  layout: "h",
         	  align: "center",
         	  verticalAlign: "bottom",
         	  toggleAction: "remove",
         	  header: {
         	    text: "County",
         	    backgroundColor: "#052C4E"
         	  },
         	  shadow:0
         	},
         	plotarea: {
         	  y: 150
         	},
         	plot: {
         	  refAngle: 180,
         	  size: 250,
         	  valueBox: {
         	    placement: "in",
         	    offsetR: 20
         	  }
         	},
         	scaleR: {
         	  aperture:180
         	},
         	tooltip : {
         	  text: "%t<br>Datos: %v<br>Porcentaje%npv%",
         	  textAlign: "left",
         	  shadow: 0,
         	  borderRadius: 4,
         	  borderWidth: 2,
         	  borderColor: "#fff"
         	},
        	series : [
        	  {
        			values : [youth_unemployments[0]],
        			text: countries1[5],
        			backgroundColor:"#2870B1"
        		},
        		{
        			values : [lengthactivities[0]],
        			text: schoolcenters[0],
        			backgroundColor:"#BB1FA8"
        		},
        		{
        			values : [youth_unemployments[10]],
        			text: countries1[10],
        			backgroundColor:"#7E971D"
        		},
        		
        		{
        			values : [lengthactivities[3]],
        			text: schoolcenters[3],
        			backgroundColor:"#FFA72A"
        			
        		},
        		{
        			values : [youth_unemployments[15]],
        			text: countries1[15],
        			backgroundColor:"#54004A"
        		}
        	]
        };
         
        zingchart.render({ 
        	id : 'myChart', 
        	data : myConfig, 
        });
                });
                 
                        
                    
            });
}]);