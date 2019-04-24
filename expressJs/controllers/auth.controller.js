var md5 = require('md5');
var User = require('../models/user.model');
module.exports.login = function (req, res){
	res.render('auth/login');
};

module.exports.postLogin = async function (req, res){
	var email   = req.body.email;
	var password= req.body.password;
	var user    = await User.findOne( { email: email } );
	console.log(user.password);	
	var errors = [];
	if(!user){
		errors.push('Email is not available');
		res.render('auth/login', {
			errors: errors,
			values: req.body
		});
		return;
	}
	var hashedPassword = md5(password);
	if(user.password != hashedPassword){
		errors.push('Incorrect password');
		res.render('auth/login',{
			errors: errors,
			values: req.body
		});
		return;
	}
	res.cookie('userId', user.id, {
		signed: true
	});
	res.redirect('/');
}

module.exports.logout = function (req, res){
	res.clearCookie('userId');
	res.redirect('/');
};