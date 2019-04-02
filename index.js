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


var app = express();

var port = process.env.PORT || 8080;

app.use("/", express.static(__dirname + "/public"));
app.use(bodyParser.json());


app.listen(port, () => {
   console.log("PORT " + port + " OK");
});