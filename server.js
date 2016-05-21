// Load the module dependencies
var mongoose = require('./config/mongoose'),
    express = require('./config/express'),
    AWS = require('aws-sdk');

//config aws module credentials
AWS.config.loadFromPath('C:/Users/Livne/.aws/config.json');
AWS.config.update({region: 'eu-central-1'});

var s3 = new AWS.S3();


//console.dir(s3);

// Create a new Mongoose connection instance
var db = mongoose();

// Create a new Express application instance
var app = express();

//Test AWS Upload
app.get('/testAWS/:filename/:text', function(req, res) {
    var filename = req.params.filename + '.txt';
    var text = req.params.text;

    console.log('filename: ' + filename);
    console.log('text: ' + text);

    //s3.client.listBuckets().done(function(response) {
    //    console.log(response.data);
    //});


    s3.putObject({
        Bucket: 'livnepictures',
        Key: filename,
        Body: text
    }, function (err) {
        if (err) { throw err; }
        else {console.log('yes !');}
    });
});

// Use the Express application instance to listen to the port

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port + ' ..');
});



