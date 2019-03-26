var express = require("express");
var bodyParser = require("body-parser");

const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://test:test@Cluster0-fm5c9.mongodb.net/Cluster0?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

var pollutionStats ;

client.connect(err => {
  pollutionStats = client.db("SOS1819-12").collection("sos");
  console.log("Funciona MongoDB");
});

const MongoClientA = require("mongodb").MongoClient;
const uriA = "mongodb+srv://user:user@cluster0-gdn8y.mongodb.net/Cluster0?retryWrites=true";
const clientA = new MongoClientA(uriA, { useNewUrlParser: true });

var life_expectancy_stats;

clientA.connect(err => {
  life_expectancy_stats = clientA.db("sos1819-ajm").collection("life-expectancy-stats");
  // perform actions on the collection object
  console.log("Conneted");
  //client.close();
});

var app = express();

app.use("/", express.static(__dirname + "/public"));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

//////// ANTONIO ESCOBAR NÚÑEZ//////////

//var pollutionStats = []
//GET /api/v1/pollutionStats/loadInitialData
app.get("/api/v1/pollutionStats/loadInitialData", (req, res) => {
    pollutionStats.find({}).toArray( (err, pollutionStats_a) => {
    if (err) console.log("FATAL ERROR !!: ", err);
    if (pollutionStats_a.length == 0) {
    pollutionStats.insert({
    country: "spain",
    year: "2017",
    pollution_tco2: "282.364",
    pollution_kg1000: "0.18",
    pollution_perca: "6.09"
    });
    pollutionStats.insert({
    country: "spain",
    year: "2016",
    pollution_tco2: "263.908",
    pollution_kg1000: "0.17",
    pollution_perca: "5.69"
    });
    pollutionStats.insert({
    country: "spain",
    year: "2015",
    pollution_tco2: "271.171",
    pollution_kg1000: "0.18",
    pollution_perca: "5.84"
    });
    pollutionStats.insert({
    country: "alemania",
    year: "2017",
    pollution_tco2: "796.0529",
    pollution_kg1000: "0.21",
    pollution_perca: "9.71"
    });
    pollutionStats.insert({
    country: "alemania",
    year: "2016",
    pollution_tco2: "798.582",
    pollution_kg1000: "0.22",
    pollution_perca: "9.75"  
    });
    pollutionStats.insert({
    country: "alemania",
    year: "2015",
    pollution_tco2: "789.898",
    pollution_kg1000: "0.22",
    pollution_perca: "9.67" 
    });
    pollutionStats.insert({
    country: "reino unido",
    year: "2017",
    pollution_tco2: "379.15",
    pollution_kg1000: "0.22",
    pollution_perca: "9.67" 
    });
    pollutionStats.insert({
    country: "reino unido",
    year: "2016",
    pollution_tco2: "391.472",
    pollution_kg1000: "0.15",
    pollution_perca: "5.95" 
    });
    pollutionStats.insert({
    country: "reino unido",
    year: "2015",
    pollution_tco2: "416.749",
    pollution_kg1000: "0.16",
    pollution_perca: "6.37" 
    });
    pollutionStats.insert({
    country: "francia",
    year: "2017",
    pollution_tco2: "338.193",
    pollution_kg1000: "0.13",
    pollution_perca: "5.2" 
    });
    pollutionStats.insert({
    country: "francia",
    year: "2016",
    pollution_tco2: "332.034",
    pollution_kg1000: "0.13",
    pollution_perca: "5.13"
    });
    pollutionStats.insert({
    country: "francia",
    year: "2015",
    pollution_tco2: "327.725",
    pollution_kg1000: "0.13",
    pollution_perca: "5.08" 
    });
    pollutionStats.insert({
    country: "italia",
    year: "2017",
    pollution_tco2: "361.193",
    pollution_kg1000: "0.17",
    pollution_perca: "6.08" 
    });
    pollutionStats.insert({
    country: "italia",
    year: "2016",
    pollution_tco2: "356.461",
    pollution_kg1000: "0.17",
    pollution_perca: "6" 
    });
    pollutionStats.insert({
    country: "italia",
    year: "2015",
    pollution_tco2: "354.355",
    pollution_kg1000: "0.17",
    pollution_perca: "5.96" 
    });
        console.log("Request accepted, creating new resources in database.");
        res.sendStatus(201);   
    }
    else{
    console.log("FATAL ERROR !!: Data Base is not empty.");
    res.sendStatus(409);}
});});

