const weather = document.querySelector(".js-weather");

const API_KEY = "226bbec4dc84d1ed19f0d5e602d3bcf3";
const COORDS = "coords";

//JavaScript는 가져온 data를 refresh 없이도 웹사이트에 적용시킬 수 있다.
async function getWeather(lat, lng){
    //units=metric querystring으로 섭씨온도로 가져올 수 있다.
    const postResponse = await fetch (
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    );
    //json을 통해 object 가져올 수 있다.
    const post = await postResponse.json();
    const temperature = post.main.temp;
    const place = post.name;
     weather.innerText = `${temperature} @ ${place}`;
    //.then을 활용해서 해당 function이 실행을 완료할 때 까지
    //대기할 수 있도록 구현할 수 있다.
}

//API는 다른 서버로부터 손쉽게 데이터를 가져올 수 있는 수단이다.
function saveCoords(coordsObj){
    //stringify datas to save at local storage
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    //we can get latitude and longitude from position
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    /*
    {
        latitude: latitude,
        longtitude: longtitude
    }와 같은 표현이다.
    */
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("Can't access geo location");
}

function askForCoords(){
    //window, document, navigator...
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }
    else{
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}
init();