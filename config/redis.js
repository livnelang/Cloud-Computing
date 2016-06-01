//Load the module dependencies
var redis = require('redis');


module.exports = function() {

    //config redis module credentials
    var fs = require('fs');
    var redis_data = JSON.parse(fs.readFileSync('../.redis/config.json', 'utf8'));

    // new redis client
    var client = redis.createClient({
        host: redis_data.details.host, port: redis_data.details.port
    });


        // authenticate a connection
        client.auth(redis_data.pass, function() {
            console.log('Redis connected on port 15675 ..');
            // emit initialize function
        });

    var data = {
        'javascript': 'AngularJS',
        'css': 'Bootstrap',
        'node': 'Express'
    };
        client.set('my_data',JSON.stringify(data));



        client.set('double', 'trouble', function(err, reply) {
            // console.log(reply);
        });

    return client;
};


