const life_expectancy_stats_URL = "https://documenter.getpostman.com/view/6998737/S17tS8JC";

module.exports = function (app, BASE_PATH, life_expectancy_stats, request, unirest){
    //INTEGRACIÓN
    var API_04 = "https://sos1819-04.herokuapp.com/api/v1/suicide-rates";
    app.use("/proxy/api/suicide-rates", function(req, res){
        console.log("Piped: "+ API_04);
        req.pipe(request(API_04)).pipe(res);
    });
    var API_06 = "https://sos1819-06.herokuapp.com/api/v1/uefa-club-rankings";
    app.use("/proxy/api/uefa-club-rankings", function(req, res){
        console.log("Piped: "+ API_06);
        req.pipe(request(API_06)).pipe(res);
    });
    var API_08 = "https://sos1819-08.herokuapp.com/api/v1/emigrations-by-countries";
    app.use("/proxy/api/emigrations-by-countries", function(req, res){
        console.log("Piped: "+ API_08);
        req.pipe(request(API_08)).pipe(res);
    });
    var API_09 = "https://sos1819-09.herokuapp.com/api/v1/populationstats";
    app.use("/proxy/api/populationstats", function(req, res){
        console.log("Piped: "+ API_09);
        req.pipe(request(API_09)).pipe(res);
    });
    var API_10 = "https://sos1819-10.herokuapp.com/api/v1/e-car-statics";
    app.use("/proxy/api/e-car-statics", function(req, res){
        console.log("Piped: "+ API_10);
        req.pipe(request(API_10)).pipe(res);
    });
    var API_11 = "https://sos1819-11.herokuapp.com/api/v1/general-public-expenses";
    app.use("/proxy/api/general-public-expenses", function(req, res){
        console.log("Piped: "+ API_11);
        req.pipe(request(API_11)).pipe(res);
    });
    //EXTERNAS
    app.get('/externa1',(req,res)=>{
        unirest.get("https://restcountries-v1.p.rapidapi.com/all")
        .header("X-RapidAPI-Host", "restcountries-v1.p.rapidapi.com")
        .header("X-RapidAPI-Key", "1505ad8e30msha9665b349d5bba0p130853jsn0d04595275e9")
        .end(function (result) {
              res.send(result.body);
        });
    });
    app.get('/externa2',(req,res)=>{
        unirest.get("https://free-nba.p.rapidapi.com/stats?page=0&per_page=25")
        .header("X-RapidAPI-Host", "free-nba.p.rapidapi.com")
        .header("X-RapidAPI-Key", "1505ad8e30msha9665b349d5bba0p130853jsn0d04595275e9")
        .end(function (result) {
              res.send(result.body);
        });
    });
    // POSTMAN
    app.get(BASE_PATH+"/life-expectancy-stats/docs", (req, res) => {
        res.redirect(life_expectancy_stats_URL);
        res.sendStatus(301);
    });
    // GET /api/v1/life-expectancy-stats/loadInitialData
    app.get(BASE_PATH+"/life-expectancy-stats/loadInitialData", (req, res) => {
        life_expectancy_stats.find({}).toArray((err, life_expectancy_stats_array)=>{
            if(err)
                console.log("Error: "+ err);
            if(life_expectancy_stats_array.length == 0) {
                life_expectancy_stats.insert({country: "Spain", year: 2015, expectancy_woman: 85.7, expectancy_man: 80.1, expectancy: 83});
                life_expectancy_stats.insert({country: "Germany", year: 2015, expectancy_woman: 83.1, expectancy_man: 78.3, expectancy: 80.7});
                life_expectancy_stats.insert({country: "RU", year: 2015, expectancy_woman: 82.8, expectancy_man: 79.2, expectancy: 81});
                life_expectancy_stats.insert({country: "Portugal", year: 2015, expectancy_woman: 84.3, expectancy_man: 78.1, expectancy: 81.3});
                life_expectancy_stats.insert({country: "United States", year: 2015, expectancy_woman: 81.2, expectancy_man: 76.3, expectancy: 78.69});
                life_expectancy_stats.insert({country: "Japan", year: 2015, expectancy_woman: 86.99, expectancy_man: 80.75, expectancy: 83.79});
                life_expectancy_stats.insert({country: "China", year: 2015, expectancy_woman: 77.67, expectancy_man: 74.64, expectancy: 76.09});
                life_expectancy_stats.insert({country: "Albania", year: 2015, expectancy_woman: 79.7, expectancy_man: 76.2, expectancy: 77.9});
                life_expectancy_stats.insert({country: "Armenia", year: 2015, expectancy_woman: 78.2, expectancy_man: 71.7, expectancy: 75.1});
                life_expectancy_stats.insert({country: "Finland", year: 2015, expectancy_woman: 84.4, expectancy_man: 78.7, expectancy: 81.6});
                life_expectancy_stats.insert({country: "Spain", year: 2016, expectancy_woman: 86.3, expectancy_man: 80.5, expectancy: 83.5});
                life_expectancy_stats.insert({country: "Germany", year: 2016, expectancy_woman: 83.5, expectancy_man: 78.6, expectancy: 81});
                life_expectancy_stats.insert({country: "RU", year: 2016, expectancy_woman: 83, expectancy_man: 79.4, expectancy: 81.2});
                life_expectancy_stats.insert({country: "Portugal", year: 2016, expectancy_woman: 84.3, expectancy_man: 78.1, expectancy: 81.3});
                life_expectancy_stats.insert({country: "United States", year: 2016, expectancy_woman: 81.2, expectancy_man: 76.3, expectancy: 78.69});
                life_expectancy_stats.insert({country: "Japan", year: 2016, expectancy_woman: 87.14, expectancy_man: 80.98, expectancy: 83.98});
                life_expectancy_stats.insert({country: "China", year: 2016, expectancy_woman: 77.83, expectancy_man: 74.8, expectancy: 76.25});
                life_expectancy_stats.insert({country: "Albania", year: 2016, expectancy_woman: 80.1, expectancy_man: 77.1, expectancy: 78.5});
                life_expectancy_stats.insert({country: "Armenia", year: 2016, expectancy_woman: 78.4, expectancy_man: 71.5, expectancy: 75.1});
                life_expectancy_stats.insert({country: "Finland", year: 2016, expectancy_woman: 84.4, expectancy_man: 78.6, expectancy: 81.5});
                life_expectancy_stats.insert({country: "Spain", year: 2017, expectancy_woman: 86.1, expectancy_man: 80.6, expectancy: 83.4});
                life_expectancy_stats.insert({country: "Germany", year: 2017, expectancy_woman: 83.4, expectancy_man: 78.7, expectancy: 81.1});
                life_expectancy_stats.insert({country: "RU", year: 2017, expectancy_woman: 83.1, expectancy_man: 79.5, expectancy: 81.3});
                life_expectancy_stats.insert({country: "Portugal", year: 2017, expectancy_woman: 84.6, expectancy_man: 78.4, expectancy: 81.6});
                life_expectancy_stats.insert({country: "United States", year: 2017, expectancy_woman: 81.2, expectancy_man: 76.3, expectancy: 78.69});
                life_expectancy_stats.insert({country: "Japan", year: 2017, expectancy_woman: 87.14, expectancy_man: 80.98, expectancy: 83.98});
                life_expectancy_stats.insert({country: "China", year: 2017, expectancy_woman: 77.83, expectancy_man: 74.8, expectancy: 76.25});
                life_expectancy_stats.insert({country: "Albania", year: 2017, expectancy_woman: 80.1, expectancy_man: 77.1, expectancy: 78.5});
                life_expectancy_stats.insert({country: "Armenia", year: 2017, expectancy_woman: 78.9, expectancy_man: 72.5, expectancy: 75.8});
                life_expectancy_stats.insert({country: "Finland", year: 2017, expectancy_woman: 84.5, expectancy_man: 78.9, expectancy: 81.7});
                res.sendStatus(201);
            } else {
                res.sendStatus(409);
            }
        });
    });
    // GET /api/v1/life-expectancy-stats
    app.get(BASE_PATH+"/life-expectancy-stats", (req,res) => {
        var life_expectancy_stats_offset = parseInt(req.query.offset) || 0;
        var life_expectancy_stats_limit = parseInt(req.query.limit) || 100;
        
        var interval = 0.5;
        var search = {};
        
        if(req.query.country)  search["country"] = req.query.country;
        if(req.query.year){
            search["year"] = parseInt(req.query.year);
        } else if(req.query.from && req.query.to){
            search["year"] = { $gte : parseInt(req.query.from), $lte : parseInt(req.query.to) };
        }
        if(req.query.expectancy_woman)  search["expectancy_woman"] = { $gte : parseFloat(req.query.expectancy_woman)-interval, $lte : parseFloat(req.query.expectancy_woman)+interval };
        if(req.query.expectancy_man)  search["expectancy_man"] = { $gte : parseFloat(req.query.expectancy_man)-interval, $lte : parseFloat(req.query.expectancy_man)+interval };
        if(req.query.expectancy)  search["expectancy"] = { $gte : parseFloat(req.query.expectancy)-interval, $lte :parseFloat(req.query.expectancy)+interval };
        
        var fields = {"_id": 0};
        if(req.query.fields){
            req.query.fields.split(",").forEach( (f) => {
                fields[f] = 1;
                }
            );
        }

        life_expectancy_stats.find(search, {"fields":fields}).skip(life_expectancy_stats_offset).limit(life_expectancy_stats_limit).toArray((err,statsArray)=>{
            if(err)
                console.log("Error: "+err);
            res.send(statsArray);
        });
    });
    // GET /api/v1/life-expectancy-stats/spain
    /*app.get(BASE_PATH+"/life-expectancy-stats/:country", (req,res) => {
        const life_expectancy_stats_offset = parseInt(req.query.offset) || 0;
        const life_expectancy_stats_limit = parseInt(req.query.limit) || 100;
        var country = req.params.country;
        
        var fields = {"_id": 0};
        if(req.query.fields){
            req.query.fields.split(",").forEach( (f) => {
                fields[f] = 1;
                }
            );
        }
        
        life_expectancy_stats.find({"country": country}, {"fields":fields}).skip(life_expectancy_stats_offset).
        limit(life_expectancy_stats_limit).toArray((err, life_expectancy_stats_array)=>{
            if(err)
                console.log("Error: "+err);
            if(life_expectancy_stats_array.length>0){
                res.send(life_expectancy_stats_array);
            }else{
               // res.send([]);
                res.sendStatus(200);
            }
        });
    });*/
    // GET /api/v1/life-expectancy-stats/spain/2016
    app.get(BASE_PATH+"/life-expectancy-stats/:country/:year", (req,res) => {
        var country = req.params.country;
        var year = parseInt(req.params.year);
        var fields = {"_id": 0};
        if(req.query.fields){
            req.query.fields.split(",").forEach( (f) => {
                fields[f] = 1;
                }
            );
        }
        
        life_expectancy_stats.find({"country": country, "year": year}, {"fields":fields}).toArray((err, life_expectancy_stats_array)=>{
            if(err)
                console.log("Error: "+err);
                if(life_expectancy_stats_array.length>0){
                    res.send(life_expectancy_stats_array[0]);
                }else{
                    res.sendStatus(404);
                }
        });
    });
    
    // POST /api/v1/life-expectancy-stats
    app.post(BASE_PATH+"/life-expectancy-stats", (req,res) => {
        var newStat = req.body;
        var country = newStat.country;
        var year = newStat.year;
        life_expectancy_stats.find({"country": country, "year": year}).toArray((err, life_expectancy_stats_array)=>{
            if(err)
                console.log("Error: "+err);
            if(Object.keys(req.body).length!=5 || req.body.country==undefined || req.body.year==undefined || req.body.expectancy_man==undefined || req.body.expectancy_woman==undefined || req.body.expectancy==undefined || typeof(req.body.country)!= "string" || typeof(req.body.year)!= "number" || typeof(req.body.expectancy_woman)!= "number" || typeof(req.body.expectancy_man)!= "number" || typeof(req.body.expectancy)!= "number"){
                res.sendStatus(400);
            } else if(life_expectancy_stats_array.length==0){
                life_expectancy_stats.insert(newStat);
                res.sendStatus(201);
            }else{
                res.sendStatus(409);
            }
        });
    });
    //POST /api/v1/life-expectancy-stats/spain (ERROR METODO NO PERMITIDO)
    app.post(BASE_PATH+"/life-expectancy-stats/:country", (req, res) => {
        res.sendStatus(405);
    });
    //POST /api/v1/life-expectancy-stats/spain/2017 (ERROR METODO NO PERMITIDO)
    app.post(BASE_PATH+"/life-expectancy-stats/:country/:year", (req, res) => {
        res.sendStatus(405);
    });
    
    // PUT /api/v1/life-expectancy-stats/spain/2017
    app.put(BASE_PATH+"/life-expectancy-stats/:country/:year", (req,res) => {
        var country = req.params.country;
        var year = parseInt(req.params.year);
        life_expectancy_stats.find({"country": country, "year": year}).toArray((err, life_expectancy_stats_array) => {
            if(err)
                console.log("Error: "+err);
            if(Object.keys(req.body).length!=5 || req.body.country==undefined || req.body.year==undefined || req.body.expectancy_man==undefined || req.body.expectancy_woman==undefined || req.body.expectancy==undefined || typeof(req.body.country)!= "string" || typeof(req.body.year)!= "number" || typeof(req.body.expectancy_woman)!= "number" || typeof(req.body.expectancy_man)!= "number" || typeof(req.body.expectancy)!= "number" || req.body.country!=country || req.body.year!=year){
                res.sendStatus(400);
            } else if(req.body.country==country && req.body.year==year && life_expectancy_stats_array.length==1){
                life_expectancy_stats.update({"country": country, "year": year}, req.body);
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        });
    });
    // PUT /api/v1/life-expectancy-stats (ERROR METODO NO PERMITIDO)
    app.put(BASE_PATH+"/life-expectancy-stats", (req, res) => {
        res.sendStatus(405);
    });
    
    // DELETE /api/v1/life-expectancy-stats
    app.delete(BASE_PATH+"/life-expectancy-stats", (req,res) => {
        life_expectancy_stats.remove({});
        res.sendStatus(200);
    });
    // DELETE /api/v1/life-expectancy-stats/spain/2015
    app.delete(BASE_PATH+"/life-expectancy-stats/:country/:year", (req,res) => {
        var country = req.params.country;
        var year = parseInt(req.params.year);
        life_expectancy_stats.find({"country": country, "year": year}).toArray((err, life_expectancy_stats_array)=>{
            if(err)
                console.log("Error: "+err);
            if(life_expectancy_stats_array.length>0){
                life_expectancy_stats.remove(life_expectancy_stats_array[0]);
                res.sendStatus(200);
            }else{
                res.sendStatus(404);
            }
        });
    });
}