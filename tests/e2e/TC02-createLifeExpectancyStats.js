describe("Check if a new stat of life expectancy can be created: ", function(){
        
        it("List should grow after the stat creation", function(){
                
            browser.get("https://sos1819-12.herokuapp.com/#!/ui/v1/life-expectancy-stats");
                
            element.all(by.repeater("stat in life_expectancy_stats")).then(function(initialStats){
         
                element(by.model("newStat.country")).sendKeys("paisPrueba");
                element(by.model("newStat.year")).sendKeys("2999");
                element(by.model("newStat.expectancy_woman")).sendKeys("999");
                element(by.model("newStat.expectancy_man")).sendKeys("999");
                element(by.model("newStat.expectancy")).sendKeys("999");
                element(by.css('[value="add"]')).click();
                element.all(by.repeater("stat in life_expectancy_stats")).then(function(finalStats){
                    expect(finalStats.length).toEqual(initialStats.length+1);
                });
                                
            });
                
        });
});