
import { Outlet, useNavigate } from "react-router-dom";
import CommonButton from "../../components/commonButton";
import "../../css/scumBoardPage.css"
function ScrumBoardPage() {
  const navigate=useNavigate();
  
  return (<>
    <div>
      <div className="scrum-board-button-container">
        <CommonButton buttonText={"By Status"} onClick={()=>{navigate('/task/scrumBoard/status')}}/>
        <CommonButton buttonText={"By Priority"} onClick={()=>{navigate('/task/scrumBoard/priority')}}/>
      </div>
      <div className="scrum-board-outlet-container">
        <Outlet/>
      </div>
    </div>
  </>
  );
}

export default ScrumBoardPage;