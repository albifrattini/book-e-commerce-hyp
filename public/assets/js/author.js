let id = URL.id;

function getAuthors() {
	$('#authorList').html("");
	fetch(`/v2/authors/${id}`)
		.then(function(response){
			return response.json();
		})
		.then(function(authors){
			displayAuthor(authors);
		});
}

function displayAuthor(author) {

				$('#authorList').append(
					`
					
					<div class="col-md-4 col-sm-4">
			            <div class="polaroid" >
			                <a href="/pages/author-detail.html?id=${author.authorId}"><img src="${author.profileUrl}" alt="${author.authorName} cover" id="coverAuthor">		       
				                ${author.authorName}</a>
			            </div>
			        </div>
			        
					`
				);
			}
		
		
	

getAuthors();











