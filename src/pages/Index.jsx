import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Index = () => {
  const [formData, setFormData] = useState({
    amount: "100",
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
      const response = await fetch('https://api.nexuspay.cloud/payin/process', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer W6Bqqa2nhGmcWKFg5trryaaQjtOspejlo33Oep4="
        },
        body: JSON.stringify({
          name: "gerald",
          email: "marcSmith@yahoo.com",
          amount: formData.amount,
          pay_method: formData.pay_method,
          mobilenumber: "0909333322",
          address: "Manila ph",
          webhook: "https://api.nexuspay.cloud/payin/payinwebhook.php",
          remarks: formData.remarks,
          currency: "PHP",
          reference: "1234567890",
          transaction_id: "txn_1234567890"
        }),
      });

      const result = await response.json();
      setResult(result);

      if (result.redirect_url) {
        window.location.href = result.redirect_url;
        return;
      }

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

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <Button onClick={() => setIsAuthenticated(true)}>Login</Button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Casino Wallet Simulation</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Current Balance: ${balance.toFixed(2)}</h2>
      </div>
      <div className="flex space-x-2 mb-4">
        <Button onClick={() => setIsAuthenticated(false)}>Logout</Button>
      </div>
      <div className="flex space-x-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Deposit</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Deposit</DialogTitle>
            </DialogHeader>
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
                <Label htmlFor="pay_method">Pay Method</Label>
                <Input
                  id="pay_method"
                  name="pay_method"
                  type="text"
                  value={formData.pay_method}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="button" onClick={() => handleSubmit("/payin")}>
                Submit
              </Button>
            </form>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Withdraw</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Withdraw</DialogTitle>
            </DialogHeader>
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
                <Label htmlFor="pay_method">Pay Method</Label>
                <Input
                  id="pay_method"
                  name="pay_method"
                  type="text"
                  value={formData.pay_method}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="button" onClick={() => handleSubmit("/payout")}>
                Submit
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
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