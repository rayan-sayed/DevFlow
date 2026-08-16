//statistics card JS

const totalProjects = document.querySelector("#totalProjects");
const totalTasks = document.querySelector("#totalTasks");
const learningProgress = document.querySelector("#learningProgress");

const projects = JSON.parse(localStorage.getItem("projects")) || [];
totalProjects.textContent = projects.length;

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
totalTasks.textContent = tasks.length;

const roadmap = JSON.parse(localStorage.getItem("roadmap")) || [];

const completedItems = roadmap.filter(function(item){
    return item.status === "Completed";
});

let progress = 0;

if(roadmap.length > 0){
    progress = Math.round((completedItems.length / roadmap.length) * 100);
}

learningProgress.textContent = progress + "%";


//Recent Projects Js

const recentProjects = document.querySelector("#recentProjects");
const recentProjectsSection = document.querySelector("#recentProjectsSection");

projects.slice(-3).forEach(function(project){
    
    const projectCard = document.createElement("div");
    projectCard.className = "project-card";

    projectCard.innerHTML = `
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <span>${project.technologies}</span>
    `;

    recentProjects.appendChild(projectCard);
});

if(projects.length === 0){
    recentProjectsSection.style.display = "none";
}


//Today tasks Js

const todayTasks = document.querySelector("#todayTasks");
const todayTasksSection = document.querySelector("#todayTasksSection");

tasks.slice(-3).forEach(function(task){

    const taskCard = document.createElement("div");
    taskCard.className = "task-card";

    taskCard.innerHTML = `
        <h3>${task.text}</h3>
        <p>Status: ${task.completed ? "Completed" : "Pending"}</p>
    `;

    todayTasks.appendChild(taskCard);
});

if(tasks.length === 0){
    todayTasksSection.style.display = "none";
}


//Start Learning Button Js

const startLearning = document.querySelector("#startLearning");

startLearning.addEventListener("click", function(){
    window.location.href = "roadmap.html";
});