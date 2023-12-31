<?php
//generate a json file containing this day in history generated from wikipedia
//if the doesn't exist or is updated before today, then request new info
//else read the stored file

$histfilepath = "./history-files/";
$savefile = $histfilepath.date("F_j").".json";

//if json file is stored already and it's been updated this year
if(file_exists($savefile) and (int)date("Y",filectime($savefile)) == (int)date("Y")) {
    $out = file_get_contents($savefile);
} else {
  //get wikipedia data
  $url = "https://en.wikipedia.org/wiki/".date("F_j");
  $html = file_get_contents($url);

  //condense to relevent section
  $secstart = '<h2><span class="mw-headline" id="Events">Events';
  $secend = '<h2><span class="mw-headline" id="Births">Births';

  $html = explode($secend,explode($secstart,$html)[1])[0];

  //where each data element starts and ends
  $datastart = "<li>";
  $dataend = "</li>";

  //split html and remove the first element (since it's the title)
  $out = array_slice(explode($datastart,$html),1);


  //remove any extra cruft and then remove the html tags
  foreach ($out as &$v) {
    $v = strip_tags(explode($dataend,$v)[0]);
  }

  //replace any special html characters
  $out = preg_replace("/&#8211;/", "-", $out);
  $out = preg_replace("/&#160;/", " ", $out);
  $out = preg_replace("/&#91;\d&#93;/","",$out);

  //write to the json file
  $out = json_encode($out);
  file_put_contents($savefile, $out);
}

// output json
header('Content-Type: application/json');
echo $out;
?>