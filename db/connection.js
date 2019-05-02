// Here we select in which environment we are now. During production we will connect
// to the PostgreSQL DB through the process.end.DATABASE_URL environment variable.
// 'development' specification can be found in knexfile.js
const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile');
const envConfig = config[environment];
const sqlDbFactory = require('knex');
// We are setting the DB to be postgres and where the DB is, so that we can 
// access it through dbConnection constant.
const dbConnection = sqlDbFactory(envConfig);

let booksList = require('./data/books.json');
let authorsList = require('./data/authors.json');
let eventsList = require('./data/events.json');

function setupDb () {
	console.log('Starting the Database...');
	setupBooks();
	setupAuthors();
	setupEvents();
	console.log('Database up running!');
}

function setupBooks () {
	return dbConnection.schema.hasTable('books').then(exists => {
		if(!exists) {
			dbConnection.schema.createTable('books', table => {
				table.increments();
				table.text('title');
				table.text('author');
				table.float('price');
				table.text('currency');
				table.enum('status', ['available', 'out of stock']);
			})
			.then(() => {
				return dbConnection('books').insert(booksList);
			});
		} else {
			dbConnection('books').del().then(() => {
				return dbConnection('books').insert(booksList);
			});
		}
	});
}

function setupAuthors () {
	return dbConnection.schema.hasTable('authors').then(exists => {
		if(!exists) {
			dbConnection.schema.createTable('authors', table => {
				table.increments();
				table.text('name');
				table.text('surname');
			})
			.then(() => {
				return dbConnection('authors').insert(authorsList);
			});
		} else {
			dbConnection('authors').del().then(() => {
				return dbConnection('authors').insert(authorsList);
			});
		}
	});
}

function setupEvents () {
	return dbConnection.schema.hasTable('events').then(exists => {
		if(!exists) {
			dbConnection.schema.createTable('events', table => {
				table.increments();
				table.text('name');
				table.text('bookPresented');
			})
			.then(() => {
				return dbConnection('events').insert(eventsList);
			});
		} else {
			dbConnection('events').del().then(() => {
				return dbConnection('events').insert(eventsList);
			});
		}
	});
}

module.exports = {
	dbConnection,
	setupDb
}








