
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mail-aggregator', {autoReconnect: true});

module.exports = {
  User: require('./User')
};
