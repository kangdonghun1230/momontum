const toDoForm = document.querySelector(".js-todoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];   //해당 array에 object 하나를 넣어준다.
let idNumbers = 1;

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    //delete li from ul
    toDoList.removeChild(li);
    //cleanToDos라는 새로운 array를 만들어낼 수 있다.
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    })
    //만들어진 cleanToDos로 localstorage의 content initialize
    toDos = cleanToDos;
    //saveToDos를 호출하면 새로운 toDos로 list가 새로 저장된다.
    saveToDos();
}

function saveToDos(){
    //javaScript는 localStorage에 모든 data를 string type으로 저장하려 한다.
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    //JSON.stringify : make all javascript variable type to string type
}

function paintToDo(text){
    //여태까지는 querySelector를 통해서 가져오는 역할을 했다면, 이번에는 생성하는 역할이다.
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = idNumbers++;

    delBtn.innerText = "❌";    //window + . : emoji
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    //li tag의 chlid tag로 아래 두 개의 tag 추가, span, div : 특별한 기능 X css와 함께 사용한다.
    li.appendChild(span);
    li.appendChild(delBtn);
    //at last append li to ul
    toDoList.appendChild(li);
    li.id = newId;
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    //먼저 array에 object를 push한 이후에 save 해줘야 한다.
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";   // 입력 후 비워주는 역할
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        //JSON : Javascript Object Notation
        const parsedToDos= JSON.parse(loadedToDos);
        //array에 담긴 것들에 대해 한번씩 함수를 실행시켜 주는 것
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
            //saveToDos를 실행하여 object에 같은 key를 갖는 element가
            //중복되어 등장할 것을 예상하였으나, key가 동일한 element가 복수개 존재할 수 없는 것 같다.
        });
    } // null -> do nothing
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}
init();

/*
filter : list에 있는 모든 item 중에 함수를 이용해 조건에 해당하는
element를 제외한 sub list를 만들어 주는 function이다.

forEach : list의 각 element에 대해서 argument로 들어오는 function을
한번 씩 실행해 주는 function이다.

JSON.parse : 이것을 이용해 localstorage에 저장된 string type data를
object type data로 재 변환할 수 있었다.
JSON.stringfy : 이것을 이용해 javascript의 data를 localstorage에
저장하기 위해 string type으로 변환할 수 있었다.
*/