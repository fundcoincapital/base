const express = require("express");
const socket = require("socket.io");
var bodyParser = require('body-parser');
// App setup
const PORT = 7000;
const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());



// Static files
app.use(express.static("public"));

// Socket setup
const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["username"],
    credentials: false
  }
});


app.post("/signal",function(request, response) {
  
  io.broadcast.emit("signal create", request.body);
  response.send("ok");
});
app.post("/finish",function(request, response) {
  
  io.broadcast.emit("signal finish", request.body);
  response.send("ok");
});



const activeUsers = new Set();

io.on("connection", function (socket) {
  console.log("Made socket connection");

  socket.on("new user", function (data) {
    socket.userId = data;
    activeUsers.add(data);
    io.emit("new user", [...activeUsers]);
  });

  socket.on("disconnect", () => {
    activeUsers.delete(socket.userId);
    io.emit("user disconnected", socket.userId);
  });

  socket.on("chat message", function (data) {
    io.emit("chat message", data);
  });
  
  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });
});