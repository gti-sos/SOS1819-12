exports.config = {
    
    seleniumAddress: "http://localhost:4444/wd/hub",
    chromeOnly: true,
    specs: [
                "e2e/TC01-loadYouthUnemploymentStats.js",
                "e2e/TC02-createYouthUnemploymentStats.js",
                "e2e/TC03-removeYouthUnemploymentStats.js"
            ]
};