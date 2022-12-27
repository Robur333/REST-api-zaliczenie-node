const mongoose = require('mongoose');

var pollutionSchema = new mongoose.Schema({
  id: Number,
  place: String,
  value: String,
});
module.exports = mongoose.model('Pollution', pollutionSchema);
