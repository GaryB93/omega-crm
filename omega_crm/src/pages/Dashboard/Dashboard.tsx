import { Outlet, useOutletContext } from "react-router";
import './Dashboard.css';
import Nav from "./Nav/Nav";
import ScheduleProvider from "../../contextProviders/ScheduleProvider";
import CustomerProvider from "../../contextProviders/CustomerProvider";
import type { User } from "../AcctMgmt/UserInfo/UserInfo";

interface DashboardLayoutProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

function DashboardLayout ({ setIsLoggedIn, user, setUser }: DashboardLayoutProps) {

  return (
    <ScheduleProvider>
      <CustomerProvider>
        <div id="dashboardContainer">
          <Nav setIsLoggedIn={setIsLoggedIn} />
          <Outlet context={[user, setUser]} />
        </div>
      </CustomerProvider>
    </ScheduleProvider>
  )
}

export default DashboardLayout;

type ContextType = [ user: User, setUser: React.Dispatch<React.SetStateAction<User>>];

export function useUser() {
  return useOutletContext<ContextType>();
}