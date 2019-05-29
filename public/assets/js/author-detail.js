var URL = function () {
    // This function is anonymous, is executed immediately and 
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = decodeURIComponent(pair[1]);
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }
    return query_string;
}();

let id = URL.id;

function getAuthorDetails() {

    fetch(`/v2/authors/${id}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayAuthor(data[0]);
        })
        .then(function() {
            fetch(`/v2/authors/quotes?authorId=${id}`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    data.map(displayQuotes);
                });
        })
         .then(function() {
            fetch(`/v2/authors/${id}`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    displayBooksWrittenBy(data);
                });
        });


}


function displayAuthor(author) {

    $('#author').append(
        `
            <h3 class="text-center textFont">${author.authorName}</h3>
            <hr style="max-width: 1000px;">
           
                <img src="${author.profileUrl}" alt="${author.authorName} cover" id="coverAuthor">
                <hr style="max-width: 1000px;">
                <p class="textFont">
                    ${author.presentation}<br>              
                    <div id="biography" class="collapse textFont">
                        ${author.authorBiography}
                    </div>
                    <button type="button" id="changeButton" class="btn btn-link" 
                        onclick="changeButtonText()" data-toggle="collapse" 
                        data-target="#biography">  
                        show more
                    </button>
                </p>
                        
        `
    );
}

 //change text from more to less
 function changeButtonText(){ 
      var btnText = document.getElementById("changeButton");
      if (btnText.innerHTML === "show less") {
            btnText.innerHTML = "show more"; 
      } else {
        btnText.innerHTML = "show less"; 
      }
    }


function displayQuotes(author) {
    $('#quotes').append(
        `
            <div>${author.quote}</div>
            <hr style="max-width: 1000px;">
        `
        );
}

function displayBooksWrittenBy(books) {

    for (var i = 0; i < books.length/4; i++) {
        $('#booksWritten').append('<div class="row">');
        for (var j = 0; j < 4; j++) {
            var index = i*4+j;
            if (index < books.length) {
                $('#booksWritten').append(
                    `
                    
                    <div class="col-md-3 col-sm-3">
                        <div class="polaroid" id="bookContainer">
                            <a href="/pages/book-detail.html?ISBN=${books[index].ISBN}"><img src="${books[index].coverUrl}" alt="${books[index].title} cover" style="width:100%" height="auto"></a>
                            <p class="price text-center textFont" style="color: black; padding: 5px">
                            ${books[index].title}<br>
                            ${books[index].price} €</p>
                        </div>
                    </div>
                    
                    
                    `
                );
            }
        }
        $('#booksWritten').append('</div>');
    }
}

getAuthorDetails();












