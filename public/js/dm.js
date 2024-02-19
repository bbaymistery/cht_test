function initMap(div_map, origin, destination, way_points, dist, dur) {
  var map = new google.maps.Map(document.getElementById(div_map), {
    zoom: 4,
    center: { lat: 51.4844893, lng: -0.4501214 }
  });

  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer({
    draggable: false,
    map: map
  });

  directionsDisplay.addListener("directions_changed", function() {
    if (dist !== "" && dur !== "")
      computeTotalDistance(directionsDisplay.getDirections(), dist, dur);
  });

  displayRoute(
    origin,
    destination,
    way_points,
    directionsService,
    directionsDisplay
  );
}

function displayRoute(origin, destination, way_points, service, display) {
  service.route(
    {
      origin: origin,
      destination: destination,
      waypoints: way_points === "" ? [] : jQuery.parseJSON(way_points),
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.IMPERIAL,
      avoidTolls: false
    },
    function(response, status) {
      if (status === "OK") {
        display.setDirections(response);
      } else {
        alert("Could not display directions due to: " + status);
      }
    }
  );
}

function computeTotalDistance(result, dist, dur) {
  var total = 0;
  var duration = 0;
  var myroute = result.routes[0];
  for (var i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;
    duration += myroute.legs[i].duration.value;
  }
  total = total / 1609.344;
  duration = duration / 60;
  document.getElementById(dist).innerHTML = Math.round(total) + " mile";
  document.getElementById(dur).innerHTML = Math.round(duration) + " minutes";
}
