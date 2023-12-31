function updateWeather() {
  url = "./weatherbyip.php";
  options = {
    method: "GET"
  };
  fetch(url,options).then(response => response.json())
    .then(json => {
      document.getElementById("weatherarea").innerText = json['name'];
      document.getElementById("weatherdata").innerHTML = 
      "<p>"+json['weather'][0]['description']+"</p>\
      <p>"+Math.round(json['main']['temp'])+"&deg;C, feels like "+Math.round(json['main']['feels_like'])+"&deg;C</p>\
      <p>Humidity: "+Math.round(json['main']['humidity'])+"%\
      <p>Wind: "+Math.round(json['wind']['speed']/1.609)+"mph";

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
      document.getElementById("history").innerHTML = hist;
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

document.onload = updateWeather();
document.onload = updateHistory();
document.onload = updateQuote();
document.onload = time();
window.setInterval(updateWeather,60*60*1000); //update every hour
window.setInterval(updateHistory,5*60*1000); //24*60*60*1000); //update every day
window.setInterval(updateQuote,60*1000); //60*60*1000); //update every hour
window.setInterval(time, 500); //update time every half second

window.setInterval(refreshCalendar, 2*60*60*1000); //refresh calendar every 2 hours
