const welcome = document.querySelector(".welcome"),
    nameForm = document.querySelector(".name"),
    nameInput = nameForm.querySelector("input"),
    todoForm = document.querySelector(".todos"),
    todoInput = todoForm.querySelector("input"),
    todoList = document.querySelector(".todolist"),
    time = document.querySelector(".time"),
    resetBtn = todoList.querySelector(".resetbtn");

const USER_LS = "username";
const TODOS_LS = "todos";
const HIDDEN = "hidden";

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        getName();
    }else{
        paintGreet(currentUser);
    }
}
function getName(){
    time.classList.add(HIDDEN);
    todoForm.classList.add(HIDDEN);
    todoList.classList.add(HIDDEN);
    nameForm.addEventListener("submit", handleSubmit);
}

function handleSubmit(e){
    e.preventDefault();
    const name = nameInput.value;
    saveName(name);
    paintGreet(name);
}

function paintGreet(text){
    nameForm.classList.add(HIDDEN);
    todoForm.classList.remove(HIDDEN);
    time.classList.remove(HIDDEN);
    welcome.innerText = `Welcome, ${text}`;
    welcome.style.fontSize = "28px";
}

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

let todos = [];

function todoHandle(e){
    e.preventDefault();
    const currentValue = todoInput.value;
    paintTodos(currentValue);
    todoInput.value = "";
}

function loadTodos(){
    const loadedTodos = localStorage.getItem(TODOS_LS);
    if(loadedTodos !== null){
        const parsedToDos = JSON.parse(loadedTodos);
        parsedToDos.forEach(function(todo){
            paintTodos(todo.txt);
        });
    }
    if(todos.length == 0){
        resetBtn.classList.add(HIDDEN);
    }
}

let idNumbers = 1;

function paintTodos(text){
    const newId = idNumbers;
    idNumbers += 1;

    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");

    span.innerHTML = `${newId}. ${text}`;
    delBtn.innerHTML = "X";
    delBtn.addEventListener("click", deleteTodo);
    delBtn.classList.add("delbtn");
    
    li.appendChild(span); 
    li.appendChild(delBtn); 
    li.id = newId;
    todoList.insertBefore(li, resetBtn);
    resetBtn.classList.remove(HIDDEN);
    
    const todoObj = {
        txt: text,
        id: newId
    }
    todos.push(todoObj);
    saveTodo(); 
}

function deleteTodo(){
    const deleteLi = event.target.parentNode;
    todoList.removeChild(deleteLi);
    const cleanToDos = todos.filter(function(todo){
        return todo.id !== parseInt(deleteLi.id);
   });
   todos = cleanToDos;
   saveTodo();
}

function saveTodo(){
    localStorage.setItem(TODOS_LS, JSON.stringify(todos));
}

function resetTodo(e){
    e.preventDefault();
    const allList = todoList.querySelectorAll("li");
    allList.forEach(li => todoList.removeChild(li));
    todos = [];
    saveTodo();
    resetBtn.classList.add(HIDDEN);
}

function init(){
    loadName();
    loadTodos();
    todoForm.addEventListener("submit", todoHandle);
    resetBtn.addEventListener("click", resetTodo);
}

init();