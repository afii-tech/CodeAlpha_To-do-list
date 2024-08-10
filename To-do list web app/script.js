const taskinput = document.querySelector(".input-task input"),
filters = document.querySelectorAll(".filters span"),
deleteAll = document.querySelector(".dlt-btn"),
taskbox = document.querySelector(".task-box");


let editid;
let isEditedTask = false;
//getting localstorage todo list
let todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active"); 
        showTodo(btn.id);
    });    
});

function showTodo(filter){
    let li ="";
  if(todos) {
    todos.forEach((todo, id) => {
        let isCompleted = todo.status == "completed" ? "checked" : "";
        if(filter == todo.status || filter == "all"){
            li += `<li class="task">   
            <label for="${id}">   
                <input onclick="updateStatus(this)" type="checkbox" name="" id="${id}" ${isCompleted}>   
                <p class="${isCompleted}">${todo.name}</p>   
            </label>   
            <div class="setting">   
                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>   
                <ul class="task-menu">   
                    <li onclick="editTask(${id}, '${todo.name}')"><i class="uil uil-pen"></i>Edit</li>   
                    <li onclick="deleteTask(${id})"><i class="uil uil-trash"></i>Delete</li>   
                </ul>  
            </div>   
        </li>`;  
        }
    });
  }
taskbox.innerHTML = li || `<span>You don't have any task here</span>`;
}

showTodo("all");

function showMenu(selectedTask){
    //getting task menu div
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show");
    document.addEventListener("click", e =>{
        //removing show class from task menu on document click
        if(e.target.tagName != "I" || e.target != selectedTask){
            taskMenu.classList.remove("show");
        }
    });
   
}

function editTask(taskid, taskname){
    editid = taskid;
    isEditedTask = true;
    taskinput.value = taskname;
}

function deleteTask(deleteid){
    todos.splice(deleteid, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
}

deleteAll.addEventListener("click",() =>{
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
});


function updateStatus(selectedTask) {
    let taskname = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked){
        taskname.classList.add("checked");
        todos[selectedTask.id].status = "completed"
    } else{
        taskname.classList.remove("checked");
         todos[selectedTask.id].status = "pending"
    }

    localStorage.setItem("todo-list", JSON.stringify(todos));

}



taskinput.addEventListener("keyup", e =>{
    let usertask = taskinput.value.trim();
    if(e.key == "Enter" && usertask) {
        if(!isEditedTask){
            if(!todos) { // if todo is not exit pass an empty array to todo
                todos = [];
            }
            let taskinfo ={name: usertask, status:"pending"};
            todos.push(taskinfo); //add new task to todo
        } else {
            isEditedTask = false;
            todos[editid].name = usertask
        }
        taskinput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo("all");
    }
});
