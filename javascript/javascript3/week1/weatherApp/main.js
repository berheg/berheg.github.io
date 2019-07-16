//let lat;
//let long;

const status = document.querySelector('#status');
const mapLink = document.querySelector('#map-link');
const parCurrentTemp = document.querySelector('p.currentTmp');
const parSunrise = document.querySelector('p.sunrise');
const parSunset = document.querySelector('p.sunset');
const parWind = document.querySelector('p.wind');
const h2 = document.querySelector('h2');
const input = document.querySelector('input.city');
const icon = document.querySelector('section.icon');
const parDescription = document.querySelector('p.description');
const localSearchBtn = document.querySelector('#localSearchBtn');
const saveDataBtn = document.querySelector('#saveDataBtn');
const savedLocal = document.querySelector('#savedLocal');
let data = {};
//
function getCityWeather() {    
    mapLink.href = '';
    mapLink.textContent = ''; 
    if(!inputCcheck()){
    function success() {        
        input.addEventListener('keyup',()=>{
            h2.innerText = 'Locating…';
            parCurrentTemp.innerHTML = '';
            icon.innerHTML = '';
            parDescription.innerHTML = '';
            parSunrise.innerHTML = '';
            parSunset.innerHTML = '';
            parWind.innerHTML = '';
            savedLocal.innerHTML = '';
        });
        const city = input.value; 
        
        const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f1a35cc23798d7dcbfd21e71968ac4d6&units=metric`;
        fetch(api)
        .then(response => response.json())            
        .then(json =>{
            console.log(`${json}`);
            if(`${json.code}`=== undefined){
                h2.innerText = json.message;
            }            
            else{                
                data = json;              
                console.log(localStorage);
                temp = Math.round(json.main.temp);
                console.log(json);            
                h2.innerText = `${city}`;
                parCurrentTemp.innerHTML = temp + '°<span>C</span>';
                weatherIcon = json.weather[0].icon;
                icon.innerHTML = `<img src="icons/${weatherIcon}.png"/>`;
                parDescription.innerHTML = json.weather[0].description;
                
                parWind.innerHTML = "Wind:" + json.wind.speed + "m/s";
                parSunrise.innerHTML = "Sunrise:" +convertTime(json.sys.sunrise);
                parSunset.innerHTML = "Sunset:" + convertTime(json.sys.sunset);
                console.log(temp);
                console.log(weatherIcon);
                console.log(json.weather[0].description);
                //console.log(json.weather[0].wind.speed);
            }
            
        });
        
    } 
    function error() {
        status.textContent = 'Unable to retrieve your location';
    }
    
    if (!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
    } else {
    //status.textContent = 'Locating…';
    h2.innerText = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
    };
}  
};
   
document.querySelector('#find-me').addEventListener('click', getCityWeather); 
input.addEventListener('keyup',removeNotice);
localSearchBtn.addEventListener('click', ()=>{
    if(!inputCcheck){
        const i=localSearch(input.value);
        if(i===null){
            h2.innerText = 'City was not saved!';
        }else{
            displayWeatherFromLocal(i);
        }
        
    }
    
});
saveDataBtn.addEventListener('click',()=> saveDataLocal(data));

function localSearch(city){
    const fs = require('fs');
    if(!inputCcheck()){
        const data = fs.readFileSync('citiesWeather.json');
        const weatherData = JSON.parse(data);
        for(i=0; i < weatherData.cities.length;i++){
            if(weather.cities[i].name===city){
                return i 
            }
        }
        return null;
    }
    
}
function saveDataLocal(data){
    localStorage.setItem("city",JSON.stringify(data));
    savedLocal.innerHTML = 'Successfully Saved to Localstorage';
}
function removeNotice(){
    h2.innerHTML = ''
  }; 
function inputCcheck(){
    if(input.value===''){
        h2.innerText = 'Please insert city!'
        return true;
    }else
    return false;
}
function displayWeatherFromLocal(){
    console.log(localStorage);
    if(city.main.name = input.value){
        temp = Math.round(localStorage.getItem(city.temp));              
        h2.innerText = `${localStorage.getItem.name}`;
        parCurrentTemp.innerHTML = temp + '°<span>C</span>';
        weatherIcon = weatherData.cities[num].icon;
        icon.innerHTML = `<img src="icons/${weatherIcon}.png"/>`;
        parDescription.innerHTML = weatherData.cities[num].description;
    }else{
        h2.innerText = input.value + ' is not saved in localstorage! ';
        parCurrentTemp.innerHTML = '';
        icon.innerHTML = '';
        parDescription.innerHTML = '';
        parSunrise.innerHTML = '';
        parSunset.innerHTML = '';
        parWind.innerHTML = '';
    }
    
}
//convert seconds to local time
function convertTime(sec) {
    const time = new Date(sec * 1000);
    return time.toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit"
    });
  }

// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');
const windP = document.querySelector('#wind');
// App data
const weather = {};

weather.temperature = {
    unit : "celsius"
}

// APP CONSTS AND VARS
const KELVIN = 273;
// API KEY
const key = "82005d27a116c2880c8f0fcb866998a0";

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// SET USER'S POSITION
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
    const mymap = L.map('map').setView([latitude, longitude], 15);
    const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileUrl, { attribution });
    tiles.addTo(map);
    const marker = L.marker([lat, lon]).addTo(map);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude){ 
    const currentCity = document.querySelector('p.currentCity');   
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
            weather.wind = data.wind.speed;
            weather.sunrise = data.sys.sunrise;
            weather.sunset = data.sys.sunset;
            console.log(data);
            //console.log(weather);
        })
        .then(function(){
            displayWeather();
        });
}

// DISPLAY WEATHER TO UI
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
    windP.innerHTML = "Wind: " + weather.wind + "m/s"
    sunrise.innerHTML = "Sunrise:" + convertTime(weather.sunrise);
    sunset.innerHTML = "Sunset:" + convertTime (weather.sunset);
}

// C to F conversion
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});
