const map = L.map("map"); // eslint-disable-line no-undef
const modal = document.querySelector(".modal");

const itinDetails = document.getElementById("itin-details");
const itinUrl = document.getElementById("itin-url");
const itinWikiId = document.getElementById("wiki_id");
const itinSummary = document.getElementById("itin-summary");
const itinLatitude = document.getElementById("latitude");
const itinLongitude = document.getElementById("longitude");
const itinSubmit = document.getElementById("itin-submit");
const itinStarttime = document.querySelector("#starttime");
const itinStoptime = document.querySelector("#stoptime");

flatpickr(itinStarttime, { enableTime: true }); // eslint-disable-line no-undef
flatpickr(itinStoptime, { enableTime: true }); // eslint-disable-line no-undef

async function showModal() {
  modal.classList.remove("hidden");
}

async function closeModal() {
  modal.classList.add("hidden");
}

function parseISOString(s) {
  let b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

async function createItin(id) { // eslint-disable-line no-unused-vars
  showModal();
  map.closePopup();
  const wikiresponse = await fetch(`/api/wiki-listings/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  let data = await wikiresponse.json();
  let keys = Object.keys(data);
  itinDetails.value = "";
  for (let key of keys) {
    if (
      data[key] !== null &&
      ![
        "id",
        "index",
        "latitude",
        "longitude",
        "wikidata",
        "image",
        "lastEdit",
        "alt",
        "title",
      ].includes(key)
    ) {
      if (key == "url") {
        itinUrl.innerHTML = `<a href="${data[key]}">${data["title"]}</a>`;
      }
      itinDetails.value = itinDetails.value + `${key}: ${data[key]}\n`;
    }
  }
  itinWikiId.innerText = data["id"];
  itinSummary.value = data["title"];
  itinDetails.value = itinDetails.value.trim();
  itinLatitude.innerText = data.latitude;
  itinLongitude.innerText = data.longitude;
}

async function deleteMarker(id, markerIndex) { // eslint-disable-line no-unused-vars
  if (Number(id)) {
    const response = await fetch(`/api/itin/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (response.status == 204) {
      map.removeLayer(markers[markerIndex]);
    }
  }
}

itinSubmit.addEventListener("click", async (e) => {
  e.preventDefault();
  let body = {
    starttime: String(itinStarttime.value),
    stoptime: String(itinStoptime.value),
    wiki_id: Number(itinWikiId.textContent),
    latitude: Number(itinLatitude.textContent),
    longitude: Number(itinLongitude.textContent),
    summary: itinSummary.value,
    details: itinDetails.value,
  };
  fetch(`/api/itin/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((res) => {
      if (res.status == 201) {
        closeModal();
      } else {
        alert("Not logged in.");
      }
    })
    .catch(() => {
      alert("Error submitting itinerary.");
    });
});

const viewBox = async (lat, lng, setMapView = true) => {
  try {
    if (setMapView) {
      let zoom = 13;
      map.setView([lat, lng], zoom);
    }
    let bounds = map.getBounds();
    let [north, south, east, west] = [
      bounds._northEast.lat,
      bounds._southWest.lat,
      bounds._northEast.lng,
      bounds._southWest.lng,
    ];
    const wikiresponse = await fetch(
      `/api/wiki-listings/bounds?south=${south}&north=${north}&west=${west}&east=${east}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      },
    );
    if (wikiresponse.ok) {
      const data = await wikiresponse.json();
      const itinresponse = await fetch(
        `/api/itin/bounds/?north=${north}&east=${east}&south=${south}&west=${west}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );
      for (let marker in markers) {
        map.removeLayer(markers[marker]);
      }
      if (itinresponse.ok) {
        const itins = await itinresponse.json();
        for (let row of itins) {
          let marker = L.marker([row.latitude, row.longitude]).addTo(map); // eslint-disable-line no-undef
          marker.bindPopup(
            `<h4>${row.summary}</h4><p>${
              row.details
            }</p><p>from ${parseISOString(
              row.starttime,
            )}</p><p>to  ${parseISOString(
              row.stoptime,
            )}</p><p><button type="button" class="btn btn-danger" onclick="javascript:deleteMarker(${
              row.id
            }, ${markers.length})">Delete</button></p>`,
          );
          markers.push(marker);
        }
      }
      for (let row of data) {
        let marker = L.marker([row.latitude, row.longitude]).addTo(map); // eslint-disable-line no-undef
        marker.bindPopup(
          `<h3>${row.title}</h3><p>${row.description}</p><p>${row.type}</p><p>${row.article}<p><button type="button" class="btn btn-primary" onclick="javascript:createItin(${row.id})">Create</button></p>`,
        );
        markers.push(marker);
      }
    }
  } catch (err) {
    console.error(err);
  }
};

map.on("moveend", () => {
  let params = new URLSearchParams(document.location.search.substring(1));
  let bounds = map.getBounds();
  let latitude =
    (Number(bounds._southWest.lat) + Number(bounds._northEast.lat)) / 2;
  let longitude =
    (Number(bounds._northEast.lng) + Number(bounds._southWest.lng)) / 2;
  params.set("lat", latitude);
  params.set("lng", longitude);
  history.replaceState(
    null,
    "",
    window.location.origin + window.location.pathname + "?" + params,
  );
  viewBox(latitude, longitude, false);
});

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { // eslint-disable-line no-undef
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

let params = new URLSearchParams(document.location.search.substring(1));
viewBox(params.get("lat"), params.get("lng"), true);

document.querySelector(".btn-close").addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

map.on("click", async (e) => {
  showModal();
  document.getElementById("itin-details").value = "";
  document.getElementById("latitude").innerText = e.latlng.lat;
  document.getElementById("longitude").innerText = e.latlng.lng;
});

const markers = [];
