//add function for DOMContentLoaded
    
 
document.addEventListener("DOMContentLoaded", function(event) {

  var url = "http://api.wunderground.com/api/ebacd9ddb12797fd/forecast10day/q/37217.json";

  getJSONP(url, 'displayWeather');

}); 

//json callback fn
function displayWeather(data){
  var forecast = data.forecast.txt_forecast.forecastday;
  
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

