import { Outlet } from "react-router";
import './Dashboard.css';
import Nav from "./Nav/Nav";
import ScheduleProvider from "../../contextProviders/ScheduleProvider";
import CustomerProvider from "../../contextProviders/CustomerProvider";
import type { User } from "../../interfaces/User";

interface DashboardLayoutProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

function DashboardLayout ({ user, setUser }: DashboardLayoutProps) {

  return (
    <ScheduleProvider>
      <CustomerProvider>
        <div id="dashboardContainer">
          <Nav user={user} setUser={setUser} />
          <Outlet context={user} />
        </div>
      </CustomerProvider>
    </ScheduleProvider>
  )
}

export default DashboardLayout;