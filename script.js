var baseLayer = new ol.layer.Tile({
    type: 'base',
    title: 'OpenStreetMap',
    source: new ol.source.OSM()
  });
  
  var lithuaniaRailLayer = new ol.layer.Tile({
    title: 'Lithuania Rail',
    visible: false,
    source: new ol.source.TileWMS({
      url: 'http://localhost:8080/geoserver/Lithuania/wms',
      params: {
        'LAYERS': 'Lithuania:lithuaniaRail',
        'TILED': true
      },
      serverType: 'geoserver',
      projection: 'EPSG:4326'
    })
  });
  
  var lithuaniaDEMLayer = new ol.layer.Tile({
    title: 'Lithuania DEM',
    visible: false,
    source: new ol.source.TileWMS({
      url: 'http://localhost:8080/geoserver/testing/wms',
      params: {
        'LAYERS': 'Lithuania:Lithuania_DEM',
        'TILED': true
      },
      serverType: 'geoserver',
      projection: 'EPSG:4326'
    })
  });

  var gisOsmBuildingsLayer = new ol.layer.Tile({
    title: 'GIS OSM Buildings',
    visible: false,
    source: new ol.source.TileWMS({
      url: 'http://localhost:8080/geoserver/Lithuania/wms',
      params: {
        'LAYERS': 'Lithuania:gis_osm_buildings_a_ply',
        'TILED': true
      },
      serverType: 'geoserver',
      projection: 'EPSG:4326'
    })
  });


//add basemap
  var map = new ol.Map({
    target: 'map',
    layers: [
      baseLayer,
      lithuaniaDEMLayer,
      lithuaniaRailLayer,
      gisOsmBuildingsLayer
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([25.2797, 54.6894]), // Center of the bounding box in Vilnius (longitude, latitude)
      zoom: 7 // Zoom level to fit the bounding box
    })
  });





// Add event listeners for checkboxes
document.getElementById('lithuaniaRailCheckbox').addEventListener('change', function (event) {
    lithuaniaRailLayer.setVisible(event.target.checked);
  });
  
  document.getElementById('lithuaniaDEMCheckbox').addEventListener('change', function (event) {
    lithuaniaDEMLayer.setVisible(event.target.checked);
  });
  document.getElementById('lithuaniaBuildingsCheckbox').addEventListener('change', function (event) {
    gisOsmBuildingsLayer.setVisible(event.target.checked);
  });
  
 

// Remove the mouseenter and mouseleave event listeners

// Add an event listener for the toggle button
document.getElementById('sidebar-toggle-button').addEventListener('click', function () {
    var sidebarWrapper = document.getElementById('sidebar-wrapper');
    sidebarWrapper.classList.toggle('collapsed');
    sidebarWrapper.classList.toggle('pinned');
  });
  
  // Initialize the sidebar as collapsed and not pinned
  document.getElementById('sidebar-wrapper').classList.add('collapsed');
  document.getElementById('sidebar-wrapper').classList.remove('pinned');
  