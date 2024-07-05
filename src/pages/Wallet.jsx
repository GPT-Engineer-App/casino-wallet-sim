import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Modal from "@/components/ui/modal";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Import Select components

const BalanceCard = ({ balance }) => (
  <div className="mb-4">
    <h2 className="text-xl font-semibold">Current Balance: ₱{balance.toFixed(2)}</h2>
  </div>
);

const TransactionButtons = ({ formData, handleChange, handleSubmit, handlePayout, bankAccounts }) => (
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
            <Label htmlFor="bank_account">Bank Account</Label>
            <Select
              id="bank_account"
              name="bank_account"
              value={formData.bank_account}
              onValueChange={(value) => handleChange({ target: { name: "bank_account", value } })}
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
          <Button type="button" onClick={() => handlePayout()}>
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  </div>
);

const TransactionHistory = ({ transactions, searchQuery, setSearchQuery, selectedDateRange, setSelectedDateRange }) => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearchQuery = transaction.remarks.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDateRange = selectedDateRange
      ? new Date(transaction.timestamp) >= selectedDateRange.from && new Date(transaction.timestamp) <= selectedDateRange.to
      : true;
    return matchesSearchQuery && matchesDateRange;
  });

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDateRangeSelect = (range) => {
    setSelectedDateRange(range);
    setIsCalendarVisible(false);
  };

  const deposits = currentTransactions.filter(transaction => transaction.endpoint === "/payin");
  const withdrawals = currentTransactions.filter(transaction => transaction.endpoint === "/payout");

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
        <Button onClick={() => setIsCalendarVisible(!isCalendarVisible)}>
          {isCalendarVisible ? "Hide Calendar" : "Show Calendar"}
        </Button>
        {isCalendarVisible && (
          <Calendar
            mode="range"
            selected={selectedDateRange}
            onSelect={handleDateRangeSelect}
            className="rounded-md border mt-2"
          />
        )}
      </div>
      <div className="bg-gray-100 p-2 rounded">
        <h3 className="text-lg font-semibold mb-2">Deposits</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="bg-blue-500 text-white">#</TableHead>
              <TableHead className="bg-blue-500 text-white">Date and Time</TableHead>
              <TableHead className="bg-blue-500 text-white">Amount</TableHead>
              <TableHead className="bg-blue-500 text-white">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deposits.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell>{indexOfFirstTransaction + index + 1}</TableCell>
                <TableCell>{transaction.timestamp}</TableCell>
                <TableCell>₱{transaction.amount}</TableCell>
                <TableCell>Deposit</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="bg-gray-100 p-2 rounded mt-4">
        <h3 className="text-lg font-semibold mb-2">Withdrawals</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="bg-blue-500 text-white">#</TableHead>
              <TableHead className="bg-blue-500 text-white">Date and Time</TableHead>
              <TableHead className="bg-blue-500 text-white">Amount</TableHead>
              <TableHead className="bg-blue-500 text-white">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {withdrawals.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell>{indexOfFirstTransaction + index + 1}</TableCell>
                <TableCell>{transaction.timestamp}</TableCell>
                <TableCell>₱{transaction.amount}</TableCell>
                <TableCell>Withdraw</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, pageIndex) => (
            <PaginationItem key={pageIndex}>
              <PaginationLink
                href="#"
                onClick={() => handlePageChange(pageIndex + 1)}
                active={currentPage === pageIndex + 1}
              >
                {pageIndex + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

const Wallet = () => {
  const [formData, setFormData] = useState({
    amount: "100",
    pay_method: "sp-qrph",
    remarks: "remarks payin",
    bank_account: "",
  });

  const [result, setResult] = useState(null);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [bankAccounts, setBankAccounts] = useState([]);

  useEffect(() => {
    const storedBalance = localStorage.getItem("balance");
    const storedTransactions = localStorage.getItem("transactions");
    const storedBankAccounts = localStorage.getItem("bankAccounts");

    if (storedBalance) setBalance(parseFloat(storedBalance));
    if (storedTransactions) setTransactions(JSON.parse(storedTransactions));
    if (storedBankAccounts) setBankAccounts(JSON.parse(storedBankAccounts));
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

  const handlePayout = async () => {
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

      setBalance((prevBalance) => prevBalance - parseFloat(formData.amount));

      setTransactions((prevTransactions) => [
        ...prevTransactions,
        { ...formData, endpoint: "/payout", timestamp: new Date().toISOString() },
      ]);

      toast.success("Payout successful!");
    } catch (error) {
      toast.error("Payout failed!");
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
        <TransactionButtons formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} handlePayout={handlePayout} bankAccounts={bankAccounts} />
      </div>
      {result && (
        <pre className="mt-4 p-2 bg-gray-100 rounded">{JSON.stringify(result, null, 2)}</pre>
      )}
      <div className="p-4 mb-4 bg-white rounded shadow">
        <TransactionHistory transactions={transactions} searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedDateRange={selectedDateRange} setSelectedDateRange={setSelectedDateRange} />
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

export default Wallet;