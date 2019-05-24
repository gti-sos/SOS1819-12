describe("Check if a stat can be removed: ", function(){
        
        it("List should grow after the stat deletion", function(){
                
                browser.get("https://sos1819-12.herokuapp.com/#!/ui/v1/youth-unemployment-stats");

                
            element.all(by.repeater("stat1 in youth_unemployment_stats")).then(function(initialStats){
                
                element.all(by.css('[value="remove"]')).last().click();
                element.all(by.repeater("stat1 in youth_unemployment_stats")).then(function(finalStats){
                    expect(finalStats.length).toEqual(initialStats.length-1);
                });
                                
            });
                
        });
});