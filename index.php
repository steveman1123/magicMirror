<?php
  $apikeyfile = "./keyfile.json";
  $apikeys = json_decode(file_get_contents($apikeyfile),true);
  $calendarlink = $apikeys['googlecalendarlink'];
?>

<html>
  <head>
    <title>Magic Mirror</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="./index.css"/>
  </head>
  <body>
    <div id="datetime">
      <div id="clock"></div>
      <div id="date"></div>
    </div>

    <div class="flexwrap">
      
      <div class="flexitem">
        <div id="calendar">
          <iframe src=<?php echo $calendarlink; ?> style="height: 600px;" scrolling="no"></iframe>
          <div class="fader"></div>
        </div>
      </div>
      
      <div class="flexitem">
        <div class="spacer"></div>
      </div>


      <div class="flexitem">
        <div id="weatherwrap">
          <h3>Current Weather in <span id="weatherarea"></span>:</h3>
          <div id="weatherdata"></div>
        </div>
        <div id="quotewrap">
          <p id="quote"></p>~<span id="author"></span>
        </div>
      </div>
    
      <div class="flexitem">
        <div class="spacer"></div>
        <div id="thisdayinhistory">
          <h3>This Day in History</h3>
          <p id="history">History currently unavailable</p>
        </div>

        <!-- <div id="pics">
          <img src="https://astrobioloblog.files.wordpress.com/2011/10/duck2.jpg">
        </div> -->

      </div>
    </div>
  </body>
  <script src="./index.js"></script>
</html>
