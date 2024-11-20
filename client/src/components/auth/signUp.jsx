import { useState } from "react";
import { signupformcontrols } from "../../config";
import CommonForm from "../commonForm";
import { callRegisterUserAPI } from "../../services";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import '../../css/signup.css';


const initialState = {
  name: "",
  email: "",
  password: "",
}

function SignUp() {

  const [signUpFormData, setSignUpFormData] = useState(initialState);
  const navigate = useNavigate();
  async function handleSubmit(event) {

    event.preventDefault();

    try {
      const data = await callRegisterUserAPI(signUpFormData);
      if (data?.success) {
        navigate('/task/list');
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setSignUpFormData(initialState);
    }
  }

return (
  <div className="sign-up-container">
    <h2>Sign Up</h2>
    <div className="sign-up-form">
      <CommonForm
        formcontrol={signupformcontrols}
        btnText="Sign Up"
        formData={signUpFormData}
        setFormData={setSignUpFormData}
        handleSubmit={handleSubmit}
      />
    </div>
  </div>
);
}

export default SignUp;