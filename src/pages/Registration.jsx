import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "gerald",
    email: "marcSmith@yahoo.com",
    mobilenumber: "0909333322",
    address: "Manila ph",
    amount: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://api.nexuspay.cloud/payin/process', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer W6Bqqa2nhGmcWKFg5trryaaQjtOspejlo33Oep4="
        },
        body: JSON.stringify({
          ...formData,
          pay_method: "sp-qrph",
          webhook: "https://api.nexuspay.cloud/payin/payinwebhook.php",
          currency: "PHP",
          reference: "1234567890",
          transaction_id: "txn_1234567890"
        }),
      });

      const result = await response.json();
      if (result.redirect_url) {
        window.location.href = result.redirect_url;
        return;
      }

      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      toast.error("Registration failed!");
      console.error("Error:", error);
    }
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
          { label: "Amount", name: "amount", type: "number" },
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
    </div>
  );
};

export default Registration;