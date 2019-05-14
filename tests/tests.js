exports.config = {
    
    seleniumAddress: "http://localhost:4444/wd/hub",
    chromeOnly: true,
    specs: [
                "e2e/TC01-loadPollutionStats.js",
<<<<<<< HEAD
                "e2e/TC02-createPollutionStats.js"]
=======
                "e2e/TC01-createPollutionStats.js",
                "e2e/TC01-loadPollutionStats.js"]
>>>>>>> e44a3986f0df3891697b077b3fd7a96729b6e18f
    
};