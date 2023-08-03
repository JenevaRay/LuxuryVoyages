// const { setMaxParserCache } = require("mysql2");

var map = L.map('map')
// commented out example.
// .setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// var marker = L.marker([51.5, -0.09]).addTo(map);
// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

const markers = []

const viewBox = async (latHigh=13, latLow=12, longHigh=-70, longLow=-71, setMapView = true) => {
    try {
      const response = await fetch(`/api/wiki-listings/coord-range?latLow=${latLow}&latHigh=${latHigh}&longLow=${longLow}&longHigh=${longHigh}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'}
      })
      if (response.ok) {
        const data = await response.json()
        if (setMapView) {
            let coordbox = {
                latHigh: data[1].latitude,
                latLow: data[1].latitude,
                longHigh: data[1].longitude,
                longLow: data[1].longitude,
                zoom: 13
            }
            map.setView([data[1].latitude, data[1].longitude], coordbox.zoom)
        }
        for (let marker in markers) {
            map.removeLayer(markers[marker])
        }    
        for (let row of data) {
            let marker = L.marker([row.latitude, row.longitude]).addTo(map);
            marker.bindPopup(`type: ${row.type}\narticle: ${row.article}\ntitle: ${row.title}\ndescription: ${row.description}`)
            markers.push(marker)
        }
      }
    } catch (err) {
      console.error(err)
    }
  }
  void (viewBox())

  var popup = L.popup()
  
function onMapClick(e) {
    map.setView([e.latlng.lat, e.latlng.lng])
}

map.on('moveend', () => {
    let bounds = map.getBounds()
    // console.log(bounds._northEast)
    viewBox(bounds._northEast.lat, bounds._southWest.lat, bounds._northEast.lng, bounds._southWest.lng, false)
    console.log(bounds)
})

map.on('click', onMapClick)