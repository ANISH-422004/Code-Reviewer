import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const Project = () => {
  const params = useParams();
  const [projectId, setprojectId] = useState(params.id);

  const [code, setCode] = useState("// Start typing your code here...");
  const [message, setmessage] = useState([]);
  const [currentMessage, setcurrentMessage] = useState("");

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const tempSocket = io("http://localhost:3000", {
      query: {
        projectId,
      },
    });

    // tempSocket.on('message', msg => {
    //     appendMessage(msg)
    // })

    setSocket(tempSocket);
  }, []);

  return (
    <div className="grid grid-cols-12 gap-4 min-h-screen p-4 bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="col-span-3 bg-gray-800 p-4 rounded-lg flex flex-col justify-between">
        <div>
          <div className="bg-gray-700 p-1 rounded mb-2">Option 1</div>
          <div className="bg-gray-700 p-1 rounded mb-2">Option 2</div>
          <div className="bg-gray-700 p-1 rounded mb-2">Option 3</div>
          <div className="bg-gray-700 p-1 rounded mb-2">Option 4</div>
        </div>
        <div className="flex items-center justify-between bg-gray-700 p-1 rounded mt-4">
          <input
            className="bg-transparent text-white w-[85%]"
            type="text"
            value={currentMessage}
            onChange={(e) => setcurrentMessage(e.target.value)}
          />
          <button className="bg-blue-500 p-1 rounded">
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
