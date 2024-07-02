import { Home, Users, Play, HelpCircle } from "lucide-react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white flex justify-around items-center h-16">
      <NavLink to="/" className="flex flex-col items-center">
        <Home className="h-6 w-6" />
        <span>Home</span>
      </NavLink>
      <NavLink to="/transfer" className="flex flex-col items-center">
        <Users className="h-6 w-6" />
        <span>Transfer</span>
      </NavLink>
      <a href="https://747-5.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
        <Play className="h-6 w-6" />
        <span>Play</span>
      </a>
      <NavLink to="/help" className="flex flex-col items-center">
        <HelpCircle className="h-6 w-6" />
        <span>Help</span>
      </NavLink>
    </footer>
  );
};

export default Footer;