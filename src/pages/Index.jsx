import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Modal from "@/components/ui/modal";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const BalanceCard = ({ balance }) => (
  <div className="mb-4">
    <h2 className="text-xl font-semibold">Current Balance: ₱{balance.toFixed(2)}</h2>
  </div>
);

const TransactionButtons = ({ formData, handleChange, handleSubmit }) => (
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
            <select
              id="pay_method"
              name="pay_method"
              value={formData.pay_method}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="sp-qrph">SP-QRPH</option>
            </select>
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
            <select
              id="pay_method"
              name="pay_method"
              value={formData.pay_method}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="sp-qrph">SP-QRPH</option>
            </select>
          </div>
          <Button type="button" onClick={() => handleSubmit("/payout")}>
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  </div>
);

const TransactionHistory = ({ transactions, searchQuery, setSearchQuery, selectedDate, setSelectedDate }) => {
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearchQuery = transaction.remarks.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = selectedDate ? format(new Date(transaction.timestamp), "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd") : true;
    return matchesSearchQuery && matchesDate;
  });

  const depositTransactions = filteredTransactions.filter(transaction => transaction.endpoint === "/payin");
  const withdrawTransactions = filteredTransactions.filter(transaction => transaction.endpoint === "/payout");

  return (
    <div className="mt-4 max-h-96 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-2">Transaction History</h2>
      <div className="mb-4">
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by remarks"
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="date">Filter by Date</Label>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
        />
      </div>
      <div className="bg-gray-100 p-2 rounded">
        <h3 className="text-lg font-semibold mb-2">Deposits</h3>
        <ul>
          {depositTransactions.map((transaction, index) => (
            <li key={index} className="mb-2">
              <div>{transaction.timestamp}</div>
              <div>Deposit: ₱{transaction.amount}</div>
              <div>Remarks: {transaction.remarks}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-gray-100 p-2 rounded mt-4">
        <h3 className="text-lg font-semibold mb-2">Withdrawals</h3>
        <ul>
          {withdrawTransactions.map((transaction, index) => (
            <li key={index} className="mb-2">
              <div>{transaction.timestamp}</div>
              <div>Withdraw: ₱{transaction.amount}</div>
              <div>Remarks: {transaction.remarks}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Index = () => {
  const [formData, setFormData] = useState({
    amount: "100",
    pay_method: "sp-qrph",
    remarks: "remarks payin",
  });

  const [result, setResult] = useState(null);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const storedBalance = localStorage.getItem("balance");
    const storedTransactions = localStorage.getItem("transactions");

    if (storedBalance) setBalance(parseFloat(storedBalance));
    if (storedTransactions) setTransactions(JSON.parse(storedTransactions));
  }, []);

  useEffect(() => {
    localStorage.setItem("balance", balance);
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [balance, transactions]);

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
        setPaymentUrl(result.redirect_url);
        setShowModal(true);
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

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">My Lazy Wallet</h1>
      <div className="p-4 mb-4 bg-white rounded shadow">
        <BalanceCard balance={balance} />
      </div>
      <div className="p-4 mb-4 bg-white rounded shadow">
        <TransactionButtons formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
      </div>
      {result && (
        <pre className="mt-4 p-2 bg-gray-100 rounded">{JSON.stringify(result, null, 2)}</pre>
      )}
      <div className="p-4 mb-4 bg-white rounded shadow">
        <TransactionHistory transactions={transactions} searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <iframe src={paymentUrl} title="Payment" className="w-full h-64"></iframe>
          <Button onClick={() => window.location.href = paymentUrl}>Pay</Button>
        </Modal>
      )}
    </div>
  );
};

export default Index;