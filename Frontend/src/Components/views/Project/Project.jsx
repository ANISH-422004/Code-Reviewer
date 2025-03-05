import React, { useEffect, useState, useRef } from "react";
import { IoIosSend } from "react-icons/io";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import CodeBlock from "../../utils/codeArea/CodeBlock";
import "prismjs";
import "prismjs/themes/prism-tomorrow.css"; // Theme
import "prismjs/components/prism-javascript"; // Language Support
import axios from "axios";
import ReviewArea from "../../utils/reviewarea/ReviewArea";

const Project = () => {
  const { id } = useParams();
  const [projectId] = useState(id);
  const [code, setCode] = useState(
    "// Start typing your code here... \n consoel.log('Hellow World')"
  );
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [Review, setReview] = useState("");
  const [loading, setLoading] = useState(false)

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

    tempSocket.on("codeChange" , (LiveCode)=>{
      setCode(LiveCode)
    })

    setSocket(tempSocket);

    return () => {
      tempSocket.disconnect(); // Clean up the socket on component unmount
    };
  }, [projectId]);

  const reviewHandeler = async () => {
    setLoading(true)
    axios
      .put("http://localhost:3000/v1/api/projects/review", {code})
      .then((res) => {
        console.log(res.data.review);
        setReview(res.data.review)
      })
      .catch((e) => {
        console.log(e);
      }).finally(()=>{
        setLoading(false)
      })
  };

  return (
    <div className="grid grid-cols-12 gap-4 min-h-screen p-4 bg-gray-900 text-white">
      {/* Sidebar (Messages) */}
      <aside className="col-span-3 bg-gray-800 p-4 rounded-lg flex flex-col justify-between">
        {/* Messages Container */}
        <div
          className="overflow-y-auto  max-h-96  flex flex-col scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className="bg-gray-700 p-2 rounded mb-2 max-w-full break-words whitespace-pre-wrap min-h-[2rem] hover:text-xl transition-all duration-100 flex items-center"
            >
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (currentMessage !== "") {
                  socket.emit("message", currentMessage);
                  appendMessage(currentMessage);
                  setCurrentMessage("");
                }
              }
            }}
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
          >
            <IoIosSend />
          </button>
        </div>
      </aside>

      {/* Code Area */}
      <CodeBlock socket={socket} code={code} setCode={setCode} language="javascript" />

      {/* Code Review */}
      <aside className="col-span-4 bg-gray-800 p-4 rounded-lg flex flex-col justify-between">
        <div className="bg-gray-700 p-2 rounded mb-4 flex justify-between">
          <h1>Code Reviewer</h1>
          <button
            className={`bg-blue-600 px-2 rounded active:bg-blue-800 ${loading ? "pointer-events-none" : ""} `}
            onClick={() => {
              reviewHandeler();
            }}
          >
            { loading ? "Generating Review ... " : "Get Review" }
          </button>
          <button 
          className={`bg-blue-600 px-2 rounded active:bg-blue-800`}
          onClick={()=>{setReview("")}}
          >Reset</button>
        </div>
        {/* <textarea
          className="h-[90%] bg-gray-900 border-spacing-0 select-none"
          value={Review}
        ></textarea> */}

        
         <ReviewArea  className="h-[90%]" Review={Review} setReview={setReview} language="javascript" />
      </aside>
    </div>
  );
};

export default Project;
