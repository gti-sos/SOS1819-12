var express = require("express");
var bodyParser = require("body-parser");

var life_expectancy_stats_api = require("./life-expectancy-stats-api")

var app = express();
const BASE_PATH = "/api";

var app = express();
var port = process.env.PORT || 8080;
app.use("/", express.static(__dirname + "/public"));
app.use(bodyParser.json());


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

app.listen(port);