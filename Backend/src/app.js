const express = require("express")
const app = express()
const morgan = require("morgan")
const postRoutes = require("./Routes/project.routes")
const cors = require("cors")


//middleWares
app.use(cors())
app.use(express.json({
    limit: "10mb",
}))
app.use(express.urlencoded({ extended: true }))

app.use(morgan("dev"))


//Routes
app.use("/v1/api/projects",postRoutes)







module.exports=app
