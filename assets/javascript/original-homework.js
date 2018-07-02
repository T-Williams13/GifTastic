$(document).ready(function(){
  //Step 1: create an array that gets turned into buttons which display on the page when it loads. 
  var topics = ["Leslie Knope", "Ron Swanson", "Tom Haverford"];
        //for loop that appends buttons for each string in the array

function renderButtons (){
$(".list").empty();
for (var i = 0; i < topics.length; i++){
    var arrBtn = $("<button>");
    arrBtn.addClass("character")
    arrBtn.attr("data-name", topics[i]);
    arrBtn.text(topics[i]);
    $(".list").append(arrBtn);
}

}

    var searchTerm = ""
    $("body").on("click", ".searchTerm", function(){
      $(this).text()
      searchTerm = $(this).text();
      var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + searchTerm;
    
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        $(".list").append("<div>" + topics + "</div>");
        
      });
      renderButtons();
    });
  


});


//Step 2: when a button is clicked, 10 static gif images from the giphy api appear on the page.
//Step 3: when the user clicks on the image, the gif animates. When the user clicks it again, it stops. 
//Step 4: display the rating of the gif under each gif
//Step 5: create a form that takes the value of the user input box and pushes it to the topics array
//Step 6: create a function that remakes the buttons array (Could we just have the user input create a button when the submit button is pushed?)