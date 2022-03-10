var study_goals = JSON.parse(localStorage.getItem('study-goals'))
var time_studied = JSON.parse(localStorage.getItem('time-studied'))
var classes = JSON.parse(localStorage.getItem("classes"))


//if class doesnt have a goal, set default
var init_study_rec = 60
if (!('General Notes' in study_goals)){
    study_goals['General Notes'] = init_study_rec
}
for (var i = 0; i < classes.length; i++) {
    if (!(classes[i] in study_goals))
        study_goals[classes[i]] = init_study_rec
}


localStorage.setItem("study-goals", JSON.stringify(study_goals))


//if not time in study time exists, add zero
var init_study_time = 0
if (!('General Notes' in time_studied)){
    time_studied['General Notes'] = init_study_time
}
for (var i = 0; i < classes.length; i++) {
    if (!(classes[i] in time_studied))
    time_studied[classes[i]] = init_study_rec
}
localStorage.setItem("time-studied", JSON.stringify(time_studied))

set_class_width()
var current_class = localStorage.getItem("current-class")
load_rec_study()
select_class(current_class)



