const weather = document.querySelector(".weather");
const weatherIcon = document.querySelector(".weathericon")
const weatherTemp = document.querySelector(".temp")

const API_KEY = "dcfb59c9b9f1d58d80a995023bd9aa3f";
const COORDS = "coords";

function getWeather(latitude, longitude){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric` //가져올 데이터 주소
    )
    .then(function(response){ //기다리고
       return response.json();
    })
    .then(function(json){ //한번 더 풀어줌
        const temperature = json.main.temp;
        const sky = json.weather[0];
        weatherIcon.src = `https://openweathermap.org/img/wn/${sky.icon}.png`;
        weather.innerText = `Today is ${sky.main}`
        weatherTemp.innerText  = `${parseInt(temperature)}º`
        console.log(json);
    });
} 
function saveCoords(coordsObject){
    localStorage.setItem(COORDS, JSON.stringify(coordsObject));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObject = {
        latitude, 
        longitude 
    };
    console.log(coordsObject);
    saveCoords(coordsObject);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log('cant access geo location');
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();