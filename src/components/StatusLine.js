import { useEffect, useState } from "react";
import "../styles/statusLine.scss";
import Task from "./Task";

const StatusLine = ({ tasks, status,addTask,deleteTask,moveTask, addEmptyTask }) => {
  let tasksForStatus;
  let taskList;

  const handleAddEmpty = () => {
    addEmptyTask(status);
  };

  if (tasks) {
    tasksForStatus = tasks.filter((task) => task.status === status);
  }
  if (tasksForStatus) {
    taskList = tasksForStatus.map((task) => {
      return (
        <Task
          addTask={(task) => addTask(task)}
          deleteTask={(id) => deleteTask(id)}
          moveTask={(id, status) => moveTask(id, status)}
          key={task.id}
          task={task}
        />
      );
    });
  }

  return (
    <div className="statusLine">
      <h3>{status}</h3>
      {taskList}
      <button className="button addTask" onClick={handleAddEmpty}>
        +
      </button>
    </div>
  );
};

export default StatusLine;
