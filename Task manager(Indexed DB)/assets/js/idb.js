//to make it run on multiple web browsers
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDNKeyRange;

if(!window.indexedDB){
    alert("You'r browser doesn't support a stable version of indexedDB.")
}

else{
    //UI variables 
    const formm = document.querySelector('#task-form'); //The form at the top
    const taskInputt = document.querySelector('#task'); //the task input text field

    //read from q string 
    const urlParams = new URLSearchParams(window.location.search);
    const id = Number(urlParams.get('id'));
    //DB
    let DB;

    // Add Event Listener [on Load]
    document.addEventListener('DOMContentLoaded', () => {
        // create the database
        let TasksDB = indexedDB.open('tasks', 2);

        TasksDB.onupgradeneeded = function(e) {
            // the event will be the database
            let db = e.target.result;

            // create an object store, 
            // keypath is going to be the Indexes
            let objectStore = db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });

            // createindex: 1) field name 2) keypath 3) options
            objectStore.createIndex('taskname', 'taskname', { unique: false });

            console.log('Database ready and fields created!');
        }
        // if there's an error
        TasksDB.onerror = function() {
                console.log('There was an error');
            }
            // if everything is fine, assign the result to the instance
        TasksDB.onsuccess = function() {
            console.log('Database Ready');

            // save the result
            DB = TasksDB.result;

            // display the Task 
            displayTask();
        }


        function displayTask() {

            let tr = DB.transaction('tasks');
            let objectStore = tr.objectStore('tasks');
            let request = objectStore.get(id);

            request.onsuccess = function(event) {
                if (request.result) {
                    taskInputt.value = request.result.taskname;

                } else {
                    console.log('No data record');
                }
            };

            request.onerror = function(event) {
                console.log('Transaction failed');
            };



        }


        formm.addEventListener('submit', updateTask);

        function updateTask(e) {
            e.preventDefault();
            // Check empty entry
            if (taskInputt.value === '') {
                taskInputt.style.borderColor = "red";

                return;
            }

            /* 
            Instruction set to handle Update

            1. Declare the transaction and object store objects 
            2. Use the id on put method of indexedDB
            
            */
           
   
            history.back();
        }

    });
}