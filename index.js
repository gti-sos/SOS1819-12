var express = require("express");
<<<<<<< HEAD
=======

>>>>>>> a73b00c664d45ac9fa632846a536d9671ab22ec9
var app = express();

var port = process.env.PORT || 8080

<<<<<<< HEAD
app.use("/",express.static(__dirname+"/public"));

app.listen(port,()=>{
    console.log("okeyy"+port);
=======
app.use("/", express.static(__dirname + "/public"));

app.listen(port, () => {
   console.log("PORT " + port + " OK") 
>>>>>>> a73b00c664d45ac9fa632846a536d9671ab22ec9
});