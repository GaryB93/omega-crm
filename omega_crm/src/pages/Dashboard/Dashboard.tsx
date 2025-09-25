import { Outlet } from "react-router";
import './Dashboard.css';
import Nav from "./Nav/Nav";
import ScheduleProvider from "../../contextProviders/ScheduleProvider";
import CustomerProvider from "../../contextProviders/CustomerProvider";

interface DashboardLayoutProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

function DashboardLayout ({ setIsLoggedIn }: DashboardLayoutProps) {

  return (
    <ScheduleProvider>
      <CustomerProvider>
        <div id="dashboardContainer">
          <Nav setIsLoggedIn={setIsLoggedIn} />
          <Outlet />
        </div>
      </CustomerProvider>
    </ScheduleProvider>
  )
}

export default DashboardLayout;