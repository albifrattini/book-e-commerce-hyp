const _ = require('lodash');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const Cart = require('../service/CartService');


module.exports.getCart = function getCart (request, response, next) {

	if (!request.session.loggedin) return response.status(403).send("You need to login in order to check your cart!");

	const user = request.session.user;

	Cart.getCart(user).then(result => {
		response.json(result);
		next();
	});

}

module.exports.addToCart = function addToCart (request, response, next) {

	if (!request.session.loggedin) return response.status(403).send("You need to login in order to add elements to your cart!");

	let cartEl = {};
	cartEl.ISBN = request.swagger.params['isbn'].value;
	cartEl.email = request.session.user;
	cartEl.quantity = 1;

	Cart.findBookInCart(cartEl.email, cartEl.ISBN).then(result => {
		if(result) {
			cartEl.quantity = result.quantity + 1;
			console.log(cartEl.quantity);
			Cart.updateQuantity(cartEl).then(result => {
				console.log(result);
				response.json(result);
			});
			console.log('Ciao');
		} else {
			Cart.addToCart(cartEl).then(result => {
				response.json(result);
			});
		}
	});

	
}

module.exports.emptyCart = function emptyCart (request, response, next) {

	if (!request.session.loggedin) return response.status(403).send("You need to login in order to add elements to your cart!");

	const user = request.session.user;

	Cart.emptyCart(user).then((nrows) => {
		if (nrows < 1) return response.status(400).send("There are no elements in the cart...");
		response.status(200).send("Cart now empty!");
	});
}