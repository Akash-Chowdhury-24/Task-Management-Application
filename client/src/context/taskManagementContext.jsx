import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { callUserAuthAPI } from "../services";



export const TaskManagmentContext = createContext(null);
const initialTaskState = {
  title: "",
  description: "",
  status: "",
  priority: "",
  hours: "",
  minutes: "",
}

export function TaskManagmentState({ children }) {
  const [user, setUser] = useState(null);
  const [taskFormData, setTaskFromData] = useState(initialTaskState);
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [currentEditedTaskId,setCurrentEditedTaskId] = useState(null);

  const navigate = useNavigate();
  const location = useLocation(); // this will give us the path 

  // therefore when ever there is a change in the navigation variable or in the path of the website this useeffect will be triggered 
  // this how we will automatically always be in the task list page if we have signed in 
  useEffect(() => {
  //   const verifyCookie = async () => {
  //     setVerifying(true);
  //     const data = await callUserAuthAPI();
  //     if (data?.userInfo) {
  //       setUser(data?.userInfo);
  //     }

  //     setVerifying(false);
  //     // so if we are if we are logged in and we want to go to the auth page or the blank page then we will redirect to task list page but for anyother page we will simply go to that page 
  //     return data?.success ? navigate(location.pathname === '/auth' || location.pathname === '/' ? '/task/list' : `${location.pathname}`) : navigate("/auth"); // if success then list page else go to auth


  //   };
  //   verifyCookie();
  // }, [navigate, location.pathname])

  const verifyCookie = async () => {
    setVerifying(true); // Start verification
    const data = await callUserAuthAPI();
    if (data?.userInfo) {
      setUser(data?.userInfo);
    }
    if (data?.success) {
      navigate(location.pathname === "/auth" || location.pathname === "/" ? "/task/list" : `${location.pathname}`);
    } else {
      navigate("/auth");
    }
    setVerifying(false); // Verification complete
  };
  verifyCookie();
}, [navigate, location.pathname]);
  return (
    <TaskManagmentContext.Provider value={{
      user, 
      setUser, 
      taskFormData, 
      setTaskFromData, 
      initialTaskState, 
      taskList, 
      setTaskList,
      loading,
      setLoading,
      currentEditedTaskId,
      setCurrentEditedTaskId,
      verifying,
    }}>
      {children}
    </TaskManagmentContext.Provider>
  );
}


