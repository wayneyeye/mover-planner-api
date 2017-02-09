
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    // YOUR CODE GOES HERE!
    var location = $('input#street').val();
    var city = $('input#city').val();    
    location=location+' ,'+city;
    location=location.toUpperCase();
    // console.log(location);
    $body.append('<img class="bgimg" src="https://maps.googleapis.com/maps/api/streetview?size=600x400&location='+location+'&fov=90&heading=90&pitch=10&key=AIzaSyAi_4VnykfIe18gmpwO7kgIyJKGbJAaQgM">');
    $greeting.text("So you want to live at "+location+"?")


    






    return false;
};

$('#form-container').submit(loadData);
