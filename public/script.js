const socket = io('/')

// const socket = io.connect('http://localhost:3030');

let videoGrid = document.getElementById("video-grid")
console.log(videoGrid)
const myVideo = document.createElement("video");
myVideo.muted = true;

var peer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '3030'
});

let myvideoStream;
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream =>{
    myvideoStream = stream
    addVideoStream(myVideo, stream)
})

peer.on('open',id =>{
socket.emit("join-room",ROOM_ID, id);
})

socket.on("user-connected",(userId)=>{
    connedTONewUSer(userId)
})

const connedTONewUSer = (userId) =>{
    console.log("new user with id ", userId)
}

const addVideoStream = (video, stream) =>{
    video.srcObject = stream;
    video.addEventListener("loadedmetadata",()=>{
        video.play()
    })
    videoGrid.append(video)
}

console.log("ram ram")