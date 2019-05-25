var api = require("./v1");

module.exports = function (app, BASE_PATH, life_expectancy_stats, request){
        api(app, BASE_PATH+"/v1", life_expectancy_stats, request);
}