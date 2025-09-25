import { Outlet } from "react-router";
import { useState } from "react";
import './Dashboard.css';
import Nav from "./Nav/Nav";
import ScheduleProvider from "../../contextProviders/ScheduleProvider";
import CustomerProvider from "../../contextProviders/CustomerProvider";

interface DashboardLayoutProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

function DashboardLayout ({ setIsLoggedIn }: DashboardLayoutProps) {

  // FIX ME: change to use the current date upon loading initially
  const [ date, setDate ] = useState("2025-09-24");

  return (
    <ScheduleProvider>
      <CustomerProvider>
        <div id="dashboardContainer">
          <Nav setIsLoggedIn={setIsLoggedIn} />
          <Outlet context={[ date, setDate ]}/>
        </div>
      </CustomerProvider>
    </ScheduleProvider>
  )
}

export default DashboardLayout;