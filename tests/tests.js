exports.config = {
    
    seleniumAddress: "http://localhost:4444/wd/hub",
    chromeOnly: true,
    specs: [
                "e2e/TC01-loadPollutionStats.js",
                "e2e/TC01-createPollutionStats.js",
                "e2e/TC01-loadPollutionStats.js"]
    
};