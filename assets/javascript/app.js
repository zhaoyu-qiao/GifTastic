$(document).ready(function () {

    //declare array of topics
    let topics = ["swing+dance", "modern+dance", "tango", "waltz", "foxtrot", "hiphop+dance", "ballet", "rumba", "poll+dance"]
    //get api key = oxadMDqAWPVIU1J5wQrvn4k7CinSNwyk 
    let apiKey = "oxadMDqAWPVIU1J5wQrvn4k7CinSNwyk"
    //declare query url variable      https://api.giphy.com/v1/gifs/search
    //https://api.giphy.com/v1/gifs/search
    //need to do for loop
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topics[0] + "&api_key=" + apiKey;

    console.log(queryURL);
    //write buttons
    let newBtn = $('<button>');
    newBtn.addClass('topic-btn');
    $("#btns").append(newBtn);
    //on click function
    $(".topic-btn").on("click", function () {


        //write images
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            //something's wrong with the below one the data[0] index isn't dorrect 
            //may need to do for loop
            let imageURL = response.data[0].images.fixed_height_still.url;
            console.log(response.data.images.fixed_height_still.url);
            let danceImage = $("<img>")
            danceImage.attr("src", imageURL);
            $("#imgs").prepend(danceImage);

        });
        //click images, will animate, click animated images, will stay still??? Image object?
        //add form

    })



})