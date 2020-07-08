// var newYorkCoords = [40.73, -74.0059];
// var mapZoomLevel = 12;

// Create the createMap function
function createMap(bikestations) {
  
  // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });
  

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap
};

  // Create an overlayMaps object to hold the bikeStations layer
  var overlayMaps = {
    "Bike Stations": bikestations
};


  // Create the map object with options
  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  var map = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 12,
    layers: [lightmap, bikestations]
});

// Layer control, using the baseMaps and overlayMaps.
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(map);
}

// Create the createMarkers function
function createMarkers(response) {
  console.log(response);

  // Pull the "stations" property off of response.data
  var stations = response.data.stations;

  // Initialize an array to hold bike markers
  var bikeMarkers = [];

  // Loop through the stations array
  for (var i=0; i<stations.length; i++) {
    var tempStation = stations[i];
    // For each station, create a marker and bind a popup with the station's name
    var bikeMarker = L.marker([tempStation.lat, tempStation.lon])
            .bindPopup("<h3>" + tempStation.name + "</h3> Capacity: " + tempStation.capacity);

    // Add the marker to the bikeMarkers array
    bikeMarkers.push(bikeMarker);
    
  }
  // Create a layer group made from the bike markers array, pass it into the createMap function
  var allBikeMarker = L.layerGroup(bikeMarkers);
  createMap(allBikeMarker);
}

// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json", createMarkers);
