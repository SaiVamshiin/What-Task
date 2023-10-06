import { addDays, format, isEqual, isWithinInterval } from "date-fns";
import parseISO from "date-fns/parseISO";
import { projectList, hideAddTaskBtn } from "./creatingProject";
import { addTask } from "./creatingTask";

function checkWhichHomeTile(homeTitle) {
   if (homeTitle.matches("#allTasks")){
    displayAllTasks()
   }
   if (homeTitle.matches("#today")){
    displayToday()
   }
   if (homeTitle.matches("thisWeek")){
    displayThisWeek()
   }
   if(homeTitle.matches("important")){
    displayImportant()
   }
}

function clearContent(){
    const ul = document.querySelector("ul");
    ul.textContent = "";
}

function displayAllTasks(){
     clearContent()
     projectList.forEach((project) => {
        project.taskList.forEach((task) => {
            addTask(task.id, task.title, task.details, task.date,task.completed, task.important);
        });
     });
      hideAddTaskBtn()
      checkNoTask()
};

function displayToday() {
    clearContent()
    let today = Date.parse(format(new Date(), "dd-mm-yyyy"));
    projectList.forEach((project)=>{
        project.taskList.forEach((task) => {
            let date = Date.parse(task.date)
            if (isEqual(date,today)) {
                addTask(task.id, task.title, task.details, task.date,task.completed, task.important);
            } else {
                return;
            }
        })
    })
    checkNoTask()
};

function displayThisWeek() {
   clearContent()
   projectList.forEach((project) => {
    project.taskList.forEach((task) => {
        let date = parseISO(task.date);
        if (checkNextWeek(date)){
            addTask(task.id, task.title, task.details, task.date,task.completed, task.important);
        } else {
            return;
        }
    })
   })
   checkNoTask()
}

function checkNextWeek(taskDate){
   let nextWeekPlus1 = addDays(new Date(), 8);
   let today = new Date();
   return isWithinInterval(taskDate,{
    start: today,
    end : nextWeekPlus1
   });
}

function displayImportant() {
    clearContent()
    projectList.forEach((project) => {
        project.taskList.forEach((task) => {
            if (task.important) {
                addTask(task.id, task.title, task.details, task.date,task.completed, task.important);
            }
            else {
                return;
            }
        });
    });
    checkNoTask()
}

function checkNoTask() {
    const ul = document.querySelector("ul");

    if (ul.textContent === ""){
        checkNoTask()
    } else {
        return;
    }
}

function checkNoTask() {
     const ul = document.querySelector("ul")
     const div = document.createElement("div")
    
     div.classList.add("noTask");
     div.textContent = " YO , No tasks!"
     ul.appendChild(div);
}

export {checkWhichHomeTile, displayAllTasks}