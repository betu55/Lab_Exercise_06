
const taskInput = document.querySelector("#task");
const form = document.querySelector("#task-form");
const filter = document.querySelector("#filter");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");

// form.addEventListener('click', addNewTask);
form.addEventListener('submit', addNewTask);

function addNewTask(e){
    e.preventDefault();

    let newTask = {taskName: taskInput.value};
    
    let transaction = DB.transaction('tasks', 'readwrite');
    let objectStore = transaction.objectStore('tasks');

    let request = objectStore.add(newTask);

    request.onsucess = ()=>{
        form.reset();
    }

    transaction.oncomplete = ()=>{
        console.log("New task added.");
        displayTaskList();
    }

    transaction.onerror = ()=>{
        console.log("There was an error, please try again.");
    }
}

function displayTaskList(){
    while(taskList.firstChild){ taskList.removeChild(taskList.firstChild); }

    let objectStore = DB.transaction('tasks').objectStore('tasks');

    objectStore.openCursor().onsucess = function(e){
        let cursor = e.target.result;
        if(cursor){
            li.setAttribute('data-task-id', cursor.value.id);
        }
    }
}