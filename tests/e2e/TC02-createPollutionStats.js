describe("Check if a new stat can be created: ", function(){
        
        it("List should grow after the contact creation", function(){
                
                browser.get("https://sos1819-12.herokuapp.com/ui/v1/pollution-stats/#!/");
                
                check();
                
                function check(){
                
                element.all(by.repeater("stat in pollutionStats"))
                    .then(function(initialStats){
                
                        if(initialStats.length==6){
                                    
                                element(by.css('[value="Siguiente"]')).click().then(check());
                                    
                                } else {
                
                
                                element(by.model("newStat.country")).sendKeys("testprueba");
                                element(by.model("newStat.year")).sendKeys(8888);
                                element(by.model("newStat.pollution_tco2")).sendKeys(282.364);
                                element(by.model("newStat.pollution_kg1000")).sendKeys(0.18);
                                element(by.model("newStat.pollution_perca")).sendKeys(6.09);
                                element(by.css('[value="Añadir:"]')).click();
                                element.all(by.repeater("stat in pollutionStats"))
                                    .then(function(finalStats){
                                        expect(finalStats.length).toEqual(initialStats.length+1);
                                    })};
                })};
                
                
        });
});