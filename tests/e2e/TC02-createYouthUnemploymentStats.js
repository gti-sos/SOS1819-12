describe("Check if a new stat can be created: ", function(){
        
        it("List should grow after the contact creation", function(){
                
                browser.get("https://sos1819-12.herokuapp.com/ui/v1/youth-unemployment-stats/#!/");
                
          
                
                element.all(by.repeater("stat in youth_unemployment_stats"))
                    .then(function(initialStats){
         
                                element(by.model("newStat.country")).sendKeys("testprueba");
                                element(by.model("newStat.year")).sendKeys(8888);
                                element(by.model("newStat.youth_unemployment")).sendKeys(282.364);
                                element(by.model("newStat.youth_unemployment_man")).sendKeys(0.18);
                                element(by.model("newStat.youth_unemployment_woman")).sendKeys(6.09);
                                element(by.css('[value="Añadir:"]')).click();
                                element.all(by.repeater("stat in youth_unemployment_stats"))
                                    .then(function(finalStats){
                                        expect(finalStats.length).toEqual(initialStats.length+1);
                                    });
                                
                });
                
                
        });
});