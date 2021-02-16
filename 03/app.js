const express = require('express');
const path = require('path');
const socketIO = require('socket.io');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
const server = app.listen(8080, () => console.log(':8080'));

const io = socketIO(server);

io.on('connection', socket => {
  console.log('connected');
  io.to(socket.id).emit('initialData', Object.keys(socket.client.conn.server.clients))
  socket.on('send', data => {
    console.log(data);
    socket.broadcast.emit('update', data);
  });
});
