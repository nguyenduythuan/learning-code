var Session = require('../models/session.model');
var Product = require('../models/product.model');
module.exports.addToCart = async function(req, res, next) {
	var productId = req.params.productId;
	var sessionId = req.signedCookies.sessionId;

	if(!sessionId){
		res.redirect('/products');
		return;
	}
	var session = await  Session.findOne({idProductCart: sessionId});
	var carts = session.cart;
	if(!carts)
	{
		Session.updateOne({_id: session.id}, {$push:{cart: {product: productId, amount: 1}}}, function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log(success);
        	}
    	});
		res.redirect('/products');
		return;
	}
	else {
		var cartId = session.cart;
		for(var i = 0; i < cartId.length; i++){
			var id = cartId[i].product;
			if(id === productId){
				var a = cartId[i].amount;
				await Session.updateOne({'cart.product':  productId}, { $set:{ 'cart.$.amount':  ++a } }, function(err) {
		 			if(err)
						return res.send(err);
				});
				res.redirect('/products');
				return;
			}
		}
		Session.updateOne({_id: session.id}, { $push:{ cart: { product: productId, amount: 1 }} }, function(err) {
		 		if(err)
					return res.send(err);
				});
			res.redirect('/products');
			return;
	}
}

module.exports.getProductCart = async function (req, res) {
	var sessionId = req.signedCookies.sessionId;
	var productCart = [];
	var getSessionCart = await Session.findOne({idProductCart: sessionId},'cart.product cart.amount', function(err) {
		 			if(err)
						return res.send(err);
				});
	var cart =getSessionCart.cart; 
	for(var i = 0; i < cart.length; i++){
		var products = await Product.findOne({_id: cart[i].product}, 'image name',function(err) {
		 			if(err)
						return res.send(err);
				});
		if(products){
			var a_cart = {
				image: products.image,
				name: products.name,
				amount: cart[i].amount
			};
			productCart.push(a_cart);
		}
	}
	res.render('cart/index', {
		cartProducts: productCart
	});
}