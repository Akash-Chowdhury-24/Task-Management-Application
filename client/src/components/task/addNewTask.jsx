import { addNewTaskFormControls } from "../../config";
import CommonDialog from "../commonDialog";


function AddNewTask({showDialog,setShowDialog,handleSubmit,taskFormData,setTaskFromData,currentEditedTaskId}) {

  return (
    <CommonDialog
      title={currentEditedTaskId !== null ? "Edit Task" :"Add New Task"}
      btnText={currentEditedTaskId !== null ? "Edit Task" :"Add Task"}
      showDialog={showDialog}
      setShowDialog={setShowDialog}
      formcontrol={addNewTaskFormControls}
      handleSubmit={handleSubmit}
      formData={taskFormData}
      setFormData={setTaskFromData}
      currentEditedTaskId ={currentEditedTaskId}
    />
  );
}

export default AddNewTask;