var express = require("express");
var bodyParser = require("body-parser");
var pollutionStatsApi = require("./pollution-stats-api");

var app = express();
const BASE_PATH ="/api";
var port = process.env.PORT || 8080;
app.use("/", express.static(__dirname + "/public"));
app.use(bodyParser.json());


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






app.listen(port, () => {
   console.log("PORT " + port + " OK");
});