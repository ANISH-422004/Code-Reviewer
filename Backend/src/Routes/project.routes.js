const express = require("express")
const router = express.Router()
const projectControllers = require("../controller/project.controller")


//Routes
router.post("/createproject",projectControllers.CreateProjectController)
router.get("/allprojects",projectControllers.GetAllProjects)


module.exports=router