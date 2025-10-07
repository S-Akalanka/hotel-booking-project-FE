import { Outlet } from "react-router";
import Navigation from "../Navigation";
import Footer from "../Footer";

export default function RootLayout(){
    return (
        <>
            <Navigation/>
            <Outlet/>
            <Footer/>
        </>
    )
}