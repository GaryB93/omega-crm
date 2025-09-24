import { Outlet, Navigate } from "react-router";

function ProtectedRoutes({ isLoggedIn }: { isLoggedIn: boolean}) {
  return isLoggedIn ? <Outlet/> : <Navigate to="/"/>
}

export default ProtectedRoutes;