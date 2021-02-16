const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');
const socketIO = require('socket.io');

const app = express();
const options = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt')
};
app.use(express.static(path.join(__dirname, 'public')));
const server = https.createServer(options, app);

const io = socketIO(server);

io.on('connection', socket => {
  console.log('connected');
  io.to(socket.id).emit('initialData', Object.keys(socket.client.conn.server.clients))
  socket.on('send', data => {
    console.log(data);
    socket.broadcast.emit('update', data);
  });
});

server.listen(8080, () => console.log(':8080'));

