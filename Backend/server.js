const cors = require("cors")
const app = require("./src/app")



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

    // socket.on('event', data => {  });
    
    socket.on('disconnect', () => {
        console.log("User disconnected")
    });

});




server.listen(3000, () => { console.log("server is Running on 3000") })



const { connectDB } = require("./src/db/db")
connectDB()
