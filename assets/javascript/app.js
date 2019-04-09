var gifs = ["Cats", "Adventure Time", "Harry Potter", "The Office"];
var currentGifs = [];
var numGifs = 0;
var favGifs = [];

var favGifsActive = false;

function displayGifInfo() {
    favGifsActive = false;

    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=BlNd9D0PjYBOz40HOzvMWS0ZOwmRdZj3&q=" + gif + "&limit=100&offset=0&rating=G&lang=en";

    numGifs = 0;

    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
        $("#gif-view").empty();
        currentGifs = response.data;

        writeGifTabs();
    });

};

function renderButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < gifs.length; i++) {
        var newBut = $("<button class= 'btn btn-light'>");
            newBut.addClass("gif-button");
            newBut.attr("data-name", gifs[i]);
            newBut.text(gifs[i]);

        $("#buttons-view").append(newBut);
    }
}

function changeState() {
    var gifState = $(this).attr("data-state");

    if (gifState === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    };
}

function writeGifTabs() {

    if((currentGifs.length - numGifs) > 10){
        for (var i = numGifs; i < (numGifs + 10); i++) {
            var newDiv = $("<div id= 'gif-tab'>");
                $(newDiv).append("<p class= 'gif-title'>" + currentGifs[i].title + "</p>");
                $(newDiv).append("<p class= 'gif-rating'> Rating: " + currentGifs[i].rating + "</p>");  
                $(newDiv).append("<p class= 'gif-rating'> Score: " + currentGifs[i]._score + "</p>");  
                $(newDiv).append("<button id= 'favorite-gif-button' class='btn btn-light' onclick= 'favoriteArticle(" + i + ")' type='submit'><i class='fas fa-heart'></i></button>");

                var newGif = $("<img class= 'gif'>");
                    $(newGif).attr("src", currentGifs[i].images.fixed_height_still.url);
                    $(newGif).attr("data-still", currentGifs[i].images.fixed_height_still.url );
                    $(newGif).attr("data-animate", currentGifs[i].images.fixed_height.url);
                    $(newGif).attr("data-state", "still");
                    $(newGif).attr("gif-ID", i);
                $(newDiv).append(newGif);
        
            $("#gif-view").append(newDiv);
        };

        $("#footer-container").html("<button id= 'more-gifs' type= 'submit' class= 'btn btn-light' onclick= 'writeGifTabs()'>M0ar Pl0x</button>")
        numGifs = numGifs + 10;
    }
    else {
        for (var i = numGifs; i < currentGifs.length; i++) {
            var newDiv = $("<div id= 'gif-tab'>");
                $(newDiv).append("<p class= 'gif-title'>" + currentGifs[i].title + "</p>");
                $(newDiv).append("<p class= 'gif-rating'> Rating: " + currentGifs[i].rating + "</p>");  
                $(newDiv).append("<p class= 'gif-rating'> Score: " + currentGifs[i]._score + "</p>");  
                $(newDiv).append("<button id= 'favorite-gif-button' class='btn btn-light' onclick= 'favoriteArticle(" + i + ")' type='submit'><i class='fas fa-heart'></i></button>");

                var newGif = $("<img class= 'gif'>");
                    $(newGif).attr("src", currentGifs[i].images.fixed_height_still.url);
                    $(newGif).attr("data-still", currentGifs[i].images.fixed_height_still.url );
                    $(newGif).attr("data-animate", currentGifs[i].images.fixed_height.url);
                    $(newGif).attr("data-state", "still");
                    $(newGif).attr("gif-ID", i);
                $(newDiv).append(newGif);
        
            $("#gif-view").append(newDiv);
        };

        $("#footer-container").empty();
        numGifs = currentGifs.length;
    }
    
}

function favoriteArticle( index ) {
    if (favGifsActive) {
        favGifs.splice((index), 1);
        currentGifs = favGifs;
        numGifs = 0;
        
        $("#gif-view").empty();

        writeGifTabs();
    }
    else {
        favGifs.push(currentGifs[index]);
    }
}

// This function handles events where the add movie button is clicked
$("#add-gif").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var gif = $("#gif-input").val().trim();

    // The movie from the textbox is then added to our array
    gifs.push(gif);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

$("#fav-gifs").on("click", function(event){
    event.preventDefault();
    $("#gif-view").empty();

    numGifs = 0;
    currentGifs = favGifs;
    favGifsActive = true;

    writeGifTabs();
});

// Adding click event listeners to all elements with a class of "movie"
$(document).on("click", ".gif-button", displayGifInfo);
$(document).on("click", ".gif", changeState);

// Calling the renderButtons function to display the intial buttons
renderButtons();