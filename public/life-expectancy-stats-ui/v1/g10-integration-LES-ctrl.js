/* global angular */
/*global d3*/

angular.module("SOS181912App").controller("G10IntegrationLESCtrl",["$scope","$http", function ($scope,$http){
        console.log("G10 integration LES Controller initialized");
        var API = "/api/v1/life-expectancy-stats";
        var API_2 = "/proxy/api/e-car-statics";
        
        $http.get(API).then(function(response){
            $http.get(API_2).then(function(response2){
                
                var dat1 = [];
                var dat2 = [];
                for(var i=0; i<5;i++){
                    var e = response.data.slice(i,i+1).map(function(d){return d["expectancy"]});
                    e = e[0];
                    var y = response2.data.slice(i,i+1).map(function(d){return d["existsVehicles"]/1000});
                    y = y[0]*2;
                    dat1.push(e);
                    dat2.push(y);
                }
                
                var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
                //Ancho y Altura
                var w = 970;
                var h = 200;
                var barPadding = 1;
                //Creará un elemento SVG 
                var svg = d3.select(".barras")
                        .append("svg")
                        .attr("width", w)
                        .attr("height", h);
                svg.selectAll("rect")
                    .data(dat1)
                    .enter()
                    .append("rect")
                    .attr("x", function(d, i) {
                        return i * (w / dat1.length);
                    }).attr("y", function(d) {
                        return h - d;  //Altura menos el dato
                    }).attr("width", w / dat1.length - barPadding)
                    .attr("height", function(d) {
                        return d*4;  //Solo el dato
                    }).attr("fill", function(d) {
                        return "rgb(0, 0, " + (d * 10) + ")";
                    });
                svg.selectAll("text").data(dat1).enter().append("text")
                    .text(function(d){
                        return d+" years";
                    }).attr("text-anchor", "middle")
                    .attr("x", function(d, i) {
    			   		return i * (w / dat1.length) + (w / dat1.length - barPadding) / 2;
    			   })
    			   .attr("y", function(d) {
    			   		return h - (d) + 14;
    			   })
    			   .attr("font-family", "sans-serif")
    			   .attr("font-size", "11px")
    			   .attr("fill", "white");
                
                //-------
                var svg2 = d3.select(".barras1")
                        .append("svg")
                        .attr("width", w)
                        .attr("height", h);
                svg2.selectAll("rect")
                    .data(dat2)
                    .enter()
                    .append("rect")
                    .attr("x", function(d, i) {
                        return i * (w / dat2.length);
                    }).attr("y", function(d) {
                        return d;  //Altura menos el dato
                    }).attr("width", w / dat2.length - barPadding)
                    .attr("height", function(d) {
                        return d*4;  //Solo el dato
                    }).attr("fill", function(d) {
                        return "rgb(0, 0, " + (d * 10) + ")";
                    });
                svg2.selectAll("text").data(dat2).enter().append("text")
                    .text(function(d){
                        return d+" number of e-cars";
                    }).attr("text-anchor", "middle")
                    .attr("x", function(d, i) {
    			   		return i * (w / dat2.length) + (w / dat2.length - barPadding) / 2;
    			   })
    			   .attr("y", function(d) {
    			   		return d + 20;
    			   })
    			   .attr("font-family", "sans-serif")
    			   .attr("font-size", "11px")
    			   .attr("fill", "white");
            });
			   
        });
}]);