import { Outlet } from "react-router";
import './Dashboard.css';
import Nav from "./Nav/Nav";

function DashboardLayout () {
  return (
    <div id="dashboardContainer">
      <Nav/>
      <Outlet/>
    </div>
  )
}

export default DashboardLayout;