"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, ArrowLeft, Clock, Inbox } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { io, } from "socket.io-client";


interface Message {
  _id: string;
  from: string;
  to: string;
  message: string;
  createdAt: string;
}


export default function ReceiverPage() {
  const [receivedMessages, setReceivedMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

const navigate=useNavigate()
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_CLIENT_B_URL}/messages`
      );
      setReceivedMessages(response.data); 
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();

    const newSocket = io(
      import.meta.env.VITE_CLIENT_B_URL 
    );
    

    newSocket.on("connect", () => {
      console.log("Connected to Socket");
    });

    newSocket.on("newMessage", (newMsg: Message) => {
      setReceivedMessages((prevMessages) => [newMsg,...prevMessages]);
    });

    return () => {
      newSocket.disconnect();
      console.log(" Socket disconnected");
    };
  }, []);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">
              Receiver Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="text-sm">
              {receivedMessages.length} Messages
            </Badge>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Inbox className="w-5 h-5 mr-2" />
              Received Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] w-full">
              {loading ? (
                <p className="text-center text-gray-500 py-12">Loading...</p>
              ) : receivedMessages.length === 0 ? (
                <div className="text-center text-gray-500 py-12">
                  <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">
                    No messages received
                  </h3>
                  <p className="text-sm">
                    Messages sent from the sender page will appear here
                  </p>
                  <Button variant="outline">Go to Sender Page</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {receivedMessages.map((msg) => (
                    <div
                      key={msg._id}
                      className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <Badge variant="outline" className="text-xs">
                          Received
                        </Badge>
                        <div className="text-xs text-gray-500">
                          {formatDate(msg.createdAt)}
                        </div>
                      </div>
                      <div className="space-y-2 font-mono text-sm bg-gray-50 p-3 rounded border">
                        <div>
                          <span className="font-semibold">from:</span> "
                          {msg.from}"
                        </div>
                        <div>
                          <span className="font-semibold">to:</span> "{msg.to}"
                        </div>
                        <div>
                          <span className="font-semibold">message:</span> "
                          {msg.message}"
                        </div>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-3">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatTime(msg.createdAt)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
