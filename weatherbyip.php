<?php
//get the weather from openweathermap
//https://openweathermap.org/current#example_JSON

//get the api key for the weather data
$apikeyfile = "./keyfile.json";
$apikeys = json_decode(file_get_contents($apikeyfile),true);

//get the external ip address of the device
$ip = file_get_contents("https://api.ipify.org");

//get the location based on ip
$location = unserialize(file_get_contents('http://www.geoplugin.net/php.gp?ip='.$ip));

// $country = $location['geoplugin_countryCode'];
// $region = $location['geoplugin_regionCode'];
// $city = $location['geoplugin_city'];

$lat = $location['geoplugin_latitude'];
$lon = $location['geoplugin_longitude'];

//get the weather based on location
$url = "https://api.openweathermap.org/data/2.5/weather";
$params = array(
  "lat" => $lat,
  "lon" => $lon,
  "appid" => $apikeys['openweathermap'],
  "units" => "metric" //"metric", "imperial", or "standard"
);

//parse into the url (since I don't feel like properly figuring out get requests using params)
$url = $url."?".http_build_query($params);

$weather = file_get_contents($url);

header('Content-Type: application/json');
echo $weather;

//TODO: maybe implement forecast as well
//https://openweathermap.org/forecast5
//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

?>