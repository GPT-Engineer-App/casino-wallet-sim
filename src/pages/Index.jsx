import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "gerald",
    email: "marcSmith@yahoo.com",
    amount: "100",
    mobilenumber: "0909333322",
    address: "Manila ph",
    pay_method: "sp-qrph",
    remarks: "remarks payin",
  });

  const [result, setResult] = useState(null);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedBalance = localStorage.getItem("balance");
    const storedTransactions = localStorage.getItem("transactions");
    const storedAuth = localStorage.getItem("isAuthenticated");

    if (storedBalance) setBalance(parseFloat(storedBalance));
    if (storedTransactions) setTransactions(JSON.parse(storedTransactions));
    if (storedAuth) setIsAuthenticated(JSON.parse(storedAuth));
  }, []);

  useEffect(() => {
    localStorage.setItem("balance", balance);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [balance, transactions, isAuthenticated]);

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
          "Authorization": "Bearer W6Bqqa2nhGmcWKFg5trryaaQjtOspejlo33Oep4="
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      setResult(result);

      if (endpoint === "/payin") {
        setBalance((prevBalance) => prevBalance + parseFloat(formData.amount));
      } else if (endpoint === "/payout") {
        setBalance((prevBalance) => prevBalance - parseFloat(formData.amount));
      }

      setTransactions((prevTransactions) => [
        ...prevTransactions,
        { ...formData, endpoint, timestamp: new Date().toISOString() },
      ]);

      toast.success("Transaction successful!");
    } catch (error) {
      toast.error("Transaction failed!");
      console.error("Error:", error);
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    toast.success("Logged in successfully!");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    toast.success("Logged out successfully!");
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <Button onClick={handleLogin}>Login</Button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Casino Wallet Simulation</h1>
      <Button onClick={handleLogout} className="mb-4">Logout</Button>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Current Balance: ${balance.toFixed(2)}</h2>
      </div>
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
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Transaction History</h2>
        <ul className="bg-gray-100 p-2 rounded">
          {transactions.map((transaction, index) => (
            <li key={index} className="mb-2">
              <div>{transaction.timestamp}</div>
              <div>{transaction.endpoint === "/payin" ? "Deposit" : "Withdraw"}: ${transaction.amount}</div>
              <div>Remarks: {transaction.remarks}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Index;