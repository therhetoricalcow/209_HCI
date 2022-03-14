import NotesAPI from "./NotesAPI.js"//functions
import NotesView from "./NotesView.js"//rendering actions
import App from "./App.js"


///save class list
//var classes = ["HCI", "VLSI", "IOT Security"]
//localStorage.setItem("classes", JSON.stringify(classes));
//var class_array = JSON.parse(localStorage.getItem("classes"));

//class color list


//check for example element "app" in HTML
const root = document.getElementById("app")
//intialize app
const app = new App(root)

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
    var class_array = JSON.parse(localStorage.getItem("classes"))
    if (class_array != null)      
        for (var i = 0; i < class_array.length; i++) {
            var classbtn = document.createElement("a")
            classbtn.innerHTML = class_array[i]
            classbtn.id = class_array[i]
            classbtn.className = 'fun'
            classbtn.setAttribute("onclick", `classToSave("${class_array[i]}")`) 
            var someplace = document.getElementById('myDropdown')
            someplace.appendChild(classbtn)
        }

    //add default "General Notes" or "Add class"
    var GeneralNotesClass = document.createElement("a")
    GeneralNotesClass.innerHTML = "General Notes"
    GeneralNotesClass.id = "General Notes"
    GeneralNotesClass.className = 'fun'
    GeneralNotesClass.setAttribute("onclick", `classToSave("General Notes")`) 
    var GeneralNotesplace = document.getElementById('myDropdown')
    GeneralNotesplace.appendChild(GeneralNotesClass)

    //add default "Delete Class"
    var delClass = document.createElement("a")
    delClass.innerHTML = "Delete Current Class"
    delClass.id = "Delete_class"
    delClass.className = 'fun'
    delClass.setAttribute("onclick", `delClass()`) 
    var delplace = document.getElementById('myDropdown')
    delplace.appendChild(delClass)


    document.getElementById("myDropdown").classList.toggle("show");
    //change what shows on blue ID by pulling from local storage
    var elementToSave = localStorage.getItem('current-class');
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
  
            
