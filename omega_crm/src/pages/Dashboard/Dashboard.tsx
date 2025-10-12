import { Outlet, useOutletContext } from "react-router";
import './Dashboard.css';
import Nav from "./Nav/Nav";
import ScheduleProvider from "../../contextProviders/ScheduleProvider";
import CustomerProvider from "../../contextProviders/CustomerProvider";
import User from "../../classes/User";

// This dashboard component is the main container that houses the navigation component and the pages of the application that pertain to individual functionalities.
// This will allow for the easy addition of new functionalities as the application is being developed into a full CRM application.

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