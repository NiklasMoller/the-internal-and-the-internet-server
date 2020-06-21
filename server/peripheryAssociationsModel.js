var mongoose = require('mongoose');
require('mongoose-type-email');
var Schema = mongoose.Schema;


var associationSchema = new mongoose.Schema({
  association: {
    type: String,
    required: [true, 'Association is required']
  }
});

module.exports = mongoose.model('periphery-association', associationSchema);
