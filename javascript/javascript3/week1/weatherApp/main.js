let lat;
let long;
const status = document.querySelector('#status');
const mapLink = document.querySelector('#map-link');
const parCurrentTemp = document.querySelector('p.currentTmp')
const h2 = document.querySelector('h2');
const input = document.querySelector('input.city');
const icon = document.querySelector('section.icon');
const parDescription = document.querySelector('p.description')
function geoFindMe() {    
    mapLink.href = '';
    mapLink.textContent = ''; 
    if(input.value===''){
        h2.innerText = 'Please insert city!'
    }else{   
        function success() {        
            input.addEventListener('keyup',()=>{
                h2.innerText = 'Locating…';
                parCurrentTemp.innerHTML = '';
                icon.innerHTML = '';
                parDescription.innerHTML = '';
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
                        temp = Math.round(json.main.temp);
                        console.log(json);            
                        h2.innerText = `${city}`;
                        parCurrentTemp.innerHTML = temp + '°<span>C</span>';
                        weatherIcon = json.weather[0].icon;
                        icon.innerHTML = `<img src="icons/${weatherIcon}.png"/>`;
                        parDescription.innerHTML = json.weather[0].description;
                        console.log(temp);
                        console.log(weatherIcon);
                        console.log(json.weather[0].description);
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
        }
    };  
}  
document.querySelector('#find-me').addEventListener('click', geoFindMe); 
input.addEventListener('keyup',removeNotice);
function removeNotice(){
    h2.innerHTML = ''
  }; 
/*function initMap() {
    const location = {
        lat: 55.76,
        long: 12.58
    }
    const map = new google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: 8
    });
    const marker = new google.maps.Marker({
        position: location,
        map: map
    })
}*/  
// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

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
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
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
