const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');
const socketIO = require('socket.io');

const app = express();
const options: Object = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt')
};
app.use(express.static(path.join(__dirname, 'public')));
const server = https.createServer(options, app);

const io = socketIO(server);

class User {
  id: string;
  room: string;
  constructor(id: string) {
    this.id = id;
  }
  setRoom = (room: string) => {
    this.room = room;
  }
}

io.on('connection', (socket) => {
  console.log('connected');

  const user: User = new User(socket.id);

  socket.on('join', (data: string) => {
    socket.join(data);
    user.setRoom(data);
  });

  socket.on('send', (data: Buffer) => {
    socket.to(user.room).emit('update', data);
  });
});

server.listen(8080, () => console.log(':8080'));