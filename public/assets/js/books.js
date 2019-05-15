// JS script for books page

console.log('Building books main page...');

var genres = ["Fiction", "Thriller", "Crime", "Romance", "Adventure", "Action", "Horror", "History", "Biography", "Fantasy", "Manga", "Comedy"];
var themes = ["War", "Courage and Heroism", "Education", "Love", "Survival"];

function addStaticLinks() {

	console.log('Adding static links.');

	const homeUrl = window.location.origin;
	
	$('#home').attr('href', homeUrl);
	$('#events').attr('href', homeUrl+'/pages/events.html');
	$('#books').attr('href', homeUrl+'/pages/books.html');
}

function getBooks() {
	var genreEl = document.getElementById('genreDropdown');
	var genreEl = genreEl.options[genreEl.selectedIndex].value;
	var themeEl = document.getElementById('themeDropdown');
	var themeEl = themeEl.options[themeEl.selectedIndex].value;
	console.log('Fetching books with:\n- Book title radio: ' +
		document.getElementById('titleRadio').checked + 
		'\n- Author radio: ' + 
		document.getElementById('authorRadio').checked + 
		'\n- Genre: ' + 
		genreEl + 
		'\n- Theme: ' + 
		themeEl + 
		'\n- Search: ' + document.getElementById('titleOrAuthorSearch').value
	);

	var query = '/v2/books/filter?';
	if (genreEl) {
		query += `genre=${genreEl}&`;
	}
	if (themeEl) {
		query += `theme=${themeEl}&`;
	}
	if (document.getElementById('titleRadio').checked) {
		title = document.getElementById('titleOrAuthorSearch').value.replace(' ', '+');
		query += `title=${document.getElementById('titleOrAuthorSearch').value}`;
	} else if (document.getElementById('authorRadio').checked){
		author = document.getElementById('titleOrAuthorSearch').value.replace(' ', '+');
		query += `author=${document.getElementById('titleOrAuthorSearch').value}`;
	}

	fetch(query)
		.then(function (response) {
			$('#bookList').html("");
			return response.json();
		}).then(function (data) {
			if (data.length > 0) {
				data.map(displayBook);
			} else {
				$('#bookList').append('<h3>Nessun libro trovato con queste specifiche!</h3>');
			}
	});
}

function displayBook(book) {

	$('#bookList').append(
		`<div class="breathe-element">
			<div class="row">
				<div class="col">
					<h3>
						${book.title}
					</h3>
				</div>
			</div>
			<div class="row book-cover">
				<div class="col-lg-3">
					<img src="${book.cover}" alt="${book.title} cover" width="200" height="310">
				</div>
				<div class="col-lg-8">
					<div>
						<p>${book.description}</p>
						<a href="#">${book.name}</a>
						<p>Published by: ${book.publisher}</p>
						<p>${book.price} €</p>
						<h5>Availability: ${book.status}</h5>
						<div style="margin-top: 50px;"></div>
						<div class="row">
							<div class="col-lg-2">
								<input type="button" name="addToCart" class="btn btn-primary" value="Add to cart">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		`
	);


}

function addDropdownValues() {
	for (i in genres) {
		$('#genreDropdown').append(
			`
			<option value="${genres[i]}">${genres[i]}</option>
			`
		);
	}
	for (i in themes) {
		$('#themeDropdown').append(
			`
			<option value="${themes[i]}">${themes[i]}</option>
			`
		);
	} 
}

addDropdownValues();
addStaticLinks();
















