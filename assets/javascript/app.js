//Pseudo code
//window.onload or document.ready, there will be multiple buttons with existing topics on the screen
//=>Create var with all topics, get the API key and 
//=>Create all those buttons with the different topics  function createbuttons, and call it so many times?
//There will be an area where you store all the images  function storeImages?
//=>prepend imageVar to the image element in html (image from ajax call)

//clicks
//1.When clicking on the topics buttons, need to get 10 images from giphy api query q,limit,rating
//=>Get query url,api key, use ajax to get the initial 10 still images urls
//=>get query url should be a function?
//=>Also need to store url of the animated images newVar?
//=>Write the images into html
//=>Create image holder element, add src attribute to the element with the still url and animated url
//2.When clicking on the still image, needs to toggl that image into animate state
//=>on click, if an image is still, change it to animate, if an image is animated, change it to still.
//add class for these images?

//Add search
//There will be a *card* with a search or submit button for searching images for the new topics
//=>create form with user input and submit button, grab value from user input and modify the query string,
//=>get the new query url, ajax to get new images.
//declare array of topics

//Referred to the click button activity, the cat button activity, and this code here:https://github.com/lkanand/GIFtastic/blob/master/assets/javascript/giphy-generator.js

//Declare topics array and variables
let topics = ["crying", "dancing", "eating", "falling", "finger+guns", "laughing", "middle+finger", "sleeping", "smiling"];
let numOfImages = 10;
let rating = "pg";
//loop through the topics array and generate buttons, and write them into html
function writeBtns() {
    //$("#btnsDiv").empty();
    for (let i = 0; i < topics.length; i++) {
        let newBtn = $('<button>');
        newBtn.addClass('topic-btn');
        newBtn.attr("type", "button");
        newBtn.attr("data-topic", topics[i]);
        newBtn.text(topics[i]);
        $("#btnsDiv").append(newBtn);
        console.log(newBtn);
    }
}

function displayImages(event) {
    event.preventDefault();
    //get api key = oxadMDqAWPVIU1J5wQrvn4k7CinSNwyk 
    let apiKey = "oxadMDqAWPVIU1J5wQrvn4k7CinSNwyk";
    //declare query url variable, should I have limit to 10 or not?  
    $("#imgs-information").empty();

    let topic = $(this).attr("data-topic");
    //console.log($this());
    console.log(topic);
    let queryURL = "https://api.giphy.com/v1/gifs/search?limit=" + numOfImages + "&rating=" + rating + "&q=" + topic + "&api_key=" + apiKey;
    console.log(queryURL)
    //Use ajax to get the response, and the image urls that we need
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        //If you use response.data[0].images.original.url, it doesn't work, but if you put response.data into var results, it works. 
        let results = response.data;
        console.log(results);
        for (let j = 0; j < numOfImages; j++) {
            //grab initial url to be the still image url
            let stillImageURL = results[j].images.fixed_height_still.url;
            let animateImageURL = results[j].images.fixed_height.url;
            console.log(stillImageURL);
            console.log('result j', results[j]);
            console.log(' j', j);

            //create new div holder to hold each image and its rating
            let imageDiv = $("<div>")
            imageDiv.addClass("singleImageDiv");
            imageDiv.append("<p>Rating:" + results[j].rating);

            //create new image element holder to hold each image
            let actionImage = $("<img>");
            actionImage.addClass("actionImage");
            actionImage.attr("id", j)
            //add the stillImageURL as src attribute to the image var
            actionImage.attr("src", stillImageURL);
            //add state attribute to indicate whether the image is still or animated
            actionImage.attr("data-toggle", animateImageURL);
            //add attribute still and animated, to store the url of image in two states
            //actionImage.attr("data-still", results[j].images.fixed_height_still.url);
            //actionImage.attr("data-animate", results[j].images.fixed_height.url);
            //prepend image to the new imageDiv
            imageDiv.prepend(actionImage);
            //append the new div to html
            $("#imgs-information").append(imageDiv);
            //return animateImageURL;
            //return stillImageURL;
            const testVariable = document.getElementById(j);
            console.log(testVariable);
        }
        //Issue: everytime you click the buttons, somehow the below one got swapped.?????
        //This toggl function within the display image function somehow isn't triggered well.
        //When user click the image, change the state of the image
    });
}


$(document).ready(function () {

    writeBtns();

    //When clicking the button, display image
    $(document).on("click", ".topic-btn", displayImages);

    $(document).on("click", ".actionImage", function (e) {
        //event.preventDefault();

        let originalImageURL = $(this).attr("src");
        $(this).attr("src", $(this).attr("data-toggle"));
        $(this).attr("data-toggle", originalImageURL);
    });
    //Add new form for user to search
    $(document).on("click", "#find-topic", function (event) {
        // console.log('event', event);
        // debugger;
        // why do we have to have this preventDefault?
        event.preventDefault();
        console.log('hitting function')
        //add new button based on the topic
        let newTopic = $("#topic-input").val();
        console.log(newTopic);
        let newBtn = $('<button>');
        newBtn.addClass('topic-btn');
        newBtn.attr("type", "button");
        newBtn.attr("data-topic", newTopic);
        newBtn.text(newTopic);
        $("#btnsDiv").append(newBtn);

    })
})