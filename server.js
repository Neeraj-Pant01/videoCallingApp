const express = require("express")
const app = express()
const server = require("http").Server(app)
const { v4: uuidv4 } = require('uuid');
const io = require("socket.io")(server)
const {ExpressPeerServer} = require("peer")

const peerServer = ExpressPeerServer(server,{
    debug: true
})

app.use(express.static('public'))

app.use("/peerjs", peerServer);

app.set("view engine", "ejs")

app.get('/',(req,res)=>{
    res.redirect(`/${uuidv4()}`)
})

app.get('/:roomId',(req,res)=>{
    res.render("room",{roomId: req.params.roomId})
})

io.on('connection', socket =>{
    socket.on("join-room", (roomId, userID)=>{
        socket.join(roomId)
        socket.broadcast.to(roomId).emit('user-connected',userID); 
    })
})



server.listen(3030)