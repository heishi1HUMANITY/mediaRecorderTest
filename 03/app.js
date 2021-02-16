var express = require('express');
var https = require('https');
var path = require('path');
var fs = require('fs');
var socketIO = require('socket.io');
var app = express();
var options = {
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.crt')
};
app.use(express.static(path.join(__dirname, 'public')));
var server = https.createServer(options, app);
var io = socketIO(server);
var User = /** @class */ (function () {
    function User(id) {
        var _this = this;
        this.setRoom = function (room) {
            _this.room = room;
        };
        this.id = id;
    }
    return User;
}());
io.on('connection', function (socket) {
    console.log('connected');
    var user = new User(socket.id);
    socket.on('join', function (data) {
        socket.join(data);
        user.setRoom(data);
    });
    socket.on('send', function (data) {
        socket.to(user.room).emit('update', data);
    });
});
server.listen(8080, function () { return console.log(':8080'); });
