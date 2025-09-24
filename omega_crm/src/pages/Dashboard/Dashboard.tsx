import { Outlet } from "react-router";
import './Dashboard.css';
import Nav from "./Nav/Nav";

function DashboardLayout ({ setIsLoggedIn }: { setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <div id="dashboardContainer">
      <Nav setIsLoggedIn={setIsLoggedIn} />
      <Outlet />
    </div>
  )
}

export default DashboardLayout;