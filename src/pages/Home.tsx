import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Send, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate=useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Messaging App
          </h1>
          <p className="text-lg text-gray-600">
            Choose your role to get started
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Send className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle>Sender</CardTitle>
              <CardDescription>
                Send messages and view your sent message history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full"
                size="lg"
                onClick={() => navigate("/sender")}
              >
                Go to Sender Page
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle>Receiver</CardTitle>
              <CardDescription>
                View and manage received messages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => navigate("/reciever")}
                className="w-full bg-transparent"
                variant="outline"
                size="lg"
              >
                Go to Receiver Page
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
