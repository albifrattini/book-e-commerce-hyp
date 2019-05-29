const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile');
const envConfig = config[environment];
const sqlDbFactory = require('knex');
const dbConnection = sqlDbFactory(envConfig);

let { booksDbSetup } = require('./BookService');
let { usersDbSetup } = require('./UserService');
let { cartDbSetup } = require('./CartService');

function setupDb () {
	booksDbSetup(dbConnection);
	usersDbSetup(dbConnection);
	cartDbSetup(dbConnection);
}

module.exports = { database: dbConnection, setupDb };