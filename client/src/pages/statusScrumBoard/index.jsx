import { useContext, useEffect, useRef, useState } from "react";
import { TaskManagmentContext } from "../../context/taskManagementContext";
import { scrumBoard } from "../../config";
import "../../css/statusScrumBoard.css";
import { callGetAllTaskAPI, callUpdateTaskAPI } from "../../services";

function StatusScrumBoard() {
  const { user, taskList, setTaskList, setLoading } = useContext(TaskManagmentContext);
  const draggedTaskRef = useRef(null); // Reference to track dragged item for touch events
  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });

  // Drag event for desktop
  function onDragStart(event, getTaskId) {
    event.dataTransfer.setData("id", getTaskId);
  }

  // Touch event for mobile/tablet
  function onTouchStart(event, getTaskId) {
    draggedTaskRef.current = getTaskId; // Set the task ID when touch starts
    setTouchPosition({ x: event.touches[0].clientX, y: event.touches[0].clientY });
  }

  // Track touch position during move
  function onTouchMove(event) {
    setTouchPosition({ x: event.touches[0].clientX, y: event.touches[0].clientY });
  }

  // Drop event for mobile/tablet
  function onTouchEnd(event, getCurrentStatus) {
    if (draggedTaskRef.current) {
      const dropArea = document.elementFromPoint(touchPosition.x, touchPosition.y);

      // Check if the drop area is valid and matches a status
      scrumBoard.forEach((status) => {
        if (dropArea && dropArea.closest(`.status-scrum-board-container[data-status="${status.id}"]`)) {
          updateDraggedTaskStatus(draggedTaskRef.current, status.id);
        }
      });

      draggedTaskRef.current = null; // Clear after dropping
    }
  }

  // Drop event for desktop
  function onDrop(event, getCurrentStatus) {
    const getDraggedTaskId = event.dataTransfer.getData("id");

    let findCurrentTask = taskList.find(item => item._id.toString() === getDraggedTaskId);

    findCurrentTask = {
      ...findCurrentTask,
      status: getCurrentStatus,
    }

    updateTaskByStatus(findCurrentTask);
  }

  async function updateTaskByStatus(getTask) {
    await callUpdateTaskAPI(getTask);
    await fetchTaskList();
  }

  function updateDraggedTaskStatus(draggedTaskId, newStatus) {
    let findCurrentTask = taskList.find((item) => item._id.toString() === draggedTaskId);
    if (findCurrentTask) {
      findCurrentTask = { ...findCurrentTask, status: newStatus };
      updateTaskByStatus(findCurrentTask);
    }
  }

  async function fetchTaskList() {
    setLoading(true);
    const data = await callGetAllTaskAPI(user?._id);

    if (data?.success) {
      setTaskList(data?.taskList);
      setLoading(false);
    }
  }

  function renderTaskByTaskStatus() {
    const taskStatues = {
      todo: [],
      inprogress: [],
      review: [],
      blocked: [],
      done: [],
    };

    taskList.forEach((item) => {
      if (item.status && taskStatues[item.status]) {
        taskStatues[item.status].push(
          <div
            className="status-scrum-board-task"
            key={item._id}
            onDragStart={item.status !== "done" ? (event) => onDragStart(event, item._id) : null}
            onTouchStart={item.status !== "done" ? (event) => onTouchStart(event, item._id) : null}
            onTouchMove={item.status !== "done" ? onTouchMove : null}
            onTouchEnd={item.status !== "done" ? (event) => onTouchEnd(event) : null}
            draggable={item.status !== "done"}
          >
            <div className="status-scrum-board-task-title-container">
              <h3 className={item.status === "done" ? "status-scrum-board-done-style" : null}>
                {item.title}
              </h3>
            </div>
            <p>{scrumBoard.find((boardOption) => boardOption.id === item.status).label}</p>
          </div>
        );
      }
    });

    return taskStatues;
  }

  useEffect(() => {
    if (user) fetchTaskList();
  }, [user]);

  return (
    <>
      <div className="status-scrum-board-main-container">
        {scrumBoard.map((item) => (
          <div
            className="status-scrum-board-container"
            key={item.id}
            data-status={item.id} // Add a data attribute for easier status identification
            onDrop={(event) => onDrop(event, item.id)}
            onDragOver={(event) => event.preventDefault()}
            onTouchEnd={(event) => onTouchEnd(event, item.id)}
          >
            <div className="status-scrum-board-heading">
              <h3>{item.label}</h3>
            </div>

            <div className="status-scrum-board-scroll">
              <div className="status-scrum-board-render">
                {renderTaskByTaskStatus()[item.id]}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default StatusScrumBoard;


