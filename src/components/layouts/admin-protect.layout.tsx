import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router";

export default function AdminProtectLayout() {

    const { user } = useUser();

    if (user?.publicMetadata?.role !== "admin") {
        return <Navigate to="/" />
    }

    return <Outlet />
}