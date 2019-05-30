let totalPrice = 0.0;

function getCart() {

	fetch('/v2/cart')
		.then(function (response) {
			return response.json();
		})
		.then(function(data) {
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
				totalPrice += parseFloat(books[index].price);
				$('#bookList').append(
					`
					
					<div class="col-md-3 col-sm-3" id="resizeColumnBooks">
			            <div class="polaroid" id="booksDisplay" >
			                <a href="/pages/book-detail.html?ISBN=${books[index].ISBN}"><img src="${books[index].coverUrl}" alt="${books[index].title} cover" style="width:100%"></a>			       
				                <p class="price text-center textFont" style="color: black; padding: 5px">
				                ${books[index].title}<br>
				                ${books[index].price} €</p>
			            </div>
			        </div>
			        
			        
					`
				);
			}

		}
		$('#bookList').append('</div>');
	}

}

function displayPriceAndPurchase () {
	$('#priceAndPurchase').html(
		`
			<div class="row">
                <div class="col-sm-6 col-md-6">
                    <div class="text-center">
                        <h3>${totalPrice}</h3>
                    </div>
                </div>
                <div class="col-sm-6 col-md-6">
                    <div class="text-center">
                        <input type="button" name="purchase" class="btn btn-primary" value="Purchase" onclick="">
                    </div>
                </div>
            </div>
		`
	);
}


getCart();
// displayPriceAndPurchase();