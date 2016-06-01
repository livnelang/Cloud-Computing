//Load the module dependencies
var express = require('express');
var bodyParser = require('body-parser');

//Define the express configuration
module.exports = function() {

    //Create a new express instance
    var app = express();

    //configure body parser
    app.set('json spaces',4);

    //Add the Access Control (CORS)
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.use(bodyParser.json({limit: '50mb'})); // for parsing application/json
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


    // Load the routing files
    require('../app/routes/pictures.routes')(app);

    //Return the Express application instance
    return app;
};
