const Book = require('../service/BookService');

/**
 * Names of functions must be included in Swagger specficiations in order to
 * answer to the specific request.
**/



module.exports.getAllBooks = function getAllBooks (request, response, next) {
	const offset = request.swagger.params['offset'].value;
	const limit = request.swagger.params['limit'].value;
	Book.getAllBooks(offset, limit)
		.then(books => {
			if (books) {
				response.json(books);
			} else {
				next();
			}
		});
}

module.exports.getBookByIsbn = function getBookByIsbn (request, response, next) {
	const bookIsbn = request.swagger.params['bookIsbn'].value;
	Book.getBookByIsbn(bookIsbn)
		.then(book => {
			if (book) {
				response.json(book);
			} else {
				next();
			}
		});
}

module.exports.getBooksThroughFilter = function getBooksThroughFilter (request, response, next) {
	const bookTitle = request.swagger.params['title'].value;
	const bookAuthor = request.swagger.params['author'].value;
	const bookGenre = request.swagger.params['genre'].value;
	const bookTheme = request.swagger.params['theme'].value;
	const filter = new Array(bookTitle, bookAuthor, bookGenre, bookTheme);
	Book.getBooksThroughFilter(filter).then(books => {
		response.json(books);
		next();
	});
}

/*
module.exports.getBooksByGenre = function getBookByGenre (request, response, next) {
	const bookGenre = request.swagger.params['genre'].value;
	Book.getBooksByGenre(bookGenre)
		.then(books => {
			if (books) {
				response.json(books);
			} else {
				next();
			}
		});
}

module.exports.getBooksByTheme = function getBooksByTheme (request, response, next) {
	const bookTheme = request.swagger.params['theme'].value;
	Book.getBooksByTheme(bookTheme)
		.then(books => {
			if (books) {
				response.json(books);
			} else {
				next();
			}
		});
}
*/





