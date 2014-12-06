
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var usersSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  accounts: [
    {
      provider: String,
      login: String,
      password: String
    }
  ],
  mail: {
    inbox: [Schema.Types.Mixed]
  }
});

module.exports = mongoose.model('User', usersSchema);

