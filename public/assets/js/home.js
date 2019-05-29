var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1} 
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; 
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block"; 
  dots[slideIndex-1].className += " active";
}

var slideIndex = 0;
carousel();
//timer changing slides
function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none"; 
  }
  slideIndex++;
  if (slideIndex > x.length) {slideIndex = 1} 
  x[slideIndex-1].style.display = "block"; 
  setTimeout(carousel, 6000); // Change image every 5 seconds
}



//Import books
function retrieveBooks() {
  fetch("/v2/books?limit=4")
    .then(function(response){
      return response.json();
    })
    .then(function(books){
      books.map(showFavouriteBooks);
  });
  fetch("/v2/books?limit=4&offset=3")
    .then(function(response){
      return response.json();
    })
    .then(function(books){
      books.reverse().map(showBestSellerBooks);
  });
}

function showFavouriteBooks(book) {
  $('#favourite').append(
    `
      <div class="column">
        <div class="card textFont">
          <a href="/pages/book-detail.html?ISBN=${book.ISBN}">
            <img src="${book.coverUrl}" alt="${book.title} cover" style="width:120%;">
          </a>
          <p class="price">${book.price} €</p>
        </div>
      </div>
    `
  );
}

function showBestSellerBooks(book) {
  $('#best').append(
    `
      <div class="column">
        <div class="card textFont">
          <a href="/pages/book-detail.html?ISBN=${book.ISBN}">
            <img src="${book.coverUrl}" alt="${book.title} cover" style="width:120%;">
          </a>
          <p class="price">${book.price} €</p>
        </div>
      </div>
    `
  );
}

retrieveBooks();

