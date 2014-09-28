var map = undefined;
function initialize() {
    var mapOptions = {
        center: { lat: 45.997, lng: 260.243},
        zoom: 3
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
                                  mapOptions);
    google.maps.event.addListener(map, 'idle', function() {
        console.log("MAP READY");
    });
    
    google.maps.event.addListener(map, 'bounds_changed', function() {
        console.log("lat: " + map.getCenter().lat());
        console.log("lon: " + map.getCenter().lng());
        console.log("zoom: " + map.getZoom());
    });
}

$(document).ready(function() {
    function adjustMapHeight() {
        var fullHeight = $(window).height();
        var mapHeight = fullHeight - 44;
        $("#map-canvas").height(mapHeight);
        $("#map-canvas").width("100%");
    }
    initialize();
    adjustMapHeight();
    
    $(document.body).on('pageinit', '#map-page-real', function() {
        console.log("POWERS");
        adjustMapHeight();
        initialize();
    });
});