describe("Check if a stat can be removed: ", function(){
        
        it("List should grow after the stat deletion", function(){
                
            browser.get("https://localhost:8080/ui/v1/life-expectancy-stats/#!/");
                
            element.all(by.repeater("stat in life_expectancy_stats")).then(function(initialStats){
                
                element.all(by.css('[value="remove"]')).last().click();
                element.all(by.repeater("stat in life_expectancy_stats")).then(function(finalStats){
                    expect(finalStats.length).toEqual(initialStats.length-1);
                });
                                
            });
                
        });
});