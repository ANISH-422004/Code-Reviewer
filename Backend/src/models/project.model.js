const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Project Name is Required"]
    },
    code: {
        type: String,
        required: [true, "Project Code is Required"],
        default:" ",
    }
}
)

const projectModel= mongoose.model("project",projectSchema)

module.exports=projectModel