const { dbConnection } = require('./connection');


module.exports.getAllBooks = (request, response) => {
	dbConnection('books').then(books => {
		response.json(books);
	});
}

module.exports.getBookById = (request, response, next) => {
	let bookId = request.params.id;
	dbConnection('books').where('id', id).first().then(book => {
		if (book) {
			response.json(book);
		} else {
			next();
		}
	});
}

module.exports.getAllAuthors = (request, response) => {
	dbConnection('authors').then(authors => {
		response.json(authors);
	});
}

module.exports.getAllEvents = (request, response) => {
	dbConnection('events').then(events => {
		response.json(events);
	});
}








