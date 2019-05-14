describe("Data is Loaded: ", function(){
        
        it("List should a bunch of data.", function(){
                
                browser.get("https://sos1819-12.herokuapp.com/ui/v1/pollution-stats/#!/");
                
                var pollution = element.all(by.repeater("stat in pollutionStats"));
                expect(pollutionStats.count()).toBeGreaterThan;
                
        });
});