// JS script for books page

function getBooks() {

	var genreEl = document.getElementById('genreDropdown');
	var genreEl = genreEl.options[genreEl.selectedIndex].value;
	var themeEl = document.getElementById('themeDropdown');
	var themeEl = themeEl.options[themeEl.selectedIndex].value;
	console.log('Fetching books with: ' + 
		'\n- Genre: ' + genreEl + 
		'\n- Theme: ' + themeEl + 
		'\n- Search: ' + document.getElementById('titleOrAuthorSearch').value
	);

	var query = '/v2/books/filter?';
	if (genreEl) {
		query += `genre=${genreEl}&`;
	}
	if (themeEl) {
		query += `theme=${themeEl}&`;
	}
	if (document.getElementById('titleOrAuthorSearch').value) {
		titleOrAuthor = document.getElementById('titleOrAuthorSearch').value.replace(' ', '+');
		query += `titleOrAuthor=${titleOrAuthor}`;
	}

	console.log(query);

	fetch(query)
		.then(function (response) {
			$('#bookList').html("");
			return response.json();
		}).then(function (data) {
			if (data.length > 0) {
				displayBooks(data);
			} else {
				$('#bookList').append('<h3>No book found with this features!</h3>');
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
					
					<div class="col-md-3 col-sm-3" id="resizeColumn">
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




function addDropdownValues() {

	genres.map(fillGenreDropdown);
	themes.map(fillThemeDropdown);

}

function fillGenreDropdown(el) {

	$('#genreDropdown').append(
			`
			<option value="${el.genre}">${el.genre}</option>
			`
	);

}

function fillThemeDropdown(el) {

	$('#themeDropdown').append(
			`
			<option value="${el.theme}">${el.theme}</option>
			`
	);

}

addDropdownValues();
getBooks();











