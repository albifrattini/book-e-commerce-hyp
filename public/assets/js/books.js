// JS script for books page

var genres = ["Fiction", "Thriller", "Crime", "Romance", "Adventure", "Action", "Horror", "History", "Biography", "Fantasy", "Manga", "Comedy"];
var themes = ["War", "Courage and Heroism", "Education", "Love", "Survival"];



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
		query += `title=${title}`;
	} else if (document.getElementById('authorRadio').checked){
		author = document.getElementById('titleOrAuthorSearch').value.replace(' ', '+');
		query += `author=${author}`;
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
					
					<div class="col-md-3 col-sm-3">
			            <div class="polaroid">
			                <a href="/pages/book-detail.html?ISBN=${books[index].ISBN}"><img src="${books[index].coverUrl}" alt="${books[index].title} cover" style="width:100%" height="auto"></a>
			                <p class="price text-center" style="color: black; padding: 5px">
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
getBooks();
















