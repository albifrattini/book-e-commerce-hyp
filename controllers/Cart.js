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
	cartEl.ISBN = request.swagger.params['bookIsbn'].value;
	cartEl.email = request.session.user;

	Cart.addToCart(cartEl).then(result => {
		response.json(result);
	});
}