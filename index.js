var express = require("express");
var bodyParser = require("body-parser");


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