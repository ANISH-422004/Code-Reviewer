import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [projects, setProjects] = useState([]);

  const handleCreateProject = async () => {
    if (!projectName.trim()) {
      setError("Project name cannot be empty!");
      return;
    }
    setError("");
    setSuccess("");

    try {
      await axios.post("http://localhost:3000/v1/api/projects/createproject", {
        name: projectName,
      });
      setSuccess("Project Created Successfully!");
      setTimeout(() => {
        setModalOpen(false);
        setSuccess("");
        setProjectName("");
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create project!");
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/v1/api/projects/allprojects")
      .then((res) => setProjects(res.data.projects))
      .catch((e) => console.log(e));
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 text-white p-4 md:p-6">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-white/10 backdrop-blur-lg p-3 md:p-4 rounded-xl shadow-lg">
        <div className="relative flex items-center gap-3">
          <img
            src="https://via.placeholder.com/35"
            alt="Profile"
            className="w-9 h-9 rounded-full border border-white shadow"
          />
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-1">
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
          {menuOpen && (
            <div className="absolute top-12 left-0 w-32 bg-white/20 backdrop-blur-lg rounded-lg shadow-lg p-1">
              <button className="block w-full text-left px-2 py-1 text-sm hover:bg-white/30 rounded">
                View Profile
              </button>
              <button className="block w-full text-left px-2 py-1 text-sm hover:bg-white/30 rounded mt-1">
                Logout
              </button>
            </div>
          )}
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 text-sm md:text-base rounded-lg shadow-md"
        >
          Create
        </button>
      </nav>

      {/* Project List */}
      <section className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div
            onClick={()=>{navigate(`/project/${project._id}`)}}
            key={project._id}
            className="p-4 bg-white/10 backdrop-blur-lg rounded-xl shadow-md transition hover:scale-105 text-sm md:text-base"
          >
            <h2 className="font-semibold">{project.name}</h2>
            <p className="text-gray-300 text-xs md:text-sm">
              {project.description}
            </p>
          </div>
        ))}
      </section>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white/10 backdrop-blur-lg p-5 rounded-2xl shadow-lg w-full max-w-sm text-center">
            <h2 className="text-xl font-semibold mb-4">Create Project</h2>
            {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}
            {success && (
              <p className="text-green-500 mb-2 text-sm">{success}</p>
            )}
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full p-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none text-sm"
              placeholder="Enter project name..."
            />
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-500 hover:bg-gray-600 px-3 py-1 text-sm rounded-lg"
              >
                Close
              </button>
              <button
                onClick={handleCreateProject}
                className="bg-green-500 hover:bg-green-600 px-3 py-1 text-sm rounded-lg"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
