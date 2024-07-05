import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "lucide-react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Profile from "./pages/Profile.jsx";
import Layout from "./layouts/sidebar"; // Change layout to sidebar
import Wallet from "./pages/Wallet.jsx";
import Registration from "./pages/Registration.jsx";
import SignIn from "./pages/SignIn.jsx";
import TopUp from "./pages/TopUp.jsx"; // Import TopUp page
import QrCodeStorage from "./pages/QrCodeStorage.jsx"; // Import QrCodeStorage page
import BankAccountManagement from "./pages/BankAccountManagement.jsx"; // Import BankAccountManagement page
import Help from "./pages/Help.jsx"; // Import Help page
import BlankPage1 from "./pages/BlankPage1.jsx";
import BlankPage2 from "./pages/BlankPage2.jsx";
import LandingPage from "./pages/LandingPage.jsx"; // Import LandingPage

const queryClient = new QueryClient();

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Landing",
    to: "/landing",
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
            <Route path="/" element={<Wallet />} /> {/* Set Wallet as the default route */}
            <Route path="profile" element={<Profile />} />
            <Route path="register" element={<Registration />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="topup" element={<TopUp />} />
            <Route path="qr-code-storage" element={<QrCodeStorage />} />
            <Route path="bank-account-management" element={<BankAccountManagement />} />
            <Route path="help" element={<Help />} />
            <Route path="blank-page-1" element={<BlankPage1 />} />
            <Route path="blank-page-2" element={<BlankPage2 />} />
            <Route path="landing" element={<LandingPage />} /> {/* Add LandingPage route */}
            <Route path="wallet" element={<Layout />}>
              <Route index element={<Wallet />} />
            </Route>
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;