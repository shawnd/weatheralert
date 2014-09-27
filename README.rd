Hurricane view:
http://api.wunderground.com/api/9779b7eac702674c/currenthurricane/view.json

Earthquakes:
http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_hour.geojson

Tsunami:
http://www.ndbc.noaa.gov/data/latest_obs/latest_obs.txt



Idea:
Collect GIS information on natural disasters and warn people near by.



Mobile View (interface)
MOBILE SYNC CONTROLLER (receive request from phone -> store phone information -> return confirmation & key)
ALERT CONTROLLER (analyze data -> phone) - 
PARSE CONTROLLER (Data Parse -> Read -> Store) - different controllers per data type
DB


CORDOVA
LONG POLLING & SOCKET.IO
PHP OR RUBY OR PYTHON? Create server listener (maybe Java?)
POSTGIS POSTGRES