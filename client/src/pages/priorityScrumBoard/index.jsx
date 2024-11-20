import { useContext, useEffect } from "react";
import { TaskManagmentContext } from "../../context/taskManagementContext";
import { priorityBoard } from "../../config";
import "../../css/priorityScrumBoard.css";
import { callGetAllTaskAPI, callUpdateTaskAPI } from "../../services";

function PriorityScrumBoard() {
  const { user, taskList, setTaskList, setLoading } = useContext(TaskManagmentContext);

  function onDragStart(event, getTaskId) {
    event.dataTransfer.setData("id", getTaskId);
  }

  async function updateTaskByPriority(getTask) {
    await callUpdateTaskAPI(getTask);
    await fetchTaskList();
  }

  function onDrop(event, getCurrentPriority) {
    const getDraggedTaskId = event.dataTransfer.getData("id");
    let findCurrentTask = taskList.find(item => item._id.toString() === getDraggedTaskId);

    findCurrentTask = {
      ...findCurrentTask,
      priority: getCurrentPriority,
    };

    updateTaskByPriority(findCurrentTask);
  }

  async function fetchTaskList() {
    setLoading(true);
    const data = await callGetAllTaskAPI(user?._id);

    if (data?.success) {
      setTaskList(data?.taskList);
      setLoading(false);
    }
  }

  // Render tasks by priority
  function renderTaskByPriority() {
    const priorityTasks = {
      low: [],
      medium: [],
      high: [],
    };

    taskList.forEach((item) => {
      if (item.priority && priorityTasks[item.priority]) {
        priorityTasks[item.priority].push(
          <div
            className="priority-scrum-board-task"
            key={item._id}
            onDragStart={(event) => onDragStart(event, item._id)}
            draggable={true}
          >
            <div className="priority-scrum-board-task-title-container">
              <h3 >{item.title}</h3>
            </div>

            <p>{item.priority}</p>
          </div>
        );
      }
    });

    return priorityTasks;
  }

  useEffect(() => {
    if (user) fetchTaskList();
  }, [user]);

  return (
    <div className="priority-scrum-board-main-container">
      {priorityBoard.map((item) => (
        <div
          className="priority-scrum-board-container"
          key={item.id}
          onDrop={(event) => onDrop(event, item.id)}
          onDragOver={(event) => event.preventDefault()}
        >
          <div className="priority-scrum-board-heading">
            <h3>{item.label}</h3>
          </div>
          <div className="priority-scrum-board-scroll ">
            <div className="priority-scrum-board-render">
              {renderTaskByPriority()[item.id]}
            </div>
          </div>

        </div>
      ))}
    </div>
  );
}

export default PriorityScrumBoard;


