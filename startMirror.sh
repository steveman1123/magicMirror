#!/bin/bash

#https://raspberrytips.com/autostart-a-program-on-boot/
#cannot use crontab to start gui apps

export DISPLAY=:0


#echo "starting xterm"
#xterm &

#sleep 3

echo "opening browser"
chromium-browser --kiosk --disable-application-cache --aggressive-cache-discard --disk-cache-dir="/tmp/" --incognito http://localhost/index.php &
echo "opened browser"

#sleep 3

#unclutter &
#echo "uncluttered"
