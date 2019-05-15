exports.config = {
    
    seleniumAddress: "http://localhost:4444/wd/hub",
    chromeOnly: true,
    specs: [
                "e2e/TC01-loadLifeExpectancyStats.js",
                "e2e/TC02-createLifeExpectancyStats.js",
                "e2e/TC03-removeLifeExpectancyStats.js"
            ]
};