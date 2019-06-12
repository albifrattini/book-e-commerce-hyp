let dbConnection;

module.exports.booksDbSetup = function(database) {

	dbConnection = database;

	let booksList = require('../other/books.json');
	let issimilartoList = require('../other/issimilarto.json');
	let hasreviewsList = require('../other/hasreviews.json');
	let authorsList = require('../other/authors.json');
	let quotesList = require('../other/quotes.json');
	let eventsList = require('../other/events.json');
	let writtenbyList = require('../other/writtenby.json');
	let writesList = require('../other/writes.json');
	let presentedatList = require('../other/presentedat.json');

	return dbConnection.schema.hasTable('books').then(exists => {

		if(!exists) {
			console.log('Starting DB from scratch...');
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
			.then(function () {
				return dbConnection('issimilarto').insert(issimilartoList);
			})
			.then(function () {
				return dbConnection.schema.createTable('hasreviews', table => {
					table.string('ISBN').references('ISBN').inTable('books');
					table.string('reviewer');
					table.integer('rating');
					table.string('description');
				})
			})
			.then(function() {
				return dbConnection('hasreviews').insert(hasreviewsList);
			})
			.then(function() {
				return dbConnection.schema.createTable('authors', table => {
					table.increments('id').primary();
					table.string('authorName');
					table.text('authorBiography');
					table.text('presentation');
					table.string('nationality');
					table.date('birthDate');
					table.string('birthPlace');
					table.string('mainGenre');
					table.string('profileUrl');
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
				return dbConnection.schema.createTable('quotes', table => {
					table.integer('authorId').references('id').inTable('authors');
					table.text('quote');
				});
			})
			.then(function() {
				return dbConnection('quotes').insert(quotesList);
			})
			.then(function() {
				return dbConnection.schema.createTable('events', table => {
					table.increments('id').primary();
					table.string('eventName');
					table.string('bookPresented').references('ISBN').inTable('books');
					table.string('eventLocation');
					table.date('eventDate');
					table.text('eventDescription');
					table.string('imageUrl');
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
	var query = dbConnection('books');
		// .join('writtenby', 'books.ISBN', 'writtenby.ISBN')
		// .join('authors', 'writtenby.authorId', 'authors.id');
	return query.limit(limit).offset(offset);
}

module.exports.getBookByIsbn = function(bookIsbn) {
	return dbConnection('books')
		.where('books.ISBN', bookIsbn)
		// .join('writtenby', 'books.ISBN', 'writtenby.ISBN')
		// .join('authors', 'writtenby.authorId', 'authors.id')
		// .join('presentedat', 'books.ISBN', 'presentedat.ISBN')
		.first();
}

module.exports.getBooksThroughFilter = function (filter) {
	var query = dbConnection('books');

	if (filter[0]) {
		let titleOrAuthor = filter[0].toLowerCase();
		query = query.join('writtenby', 'books.ISBN', 'writtenby.ISBN').join('authors', 'writtenby.authorId', 'authors.id');
		query.whereRaw('LOWER(??) LIKE ?', ['books.title', `%${titleOrAuthor}%`]).orWhere(dbConnection.raw('LOWER(??) LIKE ?', ['authors.authorName', `%${titleOrAuthor}%`]));
	}
	if (filter[1]) {
		query = query.where('books.genre', filter[1]);
	}
	if (filter[2]) {
		query = query.where('books.theme', filter[2]);
	}
	return query.select();
}

module.exports.getBooksBySimilarity = function (bookIsbn) {
	return dbConnection('issimilarto')
		.where('issimilarto.book1', bookIsbn)
		.join('books', 'issimilarto.book2', 'books.ISBN')
		.union([
			dbConnection('issimilarto')
				.where('issimilarto.book2', bookIsbn)
				.join('books', 'issimilarto.book1', 'books.ISBN')
		]);
}

module.exports.getReviewsOfBook = function (bookIsbn) {
	return dbConnection('hasreviews')
		.where('hasreviews.ISBN', bookIsbn);
}

module.exports.getAuthorsOfBook = function(bookIsbn) {
	return dbConnection('writtenby')
		.where('writtenby.ISBN', bookIsbn)
		.join('authors', 'writtenby.authorId', 'authors.id');
}

module.exports.getEventsOfBook = function(bookIsbn) {
	return dbConnection('presentedat')
		.where('presentedat.ISBN', bookIsbn)
		.join('events', 'presentedat.eventId', 'events.id');
}

module.exports.getAllEvents = function () {
	return dbConnection('events');
}

module.exports.getEventById = function (eventId) {
	return dbConnection('events')
		.join('books', 'events.bookPresented', 'books.ISBN')
		.join('writtenby', 'events.bookPresented', 'writtenby.ISBN')
		.join('authors', 'writtenby.authorId', 'authors.id')
		.where('events.id', eventId)
		.first();
}

module.exports.getEventsByMonth = function (month) {
	return dbConnection('events')
		.whereRaw('EXTRACT(MONTH FROM ??) = ?', ['eventDate', month]);
}

module.exports.getAllAuthors = function () {
	return dbConnection('authors');
}

module.exports.getAuthorById = function (authorId) {
	return dbConnection('authors')
		.where('authors.id', authorId)
		.join('writes', 'authors.id', 'writes.authorId')
		.join('books', 'writes.ISBN', 'books.ISBN');
}

module.exports.getQuotesByAuthorId = function (authorId) {
	return dbConnection('quotes').where('authorId', authorId);
}










