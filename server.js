// Load the module dependencies
var mongoose = require('./config/mongoose'),
    express = require('./config/express'),
    AWS = require('./config/aws');


// Create a new Mongoose connection instance
var db = mongoose();

// Create a new Express application instance
var app = express();

// Create a new s3 bucket service instance
var s3 = AWS();

//Test AWS Upload
app.get('/testAWS/:filename/:text', function(req, res) {
    var filename = req.params.filename + '.txt';
    var text = req.params.text;

    console.log('filename: ' + filename);
    console.log('text: ' + text);


    s3.putObject({
        Bucket: 'livnepictures',
        Key: filename,
        Body: text
    }, function (err) {
        if (err) { throw err; }
        else {
            console.log('yes !');
            res.json({
                msg: "success"
            })
        }
    });
});

// Use the Express application instance to listen to the port

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port + ' ..');
});



