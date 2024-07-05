import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TopUp = () => {
  const [formData, setFormData] = useState({
    amount: "",
    pay_method: "sp-qrph",
  });

  const [showModal, setShowModal] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [bearerToken, setBearerToken] = useState("");

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("registrationData");
    const storedBearerToken = localStorage.getItem("bearerToken");

    if (storedUserDetails) setUserDetails(JSON.parse(storedUserDetails));
    if (storedBearerToken) setBearerToken(storedBearerToken);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://api.nexuspay.cloud/payin/process', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${bearerToken}`
        },
        body: JSON.stringify({
          ...userDetails,
          amount: formData.amount,
          pay_method: formData.pay_method,
          webhook: "https://api.nexuspay.cloud/payin/payinwebhook.php",
          remarks: "remarks payin",
          currency: "PHP",
          reference: "1234567890",
          transaction_id: "txn_1234567890"
        }),
      });

      const result = await response.json();
      setPaymentUrl(result.redirect_url);
      setShowModal(true);

      toast.success("Transaction initiated successfully!");
    } catch (error) {
      toast.error("Transaction failed!");
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Top Up</h1>
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
          <Select
            id="pay_method"
            name="pay_method"
            value={formData.pay_method}
            onValueChange={(value) => setFormData((prevData) => ({ ...prevData, pay_method: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sp-qrph">SP QRPH</SelectItem>
              <SelectItem value="online-banking">Online Banking</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="button" onClick={handleSubmit}>
          Submit
        </Button>
      </form>
      {showModal && (
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Payment</DialogTitle>
            </DialogHeader>
            <div className="text-center">
              <p>Click the "Pay" button to proceed with the payment of ₱{formData.amount}.</p>
              <Button as="a" href={paymentUrl} target="_blank" className="mt-4">
                Pay
              </Button>
              <iframe src={paymentUrl} className="w-full h-64 mt-4" title="Payment"></iframe>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default TopUp;