import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import QRCode from "qrcode.react";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobilenumber: "",
    address: "",
  });

  const [qrCode, setQrCode] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Save data in browser cache
      localStorage.setItem("registrationData", JSON.stringify(formData));

      // Generate QR code
      const qrData = JSON.stringify(formData);
      setQrCode(qrData);

      toast.success("Registration successful!");
    } catch (error) {
      toast.error("Registration failed!");
      console.error("Error:", error);
    }
  };

  const handleDownloadQrCode = () => {
    const canvas = document.getElementById("qrCodeCanvas");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qr_code.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit}>
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Mobile Number", name: "mobilenumber", type: "text" },
          { label: "Address", name: "address", type: "text" },
        ].map((field) => (
          <div key={field.name} className="mb-4">
            <Label htmlFor={field.name}>{field.label}</Label>
            <Input
              id={field.name}
              name={field.name}
              type={field.type}
              value={formData[field.name]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <Button type="submit">Register</Button>
      </form>
      {qrCode && (
        <Dialog open={true}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>QR Code</DialogTitle>
            </DialogHeader>
            <div className="text-center">
              <p>Save this QR code and keep it safe. It is your key to log in.</p>
              <QRCode id="qrCodeCanvas" value={qrCode} size={256} />
              <Button onClick={handleDownloadQrCode} className="mt-4">Download QR Code</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Registration;