exports.config = {
    
    seleniumAddress: "http://localhost:4444/wd/hub",
    chromeOnly: true,
    specs: [
                "e2e/TC01-loadPollutionStats.js",
<<<<<<< HEAD
                "e2e/TC01-loadYouthUnemploymentStats.js",
                "e2e/TC01-loadLifeExpectaSncyStats.js",
                    
                    
=======
                
                "e2e/TC01-loadYouthUnemploymentStats.js",
                
                "e2e/TC01-loadLifeExpectaSncyStats.js",

>>>>>>> 1cf0c68dc823b667faf673bffea9a4993aa2572f
                "e2e/TC02-createPollutionStats.js",
                
                "e2e/TC02-createLifeExpectancyStats.js",
                
                "e2e/TC02-createYouthUnemploymentStats.js",
<<<<<<< HEAD
                    
                "e2e/TC03-removePollutionStats.js",
                "e2e/TC03-removeYouthUnemploymentStats.js",
                "e2e/TC03-removeLifeExpectancyStats.js"
                ]

=======
                
                "e2e/TC02-removeLifeExpectancyStats.js",
                
                "e2e/TC03-removePollutionStats.js",
                
                "e2e/TC03-removeYouthUnemploymentStats.js"]
>>>>>>> 1cf0c68dc823b667faf673bffea9a4993aa2572f
                
};