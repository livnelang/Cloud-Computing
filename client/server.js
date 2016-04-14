var express=require('express');
var app = express();

app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/views', express.static(__dirname + '/views'));

app.use('/', express.static('./')).listen(8000);
console.log('Client server listening on port 8000 ..\n');