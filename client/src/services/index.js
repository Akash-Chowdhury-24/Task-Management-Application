import axios from "axios"

const backendUrl = `${import.meta.env.VITE_APP_BACKEND_URL}`;
axios.defaults.withCredentials = true;
export const callRegisterUserAPI = async (formData) => {

  // axios is just like fetch trying a different technique nothing else
  const response = await axios.post(
    `${backendUrl}/api/user/register`,
    formData,
    { withCredentials: true }
  );

  return response?.data;
}

export const callLoginUserAPI = async (formData) => {

  // axios is just like fetch trying a different technique nothing else
  const response = await axios.post(
    `${backendUrl}/api/user/login`,
    formData,
    { withCredentials: true }
  );

  return response?.data;
}

export const callUserAuthAPI = async () => {

  const response = await axios.post(
    `${backendUrl}/api/user/auth`,
    {},
    { withCredentials: true }
  );

  return response?.data;
}

export const callLogoutUserAPI = async () => {

  const response = await axios.post(
    `${backendUrl}/api/user/logout`,
    {},
    { withCredentials: true },
  );

  return response?.data
}

export const callAddNewTaskAPI = async (formData) => {

  // axios is just like fetch trying a different technique nothing else
  const response = await axios.post(
    `${backendUrl}/api/task/add-new-task`,
    formData,
  );

  return response?.data;
}

export const callGetAllTaskAPI = async (currentUserId)=>{

  const response = await axios.get(`${backendUrl}/api/task/get-all-task-by-id/${currentUserId}`);

  return response?.data;
}

export const callDeleteTaskAPI=async (currentTaskId)=>{

  const response = await axios.delete(`${backendUrl}/api/task/delete-task-by-id/${currentTaskId}`);

  return response?.data;
}

export const callUpdateTaskAPI = async (formData) => {

  // axios is just like fetch trying a different technique nothing else
  const response = await axios.put(
    `${backendUrl}/api/task/update-task-by-id`,
    formData,
  );

  return response?.data;
}