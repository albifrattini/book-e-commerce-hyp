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

module.exports.getBookById = function getBookById (request, response, next) {
	const bookId = request.swagger.params['bookId'].value;
	Book.getBookById(bookId)
		.then(book => {
			if (book) {
				response.json(book);
			} else {
				next();
			}
		});
}

module.exports.getBooksByGenre = function getBookByGenre (request, response, next) {
	const bookGenre = request.swagger.params['genre'].value;
	Book.getBooksByGenre(bookGenre)
		.then(book => {
			if (book) {
				response.json(book);
			} else {
				next();
			}
		});
}