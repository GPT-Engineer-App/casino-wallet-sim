import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Home, Shield, Users, DollarSign, CreditCard, Banknote } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/new-casino-hero.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Welcome to LazyCat Online Casino</h1>
          <p className="text-xl mb-8">Seamless transactions for deposits and withdrawals of funds.</p>
          <Button as={Link} to="/signin" variant="primary" size="lg">Get Started</Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <DollarSign className="h-12 w-12 mx-auto text-primary" />
                <CardTitle className="mt-4">Easy Deposits</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Deposit funds into your casino wallet quickly and easily.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CreditCard className="h-12 w-12 mx-auto text-primary" />
                <CardTitle className="mt-4">Secure Withdrawals</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Withdraw your winnings securely and without hassle.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Banknote className="h-12 w-12 mx-auto text-primary" />
                <CardTitle className="mt-4">Manage Funds</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Keep track of your deposits, withdrawals, and balance all in one place.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-white">
        <div className="container mx-auto text-center">
          <div className="mb-4">
            <Link to="/about" className="text-white hover:underline mx-2">About Us</Link>
            <Link to="/contact" className="text-white hover:underline mx-2">Contact</Link>
            <Link to="/privacy" className="text-white hover:underline mx-2">Privacy Policy</Link>
          </div>
          <div className="flex justify-center space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;