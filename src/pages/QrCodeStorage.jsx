import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import QRCode from "qrcode.react";

const QrCodeStorage = () => {
  const [qrCode, setQrCode] = useState(null);

  useEffect(() => {
    // Simulate fetching the token from the sample API
    const token = "sample-token-from-api";
    setQrCode(token);
  }, []);

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
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">QR Code Storage</h1>
      <div className="text-center">
        <p>Save this QR code and keep it safe. It is your key to log in.</p>
        {qrCode && <QRCode id="qrCodeCanvas" value={qrCode} size={256} />}
        <Button onClick={handleDownloadQrCode} className="mt-4">Download QR Code</Button>
      </div>
    </div>
  );
};

export default QrCodeStorage;