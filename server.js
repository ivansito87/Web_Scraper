
//Dependencies ++++++++++++++++++++++++++++++++++++++++============================+???????????
var express = require("express");
var mongoose = require("mongoose");
var rp = require("request-promise");
var cheerio = require("cheerio");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");

//Connecton ++++++++++++++++++++++++++++++++++++++++============================+???????????
var PORT = process.env.PORT || 8080;

//Mongoose connection ++++++++++++++++++++++++++++++++++++++++============================+???????????

//Express app ++++++++++++++++++++++++++++++++++++++++============================+???????????
var app = express();

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
var db = mongoose.connection;


// var Schema = mongoose.Schema();


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("We're connected!");    // we're connected!
});



// var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

/*
// Routes
// =============================================================
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);
require("./routes/post-api-routes.js")(app);
// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("App listening on http://localhost:" + PORT);
    });
});
*/

app.listen(PORT, function() {
    console.log("App listening on http://localhost:" + PORT);
});