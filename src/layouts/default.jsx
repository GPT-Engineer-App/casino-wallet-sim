import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer"; // Import Footer

const Layout = () => {
  return (
    <main className="flex flex-col min-h-screen p-4 overflow-auto items-center justify-center">
      <Outlet />
      <Footer /> {/* Add Footer here */}
    </main>
  );
};

export default Layout;