/// GET /api/v1/pollutionStats ///
app.get("/api/v1/pollutionStats",(req,res)=>{
    pollutionStats.find({}).toArray((err,pollutionStatsArray) =>{
     if(err)
        console.log("Error: " +err)
     res.send(pollutionStatsArray);   
    });
});

/// POST /api/v1/pollutionStats ///
app.post("/api/v1/pollutionStats", (req, res) => {
        var newPs = req.body;
        pollutionStats.find(newPs).toArray( (err, pollutionStats_a) => {
                if(err) console.log("FATAL ERROR !!: ", err);
                if(pollutionStats_a == 0){
                    pollutionStats.insert(newPs);
                    console.log("Request accepted, creating new resource in database.");
                    res.sendStatus(201);
                } else {
                    console.log("FATAL ERROR !!: Resource already exists in the database.");
                    res.sendStatus(409);
                }
            }
        );
    }
);

// GET /api/v1/pollutionStats/:country/:year
app.get("/api/v1/pollutionStats/:country/:year", (req, res) => {
        var country = req.params.country;
        var year = req.params.year;
        pollutionStats.find( {"country": country, "year": year} ).toArray( (err, pollutionStats_a) => {
                if(err) console.log("FATAL ERROR !!: ", err);
                if(pollutionStats_a.length  > 0){
                    console.log("Request accepted, sending resource from database.");
                    res.send(pollutionStats_a);
                } else {
                    console.log("Request accepted, removing resource of database.");
                    res.sendStatus(404);
                }
            }
        );
    }
);

/// DELETE /api/v1/pollutionStats ////
//DELETE /api/v1/pollutionStats (BORRA TODOS LOS RECURSOS)
app.delete("/api/v1/pollutionStats", (req, res) => {
        pollutionStats.remove({});
        console.log("Request accepted, removing all resources of database.");
        res.sendStatus(200);
    }
);
/// DELETE /api/v1/pollutionStats/:country/:year ///
app.delete("/api/v1/pollutionStats/:country/:year", (req, res) => {
        var country = req.params.country;
        var year = req.params.year;
        var found = false;
        pollutionStats.find( {"country": country,"year": year} ).toArray( (err, pollutionStats_a) =>{
                if(err) console.log("FATAL ERROR: ", err);
                if(pollutionStats_a.length > 0){
                    pollutionStats.remove(pollutionStats_a[0]);
                    console.log("Request accepted, removing resource of database.");
                    res.sendStatus(200);
                } else {
                    console.log("FATAL ERROR !!: Resource not found in database.");
                    res.sendStatus(404);
                }
            }
        );
    }
);

/// PUT ///
app.put("/api/v1/pollutionStats/:country/:year", (req, res) => {
        var country = req.params.country;
        var year = req.params.year;
        var updatedStat = req.body;
        pollutionStats.find( {"country": country, "year": year} ).toArray( (err, pollutionStats_a) => {
                if(err) console.log("FATAL ERROR: ", err);
                if(pollutionStats_a.length > 0){
                    pollutionStats.update( {"country": country, "year": year}, updatedStat );
                    console.log("Request accepted, updating resource of database.");
                    res.sendStatus(200);
                } else {
                    console.log("FATAL ERROR : Resource not found in database.");
                    res.sendStatus(404);
                }
            }
        );
    }
);

