$(function () {

    // Initial array of nature buttons
    var natureArray = ["northern-lights", "ocean", "waterfall", "clouds"];

    // Adding click event listen listener to all buttons
    function displayNatureInfo() {
        $("#gifs-appear-here").empty();

        // Grabbing and storing the data-name property value from the button
        var nature = $(this).attr("data-name");
        console.log(this);
        console.log(nature);

        // Constructing a queryURL using the nature name
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            nature + "&api_key=JbAfcX5QBqA17D6HZ3KGfvZqy8Ix9au0&limit=10";

        // Performing an AJAX request with the queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(queryURL);
            console.log(response);

            // storing the data from the AJAX request in the results variable
            var results = response.data;
            console.log(results);

            // Looping through each result item
            for (var i = 0; i < results.length; i++) {

                // Creating and storing a div tag
                var natureDiv = $("<div>");
                natureDiv.addClass("col-4");

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);

                // Creating and storing an image tag
                var natureImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                natureImage.attr("src", results[i].images.fixed_height_still.url);
                natureImage.attr("data-still", results[i].images.fixed_height_still.url);
                natureImage.attr("data-animate", results[i].images.fixed_height.url);
                console.log("TRAE", results[i].images.fixed_height.url);
                natureImage.attr("data-state", "still");
                natureImage.addClass("gif");

                // Appending the paragraph and image tag to the natureDiv
                natureDiv.append(p);
                natureDiv.append(natureImage);

                // Prependng the natureDiv to the HTML page in the "#gifs-appear-here" div
                $("#gifs-appear-here").prepend(natureDiv);
            }
        });
    };


    // Function for displaying nature data
    function renderButtons() {

        // Deleting the nature gifs prior to adding new nature gifs
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of natures
        for (var i = 0; i < natureArray.length; i++) {
            console.log(natureArray[i]);

            // Then dynamicaly generating buttons for each item in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class of btn btn-outline-info to our button
            a.addClass("btn btn-outline-info");

            // Adding a data-attribute  
            a.attr("data-name", natureArray[i]);
            // Providing the initial button text
            a.text(natureArray[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);
        };
    };

    // This function handles events where a button is clicked
    $("#add-nature").on("click", function (event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var natureText = $("#nature-input").val().trim();

        // Adding movie from the textbox to our array
        natureArray.push(natureText);

        // Calling renderButtons which handles the processing of our nature array
        renderButtons();
    });

    // This function controlls a gif from still-->animate state.  It's looking at the whole document for still gifs with a class of gif.
    $(document.body).on("click",".gif", function () {
        console.log('clicked on a gif');

        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });


    // Adding a click event listener to all elements with a class of "btn btn-outline-info"
    $(document).on("click", ".btn-outline-info", displayNatureInfo);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();
    // displayNatureInfo();
})
