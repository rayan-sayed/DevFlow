const addProjectBtn = document.querySelector("#addProjectBtn");
const projectsList = document.querySelector("#projectsList");
const projectFormContainer = document.querySelector("#projectFormContainer");

let projects = JSON.parse(localStorage.getItem("projects")) || [];

function saveProjects() {
    localStorage.setItem("projects", JSON.stringify(projects));
}

function renderProjects() {

    projectsList.innerHTML = "";

    projects.forEach(function (projectData, index) {

        const project = document.createElement("div");

        project.classList.add("project-card");

        project.innerHTML = `
            <h3>${projectData.name}</h3>
            <p>${projectData.description}</p>
            <span>${projectData.technologies}</span>
            <p class="project-status ${projectData.status.toLowerCase().replace(" ", "-")}">
                Status: ${projectData.status}
            </p>

            <button class="delete-project">Delete</button>
            <button class="edit-project">Edit</button>
        `;

        const deleteBtn = project.querySelector(".delete-project");
        const editBtn = project.querySelector(".edit-project");


        // EDIT PROJECT

        editBtn.addEventListener("click", function () {

            if (project.querySelector(".project-form")) {
                return;
            }

            const editForm = document.createElement("div");

            editForm.classList.add("project-form");


            const nameInput = document.createElement("input");

            nameInput.type = "text";
            nameInput.value = projectData.name;


            const descriptionInput = document.createElement("textarea");

            descriptionInput.value = projectData.description;


            const technologiesInput = document.createElement("input");

            technologiesInput.type = "text";
            technologiesInput.value = projectData.technologies;


            const statusInput = document.createElement("select");

            statusInput.innerHTML = `
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            `;

            statusInput.value = projectData.status;


            const saveEditBtn = document.createElement("button");

            saveEditBtn.textContent = "Save Changes";


            const cancelEditBtn = document.createElement("button");

            cancelEditBtn.textContent = "Cancel";


            editForm.appendChild(nameInput);
            editForm.appendChild(descriptionInput);
            editForm.appendChild(technologiesInput);
            editForm.appendChild(statusInput);
            editForm.appendChild(saveEditBtn);
            editForm.appendChild(cancelEditBtn);

            project.appendChild(editForm);


            // SAVE EDIT

            saveEditBtn.addEventListener("click", function () {

                const name = nameInput.value;
                const description = descriptionInput.value;
                const technologies = technologiesInput.value;
                const status = statusInput.value;


                if (
                    name.trim() === "" ||
                    description.trim() === "" ||
                    technologies.trim() === ""
                ) {
                    alert("Please fill in all fields");
                    return;
                }


                projects[index].name = name;
                projects[index].description = description;
                projects[index].technologies = technologies;
                projects[index].status = status;


                saveProjects();

                renderProjects();

            });


            // CANCEL EDIT

            cancelEditBtn.addEventListener("click", function () {

                editForm.remove();

            });

        });


        // DELETE PROJECT

        deleteBtn.addEventListener("click", function () {

            projects.splice(index, 1);

            saveProjects();

            renderProjects();

        });


        projectsList.appendChild(project);

    });
}


// ADD PROJECT

addProjectBtn.addEventListener("click", function () {

    if (projectFormContainer.querySelector(".project-form")) {
        return;
    }


    const projectForm = document.createElement("div");

    projectForm.classList.add("project-form");


    const nameInput = document.createElement("input");

    nameInput.type = "text";
    nameInput.placeholder = "Project name";


    const descriptionInput = document.createElement("textarea");

    descriptionInput.placeholder = "Project Description";


    const technologiesInput = document.createElement("input");

    technologiesInput.type = "text";
    technologiesInput.placeholder = "Technologies";


    const statusInput = document.createElement("select");

    statusInput.innerHTML = `
        <option value="Not Started">Not Started</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
    `;


    const saveProjectBtn = document.createElement("button");

    saveProjectBtn.textContent = "Save Project";


    const cancelProjectBtn = document.createElement("button");

    cancelProjectBtn.textContent = "Cancel";


    projectForm.appendChild(nameInput);
    projectForm.appendChild(descriptionInput);
    projectForm.appendChild(technologiesInput);
    projectForm.appendChild(statusInput);
    projectForm.appendChild(saveProjectBtn);
    projectForm.appendChild(cancelProjectBtn);


    projectFormContainer.appendChild(projectForm);


    // SAVE PROJECT

    saveProjectBtn.addEventListener("click", function () {

        const name = nameInput.value;
        const description = descriptionInput.value;
        const technologies = technologiesInput.value;
        const status = statusInput.value;


        if (
            name.trim() === "" ||
            description.trim() === "" ||
            technologies.trim() === ""
        ) {
            alert("Please fill in all fields");
            return;
        }


        const newProject = {
            name: name,
            description: description,
            technologies: technologies,
            status: status
        };


        projects.push(newProject);

        saveProjects();

        renderProjects();

        projectForm.remove();

    });


    // CANCEL ADD PROJECT

    cancelProjectBtn.addEventListener("click", function () {

        projectForm.remove();

    });

});


// LOAD PROJECTS

renderProjects();