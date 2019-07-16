//getCurrentLocation as async wait
async function getCurrentLocation() {
  try {
      await navigator.geolocation.getCurrentPosition(position => {
      lat = position.coords.latitude;
      lon = position.coords.longitude;        
    
    console.log(lat, lon);
    document.getElementById('latitude').textContent = lat;
    document.getElementById('longitude').textContent = lon;
    const mymap = L.map('mymap').setView([lat, lon], 15);
    const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileUrl, { attribution });
    tiles.addTo(mymap);
    const marker = L.marker([lat, lon]).addTo(mymap);
    });
  }catch(err) {          
      console.log(err)
    }    
} 
getCurrentLocation();
   