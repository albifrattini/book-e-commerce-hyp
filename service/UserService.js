let dbConnection;

module.exports.usersDbSetup = function(database) {
	dbConnection = database;
	let users = require('../other/users.json');
	console.log('Initializing user table...');
	return dbConnection.schema.hasTable('users').then(exists => {
		if(!exists) {
			dbConnection.schema.createTable('users', table => {
				table.increments();
				table.text('name');
				table.text('email');
				table.text('password');
			}).then(() => {
				return dbConnection('users').insert(users);
			})
		}
	});
} 

module.exports.signUpUser = function(user) {
	return dbConnection('users').insert(user);
}

module.exports.signInUser = function(email, password) {
	return dbConnection('users').where('email', email).andWhere('password', password);
}

module.exports.isAlreadyRegistered = function(email) {
	return dbConnection('users').where('email', email).first();
}