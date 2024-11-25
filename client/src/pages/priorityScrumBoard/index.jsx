import { useContext, useEffect, useRef, useState } from "react";
import { TaskManagmentContext } from "../../context/taskManagementContext";
import { priorityBoard } from "../../config";
import "../../css/priorityScrumBoard.css";
import { callGetAllTaskAPI, callUpdateTaskAPI } from "../../services";

function PriorityScrumBoard() {
  const { user, taskList, setTaskList, setLoading } = useContext(TaskManagmentContext);
  const draggedTaskRef = useRef(null); // Reference for the dragged task during touch events
  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });

  // Desktop: Drag Start
  function onDragStart(event, getTaskId) {
    event.dataTransfer.setData("id", getTaskId);
  }

  // Mobile: Touch Start
  function onTouchStart(event, getTaskId) {
    draggedTaskRef.current = getTaskId; // Store the task being dragged
    setTouchPosition({ x: event.touches[0].clientX, y: event.touches[0].clientY });
  }

  // Mobile: Track Touch Move
  function onTouchMove(event) {
    setTouchPosition({ x: event.touches[0].clientX, y: event.touches[0].clientY });
  }

  // Mobile: Drop Task
  function onTouchEnd(event, getCurrentPriority) {
    if (draggedTaskRef.current) {
      const dropArea = document.elementFromPoint(touchPosition.x, touchPosition.y);

      // Check if drop area matches any priority board container
      priorityBoard.forEach((priority) => {
        if (dropArea && dropArea.closest(`.priority-scrum-board-container[data-priority="${priority.id}"]`)) {
          updateTaskByPriority(draggedTaskRef.current, priority.id);
        }
      });

      draggedTaskRef.current = null; // Clear dragged task reference after drop
    }
  }

  async function updateTaskByPriority(getTaskId, newPriority) {
    const findCurrentTask = taskList.find(item => item._id.toString() === getTaskId);
    if (findCurrentTask) {
      const updatedTask = { ...findCurrentTask, priority: newPriority };
      await callUpdateTaskAPI(updatedTask);
      await fetchTaskList();
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
            onTouchStart={(event) => onTouchStart(event, item._id)}
            onTouchMove={onTouchMove}
            onTouchEnd={(event) => onTouchEnd(event, item.priority)}
            draggable={true}
          >
            <div className="priority-scrum-board-task-title-container">
              <h3>{item.title}</h3>
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
          data-priority={item.id} // Add a data attribute for easier identification
          onDrop={(event) => {
            const getDraggedTaskId = event.dataTransfer.getData("id");
            updateTaskByPriority(getDraggedTaskId, item.id);
          }}
          onDragOver={(event) => event.preventDefault()}
          onTouchEnd={(event) => onTouchEnd(event, item.id)}
        >
          <div className="priority-scrum-board-heading">
            <h3>{item.label}</h3>
          </div>
          <div className="priority-scrum-board-scroll">
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
