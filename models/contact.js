var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    ImageUrl:     {type: String},
    Name:         {type: String,  required: true},
    Number:       {type: Number,  required: true},
    Email:        {type: String,  required: true},
    bFavourite:   {type: Boolean, required:true}
});
//schema.plugin(mongooseUniqueValidator);


module.exports = mongoose.model('Contact',schema); 