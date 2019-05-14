describe("Data is Loaded: ", function(){
        
        it("List should a bunch of data.", function(){
                
                browser.get("https://sos1819-12.herokuapp.com/ui/v1/pollution-stats/#!/");
                
                element(by.css('[value="CARGAR DATOS INICIALES"]')).click().then(function(){
                        
                                var poStats = element.all(by.repeater("pollutionStats"));
                                expect(poStats.count()).toBeGreaterThan(0);
                                
                        }
                );
            }
        );
    }
);