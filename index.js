var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen('3030');

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');

});
/*app.get('/', function(request, response) {
    response.sendFile(__dirname + '/css.css');

});
*/
app.get('/', function(request, response) {
    response.sendFile(__dirname + '/iconfinder_paper-plane-craft-send-go-start_3643751 (1).png');

});

io.on('connection', function(socket) {
    console.log('New User Has connected');

    socket.on('newMessage', function(data, room, youname) {
        console.log('There are new message ' + data + ' on Room ' + room);
        socket.to(room).emit('clientMessage', { "name": youname, "message": data, "type": "message" });
    });

    socket.on('joinRoom', function(data, youname) {
        console.log('User Join to room ' + data);
        socket.join(data);
        io.sockets.emit('clientMessage', { "message": socket.conn.server.clientsCount, "type": "online" })
        io.sockets.emit('clientMessage', { "name": "system", "message": youname + ' join to room ' + data, "type": "message" })


    });

    socket.on('leaveRoom', function(data, youname) {
        console.log('User Leave to room ' + data);
        io.sockets.emit('clientMessage', { "name": "system", "message": youname + ' leave to room ' + data, "type": "message" })

        socket.leave(data);

    });

    socket.on('disconnect', function(data) {
        io.sockets.emit('clientMessage', { "message": socket.conn.server.clientsCount, "type": "online" })

    });



});