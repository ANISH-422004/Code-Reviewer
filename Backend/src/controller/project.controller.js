const projectModel = require("../models/project.model");
const AIservice = require("../services/AI.service")
module.exports.CreateProjectController = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Name for Project is Empty" });
    }

    const ifExists = await projectModel.findOne({ name });

    if (ifExists) {
      return res.status(400).json({ message: "Already project with Provided Name Exists" });
    }
    const newProject = await projectModel.create({ name });

    if (!newProject) {
      return res.status(500).json({ message: "Failed to create project" });
    }

    return res.status(201).json({ message: "Project created successfully", newProject });

  } catch (error) {
    console.error("Error creating project:", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports.GetAllProjects = async (req, res) => {
  try {
    const projects = await projectModel.find();

    return res.status(200).json({ projects });

  } catch (error) {
    console.error("Error fetching projects:", error);
    return res.status(500).json({ message: "Failed to fetch projects" });
  }
};

module.exports.getReviewOfCode = async (req, res) => {
  try {
    console.log(req.body)
    const { code } = req.body
    if(!code) return res.status(400).json({message:"Type SomeThing"})

    const review = await AIservice.getReview(code)

    if(!review) res.status(500).json({message : "Could Not Generate Response Try Again"})

      return res.status(200).json({ review });


  } catch (error) {
    console.error("Error fetching projects:", error);
    return res.status(500).json({ message: "Failed to fetch projects" });
  }
}
