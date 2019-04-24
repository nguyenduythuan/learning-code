var Product = require('../models/product.model');
var pagination = require('../pagination/pages');

module.exports.index = async function (req, res) {
	var page = parseInt(req.query.page) || 1;
	var allProducts = Math.ceil((await Product.find()).length /8);
	var numberPage = pagination(page, allProducts);
	var products = await Product.find().limit(8).skip((page-1)*8);
	res.render('products/index',{
		products: products,
		pages: numberPage,
		current: page
	});
};

module.exports.get = function(req, res, next){
	res.render('products/add');
};

module.exports.postCreat = async function(req, res, next){
	var name = req.body.name;
	var image =req.file.path.split("\\").slice(1).join("/");
	var text = req.body.text;
	var products = await Product.create({name: name, image: image, text: text});
	products.save(function (err) {
		if(err)
			return handleError(err);
	});
	res.redirect('/products');
};

module.exports.search = async function (req, res) {
	var q = req.query.q;
	var page = parseInt(req.query.page) || 1;
	var start = (page-1)*8;
	var end = page*8;
	var products = (await Product.find()).filter(function(product){
		return product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	var allProducts = Math.ceil(products.length/8);
	var pages =  pagination(page, allProducts);
	res.render('products/index', {
		products: products.slice(start, end),
		value: q,
		pages: pages,
		current: page
	});
}