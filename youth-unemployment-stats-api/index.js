var api = require("./v1");

module.exports = function (app, BASE_PATH, youth_unemployment_stats,request){
        api(app, BASE_PATH+"/v1", youth_unemployment_stats,request);
}