var mongoose = require('mongoose');

var seccsionSchema = new mongoose.Schema({
	idProductCart: String,
	cart: { type: Object }
});

var Session = mongoose.model('Session', seccsionSchema, 'sessions');

module.exports = Session;