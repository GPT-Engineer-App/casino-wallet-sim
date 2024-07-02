import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
    mobilenumber: "",
    address: "",
    pay_method: "",
    remarks: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (endpoint) => {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      setResult(result);
      toast.success("Transaction successful!");
    } catch (error) {
      toast.error("Transaction failed!");
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Casino Wallet Simulation</h1>
      <form>
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Amount", name: "amount", type: "number" },
          { label: "Mobile Number", name: "mobilenumber", type: "text" },
          { label: "Address", name: "address", type: "text" },
          { label: "Pay Method", name: "pay_method", type: "text" },
          { label: "Remarks", name: "remarks", type: "text" },
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
        <div className="flex space-x-2">
          <Button type="button" onClick={() => handleSubmit("/payin")}>
            Deposit
          </Button>
          <Button type="button" onClick={() => handleSubmit("/payout")}>
            Withdraw
          </Button>
        </div>
      </form>
      {result && (
        <pre className="mt-4 p-2 bg-gray-100 rounded">{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
};

export default Index;