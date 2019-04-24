var User = require('../models/user.model');
var shortid = require('shortid');
var md5 = require('md5');
var pagination = require('../pagination/pages');

module.exports.index = async function(req, res){
	var page = parseInt(req.query.page) || 1;
	var allUser = Math.ceil((await User.find()).length /8);
	var numberPage = pagination(page, allUser);
	var users = await User.find().limit(8).skip((page-1)*8);;
	res.render('users/index', {
		users: users,
		pages: numberPage,
		current: page
	});
};

module.exports.search = async function(req, res){
	var q = req.query.q;
	var page = parseInt(req.query.page) || 1;
	var start = (page-1)*8;
	var end = page*8;
	var matchedUser = (await User.find()).filter(function(user){
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	var allUser = Math.ceil(matchedUser.length /8);
	var pages =  pagination(page, allUser);
	res.render('users/index', {
		users: matchedUser.slice(start, end),
		value: q,
		pages: pages,
		current: page
	});
};

module.exports.create = function(req, res){
	res.render('users/create');
};

module.exports.get = async function(req, res){
	var id = req.params.id;
	var user = await User.findById(id);
	res.render('users/view', {
		user: user
	});
};

module.exports.postCreate = async function(req, res){
	var name = req.body.name;
	var phone = req.body.phone;
	var email = req.body.email;
	var password = md5(req.body.password);
	var image = req.file.path.split("\\").slice(1).join("/");
	var user = await User.create({name: name, phone: phone, email: email, password: password, avatar: image});
	user.save(function (err) {
		if(err)
			return handleError(err);
	});
	res.redirect('/users');
};

module.exports.getEdit = async function (req, res) {
	var id = req.params.id;
	var user = await User.findById(id);
	res.render('users/edit', {
		user: user
	});
};

module.exports.postEdit = async function (req, res) {
	var id = req.params.id;
	if(req.file){
		var image = req.file.path.split("\\").slice(1).join("/");
		var update = {
			name: req.body.name,
			phone: req.body.phone,
			avatar: image
		};
	}
	else
		var update = {
			name: req.body.name,
			phone: req.body.phone
		};
	await User.updateOne({_id: id }, update, function(err) {
	  if(err)
			return res.send(err);
	});
	res.redirect('/users');
};

module.exports.getDelete = async function (req, res) {
	var id = req.params.id;
	await User.findOneAndRemove({_id: id },function(err) {
	  if(err)
			return res.send(err);
	});
	res.redirect('/users');
};