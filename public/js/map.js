var map = L.map('map')

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

const markers = []

const viewBox = async (lat, lng, setMapView = true) => {
    try {
    if (setMapView) {
        document.getElementById('itin-create').style.display = 'none'
        // let latitude = (Number(south) + Number(north)) / 2
        // let longitude = (Number(east) + Number(west)) / 2
        
        let zoom = 13
        // console.log(data)
        map.setView([lat, lng], zoom)
    }
    let bounds = map.getBounds()
    let [north, south, east, west] = [bounds._northEast.lat, bounds._southWest.lat, bounds._northEast.lng, bounds._southWest.lng]
    const wikiresponse = await fetch(`/api/wiki-listings/bounds?south=${south}&north=${north}&west=${west}&east=${east}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    //   console.log(wikiresponse)
      if (wikiresponse.ok) {
        const data = await wikiresponse.json()
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

                marker.bindPopup(`<h4>${row.summary}</h4><p>${row.details}</p><p>${row.starttime} - ${row.stoptime}</p><p><button type="button" class="btn btn-danger" onclick="javascript:deleteMarker(${row.id}, ${markers.length})">Delete</button></p>`)
                markers.push(marker)
            }    
        }
        for (let row of data) {
            let marker = L.marker([row.latitude, row.longitude]).addTo(map);
            // console.log(row)
            marker.bindPopup(`<h3>${row.title}</h3><p>${row.description}</p><p>${row.type}</p><p>${row.article}<p><button type="button" class="btn btn-primary" onclick="javascript:createItin(${row.id})">Create</button></p>`)
            // marker.bindPopup(`<h3>${row.title}</h3><p>${row.description}</p><p>type: ${row.type}article: ${row.article}</p>`)
            markers.push(marker)
        }
      }
    } catch (err) {
      console.error(err)
    }
  }
let params = new URLSearchParams(document.location.search.substring(1))
// console.log(params)
viewBox(params.get('lat'), params.get('lng'), true)

//   var popup = L.popup()
  
async function createItin(id) {
    let form = document.getElementById('itin-create')
    if (form.style.display === 'none') {
        form.style.display = 'block'
    }
    const wikiresponse = await fetch(`/api/wiki-listings/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    let data = await wikiresponse.json()
    let keys = Object.keys(data)
    let details = document.getElementById('itin-details')
    details.value = ''
    for (let key of keys) {
        if (data[key] !== null && !(['id', 'index', 'latitude', 'longitude', 'wikidata', 'image', 'lastEdit', 'alt', 'title'].includes(key))) {
            if (key == 'url') {
                document.getElementById('itin-url').innerHTML = `<a href="${data[key]}">${data['title']}</a>`
                // details.value = details.value + 
            } else {
                // console.log(details.value)
                details.value = details.value + `${key}: ${data[key]}\n`
            }
        }
    }
    document.getElementById('wiki_id').innerText = data['id']
    document.getElementById('itin-summary').innerText = data['title']
    details.value = details.value.trim()
    document.getElementById('latitude').innerText = data.latitude
    document.getElementById('longitude').innerText = data.longitude
}

document.getElementById('itin-submit').addEventListener("click", async (e)=>{
    e.preventDefault()
    let body = {
        wiki_id: Number(document.getElementById('wiki_id').textContent), 
        latitude: Number(document.getElementById('latitude').textContent), 
        longitude: Number(document.getElementById('longitude').textContent),
        summary: document.getElementById('itin-summary').textContent,
        details: document.getElementById('itin-details').value
    }
    console.log(body)
    const itinresponse = await fetch(`/api/itin/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body
    })
    console.log(itinresponse)
    // console.log('submitted')
})

async function deleteMarker(id, markerIndex) {
    if (Number(id)) {
        const response = await fetch(`/api/itin/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
        if (response.status == 204) {
            map.removeLayer(markers[markerIndex])
        }
    }
}

function onMapClick(e) {
    let form = document.getElementById('itinerary-create')
    if (form.style.display === 'none') {
        form.style.display = 'block'
    }
    document.getElementById('itin-details').value = ''
    document.getElementById('latitude').innerText = e.latlng.lat
    document.getElementById('longitude').innerText = e.latlng.lng
}

map.on('moveend', () => {
    document.getElementById('itinerary-create').style.display = 'none'
    let bounds = map.getBounds()
    let latitude = (Number(bounds._southWest.lat) + Number(bounds._northEast.lat)) / 2
    let longitude = (Number(bounds._northEast.lng) + Number(bounds._southWest.lng)) / 2
    params.set('lat', latitude)
    params.set('lng', longitude)
    history.replaceState(null, '', window.location.origin + window.location.pathname + '?' + params )
    viewBox(latitude, longitude, false)
})

map.on('click', onMapClick)
