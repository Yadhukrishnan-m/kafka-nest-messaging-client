import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import SenderPage from "./pages/Sender";
import ReceiverPage from "./pages/Reciever"; // note the spelling fix

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sender" element={<SenderPage />} />
        <Route path="/reciever" element={<ReceiverPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
