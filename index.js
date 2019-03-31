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

const MongoClientC = require("mongodb").MongoClient;
const uriC = "mongodb+srv://andfergom:SE120US784@sos-zgrhq.mongodb.net/sos?retryWrites=true";
const clientC= new MongoClientC(uriC, { useNewUrlParser: true });

var youthUnemploymentStats;

clientC.connect(err => {
  youthUnemploymentStats = clientC.db("sos1819").collection("countries");
  // perform actions on the collection object
  console.log("Conneted");
  //client.close();
});

var app = express();

var port = process.env.PORT || 8080;

app.use("/", express.static(__dirname + "/public"));
app.use(bodyParser.json());

//////// ANTONIO ESCOBAR NÚÑEZ//////////

//var pollutionStats = []
//GET /api/v1/pollutionStats/loadInitialData
app.get("/api/v1/pollution-stats/loadInitialData", (req, res) => {
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
app.get("/api/v1/pollution-stats",(req,res)=>{
    pollutionStats.find({}).toArray((err,pollutionStatsArray) =>{
     if(err)
        console.log("Error: " +err)
     res.send(pollutionStatsArray);   
    });
});

/// POST /api/v1/pollution-stats ///
app.post("/api/v1/pollution-stats", (req, res) => {
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
app.get("/api/v1/pollution-stats/:country/:year", (req, res) => {
        var country = req.params.country;
        var year = req.params.year;
        pollutionStats.find( {"country": country, "year": year} ).toArray( (err, pollutionStats_a) => {
                if(err) console.log("FATAL ERROR !!: ", err);
                if(pollutionStats_a.length  > 0){
                    console.log("Request accepted, sending resource from database.");
                    res.send(pollutionStats_a[0]);
                } else {
                    console.log("Request accepted, removing resource of database.");
                    res.sendStatus(404);
                }
            }
        );
    }
);

/// DELETE /api/v1/pollution-stats ////
//DELETE /api/v1/pollution-stats (BORRA TODOS LOS RECURSOS)
app.delete("/api/v1/pollution-stats", (req, res) => {
        pollutionStats.remove({});
        console.log("Request accepted, removing all resources of database.");
        res.sendStatus(200);
    }
);
/// DELETE /api/v1/pollutionStats/:country/:year ///
app.delete("/api/v1/pollution-stats/:country/:year", (req, res) => {
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
app.put("/api/v1/pollution-stats/:country/:year", (req, res) => {

    var country = req.params.country;
    var year = req.params.year;
    var updatedData = req.body;
    var found = false;
    var coincide = true;
    var i = 0;
    var updatedpi = [];
    var aut = true;
    console.log(req.params);
    
    pollutionStats({}).toArray((error,pollutionStats_a)=>{
            for(i=0;i<pollutionStats_a.length;i++)
                if (pollutionStats_a[i].year==year && pollutionStats_a[i].country==country){
                    if (pollutionStats_a[i].year==updatedData.year && pollutionStats_a[i].province==updatedData.country){
                        if(updatedData._id != null) {
                            if(pollutionStats_a[i]._id != updatedData._id)
                                aut = false;
                                found = true;
                        } else {
                        found = true;
                        updatedpi.push(updatedData);
                        }    
                    }else{
                        coincide = false;
                    }
                } else {
                    updatedpi.push(pollutionStats_a[i]);
                }
        
     if (coincide==false){
        res.sendStatus(400);
    }else if (found==false){
        res.sendStatus(404);
    } else if (aut == false){
        res.sendStatus(401);
    }else{
        pollutionStats.remove();
        updatedpi.filter((d) =>{
                pollutionStats.insert(d);
            });
            res.sendStatus(200);
    }
    });
});


//POST /api/v1/pollution-stats/country/year (ERROR METODO NO PERMITIDO)
app.post("/api/v1/pollution-stats/:country/:year", (req, res) => {
    console.log("FATAL ERROR !!: Method not Allowed.");
        res.sendStatus(405);
});

//POST api/v1/pollutionStats/country (ERROR METODO NO PERMITIDO)
app.post("/api/v1/pollution-stats/:country", (req, res) => {
    console.log("FATAL ERROR !!: Method not Allowed.");
        res.sendStatus(405);
});
// PUT /api/v1/pollution-stats (ERROR METODO NO PERMITIDO)
app.put("/api/v1/pollution-stats", (req, res) => {
    console.log("FATAL ERROR !!: Method not Allowed.");
        res.sendStatus(405);
});

/// DELETE  concreto///
app.delete("/api/v1/pollution-stats/:country/:year",(req,res)=>{
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
app.get("/api/v1/pollution-stats/docs",(req,res)=>{
    res.writeHead(301, {Location: 'https://documenter.getpostman.com/view/6902825/S17ozAgF'});
    res.end();
});

const ps = "https://documenter.getpostman.com/view/6902825/S17ozAgF";
app.get("/api/v1/pollution-stats/docs", (req, res) => {
    res.sendStatus(301)
    res.redirect(ps);
});

/////////////////////////////////////////
///////////////////////////////////
//////// ANDRES FERNANDEZ GOMEZ//////////

const youth_unemployment_stats_URL = "https://documenter.getpostman.com/view/7067069/S17usSLN";
app.get("/api/v1/youth-unemployment-stats/docs", (req, res) => {
    //res.sendStatus(301)
    res.redirect(youth_unemployment_stats_URL);
});

//GET /api/v1/youthUnemploymentStats/loadInitialData
app.get("/api/v1/youth-unemployment-stats/loadInitialData", (req, res) => {
    youthUnemploymentStats.find({}).toArray( (err, youthUnemploymentStats_a) => {
    if (err) console.log("FATAL ERROR !!: ", err);
    if (youthUnemploymentStats_a.length == 0) {
   youthUnemploymentStats.insert({
    country: "spain",
    year: "2017",
    youth_unemployment: "36.8",
    youth_unemployment_man: "37.8",
    youth_unemployment_woman: "35.7"
    });
    
    youthUnemploymentStats.insert({
    country: "spain",
    year: "2016",
    youth_unemployment: "42.1",
    youth_unemployment_man: "42.5",
    youth_unemployment_woman: "41.7"
    });
    
    youthUnemploymentStats.insert({
    country: "spain",
    year: "2015",
    youth_unemployment: "45.8",
    youth_unemployment_man: "45",
    youth_unemployment_woman: "46.7"
    });

    youthUnemploymentStats.insert({
    country: "alemania",
    year: "2017",
    youth_unemployment: "6.5",
    youth_unemployment_man: "7.2",
    youth_unemployment_woman: "5.6"
    });
    
    youthUnemploymentStats.insert({
    country: "alemania",
    year: "2016",
    youth_unemployment: "6.7",
    youth_unemployment_man: "7.5",
    youth_unemployment_woman: "5.8"
    });
    
    youthUnemploymentStats.insert({
    country: "alemania",
    year: "2015",
    youth_unemployment: "7.1",
    youth_unemployment_man: "7.7",
    youth_unemployment_woman: "6.4"
    });
    
   youthUnemploymentStats.insert({
    country: "reino unido",
    year: "2017",
    youth_unemployment: "12.5",
    youth_unemployment_man: "13.5",
    youth_unemployment_woman: "11.4"
    });
    
    youthUnemploymentStats.insert({
    country: "reino unido",
    year: "2016",
    youth_unemployment: "12.6",
    youth_unemployment_man: "14.8",
    youth_unemployment_woman: "10.1"
    });
    
    youthUnemploymentStats.insert({
    country: "reino unido",
    year: "2015",
    youth_unemployment: "13.6",
    youth_unemployment_man: "14.8",
    youth_unemployment_woman: "12.3"
    });

    youthUnemploymentStats.insert({
    country: "francia",
    year: "2017",
    youth_unemployment: "21.6",
    youth_unemployment_man: "22.3",
    youth_unemployment_woman: "20.8"
    });
    
    youthUnemploymentStats.insert({
    country: "francia",
    year: "2016",
    youth_unemployment: "23.3",
    youth_unemployment_man: "24.3",
    youth_unemployment_woman: "22.1"
    });
    
    youthUnemploymentStats.insert({
    country: "francia",
    year: "2015",
    youth_unemployment: "24.5",
    youth_unemployment_man: "25.8",
    youth_unemployment_woman: "22.9"
    });
    
    youthUnemploymentStats.insert({
    country: "italia",
    year: "2017",
    youth_unemployment: "32.4",
    youth_unemployment_man: "31.2",
    youth_unemployment_woman: "36.2"
    });
    
    youthUnemploymentStats.insert({
    country: "italia",
    year: "2016",
    youth_unemployment: "38.2",
    youth_unemployment_man: "36.5",
    youth_unemployment_woman: "40.6"
    });
    
    youthUnemploymentStats.insert({
    country: "italia",
    year: "2015",
    youth_unemployment: "38.3",
    youth_unemployment_man: "37.9",
    youth_unemployment_woman: "39.5"
    });
        console.log("Request accepted, creating new resources in database.");
        res.sendStatus(201);   
    }
    else{
    console.log("FATAL ERROR !!: Data Base is not empty.");
    res.sendStatus(409);}
});});

/// GET /api/v1/youthUnemploymentStats ///
app.get("/api/v1/youth-unemployment-stats",(req,res)=>{
    youthUnemploymentStats.find({}).toArray((err,youthUnemploymentStatsArray) =>{
     if(err)
        console.log("Error: " +err)
     res.send(youthUnemploymentStatsArray);   
    });
});



// GET /api/v1/youthUnemploymentStats/:country/:year
app.get("/api/v1/youth-unemployment-stats/:country/:year", (req, res) => {
        var country = req.params.country;
        var year = req.params.year;
        youthUnemploymentStats.find( {"country": country, "year": year} ).toArray( (err, youthUnemploymentStats_a) => {
                if(err) console.log("FATAL ERROR !!: ", err);
                if(youthUnemploymentStats_a.length  > 0){
                    console.log("Request accepted, sending resource from database.");
                    res.send(youthUnemploymentStats_a[0]);
                } else {
                    console.log("Request accepted, removing resource of database.");
                    res.sendStatus(404);
                }
            }
        );
    }
);

//DELETE /api/v1/youth-unemployment-stats (BORRA TODOS LOS RECURSOS)
app.delete("/api/v1/youth-unemployment-stats", (req, res) => {
        youthUnemploymentStats.remove({});
        console.log("Request accepted, removing all resources of database.");
        res.sendStatus(200);
    }
);

/// DELETE /api/v1/youthUnemploymentStats/:country/:year ///
app.delete("/api/v1/youth-unemployment-stats/:country/:year", (req, res) => {
        var country = req.params.country;
        var year = req.params.year;
        var found = false;
        youthUnemploymentStats.find( {"country": country,"year": year} ).toArray( (err, youthUnemploymentStats_a) =>{
                if(err) console.log("FATAL ERROR: ", err);
                if(youthUnemploymentStats_a.length > 0){
                    youthUnemploymentStats.remove(youthUnemploymentStats_a[0]);
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
app.put("/api/v1/youth-unemployment-stats/:country/:year", (req, res) => {
        var country = req.params.country;
        var year = req.params.year;
        var updatedYouth = youthUnemploymentStats.find( {"country": country, "year": year});
        
            
                
                if(updatedYouth.totalSize == undefined){
                    res.sendStatus(400);
                } else if(req.body.country == country){
                updatedYouth.update({"country": country, "year": year},req.body);
                   res.sendStatus(200); 
                }else
                   res.sendStatus(400);
                    
                });
            


//POST /api/v1/youthUnemploymentStats/country/year (ERROR METODO NO PERMITIDO)
app.post("/api/v1/youth-unemployment-stats/:country/:year", (req, res) => {
    console.log("FATAL ERROR !!: Method not Allowed.");
        res.sendStatus(405);
});

//POST api/v1/youthUnemploymentStats/country (ERROR METODO NO PERMITIDO)
app.post("/api/v1/youth-unemployment-stats/:country", (req, res) => {
    console.log("FATAL ERROR !!: Method not Allowed.");
        res.sendStatus(405);
});
// PUT /api/v1/youth-unemployment-stats (ERROR METODO NO PERMITIDO)
app.put("/api/v1/youth-unemployment-stats", (req, res) => {
    console.log("FATAL ERROR !!: Method not Allowed.");
        res.sendStatus(405);
});

/*/// DELETE  concreto///
app.delete("/api/v1/youth-unemployment-stats/:country/:year",(req,res)=>{
    var country = req.params.country;
    var year = req.params.year;
    var found = false;
    var updateUnemployment = youthUnemploymentStats.filter((c)=>{
        if(c.country != country && c.year != year){
            found = true;
        }
        return c.country != country && c.year != year;
    });
    if(found == false){
        res.sendStatus(404);
    }else{
        youthUnemploymentStats = updateUnemployment;
        res.sendStatus(200); 
    }
    if(found == false){
        res.sendStatus(404);
    }else{
        youthUnemploymentStats = updateUnemployment;
    }
    res.sendStatus(200);
    });
});
*/



app.listen(port, () => {
   console.log("PORT " + port + " OK");
});
    
});