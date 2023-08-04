var map = L.map('map')

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

const markers = []

const viewBox = async (latHigh, latLow, longHigh, longLow, setMapView = true) => {
    try {
      const wikiresponse = await fetch(`/api/wiki-listings/coord-range?latLow=${latLow}&latHigh=${latHigh}&longLow=${longLow}&longHigh=${longHigh}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      if (wikiresponse.ok) {
        const data = await wikiresponse.json()
        if (setMapView) {
            document.getElementById('itinerary-create').style.display = 'none'
            let latitude = (Number(latLow) + Number(latHigh)) / 2
            let longitude = (Number(longLow) + Number(longHigh)) / 2
            
            let zoom = 13
            // console.log(data)
            map.setView([latitude, longitude], zoom)
        }
        let bounds = map.getBounds()
        let [ north, south, east, west ] = [bounds._northEast.lat, bounds._southWest.lat, bounds._northEast.lng, bounds._southWest.lng]
        const itinresponse = await fetch(`/api/itin/bounds/?north=${north}&east=${east}&south=${south}&west=${west}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        //   body: { "northeast": bounds._northEast, "southwest": bounds._southWest }
        })  
        for (let marker in markers) {
            map.removeLayer(markers[marker])
        }
        if (itinresponse.ok) {
            const itins = await itinresponse.json()
            for (let row of itins) {
                let marker = L.marker([row.latitude, row.longitude]).addTo(map);
                console.log(row)

                marker.bindPopup(`<p></p><h4>${row.summary}</h4><p>${row.details}</p><p>${row.starttime} - ${row.stoptime}</p><p><button type="button" class="btn btn-danger" onclick="javascript:deleteMarker(${row.id}, ${markers.length})">Delete</button></p>`)
                markers.push(marker)
            }    
        }
        for (let row of data) {
            let marker = L.marker([row.latitude, row.longitude]).addTo(map);
            console.log(row)
            marker.bindPopup(`<p><a href="/itin-add/${row.id}">ADD TO MY ITINERARY</a></p><h3>${row.title}</h3><p>${row.description}</p><p>type: ${row.type}article: ${row.article}</p>`)
            markers.push(marker)
        }
      }
    } catch (err) {
      console.error(err)
    }
  }
let params = new URLSearchParams(document.location.search.substring(1))
console.log(params)
viewBox(params.get('latLow'), params.get('latHigh'), params.get('longLow'), params.get('longHigh'), true)

//   var popup = L.popup()
  
async function deleteMarker(id, markerIndex) {
    console.log(markers[markerIndex])
    // console.log(id)
    if (Number(id)) {
        const response = await fetch(`/api/itin/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
        if (response.status == 204) {
            map.removeLayer(markers[markerIndex])
            // const data = await response.json()
            // console.log(data)
        }
    }
}

function onMapClick(e) {
    // click to create itinerary, instead of panning to location.
    let form = document.getElementById('itinerary-create')
    if (form.style.display === 'none') {
        form.style.display = 'block'
    }
    document.getElementById('latitude').innerText = e.latlng.lat
    document.getElementById('longitude').innerText = e.latlng.lng
    // document.getElementById('location').innerText = JSON.stringify([e.latlng.lat, e.latlng.lng])
    // map.setView([e.latlng.lat, e.latlng.lng])
}

// map.on()

map.on('moveend', () => {
    document.getElementById('itinerary-create').style.display = 'none'
    let bounds = map.getBounds()
    params.set('latLow', bounds._southWest.lat)
    params.set('latHigh', bounds._northEast.lat)
    params.set('longLow', bounds._southWest.lng)
    params.set('longHigh', bounds._northEast.lng)
    history.replaceState(null, '', window.location.origin + window.location.pathname + '?' + params )
    viewBox(bounds._northEast.lat, bounds._southWest.lat, bounds._northEast.lng, bounds._southWest.lng, false)
    console.log(bounds)
})

map.on('click', onMapClick)