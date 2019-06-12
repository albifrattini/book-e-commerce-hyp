let nItems;

function getCart() {

	fetch('/v2/cart')
		.then(function (response) {
			return response.json();
		})
		.then(function(data) {
			nItems = data.length;
			if(data.length > 0) {
				displayBooks(data);
			} else {
				$('#bookList').append(`<h3>${data}</h3>`);
			}
		});
}

function displayBooks(books) {

	for (var i = 0; i < books.length/4; i++) {
		$('#bookList').append('<div class="row">');
		for (var j = 0; j < 4; j++) {
			var index = i*4+j;
			if (index < books.length) {
				$('#bookList').append(
					`
					<div class="col-md-3 col-sm-3" id="resizeColumnBooks">
			            <div class="polaroid" id="booksDisplay" >
			                <a href="/pages/book-detail.html?ISBN=${books[index].ISBN}"><img src="${books[index].coverUrl}" alt="${books[index].title} cover" style="width:100%"></a>			       
				                <p class="price text-center textFont" style="color: black; padding: 5px">
				                ${books[index].title}<br>
				                ${books[index].price} €<br>
				                Qty: ${books[index].quantity}</p>
			            </div>
			        </div>
			        
			        
					`
				);
			}

		}
		$('#bookList').append('</div>');
	}

}

function purchaseCart() {

	if(nItems < 1) return alert('There are no books in your cart...');

	fetch('/v2/cart/empty', {
		method: 'DELETE'
		})
		.then(function(response) {
	 		alert(`You have purchased your books successfully!\nThank you! :) The Cart is now empty!`);
	 		window.location = window.location.origin;
	});

}

function emptyCart() {

	if(nItems < 1) return alert('There are no books in your cart...');

	fetch('/v2/cart/empty', {
        method: 'DELETE'
    	})
    	.then(function(response) {
			alert(`The Cart is now empty!`);
			location.reload();
	});

}


getCart();









