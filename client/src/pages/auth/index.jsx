import { useState } from "react";
import CommonButton from "../../components/commonButton.jsx";
import SignIn from "../../components/auth/signIn";
import SignUp from "../../components/auth/signUp";
import '../../css/authPage.css'

function AuthPage() {
  const [loginView, setLoginView] = useState(true);
  return (

    <div className="auth-page-scroll">
      <div className="auth-page-container">
        {/* <h1>Welcome</h1> */}
        <div className="auth-page-form-box">
          <div className="auth-page-signin-signup">
            {
              loginView ? <SignIn /> : <SignUp />
            }
          </div>
          <div className="auth-page-button-container">
            <CommonButton buttonText={loginView ? "Go to Sign Up" : "Go to Sign In"} onClick={() => setLoginView(!loginView)} />
          </div>
        </div>
      </div>
    </div>



  );
}

export default AuthPage;