const _ = require('lodash');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const User = require('../service/UserService');

module.exports.signUpUser = function signUpUser (request, response, next) {

	console.log(request.body);
	
	const email = request.swagger.params['email'].value;
	/*
	const name = request.swagger.params['name'].value;
	const password = request.swagger.params['password'].value;
	*/
	const { error } = validateUser(request.body);
	if (error) return response.status(400).send(error.details[0].message);

	let user = User.isAlreadyRegistered(email);

	if (user) return response.status(400).send('User already registered!');

	user = _.pick(request.swagger.params, ['name', 'email', 'password']);
	const salt = bcrypt.genSalt(10);
	user.password = bcrypt.hash(user.password, salt);
	User.signUpUser(user).then(() => {
		response.status(200).send('SignUp successful!');
	});
}

module.exports.signInUser = function signInUser (request, response, next) {
	const email = request.swagger.params['email'].value;
	const password = request.swagger.params['password'].value;
	// TODO: Hash password
	User.signInUser(email, password).then(answer => {
		if (answer) {
			response.json(_.pick(answer, ['name', 'email']));
		} else {
			response.status(400).send('Invalid email or password.');
		}
	});
}

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(user, schema);
}