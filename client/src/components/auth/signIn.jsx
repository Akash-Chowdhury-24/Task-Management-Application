import { useState } from "react";
import { signinformcontrols } from "../../config";
import CommonForm from "../commonForm";
import { useNavigate } from "react-router-dom";
import { callLoginUserAPI } from "../../services";
import '../../css/signin.css';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const initialState = {
  email: "",
  password: "",
}

function SignIn() {

  const [signInFormData, setSignInFormData] = useState(initialState);
  const navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
  
    try {
      const data = await callLoginUserAPI(signInFormData);
      if (data?.success) {
        navigate('/task/list');
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message );
    } finally {
      setSignInFormData(initialState);
    }
  }
  

  return (
    <>
      <div className="sign-in-container">
        <h2 >Sign In</h2>
        <div className="sign-in-form">
          <CommonForm
            formcontrol={signinformcontrols}
            btnText="Sign In"
            formData={signInFormData}
            setFormData={setSignInFormData}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </>

  );
}

export default SignIn;