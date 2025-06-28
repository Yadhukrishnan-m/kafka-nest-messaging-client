# 📨 Kafka Messaging Frontend

A simple React-based frontend for simulating client-to-client messaging using Kafka and NestJS microservices.

This app allows Client A to send messages to Client B through Kafka and Client B to view them in real-time using WebSockets.

---

## 🚀 Features

- 🏠 **Home Page**: Choose between sending or receiving messages
- 📤 **Send Message Page**: 
  - Fill in sender, receiver, and message
  - Sends a POST request to Client A service
- 📥 **Receive Message Page**: 
  - Displays all incoming messages in real-time (via Socket.IO)
  - Filters and shows only messages intended for `clientB`

---

## 📁 Project Structure

```bash
src/
├── pages/
│   ├── Home.tsx
│   ├── SendMessage.tsx
│   └── ReceiveMessage.tsx
├── components/
│   └── shardcn-components
├── App.tsx
├── main.tsx

environmental variables 



VITE_CLIENT_A_URL=CLIENT_A_URL
VITE_CLIENT_B_URL=CLIENT_B_URL
