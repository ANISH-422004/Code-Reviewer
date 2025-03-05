const env = require("dotenv").config()
const cors = require("cors")
const app = require("./src/app")
const config = require("./src/config/config")

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
});
io.on('connection', socket => {

    console.log("User Connected")

    const projectId = socket.handshake.query.projectId

    socket.join(projectId)

    socket.on('message', msg => {
        socket.broadcast.to(projectId).emit('message', msg)
    })

    socket.on('codeChange', LiveCode => {  
        socket.broadcast.to(projectId).emit('codeChange', LiveCode)
    });

    socket.on('disconnect', () => {
        console.log("User disconnected")
    });

});




server.listen(config.PORT , () => { console.log("server is Running on 3000") })



const { connectDB } = require("./src/db/db")
connectDB()
