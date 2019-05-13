const _ = require('lodash');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const User = require('../service/UserService');

module.exports.signUpUser = async function signUpUser (request, response, next) {
	
	let newUser = request.body;

	const { error } = validateUser(newUser);
	if (error) return response.status(400).send(error.details[0].message);

	const user = await User.isAlreadyRegistered(newUser.email);
	if (user) return response.status(400).send('User already registered!');

	const salt = await bcrypt.genSalt(10);
	newUser.password = await bcrypt.hash(newUser.password, salt);
	User.signUpUser(newUser).then((result) => {
		response.status(200).send({
			info: 'SignUp successful!',
			user: _.pick(newUser, ['name', 'email'])
		});
	});
	
}

module.exports.signInUser = function signInUser (request, response, next) {
	
	const user = request.body;
	// TODO: Hash password

	User.signInUser(user.email, user.password).then(result => {
		if (result) {
			response.json(_.pick(result[0], ['name', 'email']));
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