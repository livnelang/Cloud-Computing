// Load the module dependencies
var mongoose = require('./config/mongoose'),
    express = require('./config/express');
    // redis = require('./config/redis');


// Create a new Mongoose connection instance
var db = mongoose();

// Create a new Express application instance
var app = express();

//Test server Connection
app.get('/online', function(req, res) {
    res.send(server.address().address);
});

//Test Redis Connection
app.get('/online', function(req, res) {
    res.send(server.address().address);
});



// Use the Express application instance to listen to the port

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port + ' ..');
});



