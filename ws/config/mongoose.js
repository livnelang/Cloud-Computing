
// Load the module dependencies
var mongoose = require('mongoose');

// If the connection throws an error
mongoose.connection.on("error", function(err) {
    console.error('Failed to connect to DB ' + db_server + ' on startup ', err);
});

mongoose.connection.on("connected", function(ref) {
    console.log("Connected to " + ref + " DB!");
});

// Define the Mongoose configuration
module.exports = function() {
    //Connect to MongoDB with Mongoose
    var db = mongoose.connect('mongodb://cloud:compute@ds011281.mlab.com:11281/cloud_compute');
    db = mongoose.connection;


    //Load the application models

    require('../app/models/pictures.model');


    //Return the Mongoose connection instance
    return db;
};
