var mongoose = require('mongoose');
require('mongoose-type-email');
var Schema = mongoose.Schema;


var emailSchema = new mongoose.Schema({
    email: {type: mongoose.SchemaTypes.Email, required: true}
});

module.exports = mongoose.model('emails', emailSchema);
