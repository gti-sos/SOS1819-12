exports.config = {
    
    seleniumAddress: "http://localhost:4444/wd/hub",
    chromeOnly: true,
    specs: [
                "e2e/TC01-loadPollutionStats.js",

                "e2e/TC02-createPollutionStats.js",
                "e2e/TC03-removePollutionStats.js"]

                //"e2e/TC01-loadYouthUnemploymentStats.js",
                
                //"e2e/TC01-loadLifeExpectaSncyStats.js",
                
                //"e2e/TC02-createLifeExpectancyStats.js",
                
<<<<<<< HEAD
                "e2e/TC02-removeLifeExpectancyStats.js",
                
                "TC02-createYouthUnemploymentStats.js",
                
                "e2e/TC03-removeYouthUnemploymentStats.js"]
=======
                //"e2e/TC02-removeLifeExpectancyStats.js"]
>>>>>>> 89aa58bab9f062c08d944c119b51dfdbc84fb190
                
};