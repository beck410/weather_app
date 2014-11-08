//add function for DOMContentLoaded
var $ul = $("#forecast");

document.addEventListener("DOMContentLoaded", function(event) {

  var urlNash = "http://api.wunderground.com/api/ebacd9ddb12797fd/geolookup/forecast10day/q/TN/Nashville.json";
  //var $zipcodeSubmit = document.querySelector("#zipcode-submit");
  //var $zipcode = document.querySelector("#weather-zipcode");
  var defaultURL = "http://api.wunderground.com/api/ebacd9ddb12797fd/geolookup/forecast10day/q/";
  var jsonFile = ".json"
  //var $currentLocationButton = document.querySelector("#current-location")

  getJSONP(urlNash, 'displayWeather');

  //$zipcodeSubmit.addEventListener( 'click',function(event){
  $('#zipcode-submit').click(function(event){
    $zipcodeValue = $('#weather-zipcode').val();
    event.preventDefault();
    if($zipcodeValue.length === 5 && !isNaN($zipcodeValue)){
    var zipcodeURL = defaultURL + $zipcodeValue + jsonFile;
  } else {
      alert("wrong");
  };
    $('#forecast').text("");
    getJSONP(zipcodeURL, 'displayWeather');
 });

  $('#current-location').click(function(event){
    event.preventDefault();

    $('#forecast').text("");
    getLocation();
  });

});

//change city name
function cityName(name, state){
  var $cityName = $("#city");
  $cityName.text(name + ", " + state);
}

//displays weather at current location
function currentLocationWeather(position){
  var longitude = position.coords.longitude;
  var latitude = position.coords.latitude;
  var url = "http://api.wunderground.com/api/ebacd9ddb12797fd/geolookup/forecast10day/q/" + latitude + "," + longitude + ".json";

  getJSONP(url,'displayWeather');
};

//json callback fn
function displayWeather(data){
  var placeForecast = data.forecast.txt_forecast.forecastday;
  var city = data.location.city;
  var state = data.location.state;

  cityName(city, state);
  weatherFiveDayLoop(placeForecast);
}

//function to display weather data
function weatherFiveDayLoop(forecast) {
  for(var i=0; i < 10; i += 2){
    var $li = $('<li></li>');
    //create img
    var $img = $('<img />');
    //add src to image
    $img.attr('src', forecast[i].icon_url);
    //append to li
    $li.append($img);

    //create p
    var $title = $('<p></p>');
    //add forecast.title to p
    $title.text(forecast[i].title);
    //append to li
    $li.append($title);

    //create p
    var $weather = $('<td></td>');
    //add forecast.fcttext to p
    $weather.text(forecast[i].fcttext);
    //append to li
    $li.append($weather);
    //append li to ul
    $ul.append($li)
  }
}

//get current location
function getLocation(){
  navigator.geolocation.getCurrentPosition(currentLocationWeather, fail);
}

function fail(){
  alert("Cannot read your location. Please input a zipcode instead")
}

//get data through json
function getJSONP(url, cbName){
  var $script = $('<script></script>');
  $script.attr('src',url + '?callback=' + cbName);
  $('body').append($script);
}
