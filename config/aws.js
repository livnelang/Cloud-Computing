//Load the module dependencies
var AWS = require('aws-sdk');

//config aws module credentials
AWS.config.loadFromPath('../.aws/config.json');
AWS.config.update({region: 'eu-central-1'});

module.exports = function() {

    // create a new s3 instance
    var s3 = new AWS.S3();

    // return it to server.js
    console.log('aws.js');
    return s3;
};