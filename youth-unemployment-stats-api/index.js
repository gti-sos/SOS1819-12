var api = require("./v1");

module.exports = function (app, BASE_PATH, youthUnemploymentStats){
        api(app, BASE_PATH+"/v1", youthUnemploymentStats);
}