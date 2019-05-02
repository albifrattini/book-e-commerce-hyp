// Node.js web application framework. Creates the API used to manage
// HTTP requests. 
const express = require('express');
// Node.js parsing middleware. It is mandatory to use when dealing
// with POST requests.
// body-parser extract the entire body portion of an incoming request 
// stream and exposes it on req.body.
const bodyParser = require('body-parser');
// The Express application can literally use a middleware, coming from an 
// external library or built by yourself, to extend all its routes 
// (application-level middleware).
const app = express();
const serverPort = process.env.PORT || 3000;
const { setupDb } = require('./db/connection');
const queries = require('./db/queries');


/** 
* APP.USE is mounting the specific middleware functions or functions at the
* specific path. The middleware function is called when the base of the request
* matches the path. The default path is '/'. Middlewares mounted at the root
* path will be executed for every request to the app.
* Calling next() we are just passing to the following middleware.
**/
// Used to serve static assets, such as images, CSS files and JS files.
app.use(express.static(__dirname + '/public'));
// Returns middleware that only parses json and only looks at requests where the 
// Content-Type header matches the type option.
// Requests are like: curl -X POST -H "Content-Type:application/json" http://localhost:3000/messages -d '{"text":"Hi again, World"}'
app.use(bodyParser.json());
// Returns middleware that only parses urlencoded bodies and only looks at requests 
// where the Content-Type header matches the type option.
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/books', queries.getAllBooks);
app.get('/books/:id', queries.getBookById);
app.get('/authors', queries.getAllAuthors);
app.get('/events', queries.getAllEvents);


setupDb();

/*
It is equivalent to write:
	app.listen = function() {
  		var server = http.createServer(this);
  		return server.listen.apply(server, arguments);
	};
It returns an http.Server.
*/
app.listen(
	serverPort,
	() => {
		console.log(`Application listening on port ${serverPort}...`);
	}
);




















