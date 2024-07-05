import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import QRCode from "qrcode.react";

const SignIn = () => {
  const [qrCode, setQrCode] = useState(null);

  const [generatedQrCode, setGeneratedQrCode] = useState(null);
  const navigate = useNavigate();

  const handleQrCodeUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setQrCode(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSignIn = () => {
    const storedBearerToken = localStorage.getItem("bearerToken");
    if (storedBearerToken) {
      const generatedQrCodeData = QRCode.toDataURL(storedBearerToken);
      setGeneratedQrCode(generatedQrCodeData);

      if (qrCode === generatedQrCodeData) {
        localStorage.setItem("isAuthenticated", "true");
        toast.success("Sign in successful!");
        navigate("/index");
      } else {
        toast.error("Invalid QR code. Please try again.");
      }
    } else {
      toast.error("No QR code found. Please register first.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>
      <div className="mb-4 border border-gray-300 p-4 rounded">
        {qrCode ? (
          <img src={qrCode} alt="QR Code" className="w-full h-auto" />
        ) : (
          <div className="w-full h-48 flex items-center justify-center border border-dashed border-gray-300">
            <span className="text-gray-500">QR Code will be displayed here</span>
          </div>
        )}
      </div>
      <div className="mb-4">
        <Input type="file" accept="image/*" onChange={handleQrCodeUpload} />
      </div>
      <Button type="button" onClick={handleSignIn}>
        Submit
      </Button>
      <div className="mt-4 text-center">
        <p>Don't have an account? <Link to="/register" className="text-blue-500">Register here</Link></p>
      </div>
    </div>
  );
};

export default SignIn;