//POST /api/v1/pollutionStats/country/year (ERROR METODO NO PERMITIDO)
app.post("/api/v1/pollutionStats/:country/:year", (req, res) => {
    console.log("FATAL ERROR !!: Method not Allowed.");
        res.sendStatus(405);
});

//POST api/v1/pollutionStats/country (ERROR METODO NO PERMITIDO)
app.post("/api/v1/pollutionStats/:country", (req, res) => {
    console.log("FATAL ERROR !!: Method not Allowed.");
        res.sendStatus(405);
});
// PUT /api/v1/pollutionStats (ERROR METODO NO PERMITIDO)
app.put("/api/v1/pollutionStats", (req, res) => {
    console.log("FATAL ERROR !!: Method not Allowed.");
        res.sendStatus(405);
});

/// DELETE  concreto///
app.delete("/api/v1/pollutionStats/:country/:year",(req,res)=>{
    var country = req.params.country;
    var year = req.params.year;
    var found = false;
    var updatePollutionStats = pollutionStats.filter((c)=>{
        if(c.country != country && c.year != year){
            found = true;
        }
        return c.country != country && c.year != year;
    });
    if(found == false){
        res.sendStatus(404);
    }else{
        pollutionStats = updatePollutionStats;
        res.sendStatus(200); 
    }
    if(found == false){
        res.sendStatus(404);
    }else{
        pollutionStats = updatePollutionStats;
    }
    res.sendStatus(200);
});

/// GET /api/v1/pollutionStats/docs ///
app.get("/api/v1/pollutionStats/docs",(req,res)=>{
    res.writeHead(301, {Location: 'https://documenter.getpostman.com/view/6902825/S17ozAgF'});
    res.end();
});

const ps = "https://documenter.getpostman.com/view/6902825/S17ozAgF";
app.get("/api/v1/pollutionStats/docs", (req, res) => {
    res.sendStatus(301)
    res.redirect(ps);
});

///////////////////////////////////////
///////////////////////////////////////

//                                              API REST life_expectancy_stats

//GET /api/v1/life-expectancy-stats/loadInitialData
app.get("/api/v1/life-expectancy-stats/loadInitialData", (req, res) => {
    life_expectancy_stats.find({}).toArray((err, life_expectancy_stats_array)=>{
        if(err)
            console.log("Error: "+ err);
        if(life_expectancy_stats_array.length == 0) {
            life_expectancy_stats.insert({country: "spain", year: "2015", expectancy_woman: "85.7", expectancy_man: "80.1", expectancy: "83"});
            life_expectancy_stats.insert({country: "germany", year: "2015", expectancy_woman: "83.1", expectancy_man: "78.3", expectancy: "80.7"});
            life_expectancy_stats.insert({country: "uk", year: "2015", expectancy_woman: "82.8", expectancy_man: "79.2", expectancy: "81"});
            life_expectancy_stats.insert({country: "spain", year: "2016", expectancy_woman: "86.3", expectancy_man: "80.5", expectancy: "83.5"});
            life_expectancy_stats.insert({country: "germany", year: "2016", expectancy_woman: "83.5", expectancy_man: "78.6", expectancy: "81"});
            life_expectancy_stats.insert({country: "uk", year: "2016", expectancy_woman: "83", expectancy_man: "79.4", expectancy: "81.2"});
            life_expectancy_stats.insert({country: "spain", year: "2017", expectancy_woman: "86.1", expectancy_man: "80.6", expectancy: "83.4"});
            life_expectancy_stats.insert({country: "germany", year: "2017", expectancy_woman: "83.4", expectancy_man: "78.7", expectancy: "81.1"});
            life_expectancy_stats.insert({country: "uk", year: "2017", expectancy_woman: "83.1", expectancy_man: "79.5", expectancy: "81.3"});
            res.sendStatus(201);
        } else {
            res.sendStatus(409);
        }
    });
});

