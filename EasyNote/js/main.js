import NotesAPI from "./NotesAPI.js"

NotesAPI.savenote({
    id:  828588, 
    title : "New Note",
    body: "I am a new Note"
});

console.log(NotesAPI.getAllNotes())