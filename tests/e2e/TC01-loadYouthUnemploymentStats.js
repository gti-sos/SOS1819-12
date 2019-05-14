describe("Data is Loaded: ", function(){
        
        it("List should a bunch of data.", function(){
                
                browser.get("https://sos1819-12.herokuapp.com/ui/v1/youth-unemployment-stats/#!/");
                
                var youth_unemployment = element.all(by.repeater("stat in youth_unemployment_stats"));
                expect(youth_unemployment.count()).toBeGreaterThan(0);
                
        });
});