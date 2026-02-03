const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", addTask);

document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    if (taskInput.value === "") {
        alert("Please enter a task");
        return;
    }

    createTask(taskInput.value, false);
    saveTasks();
    taskInput.value = "";
}

function createTask(text, completed) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = text;
    if (completed) span.classList.add("completed");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";

    span.addEventListener("click", () => {
        span.classList.toggle("completed");
        saveTasks();
    });

    deleteBtn.addEventListener("click", () => {
        li.remove();
        saveTasks();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.querySelector("span").classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => createTask(task.text, task.completed));
}
