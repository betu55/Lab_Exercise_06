
const taskInput = document.querySelector("#task");
const form = document.querySelector("#task-form");
const filter = document.querySelector("#filter");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const sortIt = document.querySelector(".browser-default");
const reloadIcon = document.querySelector('.fa');
let isSorted = true;

reloadIcon.addEventListener('click', ()=>{
    location.reload();
});

document.addEventListener('DOMContentLoaded', () => {
    let TasksDB = indexedDB.open('tasks', 2);

    // if there's an error
    TasksDB.onerror = function() {
            console.log('There was an error');
        }
        // if everything is fine, assign the result to the instance
    TasksDB.onsuccess = function() {
        // console.log('Database Ready');

        // save the result
        DB = TasksDB.result;

        // display the Task List 
        displayTaskList();
    }

    // This method runs once (great for creating the schema)
    TasksDB.onupgradeneeded = function(e) {
        // the event will be the database
        let db = e.target.result;

        // create an object store, 
        // keypath is going to be the Indexes
        let objectStore = db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });

        // createindex: 1) field name 2) keypath 3) options
        objectStore.createIndex('taskname', 'taskname', { unique: false });
        objectStore.createIndex('date', 'date', { unique: false });

        console.log('Database ready and fields created!');
    }
});

function addNewTask(e){
    
    e.preventDefault();
    // Check empty entry
    if (taskInput.value === '') {
        taskInput.style.borderColor = "red";

        return;
    }

    // create a new object with the form info
    let newTask = {
        taskname: taskInput.value,
        date: new Date().getTime()
    };

    // Insert the object into the database 
    let transaction = DB.transaction(['tasks'], 'readwrite');
    let objectStore = transaction.objectStore('tasks');

    let request = objectStore.add(newTask);

    // on success
    request.onsuccess = () => {
        form.reset();
    }
    transaction.oncomplete = () => {
        console.log('New appointment added');

        displayTaskList();
    }
    transaction.onerror = () => {
        console.log('There was an error, try again!');
    }
    
}
// form.addEventListener('click', addNewTask);
form.addEventListener('submit', addNewTask);

sortIt.addEventListener('change', srt);

function srt(e){
    isSorted = !isSorted;
    displayTaskList(e);
}
function displayTaskList(e){
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // create the object store
    let objectStore = DB.transaction('tasks').objectStore('tasks');
    let p1;
    let p2;

    if(isSorted == true){
        p1 = null;
        p2 = 'next';
    }
    else{
        p1 = null;
        p2 = 'prev';
    }

    objectStore.openCursor(p1,p2).onsuccess = function(e) {
        // assign the current cursor
        let cursor = e.target.result;

        if (cursor) {

            // Create an li element when the user adds a task 
            const li = document.createElement('li');
            //add Attribute for delete 
            li.setAttribute('data-task-id', cursor.value.id);
            // Adding a class
            li.className = 'collection-item';
            li.value = cursor.value.date;
            // Create text node and append it 
            li.appendChild(document.createTextNode(cursor.value.taskname));
            // Create new element for the link 
            const link = document.createElement('a');
            // Add class and the x marker for a 
            link.className = 'delete-item secondary-content';
            link.innerHTML = ` 
            <i class="fas fa-trash-alt"></i>
            &nbsp;
            <a href="edit.html?id=${cursor.value.id}"><i class="fa fa-edit"></i> </a>
            `;
            // Append link to li
            li.appendChild(link);
            // Append to UL 
            taskList.appendChild(li);
            cursor.continue();
        }
    }
    
}

taskList.addEventListener('click', removeTask);

function removeTask(e) {

    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are You Sure about that ?')) {
            // get the task id
            let taskID = Number(e.target.parentElement.parentElement.getAttribute('data-task-id'));
            // use a transaction
            let transaction = DB.transaction(['tasks'], 'readwrite');
            let objectStore = transaction.objectStore('tasks');
            objectStore.delete(taskID);

            transaction.oncomplete = () => {
                e.target.parentElement.parentElement.remove();
            }

        }

    }

}

clearBtn.addEventListener('click', clearTasks);

function clearTasks(){
    var tx = DB.transaction(['tasks'], 'readwrite');
    var objSt = tx.objectStore('tasks');
    objSt.clear();

    displayTaskList();
}

filter.addEventListener('keyup', filterTasks);

function filterTasks(e) {
    let keyWord = filter.value;
    let taskValues = document.querySelectorAll(".collection-item");

    taskValues.forEach(elt => {
        if(elt.textContent.indexOf(keyWord)){
            elt.style.display = "none";
        }
        else{
            elt.style.display = "block";
        }
    });
}
