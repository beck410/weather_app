//add function for DOMContentLoaded
    
 
document.addEventListener("DOMContentLoaded", function(event) {

  var urlNash = "http://api.wunderground.com/api/ebacd9ddb12797fd/forecast10day/q/TN/Nashville.json";
  var $zipcodeSubmit = document.querySelector("#zipcode-submit");
  var $zipcode = document.querySelector("#weather-zipcode");
  var defaultURL = "http://api.wunderground.com/api/ebacd9ddb12797fd/forecast10day/q/";
  var jsonFile = ".json"
  var $ul = document.querySelector(".five-day-forecast ul");

  getJSONP(urlNash, 'displayWeather');

  $zipcodeSubmit.addEventListener( 'click',function(event){
    event.preventDefault();
    var zipcodeValue = $zipcode.value;
    var zipcodeURL = defaultURL + zipcodeValue + jsonFile;
    $ul.innerText = ""; 
    alert($ul);
    getJSONP(zipcodeURL, 'displayWeather');
  });

}); 


//EVENT LISTENER


//json callback fn

function displayWeather(data){
  var nashForecast = data.forecast.txt_forecast.forecastday; 
  
  weatherFiveDayLoop(nashForecast);
}

//function to display weather data 
function weatherFiveDayLoop(forecast) {
  for(var i=0; i < 10; i += 2){
    var $ul = document.querySelector('.five-day-forecast');
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

//get data through json
function getJSONP(url, cbName){
  var $script = document.createElement('script');
  $script.src = url + '?callback=' + cbName;
  document.body.appendChild($script);
}

