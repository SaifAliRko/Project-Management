import { useEffect, useState } from "react";
import "../styles/App.scss";
import StatusLine from "./StatusLine";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasksFromLocalStorage();
  }, []);
  
  const addEmptyTask = (status) => {
    const lastTask=tasks[tasks.length-1]
    let newId=1
    if(lastTask!==undefined){
      newId=lastTask.id+1
    }
    setTasks([
      ...tasks,
      {
        id: newId,
        title: "",
        description: "",
        urgency: "",
        status: status,
        isCollapsed:false
      },
    ]);
  };

  const addTask=(taskToAdd)=>{
    let filteredTask=tasks.filter(task=>task.id!==taskToAdd.id)
    let newTaskList = [...filteredTask,taskToAdd]
    setTasks(newTaskList)
    saveTasksToLocalStorage(newTaskList);
  }

  const deleteTask=(taskId)=>{
    let filteredTasks=tasks.filter(task=>task.id!==taskId)
    setTasks(filteredTasks)
    saveTasksToLocalStorage(filteredTasks);

  }
  
  const moveTask=(id,newStatus)=>{
    const task= tasks.find(i=>i.id===id)
    let filteredTask=tasks.filter(i=>i.id!==id)

    task.status=newStatus;
    let newTaskList = [...filteredTask,task]
    setTasks(newTaskList)
    
    saveTasksToLocalStorage(newTaskList);

  }

  const  saveTasksToLocalStorage = (tasks)=>{
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  const loadTasksFromLocalStorage=()=> {
    let loadedTasks = localStorage.getItem("tasks");

    let tasks = JSON.parse(loadedTasks);

    if (tasks) {
      setTasks(tasks);
    }
  }

  return (
    <div className="App">
      <h1>Project Management</h1>
      <main>
        <section>
        <StatusLine
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
            status="Backlog"
          />
          <StatusLine
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
            status="In Progress"
          />
          <StatusLine
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
            status="Done"
          />
        </section>
      </main>
    </div>
  );
}

export default App;
