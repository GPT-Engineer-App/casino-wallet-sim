import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "lucide-react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Profile from "./pages/Profile.jsx";
import Layout from "./layouts/sidebar"; // Change layout to sidebar
import Index from "./pages/Index.jsx";
import Registration from "./pages/Registration.jsx";
import SignIn from "./pages/SignIn.jsx";
import TopUp from "./pages/TopUp.jsx"; // Import TopUp page
import QrCodeStorage from "./pages/QrCodeStorage.jsx"; // Import QrCodeStorage page
import BankAccountManagement from "./pages/BankAccountManagement.jsx"; // Import BankAccountManagement page
import Help from "./pages/Help.jsx"; // Import Help page

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
              <Route path="register" element={<Registration />} />
              <Route path="signin" element={<SignIn />} /> {/* Add this line */}
              <Route path="topup" element={<TopUp />} /> {/* Add this line */}
              <Route path="qr-code-storage" element={<QrCodeStorage />} /> {/* Add this line */}
              <Route path="bank-account-management" element={<BankAccountManagement />} /> {/* Add this line */}
              <Route path="help" element={<Help />} /> {/* Add this line */}
            </Route>
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;