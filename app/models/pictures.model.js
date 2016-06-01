//Load the module dependencies
var mongoose = require('mongoose'), Schema = mongoose.Schema;

// Define a new 'pictureSchema'
var pictureSchema = new Schema({
    creator: String,
    title: String,
    src: String
},{collection: 'pictures'});

// Create the model of the 'pictureSchema'
mongoose.model('Picture', pictureSchema);