// GET /api/v1/life-expectancy-stats
app.get("/api/v1/life-expectancy-stats", (req,res) => {
    life_expectancy_stats.find({}).toArray((err,statsArray)=>{
        if(err)
            console.log("Error: "+err);
        res.send(statsArray);
    });
});
// GET /api/v1/life-expectancy-stats/spain
app.get("/api/v1/life-expectancy-stats/:country", (req,res) => {
    var country = req.params.country;
    life_expectancy_stats.find({"country": country}).toArray((err, life_expectancy_stats_array)=>{
        if(err)
            console.log("Error: "+err);
        if(life_expectancy_stats_array.length>0){
            res.send(life_expectancy_stats_array);
            res.sendStatus(200);
        }else{
            res.sendStatus(404);
        }
    });
});
// GET /api/v1/life-expectancy-stats/spain/2016
app.get("/api/v1/life-expectancy-stats/:country/:year", (req,res) => {
    var country = req.params.country;
    var year = req.params.year;
    life_expectancy_stats.find({"country": country, "year": year}).toArray((err, life_expectancy_stats_array)=>{
        if(err)
            console.log("Error: "+err);
        if(life_expectancy_stats_array.length>0){
            res.send(life_expectancy_stats_array);
        }else{
            res.sendStatus(404);
        }
    });
});

// POST /api/v1/life-expectancy-stats
app.post("/api/v1/life-expectancy-stats", (req,res) => {
    var newStat = req.body;
    life_expectancy_stats.find(newStat).toArray((err, life_expectancy_stats_array)=>{
        if(err)
            console.log("Error: "+err);
        if(life_expectancy_stats_array.length==0){
            life_expectancy_stats.insert(newStat);
            res.sendStatus(201);
        }else{
            res.sendStatus(409);
        }
    });
});
//POST /api/v1/life-expectancy-stats/spain (ERROR METODO NO PERMITIDO)
app.post("/api/v1/life-expectancy-stats/:country", (req, res) => {
        res.sendStatus(405);
});
//POST /api/v1/life-expectancy-stats/spain/2017 (ERROR METODO NO PERMITIDO)
app.post("/api/v1/life-expectancy-stats/:country/:year", (req, res) => {
        res.sendStatus(405);
});

// PUT /api/v1/life-expectancy-stats/spain/2017
app.put("/api/v1/life-expectancy-stats/:country/:year", (req,res) => {
    var country = req.params.country;
    var year = req.params.year;
    var updateStat = req.body;
    life_expectancy_stats.find({"country": country, "year": year}).toArray((err, life_expectancy_stats_array)=>{
        if(err)
            console.log("Error: "+err);
        if(life_expectancy_stats_array.length>0){
            life_expectancy_stats.update({"country": country, "year": year}, updateStat);
            res.sendStatus(200);
        }else{
            res.sendStatus(404);
        }
    });
});
// PUT /api/v1/life-expectancy-stats (ERROR METODO NO PERMITIDO)
app.put("/api/v1/life-expectancy-stats", (req, res) => {
        res.sendStatus(405);
    }
);

// DELETE /api/v1/life-expectancy-stats
app.delete("/api/v1/life-expectancy-stats", (req,res) => {
    life_expectancy_stats.remove({});
    res.sendStatus(200);
});
// DELETE /api/v1/life-expectancy-stats/spain/2015
app.delete("/api/v1/life-expectancy-stats/:country/:year", (req,res) => {
    var country = req.params.country;
    var year = req.params.year;
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

// GET /api/v1/life-expectancy-stats/docs //
app.get("/api/v1/life-expectancy-stats/docs", (req,res) => {
    res.writeHead(301, {Location: 'https://documenter.getpostman.com/view/6998737/S17tS8JC'});
    res.end();
});
const life_expectancy_stats_URL = "https://documenter.getpostman.com/view/6998737/S17tS8JC";
app.get("/api/v1/life-expectancy-stats/docs", (req, res) => {
    res.sendStatus(301)
    res.redirect(life_expectancy_stats_URL);
});

app.listen(port, () => {
   console.log("PORT " + port + " OK");
});