
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
    progress = Math.round((completedItems.length / roadmap.length)*100);

}

learningProgress.textContent = progress + "%";

