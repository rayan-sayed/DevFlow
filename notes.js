const noteTitle = document.querySelector(".add-notes input");
const noteContent = document.querySelector(".add-notes textarea");
const saveNoteBtn = document.querySelector(".add-notes button");
const notesList = document.querySelector(".notes-list");

let notes = JSON.parse(localStorage.getItem("notes")) || [];


// Save Note
saveNoteBtn.addEventListener("click", function () {

    const title = noteTitle.value.trim();
    const content = noteContent.value.trim();

    if (title === "" || content === "") {
        alert("Please enter a title and a note.");
        return;
    }

    const newNote = {
        title: title,
        content: content,
        date: new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
        })
    };

    notes.push(newNote);

    localStorage.setItem("notes", JSON.stringify(notes));

    noteTitle.value = "";
    noteContent.value = "";

    renderNotes();
});


// Display Notes
function renderNotes() {

    notesList.innerHTML = "";

    notes.forEach(function (note, index) {

        const noteCard = document.createElement("div");
        noteCard.classList.add("notes-card");

            noteCard.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <span>${note.date}</span>

            <div class="note-buttons">
                <button class="edit-note" data-index="${index}">Edit</button>
                <button class="delete-note" data-index="${index}">Delete</button>
            </div>
        `;

        notesList.appendChild(noteCard);
    });


    // Delete buttons
    const deleteButtons = document.querySelectorAll(".delete-note");

    deleteButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const index = button.dataset.index;

            notes.splice(index, 1);

            localStorage.setItem("notes", JSON.stringify(notes));

            renderNotes();
        });
    });


    // Edit buttons
    const editButtons = document.querySelectorAll(".edit-note");

    editButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const index = button.dataset.index;

            noteTitle.value = notes[index].title;
            noteContent.value = notes[index].content;

            notes.splice(index, 1);

            localStorage.setItem("notes", JSON.stringify(notes));

            renderNotes();
        });
    });
}

renderNotes();