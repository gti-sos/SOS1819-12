var api = require("./v1");

module.exports = function (app, BASE_PATH, pollutionStats,request){
        api(app, BASE_PATH+"/v1", pollutionStats,request);
}