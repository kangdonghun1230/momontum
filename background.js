const body = document.querySelector("body");

const IMG_NUMBER = 3;

function handleImageLoad(){
    console.log("finished loading");
}

function paintImage(imgNumber){
    //same as : const image = document.createElement("img");
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    // appendChild와 동일하게 자식요소로 추가되지만, 그 위치가 맨 앞에 추가되도록 한다.
    body.prepend(image);
}

function genRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();