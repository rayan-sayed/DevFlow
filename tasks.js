const taskInput = document.querySelector("#taskInput");
const addtaskBtn = document.querySelector("#addtaskBtn");
const tasksList = document.querySelector("#tasksList");


// Get saved tasks from Local Storage

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Render Tasks

function renderTasks() {

    tasksList.innerHTML = "";

    tasks.forEach(function (taskData, index) {

        const task = document.createElement("div");

        task.classList.add("task-card");

        if (taskData.completed) {
            task.classList.add("completed");
        }

        task.innerHTML = `
            <h3>${taskData.text}</h3>

            <p>
                Status: ${taskData.completed ? "Completed" : "Pending"}
            </p>

            <div class="task-actions">
                <button class="complete-task">
                    ${taskData.completed ? "Mark as Pending" : "Complete"}
                </button>

                <button class="delete-task">
                    Delete
                </button>
            </div>
        `;


        // Complete / Mark as Pending

        const completeBtn = task.querySelector(".complete-task");

        completeBtn.addEventListener("click", function () {

            taskData.completed = !taskData.completed;

            localStorage.setItem("tasks", JSON.stringify(tasks));

            renderTasks();

        });


        // Delete Task

        const deleteBtn = task.querySelector(".delete-task");

        deleteBtn.addEventListener("click", function () {

            tasks.splice(index, 1);

            localStorage.setItem("tasks", JSON.stringify(tasks));

            renderTasks();

        });


        tasksList.appendChild(task);

    });
}


// Add Task

addtaskBtn.addEventListener("click", function () {

    const taskText = taskInput.value;

    if (taskText.trim() === "") {
        return;
    }

    const newTask = {
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";

    renderTasks();

});


// Display saved tasks when page loads

renderTasks();


//---------------------------------------------------------//

