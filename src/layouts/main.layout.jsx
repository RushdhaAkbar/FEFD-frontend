
import NavigationBar from "@/components/NavigationBar";
import { Outlet } from "react-router";

function MainLayout() {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
}

export default MainLayout;