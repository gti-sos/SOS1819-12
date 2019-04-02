var api = require("./v1");

module.exports = function (app, BASE_PATH, pollutionStats){
        api(app, BASE_PATH+"/v1", pollutionStats);
}