const form = document.querySelector(".js-form"),
 input = form.querySelector("input"),
 greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    //default -> disappear
    event.preventDefault(); //pervent default 를 사용하면 사라지지 않는다.
    const currentValue = input.value;   //value element : 입력값
    paintGreeting(currentValue);    //paint on website
    saveName(currentValue);         //save data to local storage
}

function askForName(){
    // form tag -> display : block
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName();
    }else{
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}
init();
//local storage is stored in browser
//we use local storage to store small data to use javascript