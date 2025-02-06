import NavigationBar from "@/NavigationBar";
import { Outlet } from "react-router";

function RootLayout() {
    return (
        <>
            <NavigationBar />
            <Outlet />
        </>);
}

export default RootLayout;
// outlet basically shows the components in between the routes
// the home page and the cart that has the shared nav