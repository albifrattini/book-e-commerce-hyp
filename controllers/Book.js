const Book = require('../service/BookService');
const _ = require('lodash');


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
	const titleOrAuthor = request.swagger.params['titleOrAuthor'].value;
	const bookGenre = request.swagger.params['genre'].value;
	const bookTheme = request.swagger.params['theme'].value;
	const filter = new Array(titleOrAuthor, bookGenre, bookTheme);
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
	Book.getReviewsOfBook(bookIsbn).then(reviews => {
		response.json(reviews);
		next();
	});
}

module.exports.getEventsOfBook = function getEventsOfBook (request, response, next) {
	const bookIsbn = request.swagger.params['bookIsbn'].value;
	Book.getEventsOfBook(bookIsbn).then(events => {
		response.json(events);
		next();
	});
}

module.exports.getAuthorsOfBook = function getAuthorsOfBook (request, response, next) {
	const bookIsbn = request.swagger.params['bookIsbn'].value;
	Book.getAuthorsOfBook(bookIsbn).then(authors => {
		response.json(authors);
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

module.exports.getAllAuthors = function getAllAuthors (request, response, next) {
	Book.getAllAuthors().then(authors => {
		response.json(authors);
		next();
	});
}

module.exports.getQuotesByAuthorId = function getQuotesByAuthorId (request, response, next) {
	const authorId = request.swagger.params['authorId'].value;
	Book.getQuotesByAuthorId(authorId).then(quotes => {
		response.json(quotes);
		next();
	})
}







