const addBtn = document.querySelector("#addBtn");
const main = document.querySelector("#main");

const saveNotes = () => {
    const notes = document.querySelectorAll(".note textarea");
    const data = [];
    notes.forEach(
        (notes) => {
            data.push(notes.value)
        }
    )
    if (data.length === 0) {
        localStorage.removeItem("notes");
    }
    else
        localStorage.setItem("notes", JSON.stringify(data))
}
addBtn.addEventListener('click', function () {
    addNote();
})

const addNote = (text = "") => {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
        <div class="tool">
            <i class="save fa-regular fa-floppy-disk"></i>
            <i class="trash fa-solid fa-trash"></i>
        </div>
        <textarea>${text}</textarea>
    `
    note.querySelector(".trash").addEventListener('click', () => {
        note.remove();
        saveNotes();
    })
    note.querySelector(".save").addEventListener('click', () => {
        saveNotes();
    })

    main.appendChild(note);
    saveNotes();
}
(
    function () {
        const lsNotes = JSON.parse(localStorage.getItem("notes"));
        lsNotes.forEach(
            (lsNotes) => {
                addNote(lsNotes);
            }
        )
        if (lsNotes.length === 0) {
            localStorage.removeItem("notes");
        }
        else {
            addNote();
        }
    }
)()