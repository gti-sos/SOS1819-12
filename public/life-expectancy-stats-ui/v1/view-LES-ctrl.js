/* global angular */
/*global Highcharts*/
/*global d3*/

angular.module("SOS181912App").controller("ViewLESCtrl",["$scope","$http", function ($scope,$http){
        console.log("View LES Controller initialized");
        var API = "/api/v1/life-expectancy-stats";
        
        
        $http.get(API).then(function(response){
            
            Highcharts.chart('container-LES', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Life expectancy stats'
                },
                xAxis: {
                    categories: response.data.map(function(d){return d.country+"-"+d.year}),
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Age'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f} years</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: 'Life expectancy for woman',
                    data: response.data.map(function(d){return d["expectancy_woman"]})
            
                }, {
                    name: 'Life expectancy for man',
                    data: response.data.map(function(d){return d["expectancy_man"]})
            
                }, {
                    name: 'Life expectancy',
                    data: response.data.map(function(d){return d["expectancy"]})
            
                }]
            });
            
            var dat1 = [];
            for(var i=0; i<23;i++){
                var e = response.data.slice(i,i+1).map(function(d){return d["expectancy"]});
                e = e[0];
                dat1.push(e);
            }
            
            //Ancho y Altura
            var w = 1340;
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
            
        });
}]);