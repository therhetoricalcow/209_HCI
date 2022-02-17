import NotesAPI from "./NotesAPI.js"//functions
import NotesView from "./NotesView.js"//rendering actions
import App from "./App.js"


///save class list
var classes = JSON.parse('["HCI", "VLSI", "Design"]')
localStorage.setItem("Classes", JSON.stringify(classes));
var class_array = ["HCI", "VLSI", "IOT Security"]

//check for example element "app" in HTML
const root = document.getElementById("app")
//intialize app
const app = new App(root)

// //Save button 
// document.getElementById("Save").onclick = function() {
//     this.onNoteEdit("now working", "operation");
// }


//remove all elements by classname
function removeElementsByClass(className){
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}



document.getElementById("ddbutton").onclick = function myFunction() {
    removeElementsByClass("fun")
    //add updated classes to dropdown selection
    for (var i = 0; i < class_array.length; i++) {
        var classbtn = document.createElement("a")
        classbtn.innerHTML = class_array[i]
        classbtn.id = class_array[i]
        classbtn.className = 'fun'
        classbtn.setAttribute("onclick", `classToSave("${class_array[i]}")`) 
        var someplace = document.getElementById('myDropdown')
        someplace.appendChild(classbtn)
    }

    //add default "None" or "Add class"
    var noneClass = document.createElement("a")
    noneClass.innerHTML = "None"
    noneClass.id = "None"
    noneClass.className = 'fun'
    noneClass.setAttribute("onclick", `classToSave("None")`) 
    var noneplace = document.getElementById('myDropdown')
    noneplace.appendChild(noneClass)
    //add default "Add class"
    var newClass = document.createElement("a")
    newClass.innerHTML = "Create New Class"
    newClass.id = "Create New Class"
    newClass.className = 'fun'
    newClass.setAttribute("onclick", `newerClass("${class_array[i]}")`) 
    var newplace = document.getElementById('myDropdown')
    newplace.appendChild(newClass)


    document.getElementById("myDropdown").classList.toggle("show");
    //change what shows on blue ID by pulling from local storage
    var elementToSave = localStorage.getItem('class_to_save');
    document.querySelector('#ddbutton').innerText = elementToSave;
  }
  // Close the dropdown menu if the user clicks outside of it
    window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
            }
        }
    }

    }
  
            
