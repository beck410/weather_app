//add function for DOMContentLoaded


document.addEventListener("DOMContentLoaded", function(event) {

  var urlNash = "http://api.wunderground.com/api/ebacd9ddb12797fd/geolookup/forecast10day/q/TN/Nashville.json";
  //var $zipcodeSubmit = document.querySelector("#zipcode-submit");
  //var $zipcode = document.querySelector("#weather-zipcode");
  var defaultURL = "http://api.wunderground.com/api/ebacd9ddb12797fd/geolookup/forecast10day/q/";
  var jsonFile = ".json"
  var $currentLocationButton = document.querySelector("#current-location")
  var $ul = document.querySelector("#forecast");

  getJSONP(urlNash, 'displayWeather');

  //$zipcodeSubmit.addEventListener( 'click',function(event){
  $('#zipcode-submit').click(function(event){

    event.preventDefault();
    var zipcodeURL = defaultURL + $('#weather-zipcode').val() + jsonFile;


    $ul.innerHTML = "";
    getJSONP(zipcodeURL, 'displayWeather');
 });

  $currentLocationButton.addEventListener('click',function(event){
    event.preventDefault();


    $ul.innerHTML = "";
    getLocation();
  });

});

//change city name
function cityName(name, state){
  var $cityName = document.querySelector("#city");
  $cityName.innerHTML = name + ", " + state;
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
    var $ul = document.querySelector('#forecast');
    var $li = document.createElement('li');
    //create img
    var $img = document.createElement('img');
    //add src to image
    $img.setAttribute('src', forecast[i].icon_url);
    //append to li
    $li.appendChild($img);

    //create p
    var $title = document.createElement('p');
    //add forecast.title to p
    $title.innerText = forecast[i].title;
    //append to li
    $li.appendChild($title);

    //create p
    var $weather = document.createElement('p');
    //add forecast.fcttext to p
    $weather.innerText = forecast[i].fcttext;
    //append to li
    $li.appendChild($weather);
    //append li to ul
    $ul.appendChild($li)
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
  var $script = document.createElement('script');
  $script.src = url + '?callback=' + cbName;
  document.body.appendChild($script);
}
