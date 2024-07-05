import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "lucide-react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Profile from "./pages/Profile.jsx";
import Layout from "./layouts/sidebar"; // Change layout to sidebar
import Index from "./pages/Index.jsx";
import Registration from "./pages/Registration.jsx";
import Login from "./pages/Login.jsx";
const queryClient = new QueryClient();

export const navItems = [
  {
    title: "Home", // Feel free to change this to your liking
    to: "/home",
    icon: <Home className="h-4 w-4" />,
  },
];

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="profile" element={<Profile />} />
              <Route path="register" element={<Registration />} />
            </Route>
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;