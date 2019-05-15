exports.config = {
    
    seleniumAddress: "http://localhost:4444/wd/hub",
    chromeOnly: true,
    specs: [
               "e2e/TC01-loadLifeExpectancyStats.js",
                "e2e/TC02-createLifeExpectancyStats.js",
                "e2e/TC03-removeLifeExpectancyStats.js",
                
                
<<<<<<< HEAD
               "e2e/TC01-loadPollutionStats.js",
                
                "e2e/TC01-loadYouthUnemploymentStats.js",
                
 
               "e2e/TC02-createPollutionStats.js",
                
                "e2e/TC02-createYouthUnemploymentStats.js",

                    
=======

                "e2e/TC01-loadPollutionStats.js",
                "e2e/TC02-createPollutionStats.js",
>>>>>>> f29d1d5e6f8364cb56c97bc559664db457436ec3
                "e2e/TC03-removePollutionStats.js",
                
                "e2e/TC01-loadYouthUnemploymentStats.js",
                "e2e/TC02-createYouthUnemploymentStats.js",
                "e2e/TC03-removeYouthUnemploymentStats.js"
            
            ]
};