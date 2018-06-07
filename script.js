function geoFindMe() {
  var output = document.getElementById("out");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    var geocoder = new google.maps.Geocoder;
    geocodeLatLng(geocoder, latitude, longitude, output)
  }

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }

  output.innerHTML = "<p>Locating...</p>";

  navigator.geolocation.getCurrentPosition(success, error);
}
function geocodeLatLng(geocoder, latitude, longitude, output) {
  var latlng = {lat: parseFloat(latitude), lng: parseFloat(longitude)};
  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === 'OK') {
      output.innerHTML = '<p>Address: '+results[0].formatted_address+'</p><br><p>Latitude: '+latitude+'</p><br><p>Longitude: '+longitude+'</p>';

      var img = new Image();
      img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false&markers=color:red%7Clabel:S%7C"+ latitude+","+longitude;
  
      output.appendChild(img);
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}
