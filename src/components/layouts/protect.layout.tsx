import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router";

const ProtectLayout = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return null;
  }

  if (isLoaded && !isSignedIn) {
    return <Navigate to="/sign-in" />;
  }
  
  return <Outlet />
}

export default ProtectLayout;