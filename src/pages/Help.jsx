import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const predefinedResponses = [
  "Hello! How can I assist you today?",
  "I'm here to help! What do you need?",
  "Feel free to ask me anything.",
  "I'm a fake chatbot, but I'll do my best to assist you!"
];

const Help = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const handleSendMessage = () => {
    if (userInput.trim() === "") return;

    const newMessages = [...messages, { sender: "user", text: userInput }];
    const botResponse = predefinedResponses[Math.floor(Math.random() * predefinedResponses.length)];
    newMessages.push({ sender: "bot", text: botResponse });

    setMessages(newMessages);
    setUserInput("");
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Help</h1>
      <Card>
        <CardHeader>
          <CardTitle>Chat with our Support Bot</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 max-h-64 overflow-y-auto">
            {messages.map((message, index) => (
              <div key={index} className={`mb-2 ${message.sender === "user" ? "text-right" : "text-left"}`}>
                <span className={`inline-block p-2 rounded ${message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
                  {message.text}
                </span>
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <Input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message..."
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Help;