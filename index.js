const fs = require("fs"), path = require("path");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const uuid = require('uuid/v4')
const morgan = require('morgan');
const swaggerTools = require("swagger-tools");
const jsyaml = require("js-yaml");
const serverPort = process.env.PORT || 3000;

const { setupDb } = require('./service/DataLayer');

const spec = fs.readFileSync(path.join(__dirname, "api/swagger.yaml"), "utf8");
const swaggerDoc = jsyaml.safeLoad(spec);

app.use(morgan('tiny'));
app.use(session({
	genid: (request) => {
		console.log("Genid: " + request.sessionID);
		return uuid();
	},
	// secret: process.env.SECRET,
	secret: "qualcosa",
	resave: false,
	saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));


swaggerTools.initializeMiddleware(swaggerDoc, function(middleware) {

	app.use(middleware.swaggerMetadata());

	app.use(middleware.swaggerValidator());

	app.use(middleware.swaggerRouter({
		swaggerUi: path.join(__dirname, "/swagger.json"),
		controllers: path.join(__dirname, "./controllers"),
	}));

	app.use(middleware.swaggerUi());

	app.use(express.static(__dirname + '/public'));

	setupDb();

	app.listen(
		serverPort,
		() => {
			console.log(`Application listening on port ${serverPort}...`);
			console.log(`Documentation over the API available at localhost:${serverPort}/docs`);
		}
	);
});

















