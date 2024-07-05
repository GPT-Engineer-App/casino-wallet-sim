import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { CircleUser, Menu, DollarSign, Home, Users, Play, HelpCircle, UserPlus, CreditCard } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { navItems } from "../App";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

const Layout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    return storedAuth ? JSON.parse(storedAuth) : false;
  });

  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme : "light";
  });

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", true);
    toast.success("Logged in successfully!");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem("isAuthenticated", false);
    toast.success("Logged out successfully!");
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <MobileSidebar />
          <div className="w-full flex-1">
            <span className="text-xl font-bold">Lazy Cat Online Casino</span>
          </div>
          <UserDropdown isAuthenticated={isAuthenticated} onLogin={handleLogin} onLogout={handleLogout} onThemeToggle={handleThemeToggle} theme={theme} />
        </header>
        <main className="flex-grow p-4 overflow-auto bg-gray-100">
          <Outlet />
        </main>
        <Footer /> {/* Add Footer component */}
      </div>
    </div>
  );
};

const Sidebar = () => (
  <div className="hidden border-r bg-muted/40 md:block">
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <NavLink to="/" className="flex items-center gap-2 font-semibold">
          <DollarSign className="h-6 w-6" />
          <span>Casino Wallet</span>
        </NavLink>
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-2">
          {navItems.map((item) => (
            <SidebarNavLink key={item.to} to={item.to}>
              {item.icon}
              {item.title}
            </SidebarNavLink>
          ))}
          <SidebarNavLink to="/topup">
            <CreditCard className="h-4 w-4" />
            TopUp
          </SidebarNavLink>
          <SidebarNavLink to="/signin">
            <UserPlus className="h-4 w-4" />
            Sign In
          </SidebarNavLink>
        </nav>
      </div>
    </div>
  </div>
);

const MobileSidebar = () => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="outline" size="icon" className="shrink-0 md:hidden">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle navigation menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent side="left" className="flex flex-col">
      <nav className="grid gap-2 text-lg font-medium">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-lg font-semibold mb-4"
        >
          <DollarSign className="h-6 w-6" />
          <span>Casino Wallet</span>
        </NavLink>
        {navItems.map((item) => (
          <SidebarNavLink key={item.to} to={item.to}>
            {item.title}
          </SidebarNavLink>
        ))}
        <SidebarNavLink to="/topup">
          <CreditCard className="h-4 w-4" />
          TopUp
        </SidebarNavLink>
        <SidebarNavLink to="/signin">
          <UserPlus className="h-4 w-4" />
          Sign In
        </SidebarNavLink>
      </nav>
    </SheetContent>
  </Sheet>
);

const UserDropdown = ({ isAuthenticated, onLogin, onLogout, onThemeToggle, theme }) => {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isAuthenticated ? (
          <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={onLogin}>Login</DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => navigate("/profile")}>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex items-center justify-between">
            <span>Dark Mode</span>
            <Switch checked={theme === "dark"} onCheckedChange={onThemeToggle} />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const SidebarNavLink = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary text-muted-foreground",
        isActive && "text-primary bg-muted",
      )
    }
  >
    {children}
  </NavLink>
);

const Footer = () => (
  <footer className="sticky bottom-0 flex justify-around items-center h-16 bg-muted/40 border-t">
    <FooterIcon to="/" icon={<Home className="h-6 w-6" />} label="Home" />
    <FooterIcon to="/transfer" icon={<Users className="h-6 w-6" />} label="Transfer Fund to Friends" />
    <FooterIcon to="https://747-5.com" icon={<Play className="h-6 w-6" />} label="Play" external />
    <FooterIcon to="/help" icon={<HelpCircle className="h-6 w-6" />} label="Help" />
  </footer>
);

const FooterIcon = ({ to, icon, label, external }) => {
  const linkProps = external ? { href: to, target: "_blank", rel: "noopener noreferrer" } : { to };

  return (
    <NavLink {...linkProps} className="flex flex-col items-center text-muted-foreground hover:text-primary">
      {icon}
      <span className="text-xs">{label}</span>
    </NavLink>
  );
};

export default Layout;