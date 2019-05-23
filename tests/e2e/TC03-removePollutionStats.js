describe("Check if a stat can be removed: ", function(){
        
        it("List should grow after the stat deletion", function(){
                
            browser.get("https://sos1819-12.herokuapp.com//#!/ui/v1/pollution-stats/#!/");
                
            element.all(by.repeater("stat in pollutionStats")).then(function(initialStats){
                
                element.all(by.css('[value="remove"]')).last().click();
                element.all(by.repeater("stat in pollutionStats")).then(function(finalStats){
                    expect(finalStats.length).toEqual(initialStats.length-1);
                });
                                
            });
                
        });
});