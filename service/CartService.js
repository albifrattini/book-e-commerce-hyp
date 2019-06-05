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
				table.integer('quantity');
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

module.exports.findBookInCart = function(user, book) {
	return dbConnection('cart').where('email', user).andWhere('ISBN', book).first();
}

module.exports.addToCart = function(el) {
	return dbConnection('cart').insert(el);
}

module.exports.updateQuantity = function(el) {
	return dbConnection('cart').where('email', el.email).andWhere('ISBN', el.ISBN).update('quantity', el.quantity);
}

module.exports.emptyCart = function(user) {
	return dbConnection('cart').where('email', user).del();
}