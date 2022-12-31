const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  id: Number,
  user: String,
  password: String,
});
module.exports = mongoose.model('Users', userSchema);
