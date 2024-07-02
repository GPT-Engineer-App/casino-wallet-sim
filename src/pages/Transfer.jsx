import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Transfer = () => {
  const [formData, setFormData] = useState({
    amount: "",
    recipient: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle fund transfer
    toast.success("Funds transferred successfully!");
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Transfer Funds</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="recipient">Recipient</Label>
          <Input
            id="recipient"
            name="recipient"
            type="text"
            value={formData.recipient}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit">Transfer</Button>
      </form>
    </div>
  );
};

export default Transfer;