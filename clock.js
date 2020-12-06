const today = document.querySelector(".date")
const clock = document.querySelector(".clock");
//
function getDate(){
    const date = new Date();
    const dd = date.getDate();
    const mm = date.getMonth()+1;
    const week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
    const day = week[date.getDay()];
    
    today.innerText = `${
        mm < 10 ? `0${mm}`: mm}.${
        dd< 10 ? `0${dd}` : dd} ${
        day}`
}

function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clock.innerText = `${
        hours < 10 ? `0${hours}`:hours}:${
        minutes < 10 ? `0${minutes}`:minutes}:${
        seconds < 10 ? `0${seconds}`:seconds }`;
}
function init(){
    getDate();
    getTime();
    setInterval(getTime, 1000);
}
init();