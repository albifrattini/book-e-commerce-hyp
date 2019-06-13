//Let me interact with the DB
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


//Gimmi eventss
function getEventDetails() {

    fetch(`/v2/events/${id}`)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            displayEvent(data);
    });

}

//DisplayThem!!
function displayEvent(event) {

    $('#event').append(
        `

         <h3 class="text-center textFont">${event.eventName}</h3>

         <hr style="max-width: 1000px;">

         <div class="container">

            <div>
                 <img src="${event.imageUrl}" alt="${event.eventLocation} cover" class="imgEventPage">
            </div>

             
               <div>
                 <p style="margin: 3% auto; font-size:18px;" class="textFont">${event.eventDescription}</p>
                 <p style="margin: 3% auto; font-size:16px;" class="textFont">${event.eventLocation}</p>
                 <p style="margin: 3% auto; font-size:16px;" class="textFont">${event.eventDate.substring(0,10)}</p>
                 <a href="/pages/author-detail.html?id=${event.authorId}" class="textFont">${event.authorName}</a><br>
                 <a href="/pages/book-detail.html?ISBN=${event.ISBN}" class="textFont">${event.title}</a>
                 
               </div>

               <hr>
            
            <div>
                <img src="https://images.unsplash.com/photo-1506377872008-6645d9d29ef7?
                    ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&ixid
                    =eyJhcHBfaWQiOjF9" alt="bookstore img" style="width: 100%;"">
            </div>
                
           
         </div>

        <br>
        
        `
    );

}

getEventDetails();





/* I've to decide if i want them...
        <div class="container">
            <h4 class="text-center">How to join us</h4>
            <hr style="max-width: 1000px;">
            <div class="row">
                <div class="col-md-4">
                    <img src="/assets/img/map.png" style="width: 20%; margin-left: 85px;">
                    <div class="container text-center">
                    <p>${event.eventLocation}</p> 
                    </div>             
                </div>
                <div class="col-md-4">
                    <img src="/assets/img/calendar.png" style="width:20%; margin-left: 85px; opacity: 0.7">
                    <div class="container text-center">
                        <p>${event.eventDate.substring(0,10)}</p> 
                    </div>
                </div>
                <div class="col-md-4">
                    <img src="/assets/img/calendar.png" style="width:20%; margin-left: 85px; opacity: 0.7">
                    <div class="container text-center">
                        <p>${event.eventDate.substring(0,10)}</p> 
                    </div>
                </div>
            </div>
        </div>*/













