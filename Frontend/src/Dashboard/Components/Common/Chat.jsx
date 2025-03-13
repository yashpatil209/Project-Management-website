import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import axios from "axios";

const Chat = ({ username, receiver }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [client, setClient] = useState(null);

  useEffect(() => {
    const chatId = username < receiver ? `${username}-${receiver}` : `${receiver}-${username}`;

    // Fetch chat history from MongoDB
    axios.get(`http://localhost:8080/messages/${username}/${receiver}`)
      .then(res => setMessages(res.data))
      .catch(err => console.error(err));

    // WebSocket Connection
    const sock = new SockJS("http://localhost:8080/chat");
    const stompClient = new Client({
      webSocketFactory: () => sock,
      onConnect: () => {
        stompClient.subscribe("/topic/messages", (msg) => {
          const newMessage = JSON.parse(msg.body);
          setMessages((prev) => [...prev, newMessage]);
        });
      },
    });

    stompClient.activate();
    setClient(stompClient);

    return () => {
      stompClient.deactivate();
    };
  }, [username, receiver]);

  const sendMessage = () => {
    if (message.trim() !== "" && client) {
      const chatMessage = {
        chatId: username < receiver ? `${username}-${receiver}` : `${receiver}-${username}`,
        sender: username,
        receiver,
        message,
        timestamp: new Date(),
      };
      client.publish({ destination: "/app/send", body: JSON.stringify(chatMessage) });
      setMessage("");
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4 border rounded-lg shadow-md">
      <div className="h-80 overflow-y-auto p-2 border-b">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === username ? "text-right" : "text-left"}>
            <p className="bg-gray-200 inline-block p-2 rounded-lg">
              <strong>{msg.sender}:</strong> {msg.message}
            </p>
          </div>
        ))}
      </div>
      <div className="flex mt-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow p-2 border rounded-lg"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
