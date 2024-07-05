import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CashOut = () => {
  const [formData, setFormData] = useState({
    amount: "",
    bank_account: "",
  });

  const [bankAccounts, setBankAccounts] = useState([]);

  useEffect(() => {
    const storedBankAccounts = localStorage.getItem("bankAccounts");
    if (storedBankAccounts) {
      setBankAccounts(JSON.parse(storedBankAccounts));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://api.nexuspay.cloud/payout/process', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer W6Bqqa2nhGmcWKFg5trryaaQjtOspejlo33Oep4="
        },
        body: JSON.stringify({
          name: "gerald",
          email: "marcSmith@yahoo.com",
          amount: formData.amount,
          bank_account: formData.bank_account,
          mobilenumber: "0909333322",
          address: "Manila ph",
          webhook: "https://api.nexuspay.cloud/payout/payoutwebhook.php",
          remarks: "Cash out",
          currency: "PHP",
          reference: "1234567890",
          transaction_id: "txn_1234567890"
        }),
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Cash out successful!");
      } else {
        toast.error("Cash out failed!");
      }
    } catch (error) {
      toast.error("Cash out failed!");
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Cash Out</h1>
      <form>
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
        <div className="mb-4">
          <Label htmlFor="bank_account">Bank Account</Label>
          <Select
            id="bank_account"
            name="bank_account"
            value={formData.bank_account}
            onValueChange={(value) => setFormData((prevData) => ({ ...prevData, bank_account: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a bank account" />
            </SelectTrigger>
            <SelectContent>
              {bankAccounts.map((account, index) => (
                <SelectItem key={index} value={account.accountNumber}>
                  {account.bankName} - {account.accountNumber}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button type="button" onClick={handleSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CashOut;