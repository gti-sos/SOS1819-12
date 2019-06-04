/*global angular */
/*global zingchart*/


angular.module("SOS181912App")

    .controller("eduCtrl", ["$scope", "$http", function($scope, $http) {
    
    console.log("centers Controller initialized.");

    var API = "/api/v1/pollution-stats";
    var G15 = "proxyG15";

    
    var pollution_tco2 = [];
    
    var name = [];
    var id=[];
   
   
     
    var data=[];
    
     

    $http.get(API).then(function(response){
        
        pollution_tco2 = response.data.map(function(d) { return d.pollution_kg1000 });
       
        data= response.data;
        console.log(data);

    $http
        .get(G15)
        .then(function(response) {
            
            name = response.data.map(function(d) { return d.name });
            id = response.data.map(function(d) { return d.id });
            data = response.data;
            console.log("Data received:" + JSON.stringify(response.data, null, 2));
    var myConfig = {
    type: "hbar",
    title: {
    text:"Pollucion de los centros:<br>"
    +"id="+id[19].toString()+"=> name: Escuela Superior de Arte Dramático, "
    +"id="+id[20].toString()+"=> name: San Isidoro, "
    +"id="+id[21].toString()+"=> name: Instituto Técnico Superior de Informática Studium II",
    align: "left",
    
    
    
    fontColor: "#555",
    fontSize: 14,
    fontFamily: "Roboto",
    fontWeight: 'normal',
    offsetX: 10
    },
    subtitle: {
    offsetY: 15,
    text: "Polución de escuelas por año,<br> ",
    
    fontFamily: "Roboto",
    fontSize: 16,
    align: 'left',
    fontColor: "#777",
    offsetX: 10
     },
    tooltip:{
    padding: 10,
    fontSize: 14,
    text: "pollution_tco2 = %v <br>en %t",
    backgroundColor: "#fff",
    fontColor: "#444",
    borderRadius: "5px",
    borderColor: "#333",
    borderWidth: 1
    },
 
    legend: {
    offsetY: 80,
    offsetX: 0,
    padding: 10,
    backgroundColor: "transparent",
    borderWidth: "0px",
    highlightPlot: true,
    item: {
      fontSize: 18,
      fontColor: "#666",
      fontFamily: "Roboto",
      
    },
    marker:{
      borderRadius: 10,
      borderWidth: "0px",
    },
    cursor: "hand"
    },
     plotarea:{
    margin: "100 130 70 100"
    },
    plot:{
    borderRadius: "0 5 5 0",
    hightlightMarker: {
      backgroundColor:"red"
    },
    highlightState: {
      backgroundColor:"red"
    },
     animation:{
 	    effect: 4,
 	    method: 0,
 	    sequence: 1
 	  }
    },
    source: {
    text: "Source: sec.gov",
    fontColor: "#666",
    fontFamily: 'Roboto'
    },
    scaleX: {
 	  labels: [id[19],id[20], id[21]],
 	  item: {
 	    fontFamily: "Roboto",
 	    fontSize: 14
 	  },
 	  lineColor: "#DDD",
 	  tick:{
 	    visible: false
 	  }
 	},
 	scaleY: {
 	  label:{
 	    offsetY: 5,
 	    text: "Polución_tco2 por año",
 	    fontColor: "#777",
 	    fontSize: 14,
 	    fontFamily: "Roboto",
 	  },
 	  item: {
 	    // fontColor: "#fff",
 	    fontFamily: "Roboto",
 	    fontSize: 14
 	  },
 	  lineWidth: 0,
 	  tick: {
 	    visible: false
 	  },
 	  guide:{
 	    lineStyle: "solid",
 	    lineColor: "#DDD"
 	  },
 	  values: "0:1:1.0"
 	},
	series : [
	  {
		  text: "2015",
		  // values: [4820, 8067, 12000, 12100, 12282, 12540],
		  values: [pollution_tco2[1],pollution_tco2[4],pollution_tco2[8]],
		  backgroundColor: "#d6d6d6",
		  rules: [
		    { rule: '%i==0', backgroundColor: '#f98377'},
		    { rule: '%i==1', backgroundColor: '#fbd972'},
		    { rule: '%i==2', backgroundColor: '#78e5d2'},
		    { rule: '%i==3', backgroundColor: '#7ad8e5'},
		    { rule: '%i==4', backgroundColor: '#d2f27c'},
		    { rule: '%i==5', backgroundColor: '#e572ec'},
		  ]
		},
 
		{
		  text: "2016",
		  // values: [2670, 6041, 11400, 11500,9832, 9275],
		  values: [pollution_tco2[2],pollution_tco2[5],pollution_tco2[9]],
		  backgroundColor: "#8e8e8e",
		  rules: [
		    { rule: '%i==0', backgroundColor: '#F55443'},
		    { rule: '%i==1', backgroundColor: '#FFCC33'},
		    { rule: '%i==2', backgroundColor: '#44b6a2'},
		    { rule: '%i==3', backgroundColor: '#10A5BA'},
		    { rule: '%i==4', backgroundColor: '#96BD2C'},
		    { rule: '%i==5', backgroundColor: '#b42cbd'},
		  ]
		},
		{
		  text: "2017",
		  values: [pollution_tco2[0],pollution_tco2[3],pollution_tco2[6]],
		  // values: [1420, 4475, 10400, 10600, 7137, 6565],
		  backgroundColor: "#494949",
		  rules: [
		    { rule: '%i==0', backgroundColor: '#EB1C12'},
		    { rule: '%i==1', backgroundColor: '#FBA30A'},
		    { rule: '%i==2', backgroundColor: '#1c8976'},
		    { rule: '%i==3', backgroundColor: '#016B88'},
		    { rule: '%i==4', backgroundColor: '#588C08'},
		    { rule: '%i==5', backgroundColor: '#781c7e'},
		  ]
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