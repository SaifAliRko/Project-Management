import { useState } from "react";
import "../styles/task.scss";


const Task = ({ task, addTask, deleteTask, moveTask }) => {
  const [urgencyLevel, setUrgencyLevel] = useState(task.urgency);
  const [collapsed, setCollapsed] = useState(task.isCollapsed);
  const [formAction, setFormAction] = useState("");

  const setUrgency = (e) => {
    setUrgencyLevel(e.target.attributes.urgency.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formAction === "delete") {
      deleteTask(task.id);
    }
    if (!collapsed) {
      let newTask = {
        id: task.id,
        title: e.target.elements.title.value,
        description: e.target.elements.description.value,
        urgency: urgencyLevel,
        status: task.status,
        isCollapsed: true,
      };
      addTask(newTask);
      setCollapsed(true)
    }
    else{
        setCollapsed(false)
    }
  };

  const handleMoveLeft = () => {
    let newTask = "";
    if (task.status === "In Progress") {
      newTask = "Backlog";
    }
    if (task.status === "Done") {
      newTask = "In Progress";
    }
    if (newTask !== "") {
      moveTask(task.id, newTask);
    }
  };

  const handleMoveRight = () => {
    let newTask = "";
    if (task.status === "Backlog") {
      newTask = "In Progress";
    }
    if (task.status === "In Progress") {
      newTask = "Done";
    }
    if (newTask !== "") {
      moveTask(task.id, newTask);
    }
  };

  return (
    <div className={`task ${collapsed ? "collapsedTask" : ""}`}>
    <button onClick={handleMoveLeft} className="button moveTask">
      &#171;
    </button>
    <form onSubmit={handleSubmit} className={collapsed ? "collapsed" : ""}>
      <input
        type="text"
        className="title input"
        name="title"
        placeholder="Enter Title"
        disabled={collapsed}
        defaultValue={task.title}
      />
      <textarea
        rows="2"
        className="description input"
        name="description"
        placeholder="Enter Description"
        defaultValue={task.description}
      />
      <div className="urgencyLabels">
        <label className={`low ${urgencyLevel === "low" ? "selected" : ""}`}>
          <input
            urgency="low"
            onChange={setUrgency}
            type="radio"
            name="urgency"
          />
          low
        </label>
        <label
          className={`medium ${urgencyLevel === "medium" ? "selected" : ""}`}
        >
          <input
            urgency="medium"
            onChange={setUrgency}
            type="radio"
            name="urgency"
          />
          medium
        </label>
        <label
          className={`high ${urgencyLevel === "high" ? "selected" : ""}`}
        >
          <input
            urgency="high"
            onChange={setUrgency}
            type="radio"
            name="urgency"
          />
          high
        </label>
      </div>
      <button
        onClick={() => {
          setFormAction("save");
        }}
        className="button"
      >
        {collapsed ? "Edit" : "Save"}
      </button>
      {collapsed && (
        <button
          onClick={() => {
            setFormAction("delete");
          }}
          className="button delete"
        >
          X
        </button>
      )}
    </form>
    <button onClick={handleMoveRight} className="button moveTask">
      &#187;
    </button>
  </div>
  );
};

export default Task;
