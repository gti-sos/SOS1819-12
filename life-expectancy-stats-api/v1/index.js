const life_expectancy_stats_URL = "https://documenter.getpostman.com/view/6998737/S17tS8JC";

module.exports = function (app, BASE_PATH, life_expectancy_stats){
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
                life_expectancy_stats.insert({country: "spain", year: 2015, expectancy_woman: 85.7, expectancy_man: 80.1, expectancy: 83});
                life_expectancy_stats.insert({country: "germany", year: 2015, expectancy_woman: 83.1, expectancy_man: 78.3, expectancy: 80.7});
                life_expectancy_stats.insert({country: "uk", year: 2015, expectancy_woman: 82.8, expectancy_man: 79.2, expectancy: 81});
                life_expectancy_stats.insert({country: "spain", year: 2016, expectancy_woman: 86.3, expectancy_man: 80.5, expectancy: 83.5});
                life_expectancy_stats.insert({country: "germany", year: 2016, expectancy_woman: 83.5, expectancy_man: 78.6, expectancy: 81});
                life_expectancy_stats.insert({country: "uk", year: 2016, expectancy_woman: 83, expectancy_man: 79.4, expectancy: 81.2});
                life_expectancy_stats.insert({country: "spain", year: 2017, expectancy_woman: 86.1, expectancy_man: 80.6, expectancy: 83.4});
                life_expectancy_stats.insert({country: "germany", year: 2017, expectancy_woman: 83.4, expectancy_man: 78.7, expectancy: 81.1});
                life_expectancy_stats.insert({country: "uk", year: 2017, expectancy_woman: 83.1, expectancy_man: 79.5, expectancy: 81.3});
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
        
        
        
        life_expectancy_stats.find().skip(life_expectancy_stats_offset).limit(life_expectancy_stats_limit).toArray((err,statsArray)=>{
            if(err)
                console.log("Error: "+err);
            res.send(statsArray);
        });
    });
    // GET /api/v1/life-expectancy-stats/spain
    app.get(BASE_PATH+"/life-expectancy-stats/:country", (req,res) => {
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
        
        life_expectancy_stats.find({"country": country}, {"fields":fields}).skip(life_expectancy_stats_offset).limit(life_expectancy_stats_limit).toArray((err, life_expectancy_stats_array)=>{
            if(err)
                console.log("Error: "+err);
            if(life_expectancy_stats_array.length>0){
                res.send(life_expectancy_stats_array);
            }else{
                res.sendStatus(404);
            }
        });
    });
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
        life_expectancy_stats.find(newStat).toArray((err, life_expectancy_stats_array)=>{
            if(err)
                console.log("Error: "+err);
            if(Object.keys(req.body).length!=5 || req.body.country==undefined || req.body.year==undefined || req.body.expectancy_man==undefined || req.body.expectancy_woman==undefined || req.body.expectancy==undefined){
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
            if(Object.keys(req.body).length!=5 || req.body.country==undefined || req.body.year==undefined || req.body.expectancy_man==undefined || req.body.expectancy_woman==undefined || req.body.expectancy==undefined){
                res.sendStatus(400);
            } else if(req.body.country==country && req.body.year==year && life_expectancy_stats_array.length==1){
                life_expectancy_stats.update({"country": country, "year": year}, req.body);
                res.sendStatus(200);
            } else if(life_expectancy_stats_array.length==0){
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