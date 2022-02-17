export default class NotesAPI {
    static getAllNotes() {
        //check local storage for existing notes
        const notes = JSON.parse(localStorage.getItem("EasyNote-notes") || "[]");
        //if not existing notes return nothing
        //sort by date of most recently added
        return notes.sort((a,b) => {
            return new Date(a.timestamp) > new Date(b.timestamp) ? -1:1;
        })
        
    }
    static saveNote(noteToSave){
        //get exisitng notes, put in var notes
        const notes = NotesAPI.getAllNotes();
        //check if the note has an existing ID
        const existing = notes.find(note => note.id == noteToSave.id);

        //Updating exisitng
        if (existing) {
            existing.title= noteToSave.title;
            existing.body = noteToSave.body;
            existing.timestamp =  new Date().toISOString()
        }//new note
        else{
            //give note random id
            noteToSave.id = Math.floor(Math.random() * 1000000)
            //add timestamp
            noteToSave.timestamp = new Date().toISOString();
            //if note to save is not existing id, add to "notes" var which is list of current notes
            notes.push(noteToSave)
        }
        //put all of notes in local storage JSON file
        
        localStorage.setItem("EasyNote-notes", JSON.stringify(notes)); 
    }
    static deleteNote(id){
        const notes = NotesAPI.getAllNotes();
        //filter out/delete note with set id
        const newNotes = notes.filter(note => note.id !=  id);
        //store new note list into JSON local storage
        localStorage.setItem("EasyNote-notes", JSON.stringify(newNotes));
    }
}

/*
export default class NotesAPI {
    static getAllNotes() {
        const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");

        return notes.sort((a, b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        });
    }

    static saveNote(noteToSave) {
        const notes = NotesAPI.getAllNotes();
        const existing = notes.find(note => note.id == noteToSave.id);

        // Edit/Update
        if (existing) {
            existing.title = noteToSave.title;
            existing.body = noteToSave.body;
            existing.updated = new Date().toISOString();
        } else {
            noteToSave.id = Math.floor(Math.random() * 1000000);
            noteToSave.updated = new Date().toISOString();
            notes.push(noteToSave);
        }

        localStorage.setItem("notesapp-notes", JSON.stringify(notes));
    }

    static deleteNote(id) {
        const notes = NotesAPI.getAllNotes();
        const newNotes = notes.filter(note => note.id != id);

        localStorage.setItem("notesapp-notes", JSON.stringify(newNotes));
    }
}
*/