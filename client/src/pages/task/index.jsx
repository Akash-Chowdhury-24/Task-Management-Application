import { useContext, useEffect, useState } from "react";
import CommonButton from "../../components/commonButton";
import AddNewTask from "../../components/task/addNewTask";
import { callAddNewTaskAPI, callDeleteTaskAPI, callGetAllTaskAPI, callUpdateTaskAPI } from "../../services";
import { TaskManagmentContext } from "../../context/taskManagementContext";
import { Skeleton } from "@mui/material";
import SingleTaskItem from "../../components/task/singletaskitem";
import '../../css/taskPage.css'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommonInput from "../../components/commonInput";

function TaskPage() {


  const [showDialog, setShowDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const {
    taskFormData,
    setTaskFromData,
    initialTaskState,
    user,
    taskList,
    setTaskList,
    loading,
    setLoading,
    currentEditedTaskId,
    setCurrentEditedTaskId,
  } = useContext(TaskManagmentContext);

  async function fetchTaskList() {
    setLoading(true);
    const data = await callGetAllTaskAPI(user?._id)
    console.log(data);

    if (data?.success) {
      setTaskList(data?.taskList);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user) fetchTaskList();
  }, [user]); // therfore only when the user as come only then this will run
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const data = currentEditedTaskId !== null ? await callUpdateTaskAPI({
        ...taskFormData,
        _id: currentEditedTaskId,
        userId: user?._id,
      })
        : await callAddNewTaskAPI({
          ...taskFormData,
          userId: user?._id,
        });

      if (data?.success) {
        toast.success(data?.message);
        setTimeout(() => {
          fetchTaskList(); // so after we add a new task we again fetch the list so that we can display it 
          setShowDialog(false);
          setCurrentEditedTaskId(null);
          setTaskFromData(initialTaskState);
        }, 500);
      } else {
        toast.error(data?.message);
      }

    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  }


  async function handleDelete(currentTaskId) {
    const data = await callDeleteTaskAPI(currentTaskId);
    console.log(data);

    if (data?.success) {
      toast.success(data?.message);
      fetchTaskList();
    }
  }

  const filteredTasks = taskList?.filter(task =>
    task.title.toLowerCase().startsWith(searchQuery.toLowerCase())
  );
  

  if (loading) {
    return (<Skeleton variant="rectangular" width="100%" height={200} animation='wave' />)
  }

  return (
    <div>
      <div className="task-page-button-container">
        <CommonButton buttonText="Add New Task" onClick={() => {
          setShowDialog(true);
          setTaskFromData(initialTaskState);
        }} />
      </div>

      <div className="task-page-main-list-container">
        {/* <h2>List of tasks</h2> */}
        <div className="task-page-search-box">
          <CommonInput
            placeholder="Search Task"
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            name="search"
            id="search"
          />
        </div>
        <div className="task-page-task-list-scroll">
          <div className={(taskList?.length <= 0 || (searchQuery && filteredTasks?.length <= 0)) ? "task-page-no-task" : "task-page-task-list-container"}>
            {
              searchQuery === '' ?
                taskList?.length > 0 ?
                  taskList
                    ?.slice()
                    .reverse().map((task) => (
                      <SingleTaskItem
                        key={task._id}
                        taskItem={task}
                        handleDelete={handleDelete}
                        setShowDialog={setShowDialog}
                        setCurrentEditedTaskId={setCurrentEditedTaskId}
                        setTaskFromData={setTaskFromData}
                      />
                    ))
                  : <h1>No task Present , Please Enter one </h1>
                : filteredTasks?.length > 0 ? (
                  filteredTasks
                    .slice()
                    .reverse()
                    .map((task) => (
                      <SingleTaskItem
                        key={task._id}
                        taskItem={task}
                        handleDelete={handleDelete}
                        setShowDialog={setShowDialog}
                        setCurrentEditedTaskId={setCurrentEditedTaskId}
                        setTaskFromData={setTaskFromData}
                      />
                    ))
                ) : (
                  <h1>No task with this name found</h1>
                )
            }
          </div>
        </div>
      </div>
      <div>
        <AddNewTask
          showDialog={showDialog}
          setShowDialog={setShowDialog}
          handleSubmit={handleSubmit}
          taskFormData={taskFormData}
          setTaskFromData={setTaskFromData}
          currentEditedTaskId={currentEditedTaskId}
        />
      </div>

    </div>
  );
}

export default TaskPage;