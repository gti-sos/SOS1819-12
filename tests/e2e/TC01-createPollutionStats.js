describe("Check if a new stat can be created: ", function(){
        
        it("List should grow after the contact creation", function(){
                
                browser.get("https://sos1819-12.herokuapp.com/ui/v1/pollution-stats/#!/");
                
                var initialStats = element.all(by.repeater("stat in pollutionStats"))
                    .then(function(initialStats){
                
                        element(by.model("newStat.country")).sendkeys("testprueba");
                        element(by.model("newStat.year")).sendkeys(8888);
                        element(by.model("newStat.pollution_tco2")).sendkeys(282.364);
                        element(by.model("newStat.pollution_kg1000")).sendkeys(0.18);
                        element(by.model("newStat.pollution_perca")).sendkeys(6.09);
                        element(bs.css('[value="Añadir:"]')).click();
                });
                
                
        });
});