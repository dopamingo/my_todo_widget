const bg = document.querySelector(".bg");

const IMG_NUMBER = 5;

function paintImage(imgNumber){
    const url = `url(images/${imgNumber+1}.jpg)`;
    bg.style.backgroundImage = url;
}

function genRandom(){
    return Math.floor(Math.random() * IMG_NUMBER);
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();