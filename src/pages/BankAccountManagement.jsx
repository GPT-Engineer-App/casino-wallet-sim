import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const BankAccountManagement = () => {
  const [formData, setFormData] = useState({
    bankName: "",
    accountNumber: "",
    accountHolderName: "",
    bankBranch: "",
    swiftCode: "",
  });

  const [bankAccounts, setBankAccounts] = useState([]);

  useEffect(() => {
    const storedBankAccounts = localStorage.getItem("bankAccounts");
    if (storedBankAccounts) {
      setBankAccounts(JSON.parse(storedBankAccounts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bankAccounts", JSON.stringify(bankAccounts));
  }, [bankAccounts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBankAccounts((prevAccounts) => [...prevAccounts, formData]);
    setFormData({
      bankName: "",
      accountNumber: "",
      accountHolderName: "",
      bankBranch: "",
      swiftCode: "",
    });
    toast.success("Bank account added successfully!");
  };

  const handleDelete = (index) => {
    setBankAccounts((prevAccounts) => prevAccounts.filter((_, i) => i !== index));
    toast.success("Bank account deleted successfully!");
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Bank Account Management</h1>
      <form onSubmit={handleSubmit}>
        {[
          { label: "Bank Name", name: "bankName", type: "text" },
          { label: "Account Number", name: "accountNumber", type: "text" },
          { label: "Account Holder Name", name: "accountHolderName", type: "text" },
          { label: "Bank Branch", name: "bankBranch", type: "text" },
          { label: "SWIFT Code", name: "swiftCode", type: "text", optional: true },
        ].map((field) => (
          <div key={field.name} className="mb-4">
            <Label htmlFor={field.name}>{field.label}</Label>
            <Input
              id={field.name}
              name={field.name}
              type={field.type}
              value={formData[field.name]}
              onChange={handleChange}
              required={!field.optional}
            />
          </div>
        ))}
        <Button type="submit">Add Bank Account</Button>
      </form>
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Saved Bank Accounts</h2>
        {bankAccounts.length === 0 ? (
          <p>No bank accounts saved.</p>
        ) : (
          <ul>
            {bankAccounts.map((account, index) => (
              <li key={index} className="mb-2 p-2 border rounded flex justify-between items-center">
                <div>
                  <p>{account.bankName}</p>
                  <p>{account.accountNumber}</p>
                  <p>{account.accountHolderName}</p>
                  <p>{account.bankBranch}</p>
                  {account.swiftCode && <p>{account.swiftCode}</p>}
                </div>
                <Button variant="destructive" onClick={() => handleDelete(index)}>Delete</Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BankAccountManagement;