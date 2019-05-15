let dbConnection;

module.exports.booksDbSetup = function(database) {

	dbConnection = database;

	let booksList = require('../other/books.json');
	let authorsList = require('../other/authors.json');
	let eventsList = require('../other/events.json');
	let writtenbyList = require('../other/writtenby.json');
	let writesList = require('../other/writes.json');
	let presentedatList = require('../other/presentedat.json');

	return dbConnection.schema.hasTable('books').then(exists => {

		if(!exists) {
			dbConnection.schema.createTable('books', table => {
				table.string('ISBN').primary(); // key for the book
				table.string('title');
				table.string('genre');
				table.string('theme');
				table.string('publisher');
				table.text('description');
				table.float('price');
				table.enum('status', ['Available', 'Out of stock']);
				table.string('coverUrl');
			})
			.then(function() {
				return dbConnection('books').insert(booksList);
			})
			.then(function() {
				return dbConnection.schema.createTable('issimilarto', table => {
					table.string('book1').references('ISBN').inTable('books');
					table.string('book2').references('ISBN').inTable('books');
				})
			})
			.then(function() {
				return dbConnection.schema.createTable('authors', table => {
					table.increments('id').primary();
					table.string('authorName');
					table.text('authorBiography');
				});
			})
			.then(function() {
				return dbConnection('authors').insert(authorsList);
			})
			.then(function() {
				return dbConnection.schema.createTable('writtenby', table => {
					table.string('ISBN').references('ISBN').inTable('books');
					table.integer('authorId').references('id').inTable('authors');
				});
			})
			.then(function() {
				return dbConnection('writtenby').insert(writtenbyList);
			})
			.then(function() {
				return dbConnection.schema.createTable('writes', table => {
					table.integer('authorId').references('id').inTable('authors');
					table.string('ISBN').references('ISBN').inTable('books');
				});
			})
			.then(function() {
				return dbConnection('writes').insert(writesList);
			})
			.then(function() {
				return dbConnection.schema.createTable('events', table => {
					table.increments('id').primary();
					table.string('eventName');
					table.string('bookPresented').references('ISBN').inTable('books');
					table.string('eventLocation');
					table.date('eventDate');
				});
			})
			.then(function() {
				return dbConnection('events').insert(eventsList);
			})
			.then(function() {
				return dbConnection.schema.createTable('presentedat', table => {
					table.string('ISBN').references('ISBN').inTable('books');
					table.integer('eventId').references('id').inTable('events');
				});
			})
			.then(function() {
				return dbConnection('presentedat').insert(presentedatList);
			});
		}
	});
}

module.exports.getAllBooks = function(offset, limit) {
	var query = dbConnection('books')
		.join('writtenby', 'books.ISBN', 'writtenby.ISBN')
		.join('authors', 'writtenby.authorId', 'authors.id');
	return query.limit(limit).offset(offset);
}

module.exports.getBookByIsbn = function(bookIsbn) {
	return dbConnection('books')
		.join('writtenby', 'books.ISBN', 'writtenby.ISBN')
		.join('authors', 'writtenby.authorId', 'authors.id')
		.where('books.ISBN', bookIsbn)
		.first();
}

module.exports.getBooksThroughFilter = function (filter) {
	var query = dbConnection('books')
		.join('writtenby', 'books.ISBN', 'writtenby.ISBN')
		.join('authors', 'writtenby.authorId', 'authors.id');
	if (filter[0]) {
		let title = filter[0].toLowerCase();
		// query = query.where('title', filter[0]);
		query.whereRaw('LOWER("title") = ?', filter[0]);
	}
	if (filter[1]) {
		let author = filter[1].toLowerCase();
		// query = query.where('name', filter[1]);
		query = query.whereRaw('LOWER("authorName") = ?', filter[1]);
	}
	if (filter[2]) {
		query = query.where('genre', filter[2]);
	}
	if (filter[3]) {
		query = query.where('theme', filter[3]);
	}
	return query.select();
}

/*
module.exports.getBooksByGenre = function(bookGenre) {
	return dbConnection('books')
		.where('genre', bookGenre)
		.join('writtenby', 'books.ISBN', 'writtenby.ISBN')
		.join('authors', 'writtenby.authorId', 'authors.id');
}

module.exports.getBooksByTheme = function (bookTheme) {
	return dbConnection('books')
		.where('theme', bookTheme)
		.join('writtenby', 'books.ISBN', 'writtenby.ISBN')
		.join('authors', 'writtenby.authorId', 'authors.id');
}
*/










