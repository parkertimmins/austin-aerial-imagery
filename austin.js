

$(function() {
    var austinLatLong = [30.2672, -97.7431];
    var initialZoom = 10;

    var map = L.map('map', {
        crs: L.CRS.EPSG3857,
        fullscreenControl: true,
        wheelPxPerZoomLevel: 300
    }).setView(austinLatLong, initialZoom);


    // weirdly host=localhost seems to only not work on mobile ?!?
    var austin1940 = L.tileLayer.wms('http://parkertimmins.com:8080/geoserver/wms?SERVICE=WMS', {
        tiled: true,
        layers: 'poly_1_jpeg_pyramid_dir',
        attribution: '<a href="https://library.austintexas.gov/ahc/aerial-photographs">Austin Historical Center</a>',
        maxZoom: 20,
        maxNativeZoom: 18,
        transparent: true,
        format: 'image/png' // necessary for transparency
    }).addTo(map);


    // Google map layers
    var roadGoogle = L.gridLayer.googleMutant({
        maxZoom: 20,
        type: 'roadmap'
    }).addTo(map);
    var hybridGoogle = L.gridLayer.googleMutant({
        maxZoom: 20,
        type: 'hybrid'
    }).addTo(map);
    var satelliteGoogle = L.gridLayer.googleMutant({
        maxZoom: 20,
        type: 'satellite'
    }).addTo(map);

    // use https://github.com/perliedman/leaflet-control-geocoder with OSM geocoder

    var baseMaps = {
        "Roads": roadGoogle,
        "Hybrid": hybridGoogle,
        "Satellite": satelliteGoogle
    };
    var overlayMaps = {
        "Austin 1940": austin1940
    };
    L.control.layers(baseMaps, overlayMaps).addTo(map);
});
