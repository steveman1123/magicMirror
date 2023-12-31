# magicMirror
Files for making a magic mirror


## Hardware Setup
For my setup, I have a raspi zero w attached via HDMI to an old 22" TV from a thrift store. I made a basic wood frame and cut a piece of glass down to size, then put 1-way mirror film on the glass for the mirroring.

## Software Setup
`sudo apt install apache2 php php-apache chromium-browser screen`
Set up apache to use a specified directory to serve from
Copy the web files from this repo to that directory
Get your api key from openweathermap, and share a google calendar* and put the share link in the key file
*Current set up is meant for 600px height, agenda view, with everything turned off, and a white background

if running from terminal/ssh, the display needs to be set using `export DISPLAY=:0`
start chromium in fullscreen and with cache disabled and pointing to localhost with the following command:
`chromium-browser --kiosk --disable-application-cache --aggressive-cache-discard --disk-cache-dir="/tmp/" --incognito http://localhost/index.php &`

Use the shell scripts to start or restart the mirror

autostart the mirror by adding the line `@/bin/bash /path/to/startMirror.sh` to `~/.config/lxsession/LXDE-pi/autostart`

The pi zero w is fairly sluggish on startup, taking about 2 minutes from power on to fully operational
