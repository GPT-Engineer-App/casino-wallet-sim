import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const SignIn = () => {
  const [qrCode, setQrCode] = useState(null);

  const handleQrCodeUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setQrCode(reader.result);
    };
    reader.readAsDataURL(file);
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
      <Button type="button" onClick={() => toast.success("QR Code submitted!")}>
        Submit
      </Button>
    </div>
  );
};

export default SignIn;