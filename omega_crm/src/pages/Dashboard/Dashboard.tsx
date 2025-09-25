import { Outlet } from "react-router";
import { useState } from "react";
import './Dashboard.css';
import Nav from "./Nav/Nav";
import ScheduleProvider from "../../contextProviders/ScheduleProvider";
import CustomerProvider from "../../contextProviders/CustomerProvider";
import getCurrentDate from "../../utils/getCurrentDate";

interface DashboardLayoutProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

function DashboardLayout ({ setIsLoggedIn }: DashboardLayoutProps) {

  const [ date, setDate ] = useState(getCurrentDate());

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