const statusButtons = document.querySelectorAll(".status-btn");


function saveRoadmap() {

    const roadmapData = [];

    statusButtons.forEach(function(button) {

        roadmapData.push({
            text: button.parentElement.querySelector("span").textContent,
            status: button.textContent
        });

    });

    localStorage.setItem("roadmap", JSON.stringify(roadmapData));
}


function loadRoadmap() {

    const savedRoadmap = JSON.parse(localStorage.getItem("roadmap"));

    if (!savedRoadmap) {
        return;
    }

    statusButtons.forEach(function(button, index) {

        button.textContent = savedRoadmap[index].status;

        if (savedRoadmap[index].status === "Pending") {

            button.className = "status-btn not-started";

        }

        else if (savedRoadmap[index].status === "In Progress") {

            button.className = "status-btn progress";

        }

        else {

            button.className = "status-btn completed";

        }

    });
}



statusButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        if (button.textContent === "Pending") {

            button.textContent = "In Progress";
            button.className = "status-btn progress";

        }

        else if (button.textContent === "In Progress") {

            button.textContent = "Completed";
            button.className = "status-btn completed";

        }

        else {

            button.textContent = "Pending";
            button.className = "status-btn not-started";

        }

        saveRoadmap();

    });

});


loadRoadmap();