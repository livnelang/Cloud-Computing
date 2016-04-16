
// Load the module dependencies
var mongoose = require('mongoose');

// Define the Mongoose configuration
module.exports = function() {
    //Connect to MongoDB with Mongoose
    var db = mongoose.connect('mongodb://boardcast:123456@ds023448.mlab.com:23448/boardcast');

    //Load the application models
    require('../app/models/courses.model');
    require('../app/models/teachers.model');
    require('../app/models/students.model');
    require('../app/models/images.model');


    //Return the Mongoose connection instance
    return db;
};