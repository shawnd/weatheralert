var map = undefined;
var current_lat = undefined;
var current_lng = undefined;
var markerArray = [];
var markerCache = [];

function getPosition() {
    console.log("in pos");
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log("nav ran");
        current_lat = position.coords.latitude;
        current_lng = position.coords.longitude;
    });
    console.log("outpos");
}

function initialize() {
    var mapOptions = {
        center: { lat: 45.997, lng: 260.243},
        zoom: 3,
        streetViewControl: false,
        mapTypeControl: false
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
                                  mapOptions);
    google.maps.event.addListener(map, 'idle', function() {
        console.log("MAP READY");
    });
    
    google.maps.event.addListener(map, 'bounds_changed', function() {
        // console.log("lat: " + map.getCenter().lat());
        // console.log("lon: " + map.getCenter().lng());
        // console.log("zoom: " + map.getZoom());
    });
}

function earthquakeData() {
    var jqxhr = $.get( "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson", function() {
    })
    .done(function(data) {
        var dataCount = data['metadata'].count;
        for(var i = 0; i < dataCount; i++){
            if(markerCache[data['features'][i]['properties'].code] != true) {
                var currentlatlng = new google.maps.LatLng(data['features'][i]['geometry'].coordinates[1], data['features'][i]['geometry'].coordinates[0]);
                var markerTitle = data['features'][i]['properties'].place + ": Magnitude " + data['features'][i]['properties'].mag;
                var marker = new google.maps.Marker({
                    position: currentlatlng,
                    map: map,
                    title: markerTitle
                });
                markerArray.push(marker);
                marker.setMap(map);
                markerCache[data['features'][i]['properties'].code] = true;
                toast.showLong("Earthquake: " + markerTitle);
            }
        }
    });

}

function adjustMapHeight() {
    var fullHeight = $(window).height();
    var mapHeight = fullHeight - 44;
    $("#map-canvas").height(mapHeight);
    $("#map-canvas").width("100%");
}

$(document).ready(function() {
    getPosition();
    setInterval(getPosition, 600000);

    earthquakeData();
    setInterval(earthquakeData, 60000);

    initialize();
    adjustMapHeight();
    
    $(document.body).on('pageinit', '#map-page-real', function() { //redraw map
        function addMarkers() { //part of redraw
            var len = markerArray.length;
            for(var i = 0; i < len; i++) {
                markerArray[i].setMap(map);
            }
        }
        adjustMapHeight();
        initialize();
        addMarkers();
    });
});