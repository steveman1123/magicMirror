# magicMirror
Files for making a magic mirror


## Hardware Setup
For my setup, I have a raspi zero w attached to an old TV 22" TV from a thrift store via HDMI. I made a basic wood frame and cut a piece of glass down to size, then put 1-way mirror film on the glass for the mirroring.

## Software Setup
`sudo apt install apache2 php php-apache`
Set up apache to use a specified directory
Copy the web files from this repo to that directory
autostart chromium in fullscreen and with cache disabled and pointing to localhost



## Known Issues
 - webpage doesn't update from cache
 - screen turns off after a little bit
 - software setup section is incomplete
 - webpage doesn't quite work yet
 - webpage doesn't automagically get location form IP (so weather location needs to be set manually)
