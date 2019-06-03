const youth_unemployment_stats_URL = "https://documenter.getpostman.com/view/7067069/S17usSLN";

module.exports = function (app, BASE_PATH, youth_unemployment_stats){
    
   // Proxy API 4
     var request = require("request");
    var Api4 = "https://sos1819-09.herokuapp.com/api/v2/climate-stats";
    app.use("/proxyC", function(req, res){
        console.log("Piped: "+ Api4);
        var re = request(Api4);
        req.pipe(re).pipe(res);
    });
    
    // POSTMAN
    app.get(BASE_PATH+"/youth-unemployment-stats/docs", (req, res) => {
        res.redirect(youth_unemployment_stats_URL);
        res.sendStatus(301);
    });
    
    //INTEGRACIONES
    var request = require("request");
    var Api1 = "http://sos1819-15.herokuapp.com";
    app.use("/proxySR", function(req,res){
        var url = Api1 + req.url;
        req.pipe(request(url)).pipe(res);
    });

    //GET /api/v1/youth-unemployment-stats/loadInitialData
     app.get(BASE_PATH+"/youth-unemployment-stats/loadInitialData", (req, res) => {
        youth_unemployment_stats.find({}).toArray( (err, youth_unemployment_stats_a) => {
            if (err) 
                console.log("FATAL ERROR !!: ", err);
            if (youth_unemployment_stats_a.length == 0) {
        youth_unemployment_stats.insert({country: "spain", year: 2017, youth_unemployment: 36.8, youth_unemployment_man: 37.8, youth_unemployment_woman: 35.7 });
        youth_unemployment_stats.insert({country: "spain", year: 2016, youth_unemployment: 42.1, youth_unemployment_man: 42.5, youth_unemployment_woman: 41.7});
        youth_unemployment_stats.insert({country: "spain", year: 2015, youth_unemployment: 45.8, youth_unemployment_man: 45, youth_unemployment_woman: 46.7});
        youth_unemployment_stats.insert({country: "alemania", year: 2017, youth_unemployment: 6.5, youth_unemployment_man: 7.2, youth_unemployment_woman: 5.6});
        youth_unemployment_stats.insert({country: "alemania", year: 2016, youth_unemployment: 6.7, youth_unemployment_man: 7.5, youth_unemployment_woman: 5.8});
        youth_unemployment_stats.insert({country: "alemania", year: 2015, youth_unemployment: 7.1, youth_unemployment_man: 7.7, youth_unemployment_woman: 6.4});
        youth_unemployment_stats.insert({country: "reino unido", year: 2017, youth_unemployment: 12.5, youth_unemployment_man: 13.5, youth_unemployment_woman: 11.4});
        youth_unemployment_stats.insert({country: "reino unido", year: 2016, youth_unemployment: 12.6, youth_unemployment_man: 14.8, youth_unemployment_woman: 10.1});
        youth_unemployment_stats.insert({country: "reino unido", year: 2015, youth_unemployment: 13.6, youth_unemployment_man: 14.8, youth_unemployment_woman: 12.3});
        youth_unemployment_stats.insert({country: "francia", year: 2017, youth_unemployment: 21.6, youth_unemployment_man: 22.3, youth_unemployment_woman: 20.8});
        youth_unemployment_stats.insert({country: "francia", year: 2016, youth_unemployment: 23.3, youth_unemployment_man: 24.3, youth_unemployment_woman: 22.1});
        youth_unemployment_stats.insert({country: "francia", year: 2015, youth_unemployment: 24.5, youth_unemployment_man: 25.8, youth_unemployment_woman: 22.9});
        youth_unemployment_stats.insert({country: "italia", year: 2017, youth_unemployment: 32.4, youth_unemployment_man: 31.2, youth_unemployment_woman: 36.2});
        youth_unemployment_stats.insert({country: "italia", year: 2016, youth_unemployment: 38.2, youth_unemployment_man: 36.5, youth_unemployment_woman: 40.6});
        youth_unemployment_stats.insert({country: "italia", year: 2015, youth_unemployment: 38.3, youth_unemployment_man: 37.9, youth_unemployment_woman: 39.5});
        youth_unemployment_stats.insert({country: "portugal", year: 2017, youth_unemployment: 22.0, youth_unemployment_man: 21.7, youth_unemployment_woman: 22.4});
        youth_unemployment_stats.insert({country: "portugal", year: 2016, youth_unemployment: 26.1, youth_unemployment_man: 25.3, youth_unemployment_woman: 26.9});
        youth_unemployment_stats.insert({country: "portugal", year: 2015, youth_unemployment: 30.1, youth_unemployment_man: 30.4, youth_unemployment_woman: 29.7});
        youth_unemployment_stats.insert({country: "finlandia", year: 2017, youth_unemployment: 18.5, youth_unemployment_man: 19.6, youth_unemployment_woman: 17.5});
        youth_unemployment_stats.insert({country: "finlandia", year: 2016, youth_unemployment: 20.3, youth_unemployment_man: 21.2, youth_unemployment_woman: 19.3});
        youth_unemployment_stats.insert({country: "finlandia", year: 2015, youth_unemployment: 21.7, youth_unemployment_man: 24.3, youth_unemployment_woman: 19.4});
        youth_unemployment_stats.insert({country: "holanda", year: 2017, youth_unemployment: 8.0, youth_unemployment_man: 8.6, youth_unemployment_woman: 7.5});
        youth_unemployment_stats.insert({country: "holanda", year: 2016, youth_unemployment: 10.2, youth_unemployment_man: 10.6, youth_unemployment_woman: 9.8});
        youth_unemployment_stats.insert({country: "holanda", year: 2015, youth_unemployment: 11.2, youth_unemployment_man: 11.5, youth_unemployment_woman: 10.8});
        youth_unemployment_stats.insert({country: "irlanda", year: 2017, youth_unemployment: 13.2, youth_unemployment_man: 14.4, youth_unemployment_woman: 11.8});
        youth_unemployment_stats.insert({country: "irlanda", year: 2016, youth_unemployment: 15.6, youth_unemployment_man: 17.3, youth_unemployment_woman: 13.8});
        youth_unemployment_stats.insert({country: "irlanda", year: 2015, youth_unemployment: 19.1, youth_unemployment_man: 23.0, youth_unemployment_woman: 14.7});
        youth_unemployment_stats.insert({country: "croacia", year: 2017, youth_unemployment: 25.9, youth_unemployment_man: 23.7, youth_unemployment_woman: 29.0});
        youth_unemployment_stats.insert({country: "croacia", year: 2016, youth_unemployment: 30.5, youth_unemployment_man: 31.0, youth_unemployment_woman: 29.8});
        youth_unemployment_stats.insert({country: "croacia", year: 2015, youth_unemployment: 38.3, youth_unemployment_man: 36.8, youth_unemployment_woman: 40.3});
    
            res.sendStatus(201);   
        }
        else{
        res.sendStatus(409);}
    });});


// GET /api/v1/youth_unemployment-stats
     app.get(BASE_PATH+"/youth-unemployment-stats", (req,res) => {
        var youth_unemployment_stats_offset = parseInt(req.query.offset) || 0;
        var youth_unemployment_stats_limit = parseInt(req.query.limit) || 100;
        
        var interval = 0.5;
        var search = {};
        
        if(req.query.country)  search["country"] = req.query.country;
        if(req.query.year){
            search["year"] = parseInt(req.query.year);
        } else if(req.query.from && req.query.to){
            search["year"] = { $gte : parseInt(req.query.from), $lte : parseInt(req.query.to) };
        }
        if(req.query.youth_unemployment)  search["youth_unemployment"] = { $gte : parseFloat(req.query.youth_unemployment)-interval, $lte : parseFloat(req.query.youth_unemployment)+interval };
        if(req.query.youth_unemployment_man)  search["youth_unemployment_man"] = { $gte : parseFloat(req.query.youth_unemployment_man)-interval, $lte : parseFloat(req.query.youth_unemployment_man)+interval };
        if(req.query.youth_unemployment_woman)  search["youth_unemployment_woman"] = { $gte : parseFloat(req.query.youth_unemployment_woman)-interval, $lte :parseFloat(req.query.youth_unemployment_woman)+interval };
        
        var fields = {"_id": 0};
        if(req.query.fields){
            req.query.fields.split(",").forEach( (f) => {
                fields[f] = 1;
                }
            );
        }

        youth_unemployment_stats.find(search, {"fields":fields}).skip(youth_unemployment_stats_offset).limit(youth_unemployment_stats_limit).toArray((err,statsArray)=>{
            if(err)
                console.log("Error: "+err);
            res.send(statsArray);
        });
    });
    
    // GET /api/v1/youth-unemployment-stats/spain
    app.get(BASE_PATH+"/youth-unemployment-stats/:country", (req,res) => {
        const youth_unemployment_stats_offset = parseInt(req.query.offset) || 0;
        const youth_unemployment_stats_limit = parseInt(req.query.limit) || 100;
        var country = req.params.country;
        
        var fields = {"_id": 0};
        if(req.query.fields){
            req.query.fields.split(",").forEach( (f) => {
                fields[f] = 1;
                }
            );
        }
        
        youth_unemployment_stats.find({"country": country}, {"fields":fields}).skip(youth_unemployment_stats_offset).limit(youth_unemployment_stats_limit).toArray((err, youth_unemployment_stats_array)=>{
            if(err)
                console.log("Error: "+err);
            if(youth_unemployment_stats_array.length>0){
                res.send(youth_unemployment_stats_array);
            }else{
                res.sendStatus(404);
            }
        });
    });
   
    // GET /api/v1/youth-unemployment-stats/spain/2016
    app.get(BASE_PATH+"/youth-unemployment-stats/:country/:year", (req,res) => {
        var country = req.params.country;
        var year = parseInt(req.params.year);
        console.log(typeof(req.body.country));
        var fields = {"_id": 0};
        if(req.query.fields){
            req.query.fields.split(",").forEach( (f) => {
                fields[f] = 1;
                }
            );
        }
        
         youth_unemployment_stats.find({"country": country, "year": year}, {"fields":fields}).toArray((err, youth_unemployment_stats_array)=>{
            if(err)
                console.log("Error: "+err);
                if(youth_unemployment_stats_array.length>0){
                    res.send(youth_unemployment_stats_array[0]);
                }else{
                    res.sendStatus(404);
                }
        });
    });
    
    
     // POST /api/v1/youth-unemployment-stats
    app.post(BASE_PATH+"/youth-unemployment-stats", (req,res) => {
        var newStat = req.body;
        youth_unemployment_stats.find(newStat).toArray((err, youth_unemployment_stats_a)=>{
            if(err)
                console.log("Error: "+err);
            if(youth_unemployment_stats_a.length==0){
                youth_unemployment_stats.insert(newStat);
                res.sendStatus(201);
            }else{
                res.sendStatus(409);
            }
        });
    });
    
    //POST /api/v1/youth-unemployment-stats/spain (ERROR METODO NO PERMITIDO)
    app.post(BASE_PATH+"/youth-unemployment-stats/:country", (req, res) => {
        res.sendStatus(405);
    });
    //POST /api/v1/youth-unemployment-stats/alemania/2018 (ERROR METODO NO PERMITIDO)
    app.post(BASE_PATH+"/youth-unemployment-stats/:country/:year", (req, res) => {
        res.sendStatus(405);
    });
    
    // PUT /api/v1/youth-unemployment-stats/spain/2017
    app.put(BASE_PATH+"/youth-unemployment-stats/:country/:year", (req,res) => {
        var country = req.params.country;
        var year = parseInt(req.params.year);
        youth_unemployment_stats.find({"country": country, "year": year}).toArray((err, youth_unemployment_stats_a) => {
            if(err)
                console.log("Error: "+err);
            if(Object.keys(req.body).length!=5 || req.body.country==undefined || req.body.year==undefined || req.body.youth_unemployment==undefined || req.body.youth_unemployment_man==undefined || req.body.youth_unemployment_woman==undefined){
                res.sendStatus(400);
            } else if(req.body.country==country && req.body.year==year && youth_unemployment_stats_a.length==1){
                youth_unemployment_stats.update({"country": country, "year": year}, req.body);
                res.sendStatus(200);
            } else if(youth_unemployment_stats_a.length==0){
                res.sendStatus(404);
            }
        });
    });
    
    // PUT /api/v1/youth-unemployment-stats (ERROR METODO NO PERMITIDO)
    app.put(BASE_PATH+"/youth-unemployment-stats", (req, res) => {
        res.sendStatus(405);
    });
    
      
    // DELETE /api/v1/youth-unemployment-stats/spain/2015
    app.delete(BASE_PATH+"/youth-unemployment-stats/:country/:year", (req,res) => {
        var country = req.params.country;
        var year = parseInt(req.params.year);
        youth_unemployment_stats.find({"country": country, "year": year}).toArray((err, youth_unemployment_stats_a)=>{
            if(err)
                console.log("Error: "+err);
            if(youth_unemployment_stats_a.length>0){
                youth_unemployment_stats.remove(youth_unemployment_stats_a[0]);
                res.sendStatus(200);
            }else{
                res.sendStatus(404);
            }
        });
    });
    
  // DELETE /api/v1/youth-unemployment-stats
    app.delete(BASE_PATH+"/youth-unemployment-stats", (req,res) => {
        youth_unemployment_stats.remove({});
        res.sendStatus(200);
    });

}