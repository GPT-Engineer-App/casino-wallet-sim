import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Home, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/hero-background.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Welcome to Our Application</h1>
          <p className="text-xl mb-8">The best solution for managing your tasks efficiently.</p>
          <Button as={Link} to="/register" variant="primary" size="lg">Get Started</Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Home className="h-12 w-12 mx-auto text-primary" />
                <CardTitle className="mt-4">Easy to Use</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Our application is designed with a user-friendly interface that makes it easy to navigate and use.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 mx-auto text-primary" />
                <CardTitle className="mt-4">Secure</CardTitle>
              </CardHeader>
              <CardContent>
                <p>We prioritize your security with top-notch features to keep your data safe and secure.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Users className="h-12 w-12 mx-auto text-primary" />
                <CardTitle className="mt-4">Collaborative</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Work together with your team seamlessly with our collaborative tools and features.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Avatar className="mx-auto">
                  <AvatarImage src="/images/user1.jpg" alt="User 1" />
                  <AvatarFallback>U1</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4">John Doe</CardTitle>
              </CardHeader>
              <CardContent>
                <p>"This application has transformed the way I manage my tasks. Highly recommended!"</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Avatar className="mx-auto">
                  <AvatarImage src="/images/user2.jpg" alt="User 2" />
                  <AvatarFallback>U2</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4">Jane Smith</CardTitle>
              </CardHeader>
              <CardContent>
                <p>"A game-changer for our team. The collaborative features are fantastic!"</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Avatar className="mx-auto">
                  <AvatarImage src="/images/user3.jpg" alt="User 3" />
                  <AvatarFallback>U3</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4">Alice Johnson</CardTitle>
              </CardHeader>
              <CardContent>
                <p>"Secure and easy to use. I can't imagine going back to our old system."</p>
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