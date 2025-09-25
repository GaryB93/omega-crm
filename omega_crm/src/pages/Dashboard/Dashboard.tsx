import { Outlet } from "react-router";
import { useState } from "react";
import './Dashboard.css';
import Nav from "./Nav/Nav";
import { ScheduleContext } from "../../context/scheduleContext";
import { ScheduleDispatchContext } from "../../context/scheduleContext";

interface DashboardLayoutProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

function DashboardLayout ({ setIsLoggedIn }: DashboardLayoutProps) {

  const [ selectedSchedule, setSelectedSchedule ] = useState(1);
  // const [ selectedCustomer, setSelectedCustomer ] = useState(null);

  return (
    <ScheduleContext.Provider value={selectedSchedule}>
      <ScheduleDispatchContext.Provider value={setSelectedSchedule}>
        <div id="dashboardContainer">
          <Nav setIsLoggedIn={setIsLoggedIn} />
          <Outlet />
        </div>
      </ScheduleDispatchContext.Provider>
    </ScheduleContext.Provider>
  )
}

export default DashboardLayout;