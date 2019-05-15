var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var port = process.env.PORT || 8080;

const BASE_PATH = "/api";

app.use('/', express.static(path.join(__dirname, "public")));


//app.use("/ui/v1/pollution-stats", express.static(__dirname+"/pollution-stats-api/v1/pollution-stats"));

//app.use("/ui/v1/youth-unemployment-stats", express.static(__dirname+"/youth-unemployment-stats-api/v1/youth-unemployment-stats"));

app.use(bodyParser.json());

//===========================================================================================> life-expectancy-stats
var life_expectancy_stats_api = require("./life-expectancy-stats-api")

const MongoClientA = require("mongodb").MongoClient;
const uriA = "mongodb+srv://user:user@cluster0-gdn8y.mongodb.net/Cluster0?retryWrites=true";
const clientA = new MongoClientA(uriA, { useNewUrlParser: true });


var life_expectancy_stats;

clientA.connect(err => {
  life_expectancy_stats = clientA.db("sos1819-ajm").collection("life-expectancy-stats");
  // perform actions on the collection object
  console.log("Connetion of life-expectancy-stats in MongoDB actived");
  life_expectancy_stats_api(app, BASE_PATH, life_expectancy_stats);
  //app.listen(port);
  //client.close();
});
//===========================================================================================> life-expectancy-stats


//==============================================================================

var pollutionStatsApi = require("./pollution-stats-api");

const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://test:test@Cluster0-fm5c9.mongodb.net/Cluster0?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

var pollutionStats ;

client.connect(err => {
  pollutionStats = client.db("SOS1819-12").collection("sos");
  console.log("Funciona MongoDB");
  pollutionStatsApi(app,BASE_PATH,pollutionStats);
});
//=====================================================================================> youth-unemployment-stats

var youth_unemployment_stats_api = require("./youth-unemployment-stats-api");


const MongoClientC = require("mongodb").MongoClient;
const uriC = "mongodb+srv://andfergom:database@sos-zgrhq.mongodb.net/sos?retryWrites=true";
const clientC= new MongoClientC(uriC, { useNewUrlParser: true });


var youth_unemployment_stats;

clientC.connect(err => {
  youth_unemployment_stats = clientC.db("sos1819").collection("countries");
  console.log("Conneted my collection countries");
   youth_unemployment_stats_api(app,BASE_PATH,youth_unemployment_stats);
  //client.close();
});

app.listen(port);