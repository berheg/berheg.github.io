//Promise that resolves after  resolveAfter seconds
const div = document.querySelector('div.logOutContainer');
function setTimeoutPromise(resolveAfter){
    return new Promise(resolve => {
        setTimeout(() => { 
          const p = document.createElement('p');
          resolve(p.innerHTML = `I am called asynchronously after ${resolveAfter} seconds`,
            console.log((`I am called asynchronously after ${resolveAfter} seconds`)));
            div.appendChild(p);
    },resolveAfter*1000)        
    }),reject => reject(console.error(err));
};
setTimeoutPromise(3);
setTimeoutPromise(6);
//getCurrentLocation as promise
function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const currentLocation = {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude
        };
        resolve(currentLocation);
      },
      err => {
        error = {
          code: err.code,
          message: err.message
        };
        reject(error.message);
      }
    );
  });
}
//getCurrentLocation as promise function
getCurrentLocation()
  .then(position => {
    // called when the users position is found    
    console.log(position);
    //leaflet as map style and given latitude and longitude properties
    const mymap = L.map('mymap').setView([position.latitude, position.longitude], 15);
    const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileUrl, { attribution });
    tiles.addTo(mymap);
    const marker = L.marker([position.latitude, position.longitude]).addTo(mymap);
  })
  .catch(error => {
    // called if there was an error getting the users location
    const p = document.createElement('p');
    p.innerHTML = error + '\n\n refresh the page and allow to see the location';
    document.body.appendChild(p);
    console.log(error);
  });