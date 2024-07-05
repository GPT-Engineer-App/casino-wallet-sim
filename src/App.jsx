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
import CashOut from "./pages/CashOut.jsx"; // Import CashOut page
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
            <Route path="/" element={<Layout />}>
              <Route index element={<LandingPage />} /> {/* Landing page */}
              <Route path="signin" element={<SignIn />} /> {/* Sign-in page */}
              <Route path="register" element={<Registration />} /> {/* Registration page */}
              <Route path="qr-code-storage" element={<QrCodeStorage />} /> {/* QR code storage page */}
              <Route path="index" element={<Index />} /> {/* Index page */}
              <Route path="topup" element={<TopUp />} /> {/* Top Up page */}
              <Route path="cashout" element={<CashOut />} /> {/* Cash Out page */}
            </Route>
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;