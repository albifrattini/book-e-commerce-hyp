const _ = require('lodash');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const User = require('../service/UserService');


module.exports.signUpUser = async function signUpUser (request, response, next) {
	
	let newUser = request.body;

	const { error } = validateUser(newUser);
	if (error) return response.status(400).send(error.details[0].message);

	const user = await User.findUser(newUser.email);
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

module.exports.login = async function login (request, response, next) {
	
	const credentials = request.body;

	const { error } = validateCredentials(credentials); 
	if (error) return response.status(400).send(error.details[0].message);

	const user = await User.findUser(credentials.email);
	if (!user) return response.status(400).send('Invalid email or password.');

	const validPassword = await bcrypt.compare(credentials.password, user.password);
	if (!validPassword) return response.status(400).send('Invalid email or password.');

	response.status(200).send({
			info: 'Login successful!',
			user: _.pick(user, ['name', 'email'])
		});

	request.session.user = user.email;
	request.session.loggedin = true;
	request.session.save();

	// next();
}

module.exports.logout = function logout (request, response, next) {

	request.session.destroy();

	response.status(200).send('Logout successful!');

}

module.exports.isLoggedIn = function isLoggedIn (request, response, next) {

	// response.json(request.session.user);
	response.send({
		info: "Tells which user is logged in",
		user: request.session.user
	});

	// next();

}

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };
  return Joi.validate(user, schema);
}

function validateCredentials(credentials) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };
  return Joi.validate(credentials, schema);
}
