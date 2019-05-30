let dbConnection;

module.exports.cartDbSetup = function(database) {
	dbConnection = database;
	return dbConnection.schema.hasTable('cart').then(exists => {
		if(!exists) {
			console.log('Starting cart table from scratch...');
			dbConnection.schema.createTable('cart', table => {
				table.increments();
				table.text('email');
				table.text('ISBN');
			}).then(() => {
				return console.log('Cart table created!');
			})
		}
	});
}

module.exports.getCart = function(user) {
	return dbConnection('cart')
		.where('email', user)
		.join('books', 'cart.ISBN', 'books.ISBN');
}

module.exports.addToCart = function(el) {
	return dbConnection('cart').insert(el);
}