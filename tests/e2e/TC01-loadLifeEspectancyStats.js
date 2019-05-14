describe("Check if life expectancy data is loaded: ", function(){
        
        it("Life expectancy list should show a bunch of data.", function(){
                
                browser.get("https://sos1819-12.herokuapp.com/ui/v1/life-expectancy-stats/#!/");
                
                var les = element.all(by.repeater("stat in life_expectancy_stats"));
                expect(les.count()).toBeGreaterThan(0);
                
        });
});