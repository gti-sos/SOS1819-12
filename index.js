var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use("/", express.static(__dirname + "/public"));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

//                                      API REST life_expectancy_stats

var life_expectancy_stats = [];

//GET /api/v1/life-expectancy-stats/loadInitialData
app.get("/api/v1/life-expectancy-stats/loadInitialData", (req, res) => {
        
    life_expectancy_stats.push({
        country: "spain",
        year: "2015",
        expectancy_woman: "85.7",
        expectancy_man: "80.1",
        expectancy: "83"
    });
    life_expectancy_stats.push({
        country: "spain",
        year: "2016",
        expectancy_woman: "86.3",
        expectancy_man: "80.5",
        expectancy: "83.5"
    });
    life_expectancy_stats.push({
        country: "spain",
        year: "2017",
        expectancy_woman: "86.1",
        expectancy_man: "80.6",
        expectancy: "83.4"
    });
        
    res.sendStatus(201);
});

// GET /api/v1/life-expectancy-stats
app.get("/api/v1/life-expectancy-stats", (req,res) => {
    res.send(life_expectancy_stats);
});
// GET /api/v1/life-expectancy-stats/spain
app.get("/api/v1/life-expectancy-stats/:country", (req,res) => {
    var country = req.params.country;
    var filteredStat = life_expectancy_stats.filter((c) => {
       return c.country == country; 
    });
    if(filteredStat.length >= 1){
        res.send(filteredStat);
    }else{
        res.sendStatus(404);
    }
});
// GET /api/v1/life-expectancy-stats/spain/2016
app.get("/api/v1/life-expectancy-stats/:country/:year", (req,res) => {
    var country = req.params.country;
    var year = req.params.year;
    var filteredStat = life_expectancy_stats.filter((c) => {
       return c.country == country && c.year == year; 
    });
    if(filteredStat.length >= 1){
        res.send(filteredStat[0]);
    }else{
        res.sendStatus(404);
    }
});

// POST /api/v1/life-expectancy-stats
app.post("/api/v1/life-expectancy-stats", (req,res) => {
    var newStat = req.body;
    life_expectancy_stats.push(newStat);
    res.sendStatus(201);
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
    var found = false;
    
    var updateStats = life_expectancy_stats.map((c) => {
        if(c.country == country && c.year == year){
            found = true;
            return updateStat;
        }else{
            return c;
        }
    });
    if(found == false ){
        res.sendStatus(404);
    }else{
        life_expectancy_stats = updateStats;
        res.sendStatus(200);
    }
});
// PUT /api/v1/life-expectancy-stats (ERROR METODO NO PERMITIDO)
app.put("/api/v1/life-expectancy-stats", (req, res) => {
        res.sendStatus(405);
    }
);

// DELETE /api/v1/life-expectancy-stats
app.delete("/api/v1/life-expectancy-stats", (req,res) => {
    life_expectancy_stats = []
    res.sendStatus(200);
});
// DELETE /api/v1/life-expectancy-stats/spain/2015
app.delete("/api/v1/life-expectancy-stats/:country/:year", (req,res) => {
    var country = req.params.country;
    var year = req.params.year;
    var found = false;
    
    var updateStats = life_expectancy_stats.map((c) => {
        if(c.country == country && c.year == year){
            found = true;
            life_expectancy_stats.pop(c);
        }
        return c.country != country || c.year != year;
    });
    if(found == false ){
        res.sendStatus(404);
    }else{
        res.sendStatus(200);
    }
});

app.listen(port, () => {
   console.log("PORT " + port + " OK") 
});