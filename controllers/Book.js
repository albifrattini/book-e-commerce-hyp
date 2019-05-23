const Book = require('../service/BookService');
const _ = require('lodash');

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

module.exports.getBooksBySimilarity = function getBooksBySimilarity (request, response, next) {
	const bookIsbn = request.swagger.params['bookIsbn'].value;
	Book.getBooksBySimilarity(bookIsbn).then(books => {
		response.json(books);
		next();
	});
}

module.exports.getReviewsOfBook = function getReviewsOfBook (request, response, next) {
	const bookIsbn = request.swagger.params['bookIsbn'].value;
	console.log(bookIsbn);
	Book.getReviewsOfBook(bookIsbn).then(reviews => {
		response.json(reviews);
		next();
	});
}

module.exports.getAllEvents = function getAllEvents (request, response, next) {
	Book.getAllEvents().then(events => {
		response.json(events);
		next();
	});
}

module.exports.getEventById = function getEventById (request, response, next) {
	const eventId = request.swagger.params['eventId'].value;
	Book.getEventById(eventId).then(event => {
		response.json(event);
		next();
	});
}

module.exports.getEventsByMonth = function getEventsByMonth (request, response, next) {
	const month = request.swagger.params['month'].value;
	Book.getEventsByMonth(month).then(events => {
		response.json(events);
		next();
	});
}

module.exports.getAuthorById = function getAuthorById (request, response, next) {
	const authorId = request.swagger.params['authorId'].value;
	Book.getAuthorById(authorId).then(author => {
		response.json(author);
		next();
	});
}







