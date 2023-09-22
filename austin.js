

window.onload = function() {
    var austinLatLong = [30.2672, -97.7431];
    var initialZoom = 10;

    var map = L.map('map', {
        crs: L.CRS.EPSG3857,
        fullscreenControl: true,
        wheelPxPerZoomLevel: 300
    }).setView(austinLatLong, initialZoom);

    var austin1940 = L.tileLayer.wms('https://maps.parkertimmins.com:8080/geoserver/wms?SERVICE=WMS', {
        tiled: true,
        layers: 'poly_1_jpeg_pyramid_dir',
        attribution: '<a href="https://library.austintexas.gov/ahc/aerial-photographs">Austin Historical Center</a>',
        maxZoom: 20,
        maxNativeZoom: 18,
        transparent: true,
        format: 'image/png' // necessary for transparency
    }).addTo(map);

    var satelliteNow = L.tileLayer.wms('https://basemap.nationalmap.gov:443/arcgis/services/USGSImageryOnly/MapServer/WmsServer', {
        tiled: true,
        layers: '0',
        attribution: '<a href="https://basemap.nationalmap.gov/">USGS</a>',
        maxZoom: 15, /// maximum zoom on available from USGS
        maxNativeZoom: 15
    }).addTo(map);

    var topoNow = L.tileLayer.wms('https://basemap.nationalmap.gov:443/arcgis/services/USGSTopo/MapServer/WmsServer?', {
        tiled: true,
        layers: '0',
        attribution: '<a href="https://basemap.nationalmap.gov/">USGS</a>',
        maxZoom: 15,
        maxNativeZoom: 15
    }).addTo(map);


    var baseMaps = {
        "Topographic ": topoNow,
        "Satellite": satelliteNow 
    };
    var overlayMaps = {
        "Austin 1940": austin1940
    };
    L.control.layers(baseMaps, overlayMaps).addTo(map);
}
