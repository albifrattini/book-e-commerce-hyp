

function getAuthors() {
	$('#authorList').html("");
	fetch(`/v2/authors/`)
		.then(function(response){
			return response.json();
		})
		.then(function(authors){
			authors.map(displayAuthor);
		});
}

function displayAuthor(author) {

				$('#authorList').append(
					`
				<div class="col-md-6 col-sm-6">
			        <div class="authorContainer">  
				        <a href="/pages/author-detail.html?id=${author.id}">
				            <img src="${author.profileUrl}" alt="${author.authorName} cover" 
				             id="coverAuthors">	         	
				        </a>
			        </div>

			        <div class="container textFont">
			            <h4 class="text-center textFont">${author.authorName}</h4>
			        </div>
			    </div>
			        
					`
				);
			}
		
		
	

getAuthors();











