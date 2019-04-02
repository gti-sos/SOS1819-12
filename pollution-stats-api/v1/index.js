const pollutionStats_URL = "https://documenter.getpostman.com/view/6902825/S17ozAgF";

module.exports = function (app, BASE_PATH, pollutionStats){
    // POSTMAN
    app.get(BASE_PATH+"/pollution-stats/docs", (req, res) => {
        res.redirect(pollutionStats_URL);
        res.sendStatus(301);
    });

    //GET /api/v1/pollution-stats/loadInitialData
    app.get(BASE_PATH+"/pollution-stats/loadInitialData", (req, res) => {
        pollutionStats.find({}).toArray((err, pollutionStats_a)=>{
            if(err)
                console.log("Error: "+ err);
            if(pollutionStats_a.length == 0) {
                pollutionStats.insert({country: "spain",year: "2017",pollution_tco2: "282.364",pollution_kg1000: "0.18",pollution_perca: "6.09"});
                pollutionStats.insert({country: "spain",year: "2016",pollution_tco2: "263.908",pollution_kg1000: "0.17",pollution_perca: "5.69"});
                pollutionStats.insert({country: "spain",year: "2015",pollution_tco2: "271.171",pollution_kg1000: "0.18",pollution_perca: "5.84"});
                pollutionStats.insert({country: "alemania",year: "2017",pollution_tco2: "796.0529",pollution_kg1000: "0.21",pollution_perca: "9.71"});
                pollutionStats.insert({country: "alemania",year: "2016",pollution_tco2: "798.582",pollution_kg1000: "0.22",pollution_perca: "9.75"});
                pollutionStats.insert({country: "alemania",year: "2015",pollution_tco2: "789.898",pollution_kg1000: "0.22",pollution_perca: "9.67"});
                pollutionStats.insert({country: "reino unido",year: "2017",pollution_tco2: "379.15",pollution_kg1000: "0.22",pollution_perca: "9.67"});
                pollutionStats.insert({country: "reino unido",year: "2016",pollution_tco2: "391.472",pollution_kg1000: "0.15",pollution_perca: "5.95"});
                pollutionStats.insert({country: "reino unido",year: "2015",pollution_tco2: "416.749",pollution_kg1000: "0.16",pollution_perca: "6.37"});
                pollutionStats.insert({country: "francia",year: "2017",pollution_tco2: "338.193",pollution_kg1000: "0.13",pollution_perca: "5.2"});
                pollutionStats.insert({country: "francia",year: "2016",pollution_tco2: "332.034",pollution_kg1000: "0.13",pollution_perca: "5.13"});
                pollutionStats.insert({country: "francia",year: "2015",pollution_tco2: "327.725",pollution_kg1000: "0.13",pollution_perca: "5.08"});
                pollutionStats.insert({country: "italia",year: "2017",pollution_tco2: "361.193",pollution_kg1000: "0.17",pollution_perca: "6.08"});
                pollutionStats.insert({country: "italia",year: "2016",pollution_tco2: "356.461",pollution_kg1000: "0.17",pollution_perca: "6"});
                pollutionStats.insert({country: "italia",year: "2015",pollution_tco2: "354.355",pollution_kg1000: "0.17",pollution_perca: "5.96"});
                
                res.sendStatus(201);   
            }else{
                res.sendStatus(409);
            }
        });
    });

    /// GET /api/v1/pollutionStats ///
    
    app.get("/api/v1/pollution-stats",(req,res)=>{
    
        const pollutionStats_offset = parseInt(req.query.offset) || 0;
        const pollutionStats_limit = parseInt(req.query.limit) || 4;
    
        pollutionStats.find({}).skip(pollutionStats_offset).limit(pollutionStats_limit).toArray((err,pollutionStatsArray) =>{
            if(err)
                console.log("Error: " +err)
            res.send(pollutionStatsArray.map((c)=> {
                delete c._id;
                return c;
            }));   
        });
    });

    // GET /api/v1/pollution-stats/spain
    app.get("/api/v1/pollution-stats/:country", (req,res) => {
        const pollutionStats_offset = parseInt(req.query.offset) || 0;
        const pollutionStats_limit = parseInt(req.query.limit) || 4;
        var country = req.params.country;
        pollutionStats.find({"country": country}).skip(pollutionStats_offset).limit(pollutionStats_limit).toArray((err, pollutionStats_a)=>{
            if(err)
                console.log("Error: "+err);
            if(pollutionStats_a.length>0){
                res.send(pollutionStats_a.map((c) => {
                    delete c._id;
                    return c;
            //send 200 ok
                }));
            }else{
                res.sendStatus(404);
            }
        });
    });
    
    // GET /api/v1/pollution-stats/spain/2016
    app.get("/api/v1/pollution-stats/:country/:year", (req,res) => {
        var country = req.params.country;
        var year = req.params.year;
        pollutionStats.find({"country": country, "year": year}).toArray((err, pollutionStats_a)=>{
            if(err)
                console.log("Error: "+err);
                if(pollutionStats_a.length>0){
                    delete pollutionStats_a[0]._id;
                    res.send(pollutionStats_a[0]);
                }else{
                    res.sendStatus(404);
                }
        });
    });
    
    // POST /api/v1/pollution-stats
    app.post("/api/v1/pollution-stats", (req,res) => {
        var newStat = req.body;
        pollutionStats.find(newStat).toArray((err, pollutionStats_a)=>{
            if(err)
                console.log("Error: "+err);
            if(pollutionStats_a.length==0){
                pollutionStats.insert(newStat);
                res.sendStatus(201);
            }else{
                res.sendStatus(409);
            }
        });
    });
    
    //POST /api/v1/pollution-stats/spain (ERROR METODO NO PERMITIDO)
    app.post("/api/v1/pollution-stats/:country", (req, res) => {
        res.sendStatus(405);
    });
    //POST /api/v1/pollution-stats/spain/2017 (ERROR METODO NO PERMITIDO)
    app.post("/api/v1/pollution-stats/:country/:year", (req, res) => {
        res.sendStatus(405);
    });
    
    // PUT /api/v1/pollution-stats/spain/2017
    app.put("/api/v1/pollution-stats/:country/:year", (req,res) => {
        var country = req.params.country;
        var year = req.params.year;
        pollutionStats.find({"country": country, "year": year}).toArray((err, pollutionStats_a) => {
            if(err)
            
                console.log("Error: "+err);
            if(req.body.length!=5 || req.body.country==undefined || req.body.year==undefined || req.body.pollution_tco2==undefined
                || req.body.pollution_kg1000==undefined || req.body.pollution_perca==undefined){
                res.sendStatus(400);
            } else if(req.body.country==country && req.body.year==year && pollutionStats_a.length==1){
                pollutionStats.update({"country": country, "year": year}, req.body);
                res.sendStatus(200);
            } else if(pollutionStats_a.length==0){
                res.sendStatus(404);
            }
        });
    });
    
    // PUT /api/v1/pollution-stats (ERROR METODO NO PERMITIDO)
    app.put("/api/v1/pollution-stats", (req, res) => {
        res.sendStatus(405);
    });
    
        // DELETE /api/v1/pollution-stats
    app.delete("/api/v1/pollution-stats", (req,res) => {
        pollutionStats.remove({});
        res.sendStatus(200);
    });
    // DELETE /api/v1/pollution-stats/spain/2015
    app.delete("/api/v1/pollution-stats/:country/:year", (req,res) => {
        var country = req.params.country;
        var year = req.params.year;
        pollutionStats.find({"country": country, "year": year}).toArray((err, pollutionStats_a)=>{
            if(err)
                console.log("Error: "+err);
            if(pollutionStats_a.length>0){
                pollutionStats.remove(pollutionStats_a[0]);
                res.sendStatus(200);
            }else{
                res.sendStatus(404);
            }
        });
    });
}