import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react"
import '../css/header.css'
import { callLogoutUserAPI } from "../services";
import { useContext } from "react";
import { TaskManagmentContext } from "../context/taskManagementContext";
function Header() {

  const { setUser } = useContext(TaskManagmentContext);
  const navigate = useNavigate();
  async function handleLogout() {
    const response = await callLogoutUserAPI();
    if (response?.success) {
      setUser(null);
      navigate('/auth');
    }
  }
  return (
    <div className="header-container">
      <h1 className="header-title">Task Management</h1>

      <div className="header-menu-container">
        <div className="nav-links">
          <Link to={'/task/list'}>Tasks</Link>
          <Link to={'/task/scrumboard/status'}>Scrum Board</Link>
        </div>

        <LogOut onClick={handleLogout} color="white" className="logout-icon" />
      </div>

    </div>
  );
}

export default Header;