var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
var mongoose = require("mongoose");
var contactRoutes = require("./routes/contacts");


var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

app.use('/contacts', contactRoutes);

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

mongoose.connect('himmi:himmi@ds141024.mlab.com:41024/mycontactlist_himmi',function(err, database){
  if (err) {
    console.log(err);
    process.exit(1);
  }
  
  // Initialize the app.
  var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});
// Create a database variable outside of the database connection callback to reuse the connection pool in your app.



// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}






  







