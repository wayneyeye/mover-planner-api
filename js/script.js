
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

    //NY times
    $nytHeaderElem.text("New York Times Articles about "+city); //refresh the news header
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	url += '?' + $.param({
  		'api-key': "dc6f8263c2a44f6390e60d61ed92880e",
  		'q': city,
  		'begin_date': "20100101",
  		'hl': "true"
		});
	$.ajax({
  		url: url,
  		method: 'GET',
			}).done(function(result) {
				// console.log(result);
				var counter=1;
				result.response.docs.forEach(function(element){
					// console.log(element.abstract);
					if (counter>4){
						return;
					}//show max 5 daily
					var nyt_link=element.web_url;
					var nyt_title=element.headline.main;
					var nyt_p=element.snippet;
					if(nyt_p!=null&&nyt_title!=null&&nyt_link!=null){
						counter++;
						$('#nytimes-articles').append('<li class="article">'+'<a href="'+nyt_link+'">'+nyt_title+'</a>'+'<p>'+nyt_p+'</p>'+'</li>');
	
					}			
				});
			}).fail(function(err) {		
				$nytHeaderElem.text("New York Times Articles Could Not Be Loaded");
				throw err;});

	//WikiPage
	$wikiElem="Wiki Pages Relevant to "+city;
	// Using jQuery
	var remoteUrlWithOrigin="https://en.wikipedia.org/w/api.php";
	remoteUrlWithOrigin += '?' + $.param({
  		'action': "opensearch",
  		'search': city,
  		'format': "json",
  		'callback': "wikiCallback"
		});
	var queryData=city;
	var wikiTimeout=setTimeout(function(){
		$wikiElem.text("Failed to Get Wiki Resources");
	},8000);
	$.ajax( {
	    url: remoteUrlWithOrigin,
	    dataType: 'jsonp',
	    success: function(data) {
	       // do something with data
	       // console.log(data);
	       for (var i = 0; i<data[1].length;i++){
	       	// console.log(data[1][i]);
	       	$('#wikipedia-links').append('<li>'+'<a href='+data[3][i]+'>'+data[1][i]+'</a>'+'</li>');
	       }
	       clearTimeout(wikiTimeout);
	    }
	} );







    return false;
};

$('#form-container').submit(loadData);
