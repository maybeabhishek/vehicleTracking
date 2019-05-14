function initMap() {

  var val = document.getElementById("map");
  var myLatLng = {
    lat: parseInt(val.getAttribute("data-lat")),
    lng: parseInt(val.getAttribute("data-lng"))
  };
  console.log(val.getAttribute("data-lat"));
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  });
}