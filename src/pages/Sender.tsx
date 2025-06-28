"use client";

import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, ArrowLeft, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Message {
  _id: string;
  from: string;
  to: string;
  message: string;
  createdAt: string;
}

export default function SenderPage() {
  const [messageInput, setMessageInput] = useState("");
  const [recipientInput, setRecipientInput] = useState("clientB");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();



  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !recipientInput.trim()) return;

    setLoading(true);
    const newMessage = {
      from: "clientA",
      to: recipientInput.trim(),
      message: messageInput.trim(),
    };

    try {
      const res = await axios.post<{ success: boolean; data: Message }>(
        `${import.meta.env.VITE_CLIENT_A_URL}/send-message`,
        newMessage,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.data.success) {
        setSuccessMessage("✅ Message sent successfully! to " +recipientInput);
        setTimeout(() => setSuccessMessage(""), 3000); 
      }

      setMessageInput("");
      setRecipientInput("clientB");
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Sender Dashboard</h1>
        </div>
        <Button variant="outline" onClick={() => navigate("/reciever")}>
          Switch to Receiver
        </Button>
      </div>

      {/* Success message */}
      {successMessage && (
        <div className="bg-green-100 text-green-800 p-3 rounded border border-green-300 flex items-center space-x-2">
          <CheckCircle className="w-5 h-5" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Form on top */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Send className="w-5 h-5 mr-2" />
            Send Message
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSendMessage} className="space-y-4">
            <Input
              type="text"
              placeholder="To (recipient name or email)..."
              value={recipientInput}
              onChange={(e) => setRecipientInput(e.target.value)}
              className="w-full"
            />
            <Input
              type="text"
              placeholder="Type your message here..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="w-full"
            />
            <Button
              type="submit"
              className="w-full"
              disabled={
                !messageInput.trim() || !recipientInput.trim() || loading
              }
            >
              {loading ? (
                "Sending..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
