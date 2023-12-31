

function updateWeatherGov() {

  //TODO: get coords based on external IP, then get gridpoints, then get weather (could also get geocoding via http://www.geoplugin.net/php.gp?ip={external-ip} get coords from there, then get gridpoints and city/state)
  //https://weather-gov.github.io/api/gridpoints
  //https://www.weather.gov/documentation/services-web-api
  //gridpoints = readTextFile("https://api.weather.gov/points/{lat},{lon}")
  /*
  coords, gridid, gridpoints:
  cedar rapids: (41.97, -91.67) DVN (30,86)
  phoenix: (33.49, -112.05) PSR (160,60)
  nyc: (40.71, -74.01) OKX (33, 35)
  LA: (34.05, -118.25) LOX (115,45)
  */

  gridid = "PSR"
  gridx = "160";
  gridy = "60";

  url = "https://api.weather.gov/gridpoints/"+gridid+"/"+gridx+","+gridy+"/forecast";

  fetch(url).then(response => response.json())
    .then(json => {
      console.log(json);
    });

  return false;

  weather = weather['properties']['periods'];

  document.getElementById("weatherwrap").innerHTML = "";

  //number of sections to populate
  sectionNum = 5;

  for(i=0;i<sectionNum;i++){
    wSection = document.createElement('div'); //section to put weather data in
    wTime = document.createElement('div');
    forecast = document.createElement('div');

    wSection.className = 'wSection';
    wTime.className = 'wTime';
    forecast.className = 'forecast';

    document.getElementById("weatherwrap").appendChild(wSection);
    document.getElementsByClassName("wSection")[i].appendChild(wTime);
    document.getElementsByClassName("wSection")[i].appendChild(forecast);

    document.getElementsByClassName("wSection")[i].style.color="rgb("+(255*(1-i/sectionNum))+","+(255*(1-i/sectionNum))+","+(255*(1-i/sectionNum))+")";

    document.getElementsByClassName('wTime')[i].innerHTML = weather[i]['name'];
    document.getElementsByClassName('forecast')[i].innerHTML = weather[i]['detailedForecast'];
  }
}

function updateWeatherOpen() {
  url = "./weatherbyip.php";
  options = {
    method: "GET"
  };
  fetch(url,options).then(response => response.json())
    .then(json => {
      document.getElementById("weatherarea").innerText = json['name'];
      document.getElementById("weatherdata").innerHTML = 
      "<p>"+json['weather'][0]['description']+"</p>\
      <p>"+json['main']['temp']+"&deg;C, feels like "+json['main']['feels_like']+"&deg;C</p>\
      <p>Humidity: "+json['main']['humidity']+"%\
      <p>Wind: "+json['wind']['speed']+"kph";

    });
}

function updateHistory() {
  url = "./thisdayinhistory.php";
  options = {
    method: "GET"
  };
  fetch(url,options).then(response => response.json())
    .then(json => {
      hist = json[parseInt(Math.random()*json.length)];
      document.getElementById("history").innerText = hist;
    });
}

function updateQuote() {
  url = "./quotes.json";
  fetch(url).then(response => response.json())
    .then(json => {
      var quote = json[parseInt(Math.random()*json.length)];
      document.getElementById("quote").innerHTML = quote[0];
      document.getElementById("author").innerHTML = quote[1];

    })
}

function time() {
  var today = new Date();
  var hh = addZero(today.getHours());
  var mm = addZero(today.getMinutes());
  var ss = addZero(today.getSeconds());
  var yyyy = today.getYear()+1900;
  var mo = addZero(today.getMonth()+1);
  var dd = addZero(today.getDate());

  document.getElementById("clock").innerHTML = hh+":"+mm+":"+ss;
  document.getElementById("date").innerHTML = yyyy+"-"+mo+"-"+dd;

  if(!parseInt(hh+mm+ss)) { updateQuote(); } //update the quote at midnight
}

function addZero(i) {
  if(i<10) {
    i = "0" + i;
  }
  return i;
}

function refreshCalendar() {
  document.getElementById('googlecalendar').contentWindow.location.reload();
}

document.onload = updateWeatherOpen();
document.onload = updateHistory();
document.onload = updateQuote();
document.onload = time();
window.setInterval(updateWeatherOpen,60*60*1000); //update every hour
window.setInterval(updateHistory,5*60*1000); //24*60*60*1000); //update every day
window.setInterval(updateQuote,60*1000); //60*60*1000); //update every hour
window.setInterval(time, 500); //update time every half second

window.setInterval(refreshCalendar, 2*60*60*1000); //refresh calendar every 2 hours
