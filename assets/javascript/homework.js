$(document).ready(function () {
    //Step 1: create an array that gets turned into buttons which display on the page when it loads. 
    var topics = ["Leslie Knope", "Ron Swanson", "Tom Haverford", "John Ralphio", "Tom Haverford", "Donna Meagle"];
    //for loop that appends buttons for each string in the array

    function renderButtons() {
        $(".list").empty();
        for (var i = 0; i < topics.length; i++) {
            var arrBtn = $("<button>");
            arrBtn.addClass("character")
            arrBtn.attr("data-name", topics[i]);
            arrBtn.text(topics[i]);
            $(".list").append(arrBtn);
        }
    };
    //user can add a character (Not adding the character to the array of buttons)
    $("#add-character").on("click", function (event) {
        // event.prevenDefault();
        $(".list").empty();
        var newCharacter = $("#character-input").val().trim();
        topics.push(newCharacter);
        renderButtons();
    })


    var character = ""
    $("body").on("click", ".character", function () {
        $(this).text()
        character = $(this).text();
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10&q=" + character;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            for (var n = 0; n < response.data.length; n++) {
                response.data[n].images.original_still.url;
                console.log(response.data[n].images.original_still.url);
                var gifRating = response.data[n].rating;
                var rating = "<p>Rated: " + gifRating + "</p>"
                var imageStillSrc = response.data[n].images.fixed_height_small_still.url;
                var imageAnimateSrc = response.data[n].images.fixed_height_small.url;
                var imageStill = $("<img>")
                imageStill.attr("src", imageStillSrc);
                imageStill.attr("dataStatus", "still");
                imageStill.attr("data-animate", imageAnimateSrc);
                imageStill.attr("data-still", imageStillSrc);
                $(".gifDiv").prepend(imageStill, rating);
                
               
                // response.data[n].images.original.url;
                // console.log(response.data[n].images.original.url);
                // var imageAnimate = $("<img>");
                // imageAnimate.attr("src", imageAnimateSrc);
                // imageAnimate.attr("dataStatus", "animate");

                //display rating (How do I get this to connect with the specific gif that it goes to?)
                var rating = response.data[n].images.rating;
                console.log(rating);
                $("#givDiv").append("<p>" + rating + "</p>");
            }



            //         $(".list").append("<div>" + topics + "</div>");
            //         var gifDiv = $("<div class='gifDiv'>");
            // $(".gifDiv").append(queryURL);
            // var rating = response.data[i].images.original_still
            // gifDiv.append("Rated " + rating);

        });
    });

    renderButtons();

    $(document).on("click", "img", function () {
        if ($(this).attr("dataStatus") === "still") {
            console.log("still");
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("dataStatus", "animate")

        } else {
            console.log("animate");
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("dataStatus", "still")
            // $(".gifDiv").append(imageStill);


        }
    });

});




//Step 2: when a button is clicked, 10 static gif images from the giphy api appear on the page.
//Step 3: when the user clicks on the image, the gif animates. When the user clicks it again, it stops. 
//Step 4: display the rating of the gif under each gif
//Step 5: create a form that takes the value of the user input box and pushes it to the topics array
//Step 6: create a function that remakes the buttons array (Could we just have the user input create a button when the submit button is pushed?)