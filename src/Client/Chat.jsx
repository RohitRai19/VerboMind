import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import parse from "html-react-parser";
import "./Chat.css";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  // Load chat history from the backend (cookies)
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/chat/history",
          { withCredentials: true }
        );
        const formattedHistory = response.data.history
          .map((chat) => [
            { text: chat.user, sender: "user" },
            { text: chat.bot, sender: "bot" },
          ])
          .flat();

        setMessages(formattedHistory);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };
    fetchHistory();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/chat",
        { message: input },
        { withCredentials: true }
      );

      const botMessage = { text: response.data.reply, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: "Error fetching response", sender: "bot" },
      ]);
    }

    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
      setInput("");
    }
  };

  const handleClearChat = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/chat/clear",
        {},
        { withCredentials: true }
      );
      setMessages([]);
    } catch (error) {
      console.error("Error clearing Chat", error);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className={`Header${
          messages.length === 0 ? "centered-welcome" : ""
        }`}>
        {messages.length === 0 ? (
          <div className="welcome-text">
            <h2> 📡 Neural Network Connected</h2>
            <p>Send your first prompt now.</p>
          </div>
        ) : (
          <div className="Header__messager">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 my-1 rounded ${
                  msg.sender === "user"
                    ? "bg-blue-300 user-message"
                    : "bg-gray-300 ai-message"
                }`}
              >
                {parse(msg.text)}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        )}

        <div className="HeaderInput">
          <input
            type="text"
            id="textInput"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
          />
          <button className="Btn" type="button" onClick={handleSend}>
            Send
          </button>
          <button className="Btn" type="button" onClick={handleClearChat}>
            Clear
          </button>
        </div>
      </div>
    </>
  );
}

export default Chat;
