const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile');
const envConfig = config[environment];
const sqlDbFactory = require('knex');
const dbConnection = sqlDbFactory(envConfig);

let { booksDbSetup } = require('./BookService');
let { usersDbSetup } = require('./UserService');

function setupDb () {
	console.log('Setting up the Database...');
	booksDbSetup(dbConnection);
	usersDbSetup(dbConnection);
	console.log('Database up running!');
}

module.exports = { database: dbConnection, setupDb };