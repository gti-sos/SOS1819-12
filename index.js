var express = require("express");
var bodyParser = require("body-parser");
<<<<<<< HEAD

var app = express();

app.use(bodyParser.json());

var port = process.env.PORT || 8080;


//////// ANTONIO //////////

var pollutionStats = [{
    
    country: "spain",
    year: "2017",
    pollution_tco2: "282.364",
    pollution_kg1000: "0.18",
    pollution_perca: "6.09"
    
},{
    
    country: "spain",
    year: "2016",
    pollution_tco2: "263.908",
    pollution_kg1000: "0.17",
    pollution_perca: "5.69"

},{
    
    country: "spain",
    year: "2015",
    pollution_tco2: "271.171",
    pollution_kg1000: "0.18",
    pollution_perca: "5.84"
    
},{
    
    country: "alemania",
    year: "2017",
    pollution_tco2: "796.0529",
    pollution_kg1000: "0.21",
    pollution_perca: "9.71"
    
},{
    
    country: "alemania",
    year: "2016",
    pollution_tco2: "798.582",
    pollution_kg1000: "0.22",
    pollution_perca: "9.75"  

},{
    
    country: "alemania",
    year: "2015",
    pollution_tco2: "789.898",
    pollution_kg1000: "0.22",
    pollution_perca: "9.67" 

},{
    
    country: "reino unido",
    year: "2017",
    pollution_tco2: "379.15",
    pollution_kg1000: "0.22",
    pollution_perca: "9.67" 

},{
    
    country: "reino unido",
    year: "2016",
    pollution_tco2: "391.472",
    pollution_kg1000: "0.15",
    pollution_perca: "5.95" 

},{
    
    country: "reino unido",
    year: "2015",
    pollution_tco2: "416.749",
    pollution_kg1000: "0.16",
    pollution_perca: "6.37" 

},{
    
    country: "francia",
    year: "2017",
    pollution_tco2: "338.193",
    pollution_kg1000: "0.13",
    pollution_perca: "5.2" 
    
},{
    
    country: "francia",
    year: "2016",
    pollution_tco2: "332.034",
    pollution_kg1000: "0.13",
    pollution_perca: "5.13" 

},{
    
    country: "francia",
    year: "2015",
    pollution_tco2: "327.725",
    pollution_kg1000: "0.13",
    pollution_perca: "5.08" 

},{
    
    country: "italia",
    year: "2017",
    pollution_tco2: "361.193",
    pollution_kg1000: "0.17",
    pollution_perca: "6.08" 

},{
    
    country: "italia",
    year: "2016",
    pollution_tco2: "356.461",
    pollution_kg1000: "0.17",
    pollution_perca: "6" 

},{
    
    country: "italia",
    year: "2015",
    pollution_tco2: "354.355",
    pollution_kg1000: "0.17",
    pollution_perca: "5.96" 
    
}];

/// GET ///

app.get("/pollutionStats",(req,res)=>{
    res.send(pollutionStats);
});

/// POST recurso ///

app.post("/pollutionStats", (req,res)=>{
    var newPollutionStats = req.body;
    
    pollutionStats.push(newPollutionStats)
    
    res.sendStatus(201);
    
});

/// DELETE todo ////

app.delete("/pollutionStats",(req,res) =>{
    pollutionStats = []
    res.sendStatus(200);
})

/// GET concreto ///

app.get("/pollutionStats/:country/:year",(req,res)=>{
    
    var country = req.params.country;
    var year = req.params.year;
 
    
    var filteredPollutionStats = pollutionStats.filter((c)=>{
        return c.country == country && c.year == year ;
      
    })
    if(filteredPollutionStats.length >=1){
        res.send(filteredPollutionStats[0]);
    } else{
        res.sendStatus(404);
    }
   
    res.sendStatus(200);
}); 

/// PUT ///


app.put("/pollutionStats/:country/:year",(req,res)=>{
    
    var country = req.params.country;
    var year = req.params.year;
    var updatePollutionStats = req.body;
    var found = false;
    
    var updatePollutionStats = pollutionStats.map((c)=>{
        
        if(c.country == country && c.year == year){
            found = true;
            return updatePollutionStats;
        }else{
            return c; 
        }
    })
    
        
    
    if(found == false){
        res.sendStatus(404);
    }else{
        pollutionStats = updatePollutionStats;
    }
   
    res.sendStatus(200);
});
/// DELETE  concreto///

app.delete("/pollutionStats/:country/:year",(req,res)=>{
    
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


///////////////////////////////////////

=======
var app = express();

>>>>>>> 9ff6fb99192a5b5a871b99130eda5c0a07cfd0ab
app.use("/", express.static(__dirname + "/public"));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

//                                      API REST life_expectancy_stats

var life_expectancy_stats2 = [{
    country: "spain",
    year: "2015",
    expectancy_woman: "85.7",
    expectancy_man: "80.1",
    expectancy: "83"
},{
    country: "spain",
    year: "2016",
    expectancy_woman: "86.3",
    expectancy_man: "80.5",
    expectancy: "83.5"
},{
    country: "spain",
    year: "2017",
    expectancy_woman: "86.1",
    expectancy_man: "80.6",
    expectancy: "83.4"
}];

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
   console.log("PORT " + port + " OK");
});