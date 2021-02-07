function addToDatabase(newTask) {
    let listofTasks;
    
    if (localStorage.getItem('tasks') == null){
        listofTasks = [];
    } 
    else {
        listofTasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    listofTasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(listofTasks));
}

function loadfromDB() {
    let listofTasks;
    
    if (localStorage.getItem('tasks') == null) {
        listofTasks = [];
    } 
    else {
        listofTasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return listofTasks;
}

function clearAllTasksFromDB(){
    localStorage.clear();
}

function removeFromDB(taskItem){
    let listOfTasks;
    if (localStorage.getItem('tasks') == null){
        listOfTasks = [];
    }
    else{
        listOfTasks = JSON.parse(localStorage.getItem('tasks'));
    }
    listOfTasks.forEach(function (task, index){
        if(taskItem.textContent.trim() === task.trim()){
            listOfTasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(listOfTasks));
}