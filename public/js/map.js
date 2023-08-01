var map = L.map('map')
// commented out example.
// .setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

var marker = L.marker([51.5, -0.09]).addTo(map);
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

const viewBox = async () => {
    try {
      const response = await fetch('/api/wiki-listings/', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'}
      })
      if (response.ok) {
        const data = await response.json()
        // for now we'll worry about only the first result with actual coordinates. 
        console.log(data[1])
        let coordbox = {
            lat: data[1].latitude,
            long: data[1].longitude,
            zoom: 13
        }
        for ()
        map.setView([coordbox.lat, coordbox.long], coordbox.zoom)
      }
    } catch (err) {
      console.error(err)
    }
  }
  void (viewBox())