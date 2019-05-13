let dbConnection;

module.exports.booksDbSetup = function(database) {
	dbConnection = database;
	let booksList = require('../other/books.json');
	console.log('Initializing book table...');
	return dbConnection.schema.hasTable('books').then(exists => {
		if(!exists) {
			dbConnection.schema.createTable('books', table => {
				table.increments();
				table.string('ISBN'); // key for the book
				table.string('title');
				table.string('genre');
				table.string('publisher');
				table.string('description');
				table.float('price');
				table.enum('status', ['available', 'out of stock']);
				// Getting author through relationship ?
				// table.text('author');
			})
			.then(() => {
				return dbConnection('books').insert(booksList);
			});
		} else {
			// to use only in development to insert the same elements after every first run
			dbConnection('books').del().then(() => {
				return dbConnection('books').insert(booksList);
			});
		}
	});
}

module.exports.getAllBooks = function(offset, limit) {
	return dbConnection('books').limit(limit).offset(offset);
}

module.exports.getBookById = function(bookId) {
	return dbConnection('books').where('id', bookId).first();
}

module.exports.getBooksByGenre = function(bookGenre) {
	return dbConnection('books').where('genre', bookGenre);
}

module.exports.getBooksByTheme = function (bookTheme) {
	return dbConnection('books').where('theme', bookTheme);
}