import React, { useEffect, useState, useRef } from "react";
import { IoIosSend } from "react-icons/io";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const Project = () => {
  const { id } = useParams();
  const [projectId] = useState(id);
  const [code, setCode] = useState("// Start typing your code here...");
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [socket, setSocket] = useState(null);

  // Ref for messages container
  const messagesEndRef = useRef(null);

  // Function to append messages safely
  const appendMessage = (msg) => {
    setMessages((prevMessages) => [...prevMessages, msg]);
  };

  // Auto-scroll when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const tempSocket = io("http://localhost:3000", {
      query: { projectId },
    });

    tempSocket.on("message", (msg) => {
      appendMessage(msg);
    });

    setSocket(tempSocket);

    return () => {
      tempSocket.disconnect(); // Clean up the socket on component unmount
    };
  }, [projectId]);

  return (
    <div className="grid grid-cols-12 gap-4 min-h-screen p-4 bg-gray-900 text-white">
      {/* Sidebar (Messages) */}
      <aside className="col-span-3 bg-gray-800 p-4 rounded-lg flex flex-col justify-between">
        {/* Messages Container */}
        <div
          className="overflow-y-auto max-h-96 flex flex-col scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {messages.map((message, index) => (
            <div key={index} className="bg-gray-700 p-2 rounded mb-2">
              {message}
            </div>
          ))}
          {/* Empty div for auto-scrolling */}
          <div ref={messagesEndRef}></div>
        </div>

        {/* Message Input */}
        <div className="flex items-center justify-between bg-gray-700 p-2 rounded mt-4">
          <input
            className="bg-transparent text-white w-[85%] outline-none p-2 overflow-auto"
            type="text"
            placeholder="Type a message..."
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
          />
          <button
            className="bg-blue-500 p-2 rounded"
            onClick={() => {
              if (currentMessage.trim() !== "" && socket) {
                socket.emit("message", currentMessage);
                appendMessage(currentMessage);
                setCurrentMessage("");
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                console.log('enter')
                socket.emit("message", currentMessage);
                appendMessage(currentMessage);
                setCurrentMessage("");
              }
            }}
          >
            <IoIosSend />
          </button>
        </div>
      </aside>

      {/* Code Area */}
      <main className="col-span-6 bg-gray-700 p-4 rounded-lg flex flex-col items-center justify-center">
        <textarea
          className="w-full h-full p-2 bg-gray-900 bg-opacity-50 text-white rounded-lg outline-none border border-gray-600 shadow-lg"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </main>

      {/* Code Review */}
      <aside className="col-span-3 bg-gray-800 p-4 rounded-lg flex flex-col justify-between">
        <div className="bg-gray-700 p-2 rounded mb-4">Code Review</div>
        <div className="bg-gray-700 p-2 rounded">Notes</div>
      </aside>
    </div>
  );
};

export default Project;
