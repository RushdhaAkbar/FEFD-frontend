import NavigationBar from "@/NavigationBar";
import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/sonner";
function RootLayout() {
    return (
        <>
            <NavigationBar />
            <Outlet />
            <Toaster/>
        </>);
}

export default RootLayout;
// outlet basically shows the components in between the routes
// the home page and the cart that has the shared nav