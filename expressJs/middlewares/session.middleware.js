const shortid = require('shortid');
var Session = require('../models/session.model');
module.exports = async function (req, res, next){
	if(!req.signedCookies.sessionId){
		var sessionId = shortid.generate();
		res.cookie('sessionId', sessionId, {
			signed: true
		});
		var session = await Session.create({idProductCart: sessionId, cart: {}});
		session.save(function (err) {
		if(err)
			return res.send(err);
	});
	}
	next();
};

module.exports.getNumberCar = async function (req, res, next) {
	var sessionId = req.signedCookies.sessionId;
	var session = await Session.findOne({idProductCart: sessionId});
	var cart = session.cart;
	var sumcart = [];
	for(var i = 0; i < cart.length; i++){
		sumcart.push(cart[i].amount);
	}
	var sumProductCart = sumcart.reduce(function(a, b){
			return a + b;
		},0);
	res.locals.sum = sumProductCart;
	next();
}