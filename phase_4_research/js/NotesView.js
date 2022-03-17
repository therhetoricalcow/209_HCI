export default class NotesView {
    //how to render view for different functions, check when moved out of field to display update
    constructor(root, {onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete} = {}) {
        this.root = root;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;
        //render HTML sidebar with note every time

        this.root.innerHTML = `
            <div class="notes__sidebar">
                <div class = "logo">EasyNote</div>
                <button class="notes__add" type = 'button'>Add Note</button>
                <button onclick="location.href = './calender.html'" class="calender" type = 'button' >Calender</button>
                <button onclick="location.href = './study.html'" class="study" type = 'button' >Study</button>
                <div class="notes__list">
                 
                </div>
            </div>
            <div class="notes__preview">
                <div class = "notes_bar">
                    <div class="dropdown">
                        <button id = "ddbutton" class="dropbtn">Class: General Notes</button>
                        <div id="myDropdown" class="dropdown-content">
                            
                        </div>
                    </div>    
                    <button id="Save" class="save_btn" type="submit" value="Save" onclick="save()">Save</button>
                    <button id="Delete" class="delete_btn" type="submit" value="Delete" onclick="deletenote()">Delete</button>
                    <span class = "right">
                        <input type="text"  value = "<insert classname>" class = "submit_class_field" id = "submit_field"
                        onfocus="if ( this.value == this.defaultValue || this.value == '' ) { this.value = ''; this.className = 'submit_class_field';}" 
                        onblur="if ( this.value == '' ) { this.value = this.defaultValue; this.className='watermark';}">
                        <input type="submit" id = "add_class_button" value = "Add Class" class = "add_class_button" onclick="addClass();">
                    </span>   
                </div>
                <div>
                    <input class="notes__title" type="text" placeholder="New Note...">      
                </div>
                <textarea class="notes__body">Take Note...</textarea>
            </div>
        `;
        //find add  note button, input title, and input body by class using querySelector
        //grab html fields above
        const btnAddNote = this.root.querySelector(".notes__add");
        const inpTitle = this.root.querySelector(".notes__title");
        const inpBody = this.root.querySelector(".notes__body");
        
        btnAddNote.addEventListener("click", () => {
            this.onNoteAdd();
        });


        //Grab each input field
        [inpTitle, inpBody].forEach(inputField => {
            //look for when user exits input field or  ("blur")
            inputField.addEventListener("blur", () => {
                //trim above html fields for 
                const updatedTitle = inpTitle.value.trim();
                const updatedBody = inpBody.value.trim();
                this.onNoteEdit(updatedTitle, updatedBody);
            });
        });

       

        this.updateNotePreviewVisibility(false);
    }

    //add new HTML, pass in id, title, body, time
    _createListItemHTML(id, title, body, timestamp, classname) {
        //max length of preview body length
        const MAX_BODY_LENGTH = 60;
        //add html for note body etc, if note has more than 50 characters delete end and add ...
        var color_save = find_class_color(classname)
        if (classname == "General Notes"){
            color_save = "grey"
        }
        //console.log(`title ${title} classname ${classname} color ${color_save} active classname ${current_class}`)
        //var current_class = localStorage.getItem("current-class")

        return `
            <div class="notes__list-item" data-note-id="${id}" id = "${id}">
            <div class="notes__small-classname-${color_save}" id = "color-${id}"> ${classname}</div>    
            <div class="notes__small-title">Title: ${title}</div>
                <div class="notes__small-body">
                    ${body.substring(0, MAX_BODY_LENGTH)}
                    ${body.length > MAX_BODY_LENGTH ? "..." : ""}
                </div>
                <div class="notes__small-updated">
                    ${timestamp.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}
                </div>
            </div>
        `;
         
    }
    
    //check which notes updating from list, delete or open
    updateNoteList(notes) {
        const notesListContainer = this.root.querySelector(".notes__list");

        // Empty list
        notesListContainer.innerHTML = "";

        for (const note of notes) {
            //check through local storage and creat HTML
            const html = this._createListItemHTML(note.id, note.title, note.body, new Date(note.timestamp), note.classname);
            //save in order ("beforeend")
            notesListContainer.insertAdjacentHTML("beforeend", html);
        }

        // Add select/delete events for each list item
        notesListContainer.querySelectorAll(".notes__list-item").forEach(noteListItem => {
            noteListItem.addEventListener("click", () => {
                //check id of note selected
                this.onNoteSelect(noteListItem.dataset.noteId);
            });

            noteListItem.addEventListener("dblclick", () => {
                const doDelete = confirm("Are you sure you want to delete this note?");

                if (doDelete) {
                    this.onNoteDelete(noteListItem.dataset.noteId);
                }
            });
        });
    }

    updateActiveNote(note) {
        this.root.querySelector(".notes__title").value = note.title;
        this.root.querySelector(".notes__body").value = note.body;
        //unselected color for selected notes
        this.root.querySelectorAll(".notes__list-item").forEach(noteListItem => {
            noteListItem.classList.remove("notes__list-item--selected");
        });
        //pass through id of note that is selected
        this.root.querySelector(`.notes__list-item[data-note-id="${note.id}"]`).classList.add("notes__list-item--selected");
        //set current note
        localStorage.setItem("Current-note-id", [note.id])
        localStorage.setItem("current-class", [note.classname])
        classToSave(note.classname)
    }

    //when new note update whats shown
    updateNotePreviewVisibility(visible) {
        this.root.querySelector(".notes__preview").style.visibility = visible ? "visible" : "hidden";
    }
}
