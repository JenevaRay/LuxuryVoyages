var map = L.map('map')
// commented out example.
// .setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

var marker = L.marker([51.5, -0.09]).addTo(map);
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

const viewBox = async (latHigh=13, latLow=12, longHigh=-70, longLow=-71) => {
    try {
      const response = await fetch(`/api/wiki-listings/coord-range?latLow=${latLow}&latHigh=${latHigh}&longLow=${longLow}&longHigh=${longHigh}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'}
      })
      if (response.ok) {
        const data = await response.json()
        // for now we'll worry about only the first result with actual coordinates. 
        console.log(data[1])
        let coordbox = {
            latHigh: data[1].latitude,
            latLow: data[1].latitude,
            longHigh: data[1].longitude,
            longLow: data[1].longitude,
            zoom: 13
        }
        map.setView([data[1].latitude, data[1].longitude], coordbox.zoom)
        let markers = []
        for (let row of data) {
            // console.log(row)
            // console.log([row.latitude, row.longitude])
            let marker = L.marker([row.latitude, row.longitude]).addTo(map);
            marker.bindPopup(`type: ${row.type}\narticle: ${row.article}\ntitle: ${row.title}\ndescription: ${row.description}`)
            console.log(row)
            // marker.bindPopup()
            markers.push(marker)
            // if (row.latitude > coordbox.latHigh && !isNaN(row.latitude)) {
            //     coordbox.latHigh = row.latitude
            // }
            // if (row.latitude < coordbox.latLow && !isNaN(row.latitude)) {
            //     coordbox.latLow = row.latitude
            // }
            // if (row.longitude > coordbox.longHigh && !isNaN(row.longitude)) {
            //     coordbox.longHigh = row.longitude
            // }
            // if (row.longitude < coordbox.longLow && !isNaN(row.longitude)) {
            //     coordbox.longLow = row.longitude
            // }

        }
        console.log(coordbox)
        
      }
    } catch (err) {
      console.error(err)
    }
  }
  void (viewBox())

  var popup = L.popup()
  function onMapClick(e) {
    // popup.setLatLng(e.latlng)
    //      .setContent("You clicked on the map at " + e.latlng.toString())

    //      .openOn(map)
    map.setView([e.latlng.lat, e.latlng.lng], 13)
    // console.log(e.latlng)
  }

  map.on('click', onMapClick)