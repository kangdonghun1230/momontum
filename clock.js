const clockContainer = document.querySelector(".js-clock"),
 clockTitle = clockContainer.querySelector("h1");

function getTime(){
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    //making clock in JavaScipt
    //we used conditional operator (mini if)
    clockTitle.innerText = `${
        hours < 10 ? `0${hours}` : hours
    }:${
        minutes < 10 ? `0${minutes}` : minutes
    }:${
        seconds < 10 ? `0${seconds}` : seconds
    }`;
    // hours, minutes, seconds -> ${hours}, ${minutes}, ${seconds} same expression
}


function init(){
    //we should solve problem with divide and conquer method
    getTime();
    //ms(milli second) 기준
    setInterval(getTime, 1000);
}
//execute init operation
init();

/*
setInterval(function, time to execute) get two arguments
*/