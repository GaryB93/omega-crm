// This component is a wrapper designed to protect application routes from being accessed by manipulating the website path and redirects the user to the login page if they have not logged in.

import { Outlet, Navigate } from "react-router";

function ProtectedRoutes({ isLoggedIn }: { isLoggedIn: boolean}) {
  return isLoggedIn ? <Outlet/> : <Navigate to="/"/>
}

export default ProtectedRoutes;