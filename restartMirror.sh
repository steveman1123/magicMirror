
echo "killing"
killall chromium-browser
echo "killed"

echo "starting"

export DISPLAY=:0

chromium-browser --kiosk --disable-application-cache --aggressive-cache-discard --disk-cache-dir="/tmp/" --incognito http://localhost/index.html &

echo "started"
