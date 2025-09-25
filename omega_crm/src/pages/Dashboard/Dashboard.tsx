import { Outlet } from "react-router";
import './Dashboard.css';
import Nav from "./Nav/Nav";
import ScheduleProvider from "../../contextProviders/ScheduleProvider";

interface DashboardLayoutProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

function DashboardLayout ({ setIsLoggedIn }: DashboardLayoutProps) {

  return (
    <ScheduleProvider>
      <div id="dashboardContainer">
        <Nav setIsLoggedIn={setIsLoggedIn} />
        <Outlet />
      </div>
    </ScheduleProvider>
  )
}

export default DashboardLayout;