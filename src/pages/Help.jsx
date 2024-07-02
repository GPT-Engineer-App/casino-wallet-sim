import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Help = () => {
  const [question, setQuestion] = useState("");

  const handleChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle FAQ and chatbot assistant
    toast.success("Your question has been submitted!");
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Help</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="question">Ask a Question</Label>
          <Input
            id="question"
            name="question"
            type="text"
            value={question}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Help;