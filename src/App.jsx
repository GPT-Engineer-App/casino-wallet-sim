import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "lucide-react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Profile from "./pages/Profile.jsx";
import Layout from "./layouts/sidebar"; // Change layout to sidebar
import Index from "./pages/Index.jsx";
import Footer from "./components/Footer";
import Transfer from "./pages/Transfer.jsx";
import Help from "./pages/Help.jsx";

const queryClient = new QueryClient();

export const navItems = [
  {
    title: "Home", // Feel free to change this to your liking
    to: "/",
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
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="profile" element={<Profile />} />
              <Route path="transfer" element={<Transfer />} />
              <Route path="help" element={<Help />} />
            </Route>
          </Routes>
        </Router>
        <Footer />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;