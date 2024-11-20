
// this the coomon layout page in the content which is common for the tasklist page and the scrumboard page is palced here so thta they are not repeated in every new pages.   
import { Outlet } from "react-router-dom";
import Header from "./header";
import "../css/commonLayout.css";
function CommonLayout() {
  return (
    <div className="common-layout-container">
      <Header/>
      <div className="common-layout-main">
        <Outlet /> {/*this the System defined component that helps in achiveing the parent and child relation*/}
      </div>
    </div>
  );
}

export default CommonLayout;

