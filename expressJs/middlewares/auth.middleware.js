var User = require('../models/user.model');
module.exports.getCookie = async function (req, res, next){
	if(!req.signedCookies.userId){
		res.redirect('/auth/login');
		return;
	}
	var user = await User.findById(req.signedCookies.userId);
	if(!user){
		res.redirect('/auth/login');
		return;
	}
	res.locals.user = user;
	next();
};

module.exports.getAuth = async function (req, res, next){
	var user = await User.findById(req.signedCookies.userId);
	res.locals.user = user;
	next();
}